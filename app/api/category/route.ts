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
    const collection = db.collection('botCategories');
    const categories = await collection.find({}).toArray();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Failed to fetch bot categories:', error);
    return NextResponse.json({ error: 'Failed to fetch bot categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const category = await request.json();
    const db = await connectToDatabase();
    const collection = db.collection('botCategories');
   
    // Validate category
    if (!category.name || typeof category.name !== 'string') {
      return NextResponse.json({ error: 'Invalid category name' }, { status: 400 });
    }

    await collection.insertOne(category);
    return NextResponse.json({ message: 'Bot category created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Failed to create bot category:', error);
    return NextResponse.json({ error: 'Failed to create bot category' }, { status: 500 });
  }
}
