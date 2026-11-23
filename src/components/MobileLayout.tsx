import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Bus, Home, Map, Settings } from 'lucide-react';

interface MobileLayoutProps {
  title: string;
  headerVariant?: 'bus' | 'back';
  backTo?: string;
  rightAction?: React.ReactNode;
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Map', path: '/map', icon: Map },
  { label: 'Alerts', path: '/alerts', icon: Bell },
  { label: 'Settings', path: '/settings', icon: Settings },
] as const;

export function MobileLayout({
  title,
  headerVariant = 'back',
  backTo,
  rightAction,
  children,
}: MobileLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const isNavActive = (path: string) => {
    if (path === '/') {
      return (
        location.pathname === '/' ||
        location.pathname === '/route-status' ||
        location.pathname === '/pickup-point' ||
        location.pathname === '/waiting-area' ||
        location.pathname === '/last-mile'
      );
    }
    if (path === '/alerts') {
      return (
        location.pathname === '/alerts' ||
        location.pathname === '/help-feedback'
      );
    }
    return location.pathname === path;
  };

  return (
    <div className="min-h-[100dvh] w-full sm:flex sm:items-center sm:justify-center sm:bg-[#E8EEF5] sm:p-4">
      <div className="flex min-h-[100dvh] w-full flex-col bg-white sm:h-[812px] sm:max-h-[calc(100dvh-32px)] sm:min-h-0 sm:w-[390px] sm:overflow-hidden sm:rounded-[32px] sm:border sm:border-slate-300 sm:shadow-xl">
        {/* Top Header */}
        <header className="flex h-14 shrink-0 items-center justify-between bg-[#12376B] px-3 text-white">
          <div className="flex min-w-0 items-center gap-2">
            {headerVariant === 'bus' ? (
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white"
                aria-hidden="true"
              >
                <Bus className="h-6 w-6" strokeWidth={2.2} />
              </div>
            ) : (
              <button
                type="button"
                onClick={handleBack}
                aria-label="Go back"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <ArrowLeft className="h-5 w-5" strokeWidth={2.2} />
              </button>
            )}
            <h1 className="truncate text-[17px] font-semibold tracking-tight">
              {title}
            </h1>
          </div>
          {rightAction ? <div className="shrink-0">{rightAction}</div> : null}
        </header>

        {/* Scrollable Screen Content */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] px-4 py-4">
          {children}
        </main>

        {/* Fixed Bottom Navigation Bar */}
        <nav
          aria-label="Primary navigation"
          className="grid h-16 shrink-0 grid-cols-4 border-t border-slate-200 bg-white"
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isNavActive(item.path);
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => navigate(item.path)}
                aria-current={active ? 'page' : undefined}
                className={`relative flex min-h-[44px] flex-col items-center justify-center gap-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1D4ED8] ${
                  active
                    ? 'font-semibold text-[#1D4ED8]'
                    : 'font-medium text-slate-500 hover:text-slate-800'
                }`}
              >
                {active ? (
                  <span
                    className="absolute top-0 h-0.5 w-10 rounded-full bg-[#1D4ED8]"
                    aria-hidden="true"
                  />
                ) : null}
                <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 2} />
                <span className="text-[11px] leading-none">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
