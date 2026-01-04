import React from 'react';

interface BelotIconProps {
  className?: string;
  size?: number;
}

const BelotIcon: React.FC<BelotIconProps> = ({ className, size = 24 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left Card (King of Diamonds style) */}
      <g transform="rotate(-10 8 12)">
        <rect 
          x="1.5" 
          y="3" 
          width="13" 
          height="18" 
          rx="2" 
          fill="white" 
          stroke="currentColor" 
          strokeWidth="1.2" 
        />
        {/* Diamond Shape */}
        <path d="M8 7.5 L12 12 L8 16.5 L4 12 Z" fill="#ef4444" />
        {/* Letter R */}
        <text 
          x="8" 
          y="13.5" 
          fontSize="7" 
          fontWeight="900" 
          fontFamily="sans-serif" 
          fill="white" 
          textAnchor="middle"
        >
          R
        </text>
      </g>

      {/* Right Card (Queen of Hearts style) */}
      <g transform="rotate(10 16 12)">
        <rect 
          x="9.5" 
          y="3" 
          width="13" 
          height="18" 
          rx="2" 
          fill="white" 
          stroke="currentColor" 
          strokeWidth="1.2" 
        />
        {/* Heart Shape */}
        <path 
          d="M16 16 C16 16 11.5 13 11.5 9.5 C11.5 7.5 13.5 7.5 14.5 8.5 C15.5 9.5 16 10 16 10 C16 10 16.5 9.5 17.5 8.5 C18.5 7.5 20.5 7.5 20.5 9.5 C20.5 13 16 16 16 16 Z" 
          fill="#ef4444" 
        />
        {/* Letter D */}
        <text 
          x="16" 
          y="12" 
          fontSize="7" 
          fontWeight="900" 
          fontFamily="sans-serif" 
          fill="white" 
          textAnchor="middle"
        >
          D
        </text>
      </g>
    </svg>
  );
};

export default BelotIcon;
