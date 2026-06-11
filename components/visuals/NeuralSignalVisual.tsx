const verticalGridLines = [48, 96, 144, 192, 240, 288, 336, 384, 432];
const horizontalGridLines = [44, 88, 132, 176];
const featureNodes = [
  { cx: 347, cy: 70 },
  { cx: 397, cy: 109 },
  { cx: 349, cy: 151 },
  { cx: 429, cy: 172 },
];

export function NeuralSignalVisual() {
  return (
    <figure
      aria-labelledby="neural-signal-caption"
      className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--dark)] shadow-[0_18px_55px_-32px_rgba(15,23,42,0.75)]"
    >
      <div className="flex items-center justify-between border-b border-slate-700/80 px-4 py-3">
        <figcaption
          className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-blue-200"
          id="neural-signal-caption"
        >
          Neural signal analysis
        </figcaption>
        <span className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-slate-400">
          <span
            aria-hidden="true"
            className="signal-status-dot h-1.5 w-1.5 rounded-full bg-cyan-300"
          />
          Processing
        </span>
      </div>

      <svg
        aria-hidden="true"
        className="block h-auto w-full"
        fill="none"
        focusable="false"
        viewBox="0 0 480 220"
      >
        <defs>
          <linearGradient id="signal-gradient" x1="20" x2="325" y1="0" y2="0">
            <stop stopColor="#60a5fa" />
            <stop offset="0.52" stopColor="#22d3ee" />
            <stop offset="1" stopColor="#a5f3fc" />
          </linearGradient>
          <radialGradient id="node-gradient">
            <stop stopColor="#e0f2fe" />
            <stop offset="0.45" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#1d4ed8" />
          </radialGradient>
          <clipPath id="signal-clip">
            <rect height="220" width="480" />
          </clipPath>
        </defs>

        <g stroke="#334155" strokeOpacity="0.55" strokeWidth="1">
          {verticalGridLines.map((x) => (
            <line key={`vertical-${x}`} x1={x} x2={x} y1="0" y2="220" />
          ))}
          {horizontalGridLines.map((y) => (
            <line key={`horizontal-${y}`} x1="0" x2="480" y1={y} y2={y} />
          ))}
        </g>

        <path
          d="M18 112 L43 112 L55 108 L65 118 L76 111 L89 112 L104 111 L118 108 L130 121 L140 80 L150 145 L161 98 L170 116 L184 110 L198 112 L211 109 L224 119 L235 66 L246 157 L257 91 L268 118 L280 109 L293 113 L307 111 L321 111"
          opacity="0.2"
          stroke="#38bdf8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="7"
        />
        <path
          className="signal-wave"
          d="M18 112 L43 112 L55 108 L65 118 L76 111 L89 112 L104 111 L118 108 L130 121 L140 80 L150 145 L161 98 L170 116 L184 110 L198 112 L211 109 L224 119 L235 66 L246 157 L257 91 L268 118 L280 109 L293 113 L307 111 L321 111"
          stroke="url(#signal-gradient)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />

        <g stroke="#38bdf8" strokeOpacity="0.38" strokeWidth="1.25">
          <line x1="321" x2="347" y1="111" y2="70" />
          <line x1="321" x2="397" y1="111" y2="109" />
          <line x1="321" x2="349" y1="111" y2="151" />
          <line x1="347" x2="397" y1="70" y2="109" />
          <line x1="347" x2="429" y1="70" y2="172" />
          <line x1="397" x2="349" y1="109" y2="151" />
          <line x1="397" x2="429" y1="109" y2="172" />
          <line x1="349" x2="429" y1="151" y2="172" />
        </g>

        <circle cx="321" cy="111" fill="#0f172a" r="6" stroke="#67e8f9" strokeWidth="2" />
        {featureNodes.map((node, index) => (
          <g key={`${node.cx}-${node.cy}`}>
            <circle
              className="signal-node-halo"
              cx={node.cx}
              cy={node.cy}
              fill="#38bdf8"
              opacity="0.16"
              r="12"
              style={{ animationDelay: `${index * 0.35}s` }}
            />
            <circle cx={node.cx} cy={node.cy} fill="url(#node-gradient)" r="4.5" />
          </g>
        ))}

        <g clipPath="url(#signal-clip)">
          <rect
            className="signal-scan"
            fill="url(#signal-gradient)"
            height="220"
            opacity="0.08"
            width="48"
            x="-48"
          />
        </g>

        <g fill="#94a3b8" fontFamily="monospace" fontSize="9" letterSpacing="1.1">
          <text x="18" y="202">EEG / ECG</text>
          <text x="196" y="202">FEATURE EXTRACTION</text>
          <text x="372" y="202">MODEL</text>
        </g>
      </svg>
    </figure>
  );
}
