import App from './App';
import ErrorBoundary from './ErrorBoundary';
import Monitor, { MonitorProvider } from '@zoomphant-utils/monitor-react';

const monitor = new Monitor({
  account: "ca1",
  agent: "mc13DVAWTAR92JN",
  token: "dz1lejdnzxmp",
  instanceId: "miR2",
  resourceId: "mr13DVAWTAMRD0J",
  domain: "https://demo.zervice.cn",
  debug: true,
  plugins: {
    console: true,
    fetch: true,
    xhr: true
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
