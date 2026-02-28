import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card border-0 shadow-lg p-5 text-center">
                <div className="mb-4">
                  <i className="bi bi-exclamation-triangle display-1 text-danger"></i>
                </div>
                <h2 className="fw-bold mb-3">Something went wrong</h2>
                <p className="text-muted mb-4">
                  We apologize for the inconvenience. Our team has been notified and we're working to fix the issue.
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <button 
                    className="btn btn-success px-4 rounded-pill fw-bold"
                    onClick={() => window.location.reload()}
                  >
                    <i className="bi bi-arrow-clockwise me-2"></i>Refresh Page
                  </button>
                  <a href="/" className="btn btn-outline-secondary px-4 rounded-pill fw-bold">
                    Go to Home
                  </a>
                </div>
                {process.env.NODE_ENV === 'development' && (
                  <div className="mt-5 text-start">
                    <button 
                      className="btn btn-sm btn-light w-100 text-muted" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#errorDetails"
                    >
                      Show Error Details
                    </button>
                    <div className="collapse mt-2" id="errorDetails">
                      <div className="bg-light p-3 rounded small text-danger font-monospace">
                        {this.state.error?.toString()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
