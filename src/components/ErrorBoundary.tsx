import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
      error,
      errorInfo: null
    }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    })
    
    // You can also log the error to an error reporting service here
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <div className="max-w-xl w-full mx-auto p-6">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <div className="flex items-center justify-center">
                <svg
                  className="h-12 w-12 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              
              <h2 className="mt-4 text-xl font-semibold text-center text-gray-800 dark:text-white">
                Something went wrong
              </h2>
              
              <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
                An error occurred while rendering this component.
              </p>
              
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Error details:</p>
                  <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-900 rounded-md overflow-auto text-sm text-gray-800 dark:text-gray-200">
                    {this.state.error?.toString()}
                    {'\n'}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </div>
              )}
              
              <div className="mt-6 text-center">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Reload Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary 