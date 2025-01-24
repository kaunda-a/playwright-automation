"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";

interface Bot {
  name: string;
  status: string;
  lastActive: string;
}

const TerminatePage: React.FC = () => {
  const [activeBots, setActiveBots] = useState<Bot[]>([]);

  useEffect(() => {
    fetchActiveBots();
  }, []);

  const fetchActiveBots = async () => {
    try {
      const response = await fetch('/api/terminate');
      const data = await response.json();
      setActiveBots(data.activeBots);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch active bots",
        variant: "destructive",
      });
    }
  };

  const terminateBot = async (botName: string) => {
    try {
      const response = await fetch('/api/terminate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ botName }),
      });
      if (response.ok) {
        toast({
          title: "Success",
          description: `Bot ${botName} terminated successfully`,
        });
        fetchActiveBots();
      } else {
        throw new Error('Failed to terminate bot');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to terminate bot ${botName}`,
        variant: "destructive",
      });
    }
  };

  const terminateAllBots = async () => {
    try {
      await Promise.all(activeBots.map(bot => terminateBot(bot.name)));
      toast({
        title: "Success",
        description: "All bots terminated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to terminate all bots",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Bot Termination</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={terminateAllBots} variant="destructive" className="mb-4">
            Terminate All Bots
          </Button>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bot Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeBots.map((bot) => (
                <TableRow key={bot.name}>
                  <TableCell>{bot.name}</TableCell>
                  <TableCell>{bot.status}</TableCell>
                  <TableCell>{new Date(bot.lastActive).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button onClick={() => terminateBot(bot.name)} variant="destructive" size="sm">
                      Terminate
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TerminatePage;
