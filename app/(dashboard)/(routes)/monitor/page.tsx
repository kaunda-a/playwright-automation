
"use client";

import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Bot } from '@/types/Bot';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaApple, FaAndroid, FaWindows } from 'react-icons/fa';
import { SiSafari, SiFirefox } from 'react-icons/si';
import { SiGooglechrome as SiChrome } from 'react-icons/si';

const DynamicLocationPicker = dynamic(() => import('@/components/LocationPicker').then(mod => mod.LocationPicker), { ssr: false });

const getDeviceIcon = (device: string, size: number = 16) => {
  if (device.toLowerCase().includes('iphone') ||
      device.toLowerCase().includes('ipad') ||
      device.toLowerCase().includes('mac') ||
      device.toLowerCase().includes('apple')) {
    return <FaApple size={size} />;
  } else if (device.toLowerCase().includes('android') ||
             device.toLowerCase().includes('pixel') ||
             device.toLowerCase().includes('samsung')) {
    return <FaAndroid size={size} />;
  } else if (device.toLowerCase().includes('desktop')) {
    return <FaWindows size={size} />;
  }
  return null;
};

const getBrowserIcon = (browser: string, size: number = 16) => {
  switch (browser.toLowerCase()) {
    case 'chrome':
    case 'chromium':
      return <SiChrome size={size} />;
    case 'firefox':
      return <SiFirefox size={size} />;
    case 'safari':
    case 'webkit':
      return <SiSafari size={size} />;
    default:
      return null;
  }
};

const MonitorPage: React.FC = () => {
  const [bots, setBots] = useState<Bot[]>([]);
  const [url, setUrl] = useState<string>('https://google.com');
  const [latitude, setLatitude] = useState<number>(41.889938);
  const [longitude, setLongitude] = useState<number>(12.492507);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(600);

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const response = await fetch('/api/bots');
        const data = await response.json();
        setBots(data);
      } catch (error) {
        console.error('Error fetching bots:', error);
      }
    };

    fetchBots();

    const interval = setInterval(() => {
      const activeTasks = Math.floor(Math.random() * 10);
      const completedTasks = Math.floor(Math.random() * 50);
      const errors = Math.floor(Math.random() * 5);
      console.log({ activeTasks, completedTasks, errors });
    }, 5000);

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const height = Math.max(entry.contentRect.height - 100, 600);
        setContainerHeight(height);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      clearInterval(interval);
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);
 
  return (
    <div ref={containerRef} className="mt-8 p-4 border rounded flex flex-col h-[calc(100vh-200px)]">
      <h2 className="text-2xl font-bold mb-4">Bot Monitor</h2>
     
      <Tabs defaultValue="active" className="mb-8">
        <TabsList>
          <TabsTrigger value="active">Active Bots</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <ScrollArea className="rounded-md border" style={{ height: `${containerHeight}px` }}>
            <div className="p-8">
              {bots.map((bot) => (
                <Card key={bot.name} className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      {getDeviceIcon(bot.device, 20)}
                      {getBrowserIcon(bot.browser, 20)}
                      <span className="ml-2">{bot.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>OS: {bot.os}</p>
                    <p>Device: {bot.device}</p>
                    <p>Browser: {bot.browser}</p>
                    <p>URL: {url}</p>
                    <p>Location: {latitude.toFixed(6)}, {longitude.toFixed(6)}</p>
                    <span className="ml-2 px-2 py-1 bg-green-500 text-white rounded-full text-xs">Active</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="settings">
          <div className="mb-4">
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <div className="mb-4">
            <Label>Select Location</Label>
            <DynamicLocationPicker
              latitude={latitude}
              longitude={longitude}
              onLocationChange={(lat, lng) => {
                setLatitude(lat);
                setLongitude(lng);
              }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MonitorPage;



/*
"use client";

import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Bot } from '@/types/Bot';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaApple, FaAndroid, FaWindows } from 'react-icons/fa';
import { SiSafari, SiFirefox } from 'react-icons/si';
import { SiGooglechrome as SiChrome } from 'react-icons/si';

const DynamicLocationPicker = dynamic(() => import('@/components/LocationPicker').then(mod => mod.LocationPicker), { ssr: false });


const getDeviceIcon = (device: string, size: number = 16) => {
  if (device.toLowerCase().includes('iphone') || 
      device.toLowerCase().includes('ipad') || 
      device.toLowerCase().includes('mac') ||
      device.toLowerCase().includes('apple')) {
    return <FaApple size={size} />;
  } else if (device.toLowerCase().includes('android') || 
             device.toLowerCase().includes('pixel') || 
             device.toLowerCase().includes('samsung')) {
    return <FaAndroid size={size} />;
  } else if (device.toLowerCase().includes('desktop')) {
    return <FaWindows size={size} />;
  }
  return null;
};

const getBrowserIcon = (browser: string, size: number = 16) => {
  switch (browser.toLowerCase()) {
    case 'chrome':
    case 'chromium':
      return <SiChrome size={size} />;
    case 'firefox':
      return <SiFirefox size={size} />;
    case 'safari':
    case 'webkit':
      return <SiSafari size={size} />;
    default:
      return null;
  }
};

const MonitorPage: React.FC = () => {
  const [bots, setBots] = useState<Bot[]>([]);
  const [url, setUrl] = useState<string>('https://google.com');
  const [latitude, setLatitude] = useState<number>(41.889938);
  const [longitude, setLongitude] = useState<number>(12.492507);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(400); // Initial height, adjust as needed

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const response = await fetch('/api/bots');
        const data = await response.json();
        setBots(data);
      } catch (error) {
        console.error('Error fetching bots:', error);
      }
    };

    fetchBots();

    const interval = setInterval(() => {
      const activeTasks = Math.floor(Math.random() * 10);
      const completedTasks = Math.floor(Math.random() * 50);
      const errors = Math.floor(Math.random() * 5);
      console.log({ activeTasks, completedTasks, errors });
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const height = Math.max(entry.contentRect.height - 200, 400); // Adjust 200 as needed
        setContainerHeight(height);
      }
    });
  
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
  
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);
  
  return (
    <div ref={containerRef} className="mt-8 p-4 border rounded flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Bot Monitor</h2>
      
      <Tabs defaultValue="active" className="mb-8">
        <TabsList>
          <TabsTrigger value="active">Active Bots</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
        <ScrollArea className="rounded-md border p-4" style={{ height: `${containerHeight}px` }}>
            {bots.map((bot) => (
              <Card key={bot.name} className="mb-4">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {getDeviceIcon(bot.device, 20)}
                    {getBrowserIcon(bot.browser, 20)}
                    <span className="ml-2">{bot.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>OS: {bot.os}</p>
                  <p>Device: {bot.device}</p>
                  <p>Browser: {bot.browser}</p>
                  <p>URL: {url}</p>
                  <p>Location: {latitude.toFixed(6)}, {longitude.toFixed(6)}</p>
                  <span className="ml-2 px-2 py-1 bg-green-500 text-white rounded-full text-xs">Active</span>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="settings">
          <div className="mb-4">
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <div className="mb-4">
            <Label>Select Location</Label>
            <DynamicLocationPicker
              latitude={latitude}
              longitude={longitude}
              onLocationChange={(lat, lng) => {
                setLatitude(lat);
                setLongitude(lng);
              }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MonitorPage;
*/