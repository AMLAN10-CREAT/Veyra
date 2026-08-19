import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../lib/utils';

export function FramePolicies() {
  const [openSection, setOpenSection] = useState<string | null>('how-buyers');

  const toggleSection = (id: string) => {
    setOpenSection(prev => prev === id ? null : id);
  };

  const AccordionItem = ({ id, title, children }: { id: string, title: string, children: React.ReactNode }) => (
    <div className="border-b border-border">
      <button 
        onClick={() => toggleSection(id)}
        className="flex w-full items-center justify-between py-6 text-left hover:text-text-secondary transition-colors"
      >
        <span className="font-display text-lg font-medium">{title}</span>
        {openSection === id ? <ChevronUp className="h-5 w-5 text-text-tertiary" /> : <ChevronDown className="h-5 w-5 text-text-tertiary" />}
      </button>
      {openSection === id && (
        <div className="pb-8 text-text-secondary leading-relaxed prose prose-sm max-w-none">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <div className="mb-16 text-center">
        <h1 className="font-display text-4xl text-text-primary mb-4">How It Works & Policies</h1>
        <p className="text-text-secondary">Understanding the auction process, rules, and platform guarantees.</p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-6 border-b border-border pb-2">How It Works</h2>
          
          <AccordionItem id="how-buyers" title="For Buyers: Bidding & Acquisition">
             <ol className="space-y-4 list-decimal pl-4">
               <li><strong>Browse Projects:</strong> Discover verified digital assets and AI projects on the marketplace.</li>
               <li><strong>Review Project:</strong> Examine the source code inclusion, technology stack, and commercial rights.</li>
               <li><strong>Join Auction:</strong> Enter the auction room to observe bidding activity.</li>
               <li><strong>Place Bid:</strong> Submit a bid higher than the minimum increment. You are legally bound to this bid.</li>
               <li><strong>Win Auction:</strong> If you hold the highest bid when the timer expires, you win the auction.</li>
               <li><strong>Complete Payment:</strong> Pay the winning amount plus the platform fee via Crypto or Fiat escrow.</li>
               <li><strong>Receive Digital Asset:</strong> The seller transfers the code, domain, and assets to you.</li>
               <li><strong>Confirm Transfer:</strong> You confirm receipt, and the escrow releases funds to the seller.</li>
             </ol>
          </AccordionItem>

          <AccordionItem id="how-sellers" title="For Sellers: Creating & Selling">
             <ol className="space-y-4 list-decimal pl-4">
               <li><strong>Create Project:</strong> Fill out the project details, including demo URLs and asset checklists.</li>
               <li><strong>Submit Project:</strong> Send the project to the platform for verification.</li>
               <li><strong>Platform Reviews:</strong> Our team reviews the project to ensure accuracy and legitimacy.</li>
               <li><strong>Auction Goes Live:</strong> The platform schedules and hosts your auction.</li>
               <li><strong>Buyers Bid:</strong> Watch as verified buyers place bids on your asset.</li>
               <li><strong>Auction Ends:</strong> The highest bidder is secured.</li>
               <li><strong>Winner Pays:</strong> The buyer sends funds to the platform's secure escrow.</li>
               <li><strong>Transfer Asset:</strong> You transfer the domain, repositories, and accounts to the buyer.</li>
               <li><strong>Payment Released:</strong> Once the buyer confirms, you receive the net earnings minus the platform fee.</li>
             </ol>
          </AccordionItem>
        </section>

        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-6 border-b border-border pb-2">Platform Policies</h2>
          
          <AccordionItem id="policy-fees" title="Platform Fees & Transactions">
            <p className="mb-4">
              The platform charges a standard transaction fee on all successful auctions. This fee covers escrow services, project verification, and platform hosting.
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li><strong>Buyer Fee:</strong> Typically 5% of the winning bid, clearly displayed before bid confirmation.</li>
              <li><strong>Seller Fee:</strong> Deducted from the final payout, usually between 5-10% depending on category.</li>
              <li><strong>Escrow:</strong> All payments are held in escrow until asset transfer is verified by both parties.</li>
            </ul>
          </AccordionItem>

          <AccordionItem id="policy-assets" title="Digital Asset Ownership & Transfer">
            <p className="mb-4">
              Upon successful payment, the seller is legally obligated to transfer all included assets to the buyer.
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li><strong>Included Assets:</strong> Only items explicitly listed in the "Included Assets" checklist are required to be transferred.</li>
              <li><strong>Intellectual Property:</strong> Unless otherwise specified, full commercial rights and intellectual property transfer to the buyer upon completion.</li>
              <li><strong>Dispute Resolution:</strong> If a transfer fails or assets are misrepresented, the platform administrator will step in to mediate and may issue a refund from escrow.</li>
            </ul>
          </AccordionItem>

          <AccordionItem id="policy-bidding" title="Bidding Rules & Fraud Prevention">
            <p className="mb-4">
              To maintain a premium and trustworthy environment, strict rules apply to all bidding activities.
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li><strong>Binding Bids:</strong> All bids are legally binding commitments to purchase.</li>
              <li><strong>Bid Retraction:</strong> Bids cannot be retracted once placed.</li>
              <li><strong>Shill Bidding:</strong> Sellers are strictly prohibited from bidding on their own auctions. Any detection of shill bidding will result in permanent account suspension.</li>
              <li><strong>Verification:</strong> High-value auctions may require identity or fund verification before bids are accepted.</li>
            </ul>
          </AccordionItem>
        </section>
      </div>
    </div>
  );
}
