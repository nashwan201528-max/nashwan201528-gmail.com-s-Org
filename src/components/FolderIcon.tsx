import React from 'react';

interface FolderIconProps {
  className?: string;
  size?: number;
  isOpen?: boolean;
  color?: string;
  variant?: 'root' | 'build' | 'outputs' | 'apk' | 'debug' | 'release' | 'default';
}

export const FolderIcon: React.FC<FolderIconProps> = ({
  className = '',
  size = 22,
  isOpen = true,
  variant = 'default',
}) => {
  // Variant color accents inspired by IntelliJ / Android Studio folder badges
  const getColors = () => {
    switch (variant) {
      case 'root':
        return {
          tab: '#60a5fa', // Blue accent
          body: '#3b82f6',
          highlight: '#93c5fd',
        };
      case 'build':
        return {
          tab: '#f59e0b', // Amber/orange for Gradle build artifact
          body: '#d97706',
          highlight: '#fcd34d',
        };
      case 'outputs':
        return {
          tab: '#06b6d4', // Cyan
          body: '#0891b2',
          highlight: '#67e8f9',
        };
      case 'apk':
        return {
          tab: '#10b981', // Emerald for Android package
          body: '#059669',
          highlight: '#6ee7b7',
        };
      case 'debug':
        return {
          tab: '#8b5cf6', // Violet for debug variant
          body: '#7c3aed',
          highlight: '#c4b5fd',
        };
      case 'release':
        return {
          tab: '#f59e0b', // Warm amber / gold for release variant
          body: '#d97706',
          highlight: '#fcd34d',
        };
      default:
        return {
          tab: '#94a3b8',
          body: '#64748b',
          highlight: '#cbd5e1',
        };
    }
  };

  const colors = getColors();

  if (isOpen) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 transition-transform ${className}`}
      >
        {/* Back folder tab & back wall */}
        <path
          d="M2 6C2 4.89543 2.89543 4 4 4H9.17157C9.70201 4 10.2107 4.21071 10.5858 4.58579L12.4142 6.41421C12.7893 6.78929 13.298 7 13.8284 7H20C21.1046 7 22 7.89543 22 9V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17V6Z"
          fill={colors.tab}
          opacity="0.8"
        />
        {/* Folder inside sheet preview */}
        <path
          d="M4.5 9H19.5V11H4.5V9Z"
          fill="#ffffff"
          opacity="0.25"
        />
        {/* Open front flap */}
        <path
          d="M2 11.5C2 10.6716 2.67157 10 3.5 10H20.5C21.3284 10 22 10.6716 22 11.5L21.2 18.5C21.1 19.3 20.4 20 19.6 20H4.4C3.6 20 2.9 19.3 2.8 18.5L2 11.5Z"
          fill={colors.body}
        />
        {/* Subtle top edge highlight */}
        <line
          x1="3"
          y1="10.5"
          x2="21"
          y2="10.5"
          stroke={colors.highlight}
          strokeWidth="1"
          strokeOpacity="0.6"
        />
      </svg>
    );
  }

  // Closed folder
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform ${className}`}
    >
      <path
        d="M2 6C2 4.89543 2.89543 4 4 4H9.17157C9.70201 4 10.2107 4.21071 10.5858 4.58579L12.4142 6.41421C12.7893 6.78929 13.298 7 13.8284 7H20C21.1046 7 22 7.89543 22 9V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17V6Z"
        fill={colors.body}
      />
      <line
        x1="4"
        y1="8"
        x2="10"
        y2="8"
        stroke={colors.highlight}
        strokeWidth="1.2"
        strokeOpacity="0.7"
      />
    </svg>
  );
};
