import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { Upload, ChevronRight, Check } from 'lucide-react';

export function FrameSeller() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const renderStepIndicator = () => {
    const steps = [
      { id: 1, label: 'Project' },
      { id: 2, label: 'Auction' },
      { id: 3, label: 'Assets' },
      { id: 4, label: 'Review' },
    ];

    return (
      <div className="mb-12 flex items-center justify-between border-b border-border pb-6">
        <div className="flex w-full items-center">
          {steps.map((s, idx) => (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold",
                    step > s.id ? "bg-accent text-white" : 
                    step === s.id ? "bg-accent text-white" : 
                    "border border-border bg-surface text-text-tertiary"
                  )}>
                    {step > s.id ? <Check className="h-3 w-3" /> : s.id}
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-widest",
                    step >= s.id ? "text-text-primary" : "text-text-tertiary"
                  )}>
                    {s.label}
                  </span>
                </div>
              </div>
              {idx < steps.length - 1 && (
                <div className={cn(
                  "mx-4 h-[1px] flex-grow",
                  step > s.id ? "bg-accent" : "bg-border"
                )} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl text-text-primary">Create Auction</h1>
        <p className="mt-2 text-text-secondary">Submit your digital project for review and auction scheduling.</p>
      </div>

      {renderStepIndicator()}

      <div className="bg-surface p-8 border border-border rounded-md shadow-sm">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="font-display text-xl">Project Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-text-secondary">Project Name</label>
                <input type="text" placeholder="e.g. AI Customer Support Agent" className="w-full rounded-sm border border-border bg-transparent px-4 py-2 outline-none focus:border-text-primary" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-text-secondary">Category</label>
                  <select className="w-full rounded-sm border border-border bg-transparent px-4 py-2 outline-none focus:border-text-primary">
                    <option>AI Agent</option>
                    <option>SaaS</option>
                    <option>AI Model</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-text-secondary">Project Type</label>
                  <select className="w-full rounded-sm border border-border bg-transparent px-4 py-2 outline-none focus:border-text-primary">
                    <option>Web Application</option>
                    <option>Mobile App</option>
                    <option>API</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-text-secondary">Description</label>
                <textarea rows={4} placeholder="Describe the project's functionality and value..." className="w-full rounded-sm border border-border bg-transparent px-4 py-2 outline-none focus:border-text-primary resize-none"></textarea>
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-text-secondary">Project Assets (Thumbnails/Screenshots)</label>
                <div className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-sm border border-dashed border-border transition-colors hover:border-text-secondary hover:bg-surface-hover">
                  <Upload className="mb-2 h-6 w-6 text-text-tertiary" />
                  <span className="text-sm text-text-secondary">Click or drag images to upload</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button onClick={() => setStep(2)} className="flex items-center gap-2 rounded-lg bg-black px-6 py-2 text-xs font-medium text-white transition-opacity hover:opacity-80">
                Next: Auction Setup <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="font-display text-xl">Auction Configuration</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-text-secondary">Base Currency</label>
                  <select className="w-full rounded-sm border border-border bg-transparent px-4 py-2 outline-none focus:border-text-primary">
                    <option>USD</option>
                    <option>EUR</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-text-secondary">Starting Bid</label>
                  <div className="relative">
                    <span className="absolute left-4 top-2 text-text-secondary">$</span>
                    <input type="number" placeholder="1000" className="w-full rounded-sm border border-border bg-transparent py-2 pl-8 pr-4 outline-none focus:border-text-primary" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-text-secondary">Reserve Price (Optional)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-2 text-text-secondary">$</span>
                    <input type="number" placeholder="5000" className="w-full rounded-sm border border-border bg-transparent py-2 pl-8 pr-4 outline-none focus:border-text-primary" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-text-secondary">Minimum Bid Increment</label>
                  <div className="relative">
                    <span className="absolute left-4 top-2 text-text-secondary">$</span>
                    <input type="number" placeholder="100" className="w-full rounded-sm border border-border bg-transparent py-2 pl-8 pr-4 outline-none focus:border-text-primary" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep(1)} className="px-6 py-2 text-sm font-medium text-text-secondary hover:text-text-primary">
                Back
              </button>
              <button onClick={() => setStep(3)} className="flex items-center gap-2 rounded-sm bg-accent px-6 py-2 text-sm font-medium text-white hover:bg-accent-hover">
                Next: Asset Transfer <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="font-display text-xl">Asset & Ownership</h2>
            
            <div className="space-y-4">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-text-secondary">What is included?</label>
              
              <div className="grid grid-cols-2 gap-3">
                {['Source Code', 'Commercial Rights', 'Domain Name', 'Database/Data', 'Trained AI Models', 'Documentation'].map(item => (
                  <label key={item} className="flex cursor-pointer items-center gap-3 rounded-sm border border-border p-3 transition-colors hover:bg-surface-hover">
                    <input type="checkbox" className="h-4 w-4 accent-accent" />
                    <span className="text-sm">{item}</span>
                  </label>
                ))}
              </div>

              <div className="pt-4">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-text-secondary">Transfer Method Details</label>
                <textarea rows={3} placeholder="Explain how the assets will be transferred upon successful payment..." className="w-full rounded-sm border border-border bg-transparent px-4 py-2 outline-none focus:border-text-primary resize-none"></textarea>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep(2)} className="px-6 py-2 text-sm font-medium text-text-secondary hover:text-text-primary">
                Back
              </button>
              <button onClick={() => setStep(4)} className="flex items-center gap-2 rounded-sm bg-accent px-6 py-2 text-sm font-medium text-white hover:bg-accent-hover">
                Review <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="font-display text-xl">Review & Submit</h2>
            
            <div className="rounded-sm bg-canvas p-6 border border-border">
              <p className="text-sm text-text-secondary mb-4">
                Please review your project details carefully. Once submitted, your project will enter the review queue. You will not be able to independently control the auction once it is live. The platform administrator acts as the auction host.
              </p>

              <div className="space-y-2 border-t border-border pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Project</span>
                  <span className="font-medium">AI Customer Support Agent</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Starting Bid</span>
                  <span className="font-medium">$1,000 USD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Platform Fee</span>
                  <span className="font-medium">5% on successful sale</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep(3)} className="px-6 py-2 text-sm font-medium text-text-secondary hover:text-text-primary">
                Back
              </button>
              <button className="flex items-center gap-2 rounded-sm bg-accent px-6 py-2 text-sm font-medium text-white hover:bg-accent-hover">
                Submit for Approval
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
