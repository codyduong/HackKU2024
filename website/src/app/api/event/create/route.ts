import { auth } from '@/lib/auth';
import clientPromise from '@/lib/db';
import { NextResponse } from 'next/server';

async function readRequestBody(req: any): Promise<string> {
  const chunks: Uint8Array[] = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf-8'); // Converts Buffer to string
}

export const POST = auth(async (req) => {
  if (!req.auth) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const collection = (await clientPromise).db('db').collection('events');

  try {
    const data = await req.json();
    console.log(data);
    const newData = {
      ...data,
      source: 'manual',
      owner: req.auth.user?.email,
    };
    const result = await collection.insertOne({
      ...newData,
    });
    // const result = await collection.updateOne(
    //   { eventId: eventData.eventId },
    //   {
    //     $set: newData,
    //   },
    //   { upsert: true },
    // );
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Database write error:', error);
    return NextResponse.json(
      { message: 'Failed to update the database' },
      { status: 500 },
    );
  }
});
