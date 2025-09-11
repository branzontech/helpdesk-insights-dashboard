import React, { createContext, useContext, ReactNode } from 'react';
import { useTour, TourConfig } from '@/hooks/useTour';

interface TourContextType {
  startTour: (config: TourConfig) => void;
  resetAllTours: () => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export const useTourContext = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTourContext must be used within a TourProvider');
  }
  return context;
};

interface TourProviderProps {
  children: ReactNode;
}

export const TourProvider: React.FC<TourProviderProps> = ({ children }) => {
  const startTour = (config: TourConfig) => {
    // This will be handled by individual components
  };

  const resetAllTours = () => {
    // Clear all tour completion flags
    const keys = Object.keys(localStorage).filter(key => key.startsWith('tour_completed_'));
    keys.forEach(key => localStorage.removeItem(key));
    window.location.reload();
  };

  return (
    <TourContext.Provider value={{ startTour, resetAllTours }}>
      {children}
    </TourContext.Provider>
  );
};