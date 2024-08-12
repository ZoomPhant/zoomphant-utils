import App from './App';
import ErrorBoundary from './ErrorBoundary';
import Monitor, { MonitorProvider } from '@zoomphant-utils/monitor-react';

const monitor = new Monitor({
  account: "ca1",
  agent: "mc1326RGP9NPLF2",
  token: "dukx8qdos45c",
  instanceId: "miQT",
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
