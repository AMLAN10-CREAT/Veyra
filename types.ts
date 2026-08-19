export type AuctionStatus = 'upcoming' | 'live' | 'ending_soon' | 'ended' | 'sold' | 'cancelled' | 'under_review' | 'awaiting_payment' | 'transfer_in_progress' | 'completed';

export interface User {
  id: string;
  name: string;
  avatar?: string;
  verified: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  techStack: string[];
  thumbnail: string;
  screenshots: string[];
  liveDemoUrl?: string;
  includedAssets: string[];
}

export interface Auction {
  id: string;
  project: Project;
  seller: User;
  status: AuctionStatus;
  currentBid: number;
  startingBid: number;
  reservePrice: number;
  minBidIncrement: number;
  buyNowPrice?: number;
  bids: number;
  startTime: string;
  endTime: string;
  baseCurrency: string;
}

export interface Bid {
  id: string;
  auctionId: string;
  bidderId: string;
  amount: number;
  timestamp: string;
}

export type FrameState = 'marketplace' | 'seller' | 'bidder' | 'policies';
