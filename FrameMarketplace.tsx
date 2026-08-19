import React from 'react';
import { MOCK_AUCTIONS } from '../data';
import { AuctionCard } from './AuctionCard';

interface FrameMarketplaceProps {
  onNavigateToAuction: (auctionId: string) => void;
  onNavigateToSell: () => void;
}

export function FrameMarketplace({ onNavigateToAuction, onNavigateToSell }: FrameMarketplaceProps) {
  const activeAuctions = MOCK_AUCTIONS.filter(a => a.status === 'live' || a.status === 'ending_soon');
  const upcomingAuctions = MOCK_AUCTIONS.filter(a => a.status === 'upcoming');

  return (
    <div className="flex w-full flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[40vh] w-full flex-col items-start justify-center px-6 py-20">
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-text-primary leading-[1.1] mb-6">
            Where Digital Ideas <br/><span className="italic font-serif">Find Their Next Owner.</span>
          </h1>
          <p className="max-w-md text-sm text-text-secondary">
            The premier auction house for high-performance AI tools, autonomous agents, and established digital platforms.
          </p>
        </div>
      </section>

      {/* Discovery / Marketplace Grid */}
      <section id="marketplace-grid" className="mx-auto w-full max-w-7xl px-6 pb-16">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-medium text-text-primary">Live Auctions</h2>
          </div>
          
          <div className="flex w-full flex-wrap items-center gap-3 md:w-auto">
            <div className="flex h-9 items-center rounded-sm border border-border bg-surface px-3 text-sm">
              <span className="text-text-tertiary mr-2">Category:</span>
              <select className="bg-transparent outline-none text-text-primary cursor-pointer appearance-none pr-4">
                <option>All Projects</option>
                <option>AI Agents</option>
                <option>SaaS</option>
                <option>Web Apps</option>
              </select>
            </div>
            <div className="flex h-9 items-center rounded-sm border border-border bg-surface px-3 text-sm">
              <span className="text-text-tertiary mr-2">Sort:</span>
              <select className="bg-transparent outline-none text-text-primary cursor-pointer appearance-none pr-4">
                <option>Ending Soon</option>
                <option>Newest</option>
                <option>Highest Bid</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {activeAuctions.map(auction => (
            <AuctionCard 
              key={auction.id} 
              auction={auction} 
              onClick={onNavigateToAuction} 
            />
          ))}
        </div>

        {upcomingAuctions.length > 0 && (
          <div className="mt-24">
            <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <h2 className="text-2xl font-medium text-text-primary">Upcoming</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {upcomingAuctions.map(auction => (
                <AuctionCard 
                  key={auction.id} 
                  auction={auction} 
                  onClick={onNavigateToAuction} 
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
