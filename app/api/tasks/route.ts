import { NextResponse } from 'next/server';
import { MongoClient, Db, ObjectId } from 'mongodb';
import { Page, Browser, BrowserContext } from 'playwright';
import { TaskManager } from '@/lib/TaskManager';
import { ProxyRotator } from '@/lib/ProxyRotator';
import { BehaviorSimulator } from '@/lib/BehaviorSimulator';
import { CaptchaSolver } from '@/lib/CaptchaSolver';
import { FingerprintManager } from '@/lib/FingerprintManager';

// Initialize dependencies
const proxyRotator = new ProxyRotator([]);
const behaviorSimulator = new BehaviorSimulator({} as any, {} as Browser,  {} as BrowserContext);

const captchaSolver = new CaptchaSolver(process.env.CAPTCHA_SOLVER_API_KEY || '', {} as any);
const fingerprintManager = new FingerprintManager();


const taskManager = new TaskManager(
  proxyRotator,
  behaviorSimulator,
  captchaSolver,
  fingerprintManager,
);

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
    const tasksCollection = db.collection('tasks');

    const tasks = await tasksCollection.find({}).toArray();

    console.log('Fetched tasks:', JSON.stringify(tasks, null, 2));

    return NextResponse.json({
      tasks,
      message: 'Successfully fetched tasks'
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({
      error: 'Failed to fetch data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const text = await request.text();
    const lines = text.split('\n');
    const [type, parameters, url, googleSearchQuery, googleSearchTarget, actionsString] = lines;

    console.log('Received data:', { type, parameters, url, googleSearchQuery, googleSearchTarget, actionsString });

    const db = await connectToDatabase();
    const tasksCollection = db.collection('tasks');

    // Validate task parameters
    if (!type || !parameters) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let actions = [];
    try {
      actions = actionsString ? JSON.parse(actionsString) : [];
    } catch (error) {
      console.error('Error parsing actions:', error);
    }

    const taskDocument = {
      type,
      parameters: JSON.parse(parameters),
      url: url || '',
      googleSearchQuery: googleSearchQuery || '',
      googleSearchTarget: googleSearchTarget || '',
      actions,
      status: 'Active',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await tasksCollection.insertOne(taskDocument);


    return NextResponse.json({
      message: 'Task created successfully',
      id: result.insertedId,
      task: taskDocument
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({
      error: 'Failed to create task',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { pathname } = new URL(request.url);
  const id = pathname.split('/').pop();
  const updatedTask = await request.json();
  const db = await connectToDatabase();
  const tasksCollection = db.collection('tasks');

  if (!id) {
    return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
  }

  await taskManager.updateTask(id, updatedTask);
  await tasksCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedTask });

  return NextResponse.json({ message: 'Task updated successfully' });
}

export async function DELETE(request: Request) {
  const { pathname } = new URL(request.url);
  const id = pathname.split('/').pop();

  if (!id) {
    return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
  }

  const db = await connectToDatabase();
  const tasksCollection = db.collection('tasks');

  await taskManager.deleteTask(id);
  const result = await tasksCollection.deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Task deleted successfully' });
}