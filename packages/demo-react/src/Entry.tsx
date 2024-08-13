import App from './App';
import ErrorBoundary from './ErrorBoundary';
import Monitor, { MonitorProvider } from '@zoomphant-utils/monitor-react';

const monitor = new Monitor({
  account: "ca1",
  agent: "mc132E1NJHXZFYC",
  token: "dunt0wtdr4e9",
  instanceId: "miQZ",
  resourceId: "mr132E1NJHUFRF7",
  domain: "https://demo.zervice.cn",
  plugins: {
    console: true
  }
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
