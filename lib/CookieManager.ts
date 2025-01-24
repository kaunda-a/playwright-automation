import fs from 'fs/promises';
import path from 'path';
import { Cookie } from 'playwright';

export class CookieManager {
  private cookiesDir: string;

  constructor(cookiesDir: string = 'bot_cookies') {
    this.cookiesDir = cookiesDir;
    this.ensureDirectoryExistence(); // Ensure the directory exists
    this.checkCacheFile(); // Check if cache file exists
  }

  private async ensureDirectoryExistence() {
    try {
      await fs.mkdir(this.cookiesDir, { recursive: true });
      console.log('Cookies directory ensured:', this.cookiesDir);
    } catch (error) {
      console.error('Error creating cookies directory:', error);
    }
  }

  private async checkCacheFile() {
    const cacheFilePath = 'cache/cookies.json'; // Path to the cache file
    try {
      await fs.access(cacheFilePath); // Check if the file exists
      console.log('Cache file exists:', cacheFilePath);
    } catch {
      console.warn('Cache file does not exist, creating a new one:', cacheFilePath);
      await fs.writeFile(cacheFilePath, JSON.stringify([])); // Create an empty cache file
    }
  }

  async saveCookies(botId: string, cookies: Cookie[]): Promise<void> {
    const filePath = this.getCookieFilePath(botId);
    try {
      await fs.writeFile(filePath, JSON.stringify(cookies, null, 2));
      console.log(`Cookies saved for bot ${botId} at ${filePath}`);
    } catch (error) {
      console.error(`Error saving cookies for bot ${botId}:`, error);
    }
  }

  async loadCookies(botId: string): Promise<Cookie[]> {
    const filePath = this.getCookieFilePath(botId);
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        console.warn(`No cookies found for bot ${botId}. File does not exist: ${filePath}`);
        return []; // Return an empty array if the file does not exist
      }
      console.error(`Error loading cookies for bot ${botId}:`, error);
      return []; // Return an empty array on other errors
    }
  }

  async deleteCookies(botId: string): Promise<void> {
    const filePath = this.getCookieFilePath(botId);
    try {
      await fs.unlink(filePath);
      console.log(`Cookies deleted for bot ${botId}`);
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        console.warn(`No cookie file found for bot ${botId}: ${filePath}`);
      } else {
        console.error(`Error deleting cookies for bot ${botId}:`, error);
      }
    }
  }

  async listBotSessions(): Promise<string[]> {
    try {
      const files = await fs.readdir(this.cookiesDir);
      return files.map(file => path.parse(file).name);
    } catch (error) {
      console.warn('No bot sessions found:', error);
      return [];
    }
  }

  private getCookieFilePath(botId: string): string {
    return path.join(this.cookiesDir, `${botId}_cookies.json`);
  }
}