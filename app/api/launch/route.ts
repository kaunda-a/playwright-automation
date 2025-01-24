import { chromium, firefox, webkit, Browser, Page, BrowserContext, devices } from 'playwright-core';
import { NextResponse } from 'next/server';
import { MongoClient, Db, ObjectId } from 'mongodb';
import { Bot } from '@/types/Bot';
import { TaskManager } from '@/lib/TaskManager';
import { ProxyRotator } from '@/lib/ProxyRotator';
import { BehaviorSimulator } from '@/lib/BehaviorSimulator';
import { CaptchaSolver } from '@/lib/CaptchaSolver';
import { FingerprintManager } from '@/lib/FingerprintManager';
import { CacheManager } from '@/lib/CacheManager';
import { CookieManager } from '@/lib/CookieManager';
import { ExtensionEmulator } from '@/lib/ExtensionEmulator';
import { HeadlessModeEvasion } from '@/lib/HeadlessModeEvasion';
import { NetworkObfuscator } from '@/lib/NetworkObfuscator';
import { JavaScriptObfuscator } from '@/config/JavaScriptObfuscator';
import { BehavioralAnalyzer } from '@/config/BehavioralAnalyzer';
import { HeadlessDetectionBypass } from '@/config/HeadlessDetectionBypass';
import { UserAgentRotator } from '@/config/UserAgentRotator';
import { AutomatedBrowsing } from '@/lib/AutomatedBrowsing';

interface Fingerprint {
  userAgent: string;
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('MONGODB_URI is not defined in the environment variables');
}

const client = new MongoClient(uri);
let db: Db;

const proxyRotator = new ProxyRotator([]);
const behaviorSimulator = BehaviorSimulator.initialize({} as any);

const captchaSolver = new CaptchaSolver(process.env.CAPTCHA_SOLVER_API_KEY || '', {} as any);
const fingerprintManager = new FingerprintManager();

const taskManager = new TaskManager(
  proxyRotator,
  behaviorSimulator,
  captchaSolver,
  fingerprintManager,
);

const activeBotInstances = new Map<string, Browser>();

async function connectToDatabase() {
  if (!db) {
    await client.connect();
    db = client.db('botDatabase');
  }
  return db;
}

export async function POST(request: Request) {
  try {
    let requestBody = await request.json();
    console.log('Received request body:', requestBody);

    const { botName, category, taskId, taskType, taskParameters, actions, botDuration } = requestBody;

    console.log('Parsed request parameters:', { botName, category, taskId, taskType, taskParameters, actions, botDuration });

    if (!taskId) {
      console.error('Missing taskId in request');
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }

    const db = await connectToDatabase();
    console.log('Connected to database');

    const collection = db.collection('bots');
    const tasksCollection = db.collection('tasks');

    let query: { name: string; category?: string } = { name: botName };
    if (category && category !== 'all') {
      query.category = category;
    }
    console.log('Bot query:', query);

    const bot = await collection.findOne(query) as unknown as Bot;
    console.log('Found bot:', bot);

    if (!bot) {
      console.error(`Bot not found: ${botName}`);
      return NextResponse.json({ error: 'Bot not found' }, { status: 404 });
    }

    console.log('Launching enhanced instance...');
    let launchedInstance;
    try {
      launchedInstance = await launchEnhancedInstance(bot);
      console.log('Enhanced instance launched successfully');
    } catch (error) {
      console.error('Failed to launch enhanced instance:', error);
      return NextResponse.json({ error: 'Failed to launch bot instance', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }

    activeBotInstances.set(botName, launchedInstance.browserInstance);

    taskManager.setBrowser(launchedInstance.browserInstance);
    taskManager.setContext(launchedInstance.context);
    taskManager.setPage(launchedInstance.page);

    console.log('Retrieving task...');
    let task: { _id?: ObjectId; type: any; parameters: any; actions: any; status: string };
    if (taskId === 'new') {
      task = {
        type: taskType,
        parameters: taskParameters,
        actions: actions,
        status: 'pending'
      };
      const result = await tasksCollection.insertOne(task);
      task._id = result.insertedId;
    } else {
      task = await tasksCollection.findOne({ _id: new ObjectId(taskId) }) as { _id: ObjectId; type: any; parameters: any; actions: any; status: string };
    }
    console.log('Retrieved task:', task);

    if (!task) {
      console.error(`Task not found: ${taskId}`);
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    console.log('Task execution started');
    console.log('Task type:', task.type);
    console.log('Task parameters:', task.parameters);
    console.log('Task actions:', task.actions);

    if (task.type === 'WebScraping' && !task.parameters.url) {
      return NextResponse.json({ error: 'URL is required for WebScraping tasks' }, { status: 400 });
    }

    if ((task.type === 'GoogleSearch' || task.type === 'EnhancedGoogleSearch') && !task.parameters.searchQuery) {
      return NextResponse.json({ error: 'Search query is required for GoogleSearch tasks' }, { status: 400 });
    }

    if (task.type === 'EnhancedGoogleSearch') {
      if (!task.parameters.targetDomain) {
        return NextResponse.json({ error: 'Target domain is required for EnhancedGoogleSearch tasks' }, { status: 400 });
      }
      if (!Array.isArray(task.parameters.pagesToVisit) || task.parameters.pagesToVisit.length === 0) {
        return NextResponse.json({ error: 'Pages to visit must be a non-empty array for EnhancedGoogleSearch tasks' }, { status: 400 });
      }
    }

    const taskInstance = taskManager.createTask(task.type, task.parameters, task.actions);
 
    await taskManager.addTask(taskInstance);
    console.log('Executing task...');
    const result = await taskManager.startTaskExecution();
    console.log('Task execution result:', result);

    await tasksCollection.updateOne(
      { _id: task._id },
      { $set: { status: 'completed', result: result } }
    );
    console.log('Task status updated in database');

    await collection.updateOne(
      { name: botName },
      { $set: { status: 'active', lastActive: new Date() } }
    );

    if (botDuration > 0) {
      setTimeout(async () => {
        await launchedInstance.automatedBrowsing.stop();
        await launchedInstance.browserInstance.close();
        activeBotInstances.delete(botName);
      }, botDuration * 60 * 1000);
    } else {
      taskManager.keepBrowserOpen(launchedInstance.browserInstance);
    }

    return NextResponse.json({
      taskResult: result,
      botStatus: {
        name: botName,
        status: 'active',
        lastActive: new Date(),
        scheduledClosureTime: botDuration > 0 ? new Date(Date.now() + botDuration * 60 * 1000) : null
      }
    });
  } catch (error) {
    console.error('Unhandled error in POST /api/start:', error);
    return NextResponse.json({ error: 'Failed to launch instance', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

async function launchEnhancedInstance(bot: Bot, location?: string): Promise<{
  name: string;
  device: string;
  viewport: string;
  browser: string;
  category: string;
  context: BrowserContext;
  browserInstance: Browser;
  page: Page;
  automatedBrowsing: AutomatedBrowsing;
}> {
  const browserType = getBrowserType(bot.browser);
  let browser: Browser | undefined;
  let context: BrowserContext | undefined;
  let page: Page | undefined;

  const userAgentRotator = new UserAgentRotator();
  const cacheManager = new CacheManager('cache/cacheData.json');
  const cookieManager = new CookieManager();
  const extensionEmulator = new ExtensionEmulator();
  const headlessModeEvasion = new HeadlessModeEvasion();
  const networkObfuscator = new NetworkObfuscator();
  const javaScriptObfuscator = new JavaScriptObfuscator();
  const behavioralAnalyzer = new BehavioralAnalyzer();
  const headlessDetectionBypass = new HeadlessDetectionBypass();

  try {
    const fingerprint: Fingerprint = { userAgent: userAgentRotator.getRandomUserAgent() };

    const launchOptions = {
      headless: false,
      args: [
        '--disable-blink-features=AutomationControlled',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-dev-shm-usage',
        '--disable-infobars',
        '--disable-extensions',
        '--disable-popup-blocking',
        '--disable-default-apps',
        '--disable-gpu',
        '--hide-scrollbars',
        '--mute-audio',
      ],
      proxy: undefined,
    };

    browser = await browserType.launch(launchOptions);
    context = await browser.newContext({
      ...fingerprint,
      ...devices[bot.device as keyof typeof devices],
    });

    await context.addInitScript(() => {
      const newNavigator = Object.create(navigator);
      Object.defineProperty(newNavigator, 'webdriver', { get: () => undefined });
      Object.defineProperty(newNavigator, 'language', { get: () => 'en-US' });
      Object.defineProperty(newNavigator, 'languages', { get: () => ['en-US', 'en'] });
      Object.defineProperty(newNavigator, 'platform', { get: () => 'Win32' });
      Object.defineProperty(newNavigator, 'plugins', { get: () => [1, 2, 3, 4, 5] });
      Object.defineProperty(newNavigator, 'hardwareConcurrency', { get: () => 4 });
      Object.defineProperty(newNavigator, 'deviceMemory', { get: () => 8 });
      Object.defineProperty(newNavigator, 'maxTouchPoints', { get: () => 1 });
      Object.defineProperty(newNavigator, 'mediaDevices', {
        get: () => ({
          getUserMedia: () => Promise.reject(new Error('NotSupportedError')),
          enumerateDevices: () => Promise.resolve([{ kind: 'videoinput' }, { kind: 'audioinput' }]),
        }),
      });
      Object.defineProperty(newNavigator, 'userAgent', {
        get: () => navigator.userAgent.replace('Headless', ''),
      });

      Object.defineProperty(window, 'navigator', {
        get: () => newNavigator,
      });

      Object.defineProperty(screen, 'width', { get: () => 1920 });
      Object.defineProperty(screen, 'height', { get: () => 1080 });
      Object.defineProperty(screen, 'availWidth', { get: () => 1920 });
      Object.defineProperty(screen, 'availHeight', { get: () => 1040 });
    });
     
    const loadedCookies = await cookieManager.loadCookies(bot.name);
    await context.addCookies(loadedCookies);
    await cacheManager.loadCacheAndCookies(context);
    await extensionEmulator.emulateCommonExtensions(context);
    await fingerprintManager.applyEvasionTechniques(context);
    await headlessModeEvasion.applyEvasionTechniques(context);
    const obfuscatedCode = await javaScriptObfuscator.obfuscate('console.log("Hello World");');
    await context.addInitScript({ content: obfuscatedCode });
    await headlessDetectionBypass.applyBypass(context);
    page = await context.newPage();
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });
    await networkObfuscator.simulateHumanNetworkBehavior(page);
    await behavioralAnalyzer.analyze(page);
   
    const automatedBrowsing = new AutomatedBrowsing(page, browser, context, {
      mouseMoveInterval: 3000,
      scrollInterval: 5000,
      scrollAmount: 100,
      mouseMoveSteps: 10,
    });
    
    await automatedBrowsing.start();
   
    return {
      name: bot.name,
      device: bot.device,
      viewport: 'fullscreen',
      browser: bot.browser,
      category: bot.category,
      context,
      browserInstance: browser,
      page,
      automatedBrowsing,
    };
  } catch (error) {
    console.error('Error launching enhanced instance:', error);
    throw error;
  }
}


function getBrowserType(browserName: string) {
  switch (browserName.toLowerCase()) {
    case 'firefox':
      return firefox;
    case 'webkit':
      return webkit;
    default:
      return chromium;
  }
}
