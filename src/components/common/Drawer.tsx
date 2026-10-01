import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  width?: 'md' | 'lg' | 'xl';
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  width = 'md',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widthClasses = {
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  }[width];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-[#24312B]/40 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
        <div
          role="dialog"
          aria-modal="true"
          className={`w-screen ${widthClasses} bg-[#FCFBF8] border-l border-[#DED8CD] shadow-2xl flex flex-col animate-in slide-in-from-right duration-200`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#DED8CD]/60 bg-[#F6F2EA]/40">
            <div>
              <h3 className="text-base font-semibold text-[#16382D] tracking-tight">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs text-[#68736D] mt-0.5">{subtitle}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-[#68736D] hover:text-[#16382D] hover:bg-[#E8EEE8] transition-colors"
              aria-label="Fermer le panneau"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
