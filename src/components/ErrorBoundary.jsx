import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: '#5c4033', background: '#fff0f5', minHeight: '100vh', fontFamily: 'sans-serif' }}>
          <h1>哎呀，出错了！(Something went wrong)</h1>
          <p>请截图发给开发者：</p>
          <div style={{ background: '#fff', padding: '15px', borderRadius: '10px', overflow: 'auto', border: '1px solid #ffb7b2' }}>
            <h3 style={{ color: 'red', margin: '0 0 10px 0' }}>{this.state.error && this.state.error.toString()}</h3>
            <details style={{ whiteSpace: 'pre-wrap', fontSize: '12px', color: '#666' }}>
              <summary>查看详细错误堆栈 (Click for details)</summary>
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </details>
          </div>
          <button 
            onClick={() => window.location.reload()}
            style={{ 
              marginTop: '20px', 
              padding: '10px 20px', 
              background: '#ffb7b2', 
              border: 'none', 
              borderRadius: '20px', 
              color: 'white',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            刷新页面重试
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
