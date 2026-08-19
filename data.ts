import { Auction } from './types';

export const MOCK_USER = {
  id: 'u1',
  name: 'Alex Rivera',
  verified: true,
};

export const MOCK_AUCTIONS: Auction[] = [
  {
    id: 'a1',
    project: {
      id: 'p1',
      title: 'AI Financial Analyst',
      description: 'A fully autonomous agent that analyzes financial statements, market trends, and generates investment memos using GPT-4 and real-time market data APIs.',
      category: 'AI Agent',
      type: 'SaaS',
      techStack: ['React', 'Node.js', 'Python', 'OpenAI', 'PostgreSQL'],
      thumbnail: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?auto=format&fit=crop&q=80&w=800',
      screenshots: [
        'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?auto=format&fit=crop&q=80&w=1200'
      ],
      includedAssets: ['Source Code', 'Domain', 'Commercial Rights', 'Database', 'Documentation'],
    },
    seller: {
      id: 's1',
      name: 'Quantum Labs',
      verified: true,
    },
    status: 'live',
    currentBid: 125000,
    startingBid: 50000,
    reservePrice: 100000,
    minBidIncrement: 5000,
    bids: 18,
    startTime: new Date(Date.now() - 86400000).toISOString(),
    endTime: new Date(Date.now() + 14400000).toISOString(), // 4 hours from now
    baseCurrency: 'USD',
  },
  {
    id: 'a2',
    project: {
      id: 'p2',
      title: 'Aura Customer Support',
      description: 'Enterprise-grade AI customer support platform with multi-channel integration, sentiment analysis, and automated ticket resolution.',
      category: 'AI SaaS',
      type: 'Web Application',
      techStack: ['Next.js', 'Go', 'Redis', 'Anthropic API'],
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
      screenshots: [],
      includedAssets: ['Source Code', 'Domain', 'Commercial Rights'],
    },
    seller: {
      id: 's2',
      name: 'Elevate Systems',
      verified: true,
    },
    status: 'ending_soon',
    currentBid: 42000,
    startingBid: 10000,
    reservePrice: 40000,
    minBidIncrement: 1000,
    bids: 45,
    startTime: new Date(Date.now() - 259200000).toISOString(),
    endTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
    baseCurrency: 'USD',
  },
  {
    id: 'a3',
    project: {
      id: 'p3',
      title: 'SynthVoice Generator',
      description: 'Zero-shot voice cloning and text-to-speech engine optimized for real-time podcasting and audiobook narration.',
      category: 'AI Model',
      type: 'API',
      techStack: ['Python', 'PyTorch', 'FastAPI', 'CUDA'],
      thumbnail: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800',
      screenshots: [],
      includedAssets: ['Source Code', 'Trained Model Weights', 'Commercial Rights', 'Dataset'],
    },
    seller: {
      id: 's3',
      name: 'AudioCore',
      verified: true,
    },
    status: 'upcoming',
    currentBid: 0,
    startingBid: 85000,
    reservePrice: 150000,
    minBidIncrement: 5000,
    bids: 0,
    startTime: new Date(Date.now() + 86400000).toISOString(),
    endTime: new Date(Date.now() + 604800000).toISOString(),
    baseCurrency: 'USD',
  }
];

export const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
};
