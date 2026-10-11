import React from 'react';

interface AndroidIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export const AndroidIcon: React.FC<AndroidIconProps> = ({
  className = '',
  size = 24,
  color = '#3DDC84', // Official Android Green
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Android Antennas */}
      <path
        d="M6.5 4.5L8.5 7.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M17.5 4.5L15.5 7.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      
      {/* Android Head (Curved Dome) */}
      <path
        d="M5 14C5 9.02944 8.13401 7.5 12 7.5C15.866 7.5 19 9.02944 19 14H5Z"
        fill={color}
      />
      
      {/* Left Eye */}
      <circle cx="8.5" cy="11" r="1.1" fill="#14151a" />
      
      {/* Right Eye */}
      <circle cx="15.5" cy="11" r="1.1" fill="#14151a" />

      {/* Body Section (for full Android robot presence) */}
      <path
        d="M5.5 15.5C5.5 15.2239 5.72386 15 6 15H18C18.2761 15 18.5 15.2239 18.5 15.5V19C18.5 19.8284 17.8284 20.5 17 20.5H7C6.17157 20.5 5.5 19.8284 5.5 19V15.5Z"
        fill={color}
        opacity="0.9"
      />

      {/* Left Arm */}
      <rect
        x="3"
        y="15.2"
        width="1.6"
        height="4"
        rx="0.8"
        fill={color}
        opacity="0.85"
      />

      {/* Right Arm */}
      <rect
        x="19.4"
        y="15.2"
        width="1.6"
        height="4"
        rx="0.8"
        fill={color}
        opacity="0.85"
      />
    </svg>
  );
};
