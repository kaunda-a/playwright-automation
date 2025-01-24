import { NextResponse } from 'next/server';
import { MongoClient, Db, ObjectId } from 'mongodb';
import { Browser } from 'playwright-core';

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

// This would be a global map to store active bot instances
const activeBotInstances = new Map<string, Browser>();

export async function POST(request: Request) {
  try {
    const { botName } = await request.json();
    const db = await connectToDatabase();
    const botsCollection = db.collection('bots');

    const bot = await botsCollection.findOne({ name: botName });
    if (!bot) {
      return NextResponse.json({ error: 'Bot not found' }, { status: 404 });
    }

    const browser = activeBotInstances.get(botName);
    if (browser) {
      await browser.close();
      activeBotInstances.delete(botName);
    }

    await botsCollection.updateOne(
      { name: botName },
      { $set: { status: 'terminated', lastTerminated: new Date() } }
    );

    // Clean up any associated resources
    await cleanupBotResources(botName);

    return NextResponse.json({ message: `Bot ${botName} terminated successfully` });
  } catch (error) {
    console.error('Failed to terminate bot:', error);
    return NextResponse.json({ error: 'Failed to terminate bot' }, { status: 500 });
  }
}

async function cleanupBotResources(botName: string) {
  const db = await connectToDatabase();
  const tasksCollection = db.collection('tasks');

  // Cancel any pending tasks for this bot
  await tasksCollection.updateMany(
    { botName: botName, status: 'pending' },
    { $set: { status: 'cancelled' } }
  );

  // Additional cleanup logic can be added here
  // For example, releasing any held proxies, clearing caches, etc.
}

export async function GET() {
  try {
    const db = await connectToDatabase();
    const botsCollection = db.collection('bots');

    const activeBots = await botsCollection.find({ status: 'active' }).toArray();

    return NextResponse.json({
      activeBots: activeBots.map(bot => ({
        name: bot.name,
        status: bot.status,
        lastActive: bot.lastActive
      }))
    });
  } catch (error) {
    console.error('Failed to fetch active bots:', error);
    return NextResponse.json({ error: 'Failed to fetch active bots' }, { status: 500 });
  }
}
