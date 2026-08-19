import React from 'react';
import { Auction } from '../types';
import { formatCurrency } from '../data';
import { cn } from '../lib/utils';
import { formatDistanceToNow, parseISO } from 'date-fns';

interface AuctionCardProps {
  auction: Auction;
  onClick: (id: string) => void;
}

export function AuctionCard({ auction, onClick }: AuctionCardProps) {
  const isUpcoming = auction.status === 'upcoming';
  const isEndingSoon = auction.status === 'ending_soon';
  
  let timeRemainingText = '';
  try {
    if (isUpcoming) {
      timeRemainingText = `Starts in ${formatDistanceToNow(parseISO(auction.startTime))}`;
    } else {
      timeRemainingText = `${formatDistanceToNow(parseISO(auction.endTime))} remaining`;
    }
  } catch (e) {
    timeRemainingText = 'Time unknown';
  }

  return (
    <div 
      onClick={() => onClick(auction.id)}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-border rounded-t-xl">
        {auction.project.thumbnail ? (
          <img 
            src={auction.project.thumbnail} 
            alt={auction.project.title} 
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-text-tertiary">
            No Image
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <div className={cn(
            "px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded",
            isUpcoming ? "bg-black/40 text-white backdrop-blur-md" : 
            isEndingSoon ? "bg-orange-50 text-orange-600" : 
            "bg-green-50 text-green-600"
          )}>
            {auction.status.replace('_', ' ')}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col flex-grow p-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-tertiary mb-1">
            <span>{auction.project.category}</span>
            <span>•</span>
            <span>{auction.project.type}</span>
          </div>
          <h3 className="text-xl font-medium leading-tight text-text-primary line-clamp-1">
            {auction.project.title}
          </h3>
        </div>
        
        <div className="flex gap-8 mb-8 border-t-0 pt-0">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-text-tertiary mb-1">
              {isUpcoming ? 'Starting Bid' : 'Current Bid'}
            </p>
            <p className="font-mono text-2xl text-text-primary">
              {formatCurrency(isUpcoming ? auction.startingBid : auction.currentBid, auction.baseCurrency)}
            </p>
          </div>
          <div className="border-l border-[#EDEDED] pl-8">
             <p className="text-[10px] font-semibold uppercase tracking-widest text-text-tertiary mb-1">{isUpcoming ? 'Starts In' : 'Ends In'}</p>
             <p className="font-mono text-2xl text-text-primary">{timeRemainingText.replace(' remaining', '').replace('Starts in ', '')}</p>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-surface-hover pt-6">
          <div className="flex items-center gap-2">
            {!isUpcoming && (
              <>
                <div className={cn("w-2 h-2 rounded-full", isEndingSoon ? "bg-orange-500" : "bg-blue-500")}></div>
                <span className="text-xs text-text-secondary">{auction.bids} Bids Active</span>
              </>
            )}
          </div>
          <button className="bg-black text-white px-5 py-2 rounded-lg text-xs font-medium hover:opacity-80">
            View Auction
          </button>
        </div>
      </div>
    </div>
  );
}
