import { useState, useCallback } from 'react';
import { Action } from '@/types/Action';

export const useActionManagement = () => {
  const [actions, setActions] = useState<Action[]>([]);
  const [currentAction, setCurrentAction] = useState<Action>({ type: "click", selector: "" });

  const addAction = useCallback((action: Action) => {
    setActions(prevActions => [...prevActions, action]);
  }, []);

  const removeAction = useCallback((index: number) => {
    setActions(prevActions => prevActions.filter((_, i) => i !== index));
  }, []);

  const updateAction = useCallback((index: number, updatedAction: Action) => {
    setActions(prevActions => {
      const newActions = [...prevActions];
      newActions[index] = updatedAction;
      return newActions;
    });
  }, []);

  const resetActions = () => {
    setActions([]);
  };

  return { 
    actions, 
    currentAction, 
    setCurrentAction, 
    addAction, 
    removeAction, 
    updateAction, 
    resetActions
  };
};
