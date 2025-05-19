import React from 'react';

export function MeteoconsTimeLateMorningFill(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={512}
      height={512}
      viewBox="0 0 512 512"
      {...props}
    >
      <defs>
        <linearGradient
          id="meteoconsTimeLateMorningFill0"
          x1={115}
          x2={179.4}
          y1={91.4}
          y2={203}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#fbbf24" />
          <stop offset={0.5} stopColor="#fbbf24" />
          <stop offset={1} stopColor="#f59e0b" />
        </linearGradient>

        <clipPath id="meteoconsTimeLateMorningFill1">
          <path fill="none" d="M0 12h512v282H0z" />
        </clipPath>

        <symbol id="meteoconsTimeLateMorningFill2" viewBox="0 0 294.4 294.4">
          <circle
            cx={147.2}
            cy={147.2}
            r={64.4}
            fill="url(#meteoconsTimeLateMorningFill0)"
            stroke="#f8af18"
            strokeMiterlimit={10}
            strokeWidth={4.6}
          />
          <path
            fill="none"
            stroke="#fbbf24"
            strokeLinecap="round"
            strokeMiterlimit={10}
            strokeWidth={18.4}
            d="M147.2 47.3V9.2m0 276v-38m70.7-170.7l26.9-26.9M49.6 244.8l27-27m0-141.3l-27-26.9m195.2 195.2l-27-27M47.4 147.3H9.2m276 0h-38"
          >
            <animateTransform
              additive="sum"
              attributeName="transform"
              dur="6s"
              repeatCount="indefinite"
              type="rotate"
              values="0 147.2 147.2; 45 147.2 147.2"
            />
          </path>
        </symbol>
      </defs>

      <g clipPath="url(#meteoconsTimeLateMorningFill1)">
        <use
          width={294.4}
          height={294.4}
          href="#meteoconsTimeLateMorningFill2"
          transform="translate(108.73 108.93)"
        />
      </g>

      <path
        fill="none"
        stroke="#374151"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={18}
        d="M128 320h256"
      />
    </svg>
  );
}
