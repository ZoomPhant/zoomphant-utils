import { Component, ErrorInfo, ReactNode } from "react";
import { getMonitor } from '@zoomphant-utils/monitor-react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: string;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: ''
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    console.log('catch error:', _);
    return { hasError: true, error: _.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const monitor = getMonitor();
    if (monitor) {
      getMonitor().logs.captureAndSync([
        "exception",
        "info",
        [error.stack, '\nStack:', errorInfo.componentStack].join('\n')
      ])
    }
  }

  public render() {
    if (this.state.hasError) {
      return [
        this.props.fallback ? this.props.fallback : <h1>Sorry.. there was an error</h1>,
        <p>{this.state.error}</p>
      ]
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
