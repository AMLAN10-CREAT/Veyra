import React, { useState } from 'react';
import { X, Shield, Activity, DollarSign, Settings, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { MOCK_AUCTIONS, formatCurrency } from '../data';

interface AdminOverlayProps {
  onClose: () => void;
}

export function AdminOverlay({ onClose }: AdminOverlayProps) {
  const [activeTab, setActiveTab] = useState<'auctions' | 'financials' | 'fees'>('auctions');

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/20 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-surface h-full shadow-2xl flex flex-col border-l border-border animate-in slide-in-from-right-8 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-accent" />
            <span className="font-display text-lg font-semibold tracking-tight">Host Control Panel</span>
          </div>
          <button 
            onClick={onClose}
            className="rounded-full p-2 hover:bg-surface-hover text-text-secondary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex border-b border-border px-6 gap-6">
          {[
            { id: 'auctions', label: 'Active Auctions', icon: Activity },
            { id: 'financials', label: 'Transactions', icon: DollarSign },
            { id: 'fees', label: 'Fee Configuration', icon: Settings },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 py-4 text-sm font-medium transition-colors border-b-2",
                activeTab === tab.id 
                  ? "border-accent text-text-primary" 
                  : "border-transparent text-text-secondary hover:text-text-primary"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-canvas">
          
          {activeTab === 'auctions' && (
            <div className="space-y-6">
              {MOCK_AUCTIONS.map(auction => (
                <div key={auction.id} className="rounded-md border border-border bg-surface p-5 shadow-sm">
                  <div className="flex items-start justify-between mb-4 border-b border-border pb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary">Auction #{auction.id.toUpperCase()}</span>
                        <span className={cn(
                          "px-1.5 py-0.5 text-[9px] uppercase tracking-wider rounded-sm font-semibold",
                          auction.status === 'live' ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        )}>
                          {auction.status.replace('_', ' ')}
                        </span>
                      </div>
                      <h3 className="font-display text-lg">{auction.project.title}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary">Current Bid</p>
                      <p className="font-display text-xl">{formatCurrency(auction.currentBid, auction.baseCurrency)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    <div className="bg-canvas rounded-sm p-3 border border-border">
                      <p className="text-xs text-text-secondary mb-1">Time Remaining</p>
                      <p className="font-medium text-sm">03:42:15</p>
                    </div>
                    <div className="bg-canvas rounded-sm p-3 border border-border">
                      <p className="text-xs text-text-secondary mb-1">Total Bids</p>
                      <p className="font-medium text-sm">{auction.bids}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button className="flex-1 rounded-sm border border-border bg-transparent py-2 text-xs font-semibold text-text-primary hover:bg-surface-hover">
                      Pause
                    </button>
                    <button className="flex-1 rounded-sm border border-border bg-transparent py-2 text-xs font-semibold text-text-primary hover:bg-surface-hover">
                      Extend
                    </button>
                    <button className="flex-1 rounded-sm bg-accent py-2 text-xs font-semibold text-white hover:bg-accent-hover">
                      End Auction
                    </button>
                    <button className="flex-1 rounded-sm bg-red-50 border border-red-100 text-red-600 py-2 text-xs font-semibold hover:bg-red-100">
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'financials' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-md border border-border bg-surface p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">Total Volume (30d)</p>
                  <p className="font-display text-2xl">$1,245,000</p>
                </div>
                <div className="rounded-md border border-border bg-surface p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">Platform Revenue</p>
                  <p className="font-display text-2xl text-green-700">$62,250</p>
                </div>
              </div>

              <div className="rounded-md border border-border bg-surface">
                <div className="px-4 py-3 border-b border-border bg-canvas/50 flex justify-between items-center">
                   <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Recent Transactions</span>
                </div>
                <div className="divide-y divide-border">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="p-4 flex items-center justify-between text-sm hover:bg-surface-hover transition-colors">
                      <div>
                        <p className="font-medium">AI App #{1040 + i}</p>
                        <p className="text-xs text-text-secondary mt-0.5">Tx ID: 0x8f...{Math.floor(Math.random()*1000)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$12,500</p>
                        <p className="text-xs text-green-600 mt-0.5">Fee: $625</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fees' && (
            <div className="space-y-6">
              <div className="rounded-md border border-border bg-surface p-6">
                <h3 className="font-display text-lg mb-4">Platform Fee Configuration</h3>
                
                <div className="space-y-4">
                  <div>
                     <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-text-secondary">Default Platform Fee (%)</label>
                     <input type="number" defaultValue={5} className="w-full rounded-sm border border-border bg-transparent px-4 py-2 outline-none focus:border-text-primary" />
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-medium mb-3">Category Overrides</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">AI Agents</span>
                        <input type="number" defaultValue={4} className="w-20 rounded-sm border border-border bg-transparent px-2 py-1 text-center outline-none focus:border-text-primary" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">SaaS Platforms</span>
                        <input type="number" defaultValue={5} className="w-20 rounded-sm border border-border bg-transparent px-2 py-1 text-center outline-none focus:border-text-primary" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Digital Assets</span>
                        <input type="number" defaultValue={6} className="w-20 rounded-sm border border-border bg-transparent px-2 py-1 text-center outline-none focus:border-text-primary" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-full rounded-sm bg-accent py-2 text-sm font-semibold text-white hover:bg-accent-hover">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
