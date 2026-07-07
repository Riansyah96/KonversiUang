export function AppLogo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
    >
      <rect width="40" height="40" rx="10" fill="url(#logo_grad)" />
      <g transform="translate(8.5, 13)">
        <path
          d="M13.3 15.2 L2.34 1 V12.6"
          fill="none"
          stroke="white"
          strokeWidth="1.86"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.825 1.5 V13.1"
          strokeWidth="1.86"
          stroke="white"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <linearGradient id="logo_grad" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#4338ca" />
        </linearGradient>
      </defs>
    </svg>
  )
}
