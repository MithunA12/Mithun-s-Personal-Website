"use client";

import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";

const verticalGridLines = [48, 96, 144, 192, 240, 288, 336, 384, 432];
const horizontalGridLines = [44, 88, 132, 176];
const featureNodes = [
  { cx: 370, cy: 67 },
  { cx: 418, cy: 105 },
  { cx: 372, cy: 148 },
  { cx: 448, cy: 163 },
];

const featureVectors = [
  { y: 70, width: 48, opacity: 0.55 },
  { y: 88, width: 70, opacity: 0.78 },
  { y: 106, width: 38, opacity: 0.48 },
  { y: 124, width: 62, opacity: 0.68 },
  { y: 142, width: 54, opacity: 0.6 },
];

const networkEdges = [
  [352, 105, 370, 67],
  [352, 105, 418, 105],
  [352, 105, 372, 148],
  [370, 67, 418, 105],
  [370, 67, 448, 163],
  [418, 105, 372, 148],
  [418, 105, 448, 163],
  [372, 148, 448, 163],
];

const WAVE_D =
  "M18 112 L34 112 L43 108 L51 117 L59 111 L71 112 L83 110 L94 113 L105 108 L115 121 L125 78 L135 146 L145 96 L154 118 L163 109 L173 113 L184 111";

interface NeuralSignalVisualProps {
  /**
   * When provided, the pipeline builds itself from this 0..1 scroll value: the
   * waveform draws, the feature vectors light up, then the model graph connects.
   * When omitted, the visual uses its ambient looping CSS animation (hero).
   */
  drawProgress?: MotionValue<number>;
}

export function NeuralSignalVisual({ drawProgress }: NeuralSignalVisualProps) {
  const fallback = useMotionValue(1);
  const progress = drawProgress ?? fallback;
  const scroll = Boolean(drawProgress);

  const vectorsOpacity = useTransform(progress, [0.03, 0.22], [0, 1]);
  const edgesOpacity = useTransform(progress, [0.12, 0.3], [0, 1]);
  const nodesOpacity = useTransform(progress, [0.16, 0.34], [0, 1]);

  return (
    <figure
      aria-labelledby="neural-signal-caption"
      className="overflow-hidden rounded-[1.5rem] border border-white/15 bg-[linear-gradient(145deg,rgba(20,35,58,0.96),rgba(7,12,22,0.98))] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_22px_60px_-30px_rgba(15,23,42,0.85)]"
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
          <linearGradient id="signal-gradient" x1="18" x2="184" y1="0" y2="0">
            <stop stopColor="#60a5fa" />
            <stop offset="0.52" stopColor="#22d3ee" />
            <stop offset="1" stopColor="#a5f3fc" />
          </linearGradient>
          <linearGradient id="vector-gradient" x1="214" x2="300" y1="0" y2="0">
            <stop stopColor="#2563eb" />
            <stop offset="0.55" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#a5f3fc" />
          </linearGradient>
          <radialGradient id="node-gradient">
            <stop stopColor="#e0f2fe" />
            <stop offset="0.45" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#1d4ed8" />
          </radialGradient>
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
          d={WAVE_D}
          opacity="0.2"
          stroke="#38bdf8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="7"
        />
        {scroll ? (
          <motion.path
            d={WAVE_D}
            initial={false}
            stroke="url(#signal-gradient)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            style={{ pathLength: progress }}
          />
        ) : (
          <path
            className="signal-wave"
            d={WAVE_D}
            pathLength={1}
            stroke="url(#signal-gradient)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
        )}

        <g aria-hidden="true">
          <path d="M204 57 H197 V155 H204" stroke="#475569" strokeWidth="1.25" />
          <path d="M306 57 H313 V155 H306" stroke="#475569" strokeWidth="1.25" />
          {featureVectors.map((vector, index) => {
            const rect = (
              <>
                <rect
                  fill="url(#vector-gradient)"
                  height="7"
                  opacity={vector.opacity}
                  rx="3.5"
                  width={vector.width}
                  x="216"
                  y={vector.y}
                />
                <circle
                  cx={288 + (index % 3) * 6}
                  cy={vector.y + 3.5}
                  fill="#67e8f9"
                  opacity="0.7"
                  r="2"
                />
              </>
            );
            return scroll ? (
              <motion.g initial={false} key={vector.y} style={{ opacity: vectorsOpacity }}>
                {rect}
              </motion.g>
            ) : (
              <g
                className="feature-vector"
                key={vector.y}
                style={{ animationDelay: `${index * 0.16}s` }}
              >
                {rect}
              </g>
            );
          })}
          <path
            d="M313 106 C328 106 338 105 352 105"
            stroke="#38bdf8"
            strokeOpacity="0.55"
            strokeWidth="1.25"
          />
          <text fill="#64748b" fontFamily="monospace" fontSize="8" x="222" y="54">
            FEATURE VECTOR
          </text>
        </g>

        {scroll ? (
          <motion.g
            initial={false}
            stroke="#38bdf8"
            strokeOpacity="0.38"
            strokeWidth="1.25"
            style={{ opacity: edgesOpacity }}
          >
            {networkEdges.map(([x1, y1, x2, y2]) => (
              <line key={`${x1}-${y1}-${x2}-${y2}`} x1={x1} x2={x2} y1={y1} y2={y2} />
            ))}
          </motion.g>
        ) : (
          <g stroke="#38bdf8" strokeOpacity="0.38" strokeWidth="1.25">
            {networkEdges.map(([x1, y1, x2, y2]) => (
              <line key={`${x1}-${y1}-${x2}-${y2}`} x1={x1} x2={x2} y1={y1} y2={y2} />
            ))}
          </g>
        )}

        <circle cx="352" cy="105" fill="#0f172a" r="6" stroke="#67e8f9" strokeWidth="2" />
        {featureNodes.map((node, index) => {
          const core = (
            <circle cx={node.cx} cy={node.cy} fill="url(#node-gradient)" r="4.5" />
          );
          return scroll ? (
            <motion.g initial={false} key={`${node.cx}-${node.cy}`} style={{ opacity: nodesOpacity }}>
              <circle cx={node.cx} cy={node.cy} fill="#38bdf8" opacity="0.16" r="12" />
              {core}
            </motion.g>
          ) : (
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
              {core}
            </g>
          );
        })}

        <g fill="#94a3b8" fontFamily="monospace" fontSize="9" letterSpacing="1.1">
          <text x="18" y="202">EEG / ECG</text>
          <text x="202" y="202">FEATURE EXTRACTION</text>
          <text x="386" y="202">MODEL</text>
        </g>
      </svg>
    </figure>
  );
}
