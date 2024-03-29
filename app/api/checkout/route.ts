import {db} from '@/lib/db';
import {NextRequest, NextResponse} from 'next/server';
import Stripe from 'stripe';
import {stripe} from '@/lib/stripe';
import { auth } from '@/auth';
import { Product } from '@prisma/client';
import { cookies } from 'next/headers';

interface DataProps {
  id: string;
  cantidad: number;
}

export async function GET(){
  console.log("object");
  return NextResponse.json("{ url: session.url }");
  
}

export async function POST(req: NextRequest) {
  const lang = cookies().get('NEXT_LOCALE')?.value;
  const userSession=await auth()
  if(!userSession?.user?.id) return NextResponse.json({ error: "" })
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

  products.map((product: Product) => {
    const cantidadObj = data.find((cantidad) => cantidad.id === product.id);
    if (cantidadObj) {
      line_items.push({
        quantity: cantidadObj.cantidad,
        price_data: {
          currency: 'USD',
          product_data: {
            name: product.name,
          },
          unit_amount: Math.round(product.price * 100) ,
        },
      });
    }
  });

  //Crear el order cuando se realice la compra exitosamente
  const order = await db.order.create({
    data: {
      userId:userSession?.user?.id,
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
    success_url: `${process.env.FRONTEND_STORE_URL}/${lang}/store?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/${lang}/store?canceled=1`,
    metadata: {
      orderId: order.id,

    },
  });

  return NextResponse.json({ url: session.url });
 
 
  /* return NextResponse.json("{ url: session.url }"); */
}
