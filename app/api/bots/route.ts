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
    const botsCollection = db.collection('bots');
    const bots = await botsCollection.find({}).toArray();
    return NextResponse.json(bots);
  } catch (error) {
    console.error('Error fetching bots:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to fetch bots', details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Failed to fetch bots', details: 'Unknown error' }, { status: 500 });
    }
  }
}

export async function POST(request: Request) {
  try {
    const bot = await request.json();
    const db = await connectToDatabase();
    const botsCollection = db.collection('bots');

    if (!bot.name || !bot.browser || !bot.device) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await botsCollection.insertOne(bot);
    return NextResponse.json({ message: 'Bot created successfully', id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Error creating bot:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to create bot', details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Failed to create bot', details: 'Unknown error' }, { status: 500 });
    }
  }
}
