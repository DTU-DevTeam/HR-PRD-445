import React from 'react';

export function MeteoconsTimeEveningFill(props) {
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
          id="meteoconsTimeEveningFill0"
          x1={115.3}
          x2={179.7}
          y1={91.3}
          y2={202.8}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#ffa94d" />
          <stop offset={0.5} stopColor="#ffa94d" />
          <stop offset={1} stopColor="#fd7e14" />
        </linearGradient>
        <clipPath id="meteoconsTimeEveningFill1">
          <path fill="none" d="M0 12h512v282H0z" />
        </clipPath>
        <symbol id="meteoconsTimeEveningFill2" viewBox="0 0 295 294">
          <ellipse
            cx={147.5}
            cy={147}
            fill="url(#meteoconsTimeEveningFill0)"
            rx={64.5}
            ry={64.3}
            stroke="#ff922b"
            strokeMiterlimit={10}
            strokeWidth={6}
          />
          <path
            d="M147.5 47.2v-38m0 275.6v-38m70.8-170.4l27-26.8M49.7 244.5l27-27m0-141l-27-27m195.6 195l-27-27M47.3 147H9.2m276.6 0h-38.2"
            fill="none"
            stroke="#ffa94d"
            strokeLinecap="round"
            strokeMiterlimit={10}
            strokeWidth={18.4}
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
      <g clipPath="url(#meteoconsTimeEveningFill1)">
        <use
          width={295}
          height={294}
          href="#meteoconsTimeEveningFill2"
          transform="translate(108.58 166.91)"
        />
      </g>
      <path
        d="M128 320h256"
        fill="none"
        stroke="#374151"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={18}
      />
    </svg>
  );
}