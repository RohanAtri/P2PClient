'use client';

import React from 'react';
import { useLoaderStore } from '../lib/store/useLoaderStore';

const Loader = () => {
  const loading = useLoaderStore((state) => state.loading);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white/80 flex items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
    </div>
  );
};

export default Loader;
