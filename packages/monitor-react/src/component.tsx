import React, { useEffect } from 'react';
import Monitor from '@zoomphant-utils/monitor';

let monitor: Monitor;

const MonitorContext = React.createContext<Monitor | null>(null);

const MonitorProvider: React.FC<React.PropsWithChildren<{ monitor: Monitor }>> = ({ monitor: _, children }) => {
  useEffect(() => {
    monitor = _;
  }, [])
  return (
    <MonitorContext.Provider value={_}>
      {children}
    </MonitorContext.Provider>
  );
};

const useMonitor = () => {
  const monitor = React.useContext(MonitorContext);
  if (!monitor) {
    throw new Error('useMonitor must be used within a MonitorProvider');
  }
  return monitor;
};

const getMonitor = () => monitor;

export {
  MonitorProvider,
  useMonitor,
  getMonitor,
}
