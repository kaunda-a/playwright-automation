import { PlaywrightTestConfig } from '@playwright/test';
import { ProxyRotator } from './lib/ProxyRotator';
import { BehaviorSimulator } from './lib/BehaviorSimulator';
import { FingerprintManager } from './lib/FingerprintManager';
import { UserAgentRotator } from './config/UserAgentRotator';
import { HeadlessModeEvasion } from './lib/HeadlessModeEvasion';
import { ExtensionEmulator } from './lib/ExtensionEmulator';
import { CacheManager } from './lib/CacheManager';
import { BrowserVersionManager } from './lib/BrowserVersionManager';

const proxyRotator = new ProxyRotator([]);const fingerprintManager = new FingerprintManager();
const userAgentRotator = new UserAgentRotator();

const headlessModeEvasion = new HeadlessModeEvasion();
const extensionEmulator = new ExtensionEmulator();
const cacheManager = new CacheManager('global_cache.json');
const browserVersionManager = new BrowserVersionManager();

const config: PlaywrightTestConfig = {
  projects: [
    {
      name: 'ultra-stealth-chrome',
      use: {
        browserName: 'chromium',
        launchOptions: {
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-gpu',
            '--disable-infobars',
            '--disable-automation',
            '--disable-blink-features=AutomationControlled',
            '--disable-extensions',
            '--disable-popup-blocking',
            '--disable-notifications',
            '--disable-dev-shm-usage',
            '--no-first-run',
            '--no-default-browser-check',
            '--use-fake-ui-for-media-stream',
            '--use-fake-device-for-media-stream',
          ],
          headless: false,
          ignoreDefaultArgs: ['--enable-automation', '--enable-blink-features=IdleDetection'],
        },
        viewport: null,
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        permissions: ['geolocation', 'notifications'],
        bypassCSP: true,
        javaScriptEnabled: true,
        hasTouch: false,
        isMobile: false,
        deviceScaleFactor: 1,
        colorScheme: 'light',
      },
    },
  ],
  use: {
    browserName: 'chromium',
    trace: 'on-first-retry',
    baseURL: 'http://localhost:3000',
  },
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',
  workers: 1,
  retries: 2,
  timeout: 120000,
  expect: {
    timeout: 15000,
  },
};

const setupHooks = {
  beforeEach: async ({ context, page }: { context: any; page: any }) => {
    const fingerprint = fingerprintManager.generateFingerprint();
    const proxy = await proxyRotator.getProxy();
    
    await context.route('**/*', (route: any) => {
      const headers = route.request().headers();
      headers['User-Agent'] = userAgentRotator.getRandomUserAgent();
      route.continue({ headers });
    });

    await context.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    });

    await headlessModeEvasion.applyEvasionTechniques(context);
    await extensionEmulator.emulateCommonExtensions(context);
    await cacheManager.loadCacheAndCookies(context);

    await context.setExtraHTTPHeaders({
      'Accept-Language': fingerprint.locale,
      'Accept-Encoding': 'gzip, deflate, br',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
    });

    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.setGeolocation({ latitude: 40.712776, longitude: -74.005974 });
    await page.setExtraHTTPHeaders({ 'Accept-Language': fingerprint.locale });

  },
  afterEach: async ({ context }: { context: any }) => {
    await cacheManager.saveCacheAndCookies(context);
  },
};

export { config as default, setupHooks };
