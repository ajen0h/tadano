import {db} from '@/lib/db';
import {auth} from '@clerk/nextjs';
import {NextRequest, NextResponse} from 'next/server';
import Stripe from 'stripe';
import {stripe} from '@/lib/stripe';

interface DataProps {
  id: string;
  cantidad: number;
}

export async function GET(){
  console.log("object");
  return NextResponse.json("{ url: session.url }");
  
}

export async function POST(req: NextRequest) {
  const {userId} = auth();
  const data: DataProps[] = await req.json();

  //Busca todos lo productos que le pasamos
  const products = await db.product.findMany({
    where: {
      id: {
        in: data.map((d) => d.id),
      },
    },
  });

  //Funciona correctamente
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  products.map((product: any) => {
    const cantidadObj = data.find((cantidad) => cantidad.id === product.id);
    if (cantidadObj) {
      line_items.push({
        quantity: cantidadObj.cantidad,
        price_data: {
          currency: 'USD',
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
        },
      });
    }
  });

  //Crear el order cuando se realice la compra exitosamente
  const order = await db.order.create({
    data: {
      userId,
      isPaid: false,
      orderItems: {
        createMany: {
          data: data.map((product) => ({
            productId: product.id,
            quantity: product.cantidad,
          })),
        },
      },
    },
  });

  //stripe
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    //guardar address
    billing_address_collection: 'required',
    //guardar phone
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/store?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/store?canceled=1`,
    metadata: {
      orderId: order.id,

    },
  });

  return NextResponse.json({ url: session.url });
  /* return NextResponse.json("{ url: session.url }"); */
}
