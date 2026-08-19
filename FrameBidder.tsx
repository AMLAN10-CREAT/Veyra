import React, { useState } from 'react';
import { MOCK_AUCTIONS, formatCurrency } from '../data';
import { Auction } from '../types';
import { ArrowLeft, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { cn } from '../lib/utils';

interface FrameBidderProps {
  auctionId: string | null;
  onBack: () => void;
}

export function FrameBidder({ auctionId, onBack }: FrameBidderProps) {
  const auction = MOCK_AUCTIONS.find(a => a.id === auctionId) || MOCK_AUCTIONS[0];
  const [bidAmount, setBidAmount] = useState<string>((auction.currentBid + auction.minBidIncrement).toString());
  const [showConfirm, setShowConfirm] = useState(false);

  // Fallbacks if auction is somehow null
  if (!auction) return <div>Auction not found</div>;

  const isLive = auction.status === 'live' || auction.status === 'ending_soon';
  const minNextBid = auction.currentBid > 0 ? auction.currentBid + auction.minBidIncrement : auction.startingBid;

  const estimatedFee = parseInt(bidAmount || '0') * 0.05;
  const totalCost = parseInt(bidAmount || '0') + estimatedFee;

  let timeRemainingText = '';
  try {
    timeRemainingText = formatDistanceToNow(parseISO(auction.endTime));
  } catch(e) {}

  return (
    <div className="w-full flex flex-col bg-canvas">
      <div className="border-b border-border bg-surface px-6 py-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Marketplace
        </button>
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 lg:grid-cols-[1fr_300px_350px] gap-8 p-6 lg:p-8">
        
        {/* LEFT: Project Preview */}
        <div className="flex flex-col space-y-8">
          <div className="overflow-hidden rounded-md border border-border bg-surface aspect-video relative">
             {auction.project.thumbnail ? (
               <img src={auction.project.thumbnail} alt={auction.project.title} className="h-full w-full object-cover" />
             ) : (
               <div className="flex h-full w-full items-center justify-center text-text-tertiary">No Image</div>
             )}
             <div className="absolute top-4 left-4 flex items-center gap-2 rounded-sm bg-surface/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-md border border-border/50">
               <ShieldCheck className="h-4 w-4 text-green-600" />
               Verified Project
             </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-medium text-text-primary mb-2">{auction.project.title}</h1>
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-text-secondary">
                <span>By {auction.seller.name}</span>
                <span>•</span>
                <span>{auction.project.category}</span>
                <span>•</span>
                <span>{auction.project.type}</span>
              </div>
            </div>

            <div className="prose prose-sm max-w-none text-text-secondary">
              <p className="text-base leading-relaxed">{auction.project.description}</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-display text-lg">Included Assets</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {auction.project.includedAssets.map((asset, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-sm border border-border bg-surface p-3 text-sm text-text-primary">
                    <CheckCircle2 className="h-4 w-4 text-text-secondary" />
                    {asset}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4 border-t border-border pt-6">
              <h3 className="font-display text-lg">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {auction.project.techStack.map((tech, i) => (
                  <span key={i} className="rounded-sm bg-surface border border-border px-3 py-1 text-xs text-text-secondary">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CENTER: Auction Information */}
        <div className="flex flex-col space-y-6">
          <div className="rounded-md border border-border bg-surface p-6">
            <h2 className="font-display text-xl mb-6 border-b border-border pb-4">Auction Status</h2>
            
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-text-secondary mb-1">Current Bid</p>
                <p className="font-mono text-4xl text-text-primary">{formatCurrency(auction.currentBid, auction.baseCurrency)}</p>
                {auction.baseCurrency !== 'USD' && (
                  <p className="text-sm text-text-tertiary mt-1">≈ {formatCurrency(auction.currentBid, 'USD')}</p>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-text-secondary mb-1">Bids</p>
                  <p className="text-lg font-mono">{auction.bids}</p>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-text-secondary mb-1">Status</p>
                  <div className="flex items-center gap-1.5">
                    <span className={cn(
                      "h-2 w-2 rounded-full",
                      isLive ? "bg-green-500 animate-pulse" : "bg-text-secondary"
                    )} />
                    <span className="text-sm uppercase tracking-wide font-medium">{auction.status.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>
              
              <div className="rounded-sm bg-canvas p-4 border border-border">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-text-secondary" />
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-text-secondary">Time Remaining</p>
                </div>
                <p className="font-mono text-2xl text-text-primary">{timeRemainingText.replace(' remaining', '')}</p>
                <p className="text-xs text-text-tertiary mt-1">Ends on {new Date(auction.endTime).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-border bg-surface p-6">
             <h3 className="font-display text-lg mb-4">Bid History</h3>
             <div className="space-y-3">
               {[1,2,3].map((_, i) => (
                 <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-border/50 last:border-0">
                   <div className="flex items-center gap-2">
                     <div className="h-6 w-6 rounded-full bg-canvas flex items-center justify-center text-xs font-medium border border-border">
                       B{i+1}
                     </div>
                     <span className="text-text-secondary">Bidder_{Math.floor(Math.random() * 1000)}</span>
                   </div>
                   <span className="font-medium text-text-primary">
                     {formatCurrency(auction.currentBid - (i * auction.minBidIncrement), auction.baseCurrency)}
                   </span>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* RIGHT: Bidding Panel */}
        <div className="flex flex-col">
          <div className="sticky top-24 rounded-md border-2 border-border bg-surface p-6 shadow-sm">
            <h2 className="font-display text-xl mb-6">Place Bid</h2>
            
            {!showConfirm ? (
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">Minimum Next Bid: {formatCurrency(minNextBid, auction.baseCurrency)}</p>
                  <div className="relative">
                    <span className="absolute left-4 top-3 font-display text-lg text-text-secondary">$</span>
                    <input 
                      type="number" 
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="w-full rounded-sm border-2 border-border bg-transparent py-3 pl-8 pr-4 font-display text-xl outline-none focus:border-accent" 
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  {[minNextBid, minNextBid + 5000, minNextBid + 10000].map(val => (
                    <button 
                      key={val}
                      onClick={() => setBidAmount(val.toString())}
                      className="flex-1 rounded-sm border border-border bg-canvas py-2 text-xs font-medium hover:border-text-secondary"
                    >
                      +{formatCurrency(val - auction.currentBid, auction.baseCurrency).replace('.00', '')}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => setShowConfirm(true)}
                  disabled={!isLive || parseInt(bidAmount) < minNextBid}
                  className="w-full rounded-lg bg-black py-4 text-xs font-medium text-white transition-opacity hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Place Bid
                </button>
                
                <p className="text-center text-xs text-text-tertiary">
                  By placing a bid, you agree to the auction rules.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="rounded-sm bg-canvas p-4 border border-border space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Your Bid</span>
                    <span className="font-medium">{formatCurrency(parseInt(bidAmount), auction.baseCurrency)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Platform Fee (5%)</span>
                    <span className="font-medium">{formatCurrency(estimatedFee, auction.baseCurrency)}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-semibold">Total Commitment</span>
                    <span className="font-display font-semibold">{formatCurrency(totalCost, auction.baseCurrency)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={() => {
                      alert('Bid placed successfully!');
                      setShowConfirm(false);
                    }}
                    className="w-full rounded-lg bg-black py-4 text-xs font-medium text-white transition-opacity hover:opacity-80"
                  >
                    Confirm Bid
                  </button>
                  <button 
                    onClick={() => setShowConfirm(false)}
                    className="w-full rounded-lg border border-border py-4 text-xs font-medium text-text-primary transition-colors hover:bg-surface-hover"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
