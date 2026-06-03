import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: "" };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  handleReload = () => {
    this.setState({ hasError: false, message: "" });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 gap-3 p-6 text-center">
          <span className="text-5xl">⚠️</span>
          <h1 className="text-xl font-bold text-gray-900">
            Something went wrong
          </h1>
          {this.state.message && (
            <p className="text-xs text-gray-500 font-mono bg-gray-100 px-4 py-2 rounded-md max-w-md wrap-break-word">
              {this.state.message}
            </p>
          )}
          <button
            onClick={this.handleReload}
            className="mt-2 px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
