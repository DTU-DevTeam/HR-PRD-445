import React from 'react';

export function MeteoconsTimeLateEveningFill(props) {
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
          id="meteoconsTimeLateEveningFill0"
          x1={54}
          x2={125.8}
          y1={16.9}
          y2={141.3}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#092960" />
          <stop offset={0.5} stopColor="#092960" />
          <stop offset={1} stopColor="#deeafb" />
        </linearGradient>

        <linearGradient
          id="meteoconsTimeLateEveningFill1"
          x1={38.8}
          x2={133.4}
          y1={20.8}
          y2={184.6}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#86c3db" />
          <stop offset={0.5} stopColor="#86c3db" />
          <stop offset={1} stopColor="#5eafcf" />
        </linearGradient>

        <symbol id="meteoconsTimeLateEveningFill2" viewBox="0 0 192.5 192.5">
          <path
            fill="url(#meteoconsTimeLateEveningFill1)"
            stroke="#72b9d5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={4.5}
            d="M179.7 120.2a95 95 0 0 1-95.5-94.3a93.2 93.2 0 0 1 3.1-23.7A94.8 94.8 0 0 0 2.3 96a95 95 0 0 0 95.5 94.3c44.5 0 81.8-30 92.4-70.6a98.4 98.4 0 0 1-10.5.6Z"
          />
        </symbol>

        <symbol id="meteoconsTimeLateEveningFill3" viewBox="0 0 189.5 120.5">
          <path
            fill="url(#meteoconsTimeLateEveningFill0)"
            stroke="#fff"
            strokeMiterlimit={10}
            strokeWidth={4}
            d="m157.3 58l-1.4.1a45.8 45.8 0 0 0 1.4-10.8a45.3 45.3 0 0 0-83.8-23.8a30.1 30.1 0 0 0-45.6 26a30.5 30.5 0 0 0 .4 4.9a32.3 32.3 0 0 0 6 64h123a30.2 30.2 0 0 0 0-60.3Z"
          />
        </symbol>
      </defs>

      <use
        width={192.5}
        height={192.5}
        href="#meteoconsTimeLateEveningFill2"
        transform="translate(159.76 139.76)"
      >
        <animateTransform
          additive="sum"
          attributeName="transform"
          dur="6s"
          repeatCount="indefinite"
          type="rotate"
          values="-15 96.24 96.24; 9 96.24 96.24; -15 96.24 96.24"
        />
      </use>

      <use
        width={189.5}
        height={120.5}
        href="#meteoconsTimeLateEveningFill3"
        transform="translate(214.32 236.93)"
      >
        <animateTransform
          additive="sum"
          attributeName="transform"
          dur="6s"
          repeatCount="indefinite"
          type="translate"
          values="-6 0; 6 0; -6 0"
        />
      </use>
    </svg>
  );
}
