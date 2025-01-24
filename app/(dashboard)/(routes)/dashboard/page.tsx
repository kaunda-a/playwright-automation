"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const DashboardPage: React.FC = () => {
  const [bots, setBots] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedBot, setSelectedBot] = useState<string>('');
  const [selectedTask, setSelectedTask] = useState<string>('');
  const { toast } = useToast();
 
  useEffect(() => {
    fetchBotsAndTasks();
  }, []);

  const fetchBotsAndTasks = async () => {
    try {
      const botsResponse = await fetch('/api/bots');
      const tasksResponse = await fetch('/api/tasks');
      const botsData = await botsResponse.json();
      const tasksData = await tasksResponse.json();
      setBots(Array.isArray(botsData) ? botsData : []);
      setTasks(Array.isArray(tasksData.tasks) ? tasksData.tasks : []);
    } catch (error) {
      console.error('Error fetching bots and tasks:', error);
      setBots([]);
      setTasks([]);
    }
  };
  
  const handleStartBot = async () => {
    if (!selectedBot || !selectedTask) {
      toast({
        title: "Error",
        description: "Please select both a bot and a task",
        variant: "destructive",
      });
      return;
    }
  
    try {
      const response = await fetch('/api/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          botName: selectedBot,
          taskId: selectedTask,
          taskType: tasks.find(task => task._id === selectedTask)?.type,
          taskParameters: tasks.find(task => task._id === selectedTask)?.parameters,
          actions: tasks.find(task => task._id === selectedTask)?.actions,
          botDuration: 0 // Set this to a value if you want to specify a duration
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to start bot');
      }
  
      const result = await response.json();
      toast({
        title: "Success",
        description: `Bot started successfully. Task result: ${JSON.stringify(result.taskResult)}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start bot",
        variant: "destructive",
      });
    }
  };
  

  useEffect(() => {
    if (selectedTask) {
      const task = tasks.find(t => t._id === selectedTask);
      console.log('Selected task:', task);
    }
  }, [selectedTask, tasks]);
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Start Bot</h1>
      <div className="space-y-4">
        <Select value={selectedBot} onValueChange={setSelectedBot}>
          <SelectTrigger>
            <SelectValue placeholder="Select Bot" />
          </SelectTrigger>
          <SelectContent>
            {bots.map((bot) => (
              <SelectItem key={bot._id} value={bot.name}>
                {bot.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedTask} onValueChange={setSelectedTask}>
  <SelectTrigger>
    <SelectValue placeholder="Select Task" />
  </SelectTrigger>
  <SelectContent>
    {tasks.length > 0 ? (
      tasks.map((task) => (
        <SelectItem key={task._id} value={task._id}>
          {`${task.type} - ${task.url || 'No URL'}`}
        </SelectItem>
      ))
    ) : (
      <SelectItem value="no-tasks">No tasks available</SelectItem>
    )}
  </SelectContent>
</Select>


        <Button onClick={handleStartBot}>Start Bot</Button>
      </div>
      <Toaster />
    </div>
  );
};

export default DashboardPage;
