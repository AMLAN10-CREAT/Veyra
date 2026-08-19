import React, { useState, useEffect } from 'react';
import { FrameState } from './types';
import { Navigation } from './components/Navigation';
import { FrameMarketplace } from './components/FrameMarketplace';
import { FrameSeller } from './components/FrameSeller';
import { FrameBidder } from './components/FrameBidder';
import { FramePolicies } from './components/FramePolicies';
import { AdminOverlay } from './components/AdminOverlay';

export default function App() {
  const [activeFrame, setActiveFrame] = useState<FrameState>('marketplace');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [selectedAuctionId, setSelectedAuctionId] = useState<string | null>(null);

  // Scroll to top on frame change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeFrame, selectedAuctionId]);

  const handleNavigateToAuction = (id: string) => {
    setSelectedAuctionId(id);
    setActiveFrame('bidder');
  };

  const handleBackToMarketplace = () => {
    setSelectedAuctionId(null);
    setActiveFrame('marketplace');
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-text-primary">
      <Navigation 
        activeFrame={activeFrame} 
        setActiveFrame={(frame) => {
          if (frame !== 'bidder') setSelectedAuctionId(null);
          setActiveFrame(frame);
        }} 
        isAdminMode={isAdminMode}
        setAdminMode={setIsAdminMode}
      />

      <main className="flex-1 flex w-full">
        {activeFrame === 'marketplace' && (
          <FrameMarketplace 
            onNavigateToAuction={handleNavigateToAuction} 
            onNavigateToSell={() => setActiveFrame('seller')} 
          />
        )}
        
        {activeFrame === 'seller' && (
          <FrameSeller />
        )}
        
        {activeFrame === 'bidder' && (
          <FrameBidder 
            auctionId={selectedAuctionId} 
            onBack={handleBackToMarketplace} 
          />
        )}
        
        {activeFrame === 'policies' && (
          <FramePolicies />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface py-8">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-sm bg-text-secondary flex items-center justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-surface" />
            </div>
            <span className="font-display text-sm font-semibold tracking-tight text-text-secondary">
              NEXUS AUCTION HOUSE
            </span>
          </div>
          <p className="text-xs text-text-tertiary">
            © {new Date().getFullYear()} Nexus Platforms. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-text-secondary">
            <button onClick={() => setActiveFrame('policies')} className="hover:text-text-primary">Terms</button>
            <button onClick={() => setActiveFrame('policies')} className="hover:text-text-primary">Privacy</button>
            <button className="hover:text-text-primary">Contact</button>
          </div>
        </div>
      </footer>

      {isAdminMode && (
        <AdminOverlay onClose={() => setIsAdminMode(false)} />
      )}
    </div>
  );
}
