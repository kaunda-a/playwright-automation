"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { FaHome, FaServer, FaMobile, FaGlobe, FaLock } from 'react-icons/fa';
import { HashLoader } from 'react-spinners';

interface Proxy {
  id: string;
  type: 'residential' | 'ips' | 'datacenter' | 'mobileproxy';
  location: string;
  host: string;
  port: number;
  protocol: 'http' | 'https' | 'socks4' | 'socks5';
  username?: string;
  password?: string;
  enabled: boolean;
}

const ProxiesPage = () => {
  const { toast } = useToast();
  const [proxies, setProxies] = useState<Proxy[]>([]);
  const [newProxy, setNewProxy] = useState<Partial<Proxy>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const proxiesPerPage = 18;

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(600);

  useEffect(() => {
    fetchProxies();

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const height = Math.max(entry.contentRect.height - 200, 400);
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

  useEffect(() => {
    const pageCount = Math.ceil(proxies.length / proxiesPerPage);
    if (currentPage > pageCount) {
      setCurrentPage(pageCount || 1);
    }
  }, [proxies.length, proxiesPerPage]);

  const fetchProxies = async () => {
    try {
      const response = await fetch('/api/proxies');
      const data = await response.json();
      setProxies(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch proxies:', error);
      toast({
        title: "Error",
        description: "Failed to fetch proxies",
        variant: "destructive",
      });
      setProxies([]);
    }
  };

  const handleAddProxy = async () => {
    if (newProxy.host && newProxy.port && newProxy.protocol && newProxy.type) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/proxies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProxy),
        });
        if (response.ok) {
          fetchProxies();
          setNewProxy({});
          toast({
            title: "Success",
            description: "Proxy added successfully",
          });
        }
      } catch (error) {
        console.error('Failed to add proxy:', error);
        toast({
          title: "Error",
          description: "Failed to add proxy",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleRemoveProxy = async (id: string) => {
    try {
      const response = await fetch(`/api/proxies?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchProxies();
        toast({
          title: "Success",
          description: "Proxy removed successfully",
        });
      }
    } catch (error) {
      console.error('Failed to remove proxy:', error);
      toast({
        title: "Error",
        description: "Failed to remove proxy",
        variant: "destructive",
      });
    }
  };

  const handleToggleProxy = async (id: string, enabled: boolean) => {
    setProxies(prevProxies =>
      prevProxies.map(proxy =>
        proxy.id === id ? { ...proxy, enabled } : proxy
      )
    );

    try {
      const response = await fetch('/api/proxies', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, enabled }),
      });
      if (response.ok) {
        toast({
          title: "Success",
          description: `Proxy ${enabled ? 'enabled' : 'disabled'} successfully`,
        });
      } else {
        setProxies(prevProxies =>
          prevProxies.map(proxy =>
            proxy.id === id ? { ...proxy, enabled: !enabled } : proxy
          )
        );
        throw new Error('Failed to update proxy');
      }
    } catch (error) {
      console.error('Failed to toggle proxy:', error);
      toast({
        title: "Error",
        description: "Failed to toggle proxy",
        variant: "destructive",
      });
    }
  };

  const getProxyIcon = (type: string | undefined) => {
    if (!type) return null;
    switch (type.toLowerCase()) {
      case 'residential':
        return <FaHome />;
      case 'datacenter':
        return <FaServer />;
      case 'mobileproxy':
        return <FaMobile />;
      case 'ips':
        return <FaGlobe />;
      default:
        return <FaLock />;
    }
  };

  const indexOfLastProxy = currentPage * proxiesPerPage;
  const indexOfFirstProxy = (currentPage - 1) * proxiesPerPage;
  const currentProxies = proxies.slice(indexOfFirstProxy, indexOfLastProxy);

  const isFormValid = newProxy.host && newProxy.port && newProxy.protocol && newProxy.type;

  // hashloader spinner for loading state
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <HashLoader size={50} color="#000000" />
      </div>
    );
  }
  return (
    <div className="container mx-auto p-6" ref={containerRef}>
      <h1 className="text-3xl font-bold mb-6">Proxy Settings</h1>
      
      <Tabs defaultValue="saved" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="saved">Saved Proxies</TabsTrigger>
          <TabsTrigger value="add">Add New Proxy</TabsTrigger>
        </TabsList>
        <TabsContent value="saved">
          <h2 className="text-lg font-bold mb-4">Configured Proxies</h2>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto`} style={{ maxHeight: `${containerHeight}px` }}>
            {currentProxies.map(proxy => (
              <Card key={proxy.id}>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold">
                      {getProxyIcon(proxy.type)}
                      <span className="ml-2">{proxy.location} - {proxy.type}</span>
                    </span>
                    <span>{`${proxy.protocol}://${proxy.host}:${proxy.port}`}</span>
                    {proxy.username && <span>Username: {proxy.username}</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={proxy.enabled}
                      onCheckedChange={() => handleToggleProxy(proxy.id, !proxy.enabled)}
                    />
                    <Button variant="destructive" onClick={() => handleRemoveProxy(proxy.id)}>Remove</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(proxies.length / proxiesPerPage) }, (_, i) => (
              <Button key={i} onClick={() => setCurrentPage(i + 1)} variant={currentPage === i + 1 ? 'outline' : 'default'}>
                {i + 1}
              </Button>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="add">
          <Card className="mb-6">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <label>
                  <Input
                    type="radio"
                    name="proxyType"
                    value="residential"
                    checked={newProxy.type === 'residential'}
                    onChange={() => setNewProxy({ ...newProxy, type: 'residential' })}
                  /> Residential
                </label>
                <label>
                  <Input
                    type="radio"
                    name="proxyType"
                    value="ips"
                    checked={newProxy.type === 'ips'}
                    onChange={() => setNewProxy({ ...newProxy, type: 'ips' })}
                  /> IPs
                </label>
                <label>
                  <Input
                    type="radio"
                    name="proxyType"
                    value="datacenter"
                    checked={newProxy.type === 'datacenter'}
                    onChange={() => setNewProxy({ ...newProxy, type: 'datacenter' })}
                  /> Datacenter
                </label>
                <label>
                  <Input
                    type="radio"
                    name="proxyType"
                    value="mobileproxy"
                    checked={newProxy.type === 'mobileproxy'}
                    onChange={() => setNewProxy({ ...newProxy, type: 'mobileproxy' })}
                  /> Mobile Proxy
                </label>
              </div>
              <Input
                title="Enter the geographical location of the proxy"
                placeholder="Location (e.g., US, UK, JP)"
                value={newProxy.location || ''}
                onChange={(e) => setNewProxy({ ...newProxy, location: e.target.value })}
              />
              <Input
                title="Enter the IP address or hostname of the proxy"
                placeholder="Host (e.g., 192.168.1.1)"
                value={newProxy.host || ''}
                onChange={(e) => setNewProxy({ ...newProxy, host: e.target.value })}
              />
              <Input
                title="Enter the port number for the proxy"
                placeholder="Port (e.g., 8080)"
                value={newProxy.port?.toString() || ''}
                onChange={(e) => setNewProxy({ ...newProxy, port: parseInt(e.target.value) || undefined })}
              />
              <Select
                value={(newProxy.protocol as Proxy['protocol']) || 'http'}
                onValueChange={(value) => setNewProxy({ ...newProxy, protocol: value as Proxy['protocol'] })}
              >
                <SelectTrigger>
                  {newProxy.protocol || "Select protocol"}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="http">HTTP</SelectItem>
                  <SelectItem value="https">HTTPS</SelectItem>
                  <SelectItem value="socks4">SOCKS4</SelectItem>
                  <SelectItem value="socks5">SOCKS5</SelectItem>
                </SelectContent>
              </Select>
              <Input
                title="Enter the username for authenticated proxies (optional)"
                placeholder="Username (optional)"
                value={newProxy.username || ''}
                onChange={(e) => setNewProxy({ ...newProxy, username: e.target.value })}
              />
              <Input
                title="Enter the password for authenticated proxies (optional)"
                placeholder="Password (optional)"
                value={newProxy.password || ''}
                onChange={(e) => setNewProxy({ ...newProxy, password: e.target.value })}
              />
              <Button
                onClick={handleAddProxy}
                disabled={isLoading || !isFormValid}
              >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                  {isLoading ? <HashLoader size={50} color="#000000" /> : 'Add Proxy'}
                </div>
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  );
};

export default ProxiesPage;