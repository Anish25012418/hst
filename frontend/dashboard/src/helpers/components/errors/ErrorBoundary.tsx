// Import - default
import { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackComponent: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Main
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // static getDerivedStateFromError(error: Error): ErrorBoundaryState {
  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(): void {
    // // Use in dev mode
    // componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallbackComponent;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
