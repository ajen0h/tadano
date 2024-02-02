import {db} from '@/lib/db';
import {auth} from '@clerk/nextjs';
import {NextRequest, NextResponse} from 'next/server';
import Stripe from 'stripe';

interface DataProps {
  id: string;
  cantidad: number;
}

export async function POST(req: NextRequest) {
  const {userId} = auth();
  const data: DataProps[] = await req.json();

  console.log(data);

  //Busca todos lo productos que le pasamos
  const products = await db.product.findMany({
    where: {
      id: {
        in: data.map((d) => d.id),
      },
    },
  });
  console.log(products);

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
          unit_amount: product.price.toNumber() * 100,
        },
      });
    }
  });

  data.map(
    async (product) =>
      await db.order.create({
        data: {
          userId,
          quantity: product.cantidad,
          orderItems: {
            create: {
              product: {
                connect: {
                  id: product.id,
                },
              },
            },
          },
        },
      })
  );

  /*  //stripe
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    //guardar address
    billing_address_collection: 'required',
    //guardar phone
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id
    },
  });  */

  return NextResponse.json('Backend');
}
