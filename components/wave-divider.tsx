export function WaveDivider() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-14 overflow-hidden opacity-30 sm:h-20"
    >
      <svg
        className="animate-wave-drift h-full w-[200%]"
        viewBox="0 0 2400 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="wave-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3854e6" />
            <stop offset="50%" stopColor="#25d366" />
            <stop offset="100%" stopColor="#3854e6" />
          </linearGradient>
        </defs>
        <path
          d="M0,40 C150,90 350,0 600,40 C850,80 1050,10 1200,40 C1350,90 1550,0 1800,40 C2050,80 2250,10 2400,40 L2400,120 L0,120 Z"
          fill="url(#wave-gradient)"
        />
      </svg>
    </div>
  );
}
