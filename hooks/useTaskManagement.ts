import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Action } from '@/types/Action';

export const useTaskManagement = () => {
  const [taskToEdit, setTaskToEdit] = useState<any | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<any | null>(null);
  const [savedTasks, setSavedTasks] = useState<any[]>([]);
  const { toast } = useToast();

  const fetchTasks = async () => {
    if (typeof window === 'undefined') return;
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setSavedTasks(data.tasks);
    } catch (error) {
      toast({
        title: "Error",
        description: (error instanceof Error ? error.message : "Failed to fetch tasks"),
        variant: "destructive",
      });
    }
  };

  const refreshTasks = fetchTasks;

  const addTask = async (task: any, duration: number = 0, priority: number = 1, scheduledTime?: Date) => {
    try {
      const bodyString = `${task.type}\n${JSON.stringify(task.parameters)}\n${task.url}\n${task.googleSearchQuery || ''}\n${task.googleSearchTarget || ''}\n${JSON.stringify(task.actions)}`;
      
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: bodyString,
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      await refreshTasks();
    } catch (error) {
      toast({
        title: "Error",
        description: (error instanceof Error ? error.message : "Failed to add task"),
        variant: "destructive",
      });
    }
  };

  const updateTask = async (taskId: string, updatedTask: any) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      await refreshTasks();
    } catch (error) {
      toast({
        title: "Error",
        description: (error instanceof Error ? error.message : "Failed to update task"),
        variant: "destructive",
      });
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      await refreshTasks();
    } catch (error) {
      toast({
        title: "Error",
        description: (error instanceof Error ? error.message : "Failed to delete task"),
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    savedTasks,
    fetchTasks,
    refreshTasks,
    addTask,
    updateTask,
    deleteTask,
    taskToEdit,
    setTaskToEdit,
    taskToDelete,
    setTaskToDelete
  };
};
