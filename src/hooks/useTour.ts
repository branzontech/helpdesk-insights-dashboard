import { useState, useEffect, useCallback } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';

export interface TourConfig {
  key: string;
  steps: Step[];
}

export const useTour = (tourConfig: TourConfig) => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const tourKey = `tour_completed_${tourConfig.key}`;

  useEffect(() => {
    const tourCompleted = localStorage.getItem(tourKey);
    if (!tourCompleted) {
      const timer = setTimeout(() => {
        setRun(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [tourKey]);

  const handleJoyrideCallback = useCallback((data: CallBackProps) => {
    const { status, index, type } = data;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
      setStepIndex(0);
      localStorage.setItem(tourKey, 'true');
    } else if (type === 'step:after') {
      setStepIndex(index + 1);
    }
  }, [tourKey]);

  const startTour = useCallback(() => {
    setRun(true);
    setStepIndex(0);
  }, []);

  const resetTour = useCallback(() => {
    localStorage.removeItem(tourKey);
    setRun(false);
    setStepIndex(0);
  }, [tourKey]);

  return {
    run,
    stepIndex,
    handleJoyrideCallback,
    startTour,
    resetTour,
    tourProps: {
      steps: tourConfig.steps,
      run,
      stepIndex,
      callback: handleJoyrideCallback,
      continuous: true,
      showProgress: true,
      showSkipButton: true,
      disableOverlayClose: true,
      hideCloseButton: true,
      styles: {
        options: {
          primaryColor: '#0066CC',
          backgroundColor: 'white',
          textColor: '#333',
          overlayColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 10000,
        },
        tooltip: {
          backgroundColor: 'white',
          color: '#333',
          border: '1px solid #ddd',
          borderRadius: '8px',
          fontSize: '14px',
        },
        buttonNext: {
          backgroundColor: '#0066CC',
          color: 'white',
          borderRadius: '6px',
          border: 'none',
          fontSize: '14px',
          padding: '8px 16px',
        },
        buttonBack: {
          color: '#666',
          border: '1px solid #ddd',
          borderRadius: '6px',
          backgroundColor: 'transparent',
          fontSize: '14px',
          padding: '8px 16px',
        },
        buttonSkip: {
          color: '#666',
          fontSize: '14px',
        },
      },
      locale: {
        back: 'Atrás',
        close: 'Cerrar',
        last: 'Finalizar',
        next: 'Siguiente',
        skip: 'Omitir tour',
      },
    },
  };
};