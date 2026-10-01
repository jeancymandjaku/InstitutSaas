import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let borderClass = 'border-[#70856F]/40';
        let bgClass = 'bg-[#16382D] text-[#FCFBF8]';
        let iconColor = 'text-[#CDBB96]';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          borderClass = 'border-rose-400';
          bgClass = 'bg-[#24312B] text-rose-50';
          iconColor = 'text-rose-400';
        } else if (toast.type === 'info') {
          Icon = Info;
          borderClass = 'border-[#70856F]/30';
          bgClass = 'bg-[#24312B] text-[#FCFBF8]';
          iconColor = 'text-[#70856F]';
        }

        return (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-lg shadow-lg border ${borderClass} ${bgClass} transition-all duration-200 animate-in fade-in slide-in-from-bottom-2`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Icon className={`w-4 h-4 shrink-0 ${iconColor}`} />
              <p className="text-xs font-medium tracking-wide truncate">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#DED8CD] hover:text-white p-0.5 transition-colors shrink-0"
              aria-label="Fermer la notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
