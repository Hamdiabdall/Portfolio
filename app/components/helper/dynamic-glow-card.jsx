'use client';

import dynamic from 'next/dynamic';

const GlowCard = dynamic(() => import('./glow-card'), {
  ssr: false,
  loading: ({ isLoading }) => {
    if (isLoading) {
      return (
        <div className="animate-pulse bg-gray-200 rounded-xl w-full h-full min-h-[200px]">
          <div className="h-full w-full rounded-xl bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>
      );
    }
    return null;
  },
});

export default GlowCard;
