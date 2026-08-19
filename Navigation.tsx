import React from 'react';
import { FrameState } from '../types';
import { Search, Bell, User, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavigationProps {
  activeFrame: FrameState;
  setActiveFrame: (frame: FrameState) => void;
  isAdminMode: boolean;
  setAdminMode: (mode: boolean) => void;
}

export function Navigation({ activeFrame, setActiveFrame, isAdminMode, setAdminMode }: NavigationProps) {
  const navItems = [
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'seller', label: 'Sell' },
    { id: 'bidder', label: 'Bid' },
    { id: 'policies', label: 'How It Works' },
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface h-20">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-8">
        <div className="flex items-center gap-12">
          <div 
            className="flex cursor-pointer items-center gap-2" 
            onClick={() => setActiveFrame('marketplace')}
          >
            <div className="h-3 w-3 rounded-full bg-black flex items-center justify-center">
            </div>
            <span className="text-xl font-bold tracking-tighter text-text-primary">
              NEXUS
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveFrame(item.id)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-text-primary",
                  activeFrame === item.id 
                    ? "text-text-primary" 
                    : "text-text-secondary"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-4 mr-4">
            <button className="text-text-secondary hover:text-text-primary">
              <Search className="h-4 w-4" />
            </button>
            <div className="h-4 w-[1px] bg-border" />
            <button className="flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-text-primary">
              USD <ChevronDown className="h-3 w-3" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setAdminMode(!isAdminMode)}
              className={cn(
                "hidden md:block text-xs font-semibold px-2 py-1 rounded-sm border uppercase tracking-wider transition-colors",
                isAdminMode 
                  ? "bg-accent text-white border-accent" 
                  : "border-border text-text-secondary hover:text-text-primary"
              )}
            >
              Host
            </button>
            <button className="text-text-secondary hover:text-text-primary relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-accent" />
            </button>
            <button className="text-text-secondary hover:text-text-primary">
              <User className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setActiveFrame('seller')}
              className="ml-2 hidden sm:inline-flex h-9 items-center justify-center rounded-lg bg-black px-5 py-2 text-xs font-medium text-white transition-opacity hover:opacity-80"
            >
              Sell a Project
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
