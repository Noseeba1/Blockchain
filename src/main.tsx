import { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { clearLocalGameState } from './utils/storage';

interface ErrorBoundaryState {
  hasError: boolean;
}

class AppErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // Handled gracefully by fallback UI
  }

  handleReset = () => {
    clearLocalGameState();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          dir="rtl"
          className="flex min-h-screen flex-col items-center justify-center bg-[#060A16] p-6 text-center text-slate-100"
        >
          <div className="max-w-md rounded-2xl border border-slate-800 bg-[#0D1428] p-6">
            <h1 className="font-display text-xl font-bold text-white">
              BLOCKCHAIN ARENA
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              حدث خلل غير متوقع أثناء تحميل الصفحة. اضغط على الزر أدناه لإعادة تشغيل المسابقة.
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-400"
            >
              إعادة تحميل المسابقة
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <AppErrorBoundary>
    <App />
  </AppErrorBoundary>
);
