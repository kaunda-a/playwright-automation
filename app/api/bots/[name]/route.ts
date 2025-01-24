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

export async function GET(request: Request, { params }: { params: { name: string } }) {
  try {
    const db = await connectToDatabase();
    const botsCollection = db.collection('bots');
    const bot = await botsCollection.findOne({ name: params.name });

    if (!bot) {
      return NextResponse.json({ error: 'Bot not found' }, { status: 404 });
    }

    return NextResponse.json(bot);
  } catch (error) {
    console.error('Error fetching bot:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to fetch bot', details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Failed to fetch bot', details: 'Unknown error' }, { status: 500 });
    }
  }
}

export async function PUT(request: Request, { params }: { params: { name: string } }) {
  try {
    const updatedBot = await request.json();
    const db = await connectToDatabase();
    const botsCollection = db.collection('bots');

    if (!updatedBot.name || !updatedBot.browser || !updatedBot.device) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await botsCollection.updateOne({ name: params.name }, { $set: updatedBot });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Bot not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Bot updated successfully' });
  } catch (error) {
    console.error('Error updating bot:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to update bot', details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Failed to update bot', details: 'Unknown error' }, { status: 500 });
    }
  }
}

export async function DELETE(request: Request, { params }: { params: { name: string } }) {
  try {
    const db = await connectToDatabase();
    const botsCollection = db.collection('bots');
    const result = await botsCollection.deleteOne({ name: params.name });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Bot not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Bot deleted successfully' });
  } catch (error) {
    console.error('Error deleting bot:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to delete bot', details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Failed to delete bot', details: 'Unknown error' }, { status: 500 });
    }
  }
}
