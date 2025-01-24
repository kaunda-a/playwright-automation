import React from 'react';

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ width = 200, height = 60 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 30 Q 50 10, 100 30 T 180 30"
        stroke="#FF0000"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M20 30 Q 50 50, 100 30 T 180 30"
        stroke="#FF0000"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M40 15 Q 70 5, 100 15 T 160 15"
        stroke="#FF0000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M40 45 Q 70 55, 100 45 T 160 45"
        stroke="#FF0000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M60 22.5 Q 80 17.5, 100 22.5 T 140 22.5"
        stroke="#FF0000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M60 37.5 Q 80 42.5, 100 37.5 T 140 37.5"
        stroke="#FF0000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

export default Logo;
