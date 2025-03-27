import { Peachy } from "@peach/component";

export default function PeachyLogo({ className = "h-10 w-10" }) {
  return (
    <div className={`${className} relative`}>
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Peach body - side view */}
        <path
          d="M55 40C55 48.2843 47.8366 55 39 55C30.1634 55 23 48.2843 23 40C23 31.7157 30.1634 25 39 25C47.8366 25 55 31.7157 55 40Z"
          fill="url(#paint0_linear)"
        />
        {/* Stem */}
        <path
          d="M39 25C39 25 39 18 39 15C39 12 40 10 43 10"
          stroke="#5D4037"
          stroke-width="2.5"
          stroke-linecap="round"
        />
        {/* Leaf */}
        <path
          d="M43 10C43 10 48 12 50 16C52 20 50 24 46 25"
          stroke="#4CAF50"
          stroke-width="2.5"
          stroke-linecap="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="28"
            y1="30"
            x2="50"
            y2="50"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#FFCCBC" />
            <stop offset="1" stop-color="#FF7043" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
