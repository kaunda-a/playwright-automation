import { NextResponse } from 'next/server';
import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('MONGODB_URI is not defined in the environment variables');
}

const client = new MongoClient(uri);
let db: Db;

async function connectToDatabase() {
  if (!db) {
    await client.connect();
    db = client.db('botDatabase');
  }
  return db;
}

export async function GET() {
  try {
    const db = await connectToDatabase();
    const proxiesCollection = db.collection('proxies');
    const proxies = await proxiesCollection.find({}).toArray();
    return NextResponse.json(proxies);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch proxies' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const proxy = await request.json();
    const db = await connectToDatabase();
    const proxiesCollection = db.collection('proxies');

    const proxyWithAuth = {
      host: proxy.host,
      port: proxy.port,
      protocol: proxy.protocol,
      auth: proxy.username && proxy.password ? {
        username: proxy.username,
        password: proxy.password
      } : undefined
    };

    const result = await proxiesCollection.insertOne(proxyWithAuth);
    return NextResponse.json({ message: 'Proxy created successfully', id: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create proxy' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...updatedProxy } = await request.json();
    const db = await connectToDatabase();
    const proxiesCollection = db.collection('proxies');
    await proxiesCollection.updateOne({ _id: new Object(id) }, { $set: updatedProxy });
    return NextResponse.json({ message: 'Proxy updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update proxy' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Proxy ID is required' }, { status: 400 });
    }
    const db = await connectToDatabase();
    const proxiesCollection = db.collection('proxies');
    const result = await proxiesCollection.deleteOne({ _id: new Object(id) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Proxy not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Proxy deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete proxy' }, { status: 500 });
  }
}