"use client";

import React, { createContext, useContext, useState } from 'react';
import { Action } from '@/types/Action';

interface TaskContextType {
  currentTask: any;
  setCurrentTask: React.Dispatch<React.SetStateAction<any>>;
  actions: Action[];
  setActions: React.Dispatch<React.SetStateAction<Action[]>>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTask, setCurrentTask] = useState<any>(null);
  const [actions, setActions] = useState<Action[]>([]);

  return (
    <TaskContext.Provider value={{ currentTask, setCurrentTask, actions, setActions }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
