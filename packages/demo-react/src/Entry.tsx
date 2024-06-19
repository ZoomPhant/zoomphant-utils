import App from './App';
import ErrorBoundary from './ErrorBoundary';
import Monitor, { MonitorProvider } from '@zoomphant-utils/monitor-react';

const monitor = new Monitor({
  account: "ca1",
  agent: "mc12N0C92NAWSAL",
  token: "domvczqwv18h",
  instanceId: "mi62",
  domain: "http://gate.zervice.cn:1080",
})

export default () => {
  return (
    <MonitorProvider monitor={monitor}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </MonitorProvider>
  )
}
