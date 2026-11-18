'use client';

import React from 'react';
import Image from 'next/image';

export const AppLogoIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 38,
  className = '',
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative shrink-0 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 ${className}`}
    >
      <Image
        src="/logo.png"
        alt="Logo"
        width={size}
        height={size}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  );
};
