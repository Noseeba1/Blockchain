import { MAX_SCORE } from '../utils/scoring';

/**
 * Interactive-style visual diagram illustrating how 3 Blocks link together
 * via Previous Hash -> Current Hash for the Home page educational preview.
 */
export function MiniChainDiagramSvg() {
  return (
    <div className="arena-surface overflow-hidden rounded-2xl border border-slate-800/90 p-5 sm:p-6">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-display text-base font-bold text-white sm:text-lg">
            كيف ترتبط الكتل داخل Blockchain؟
          </h3>
          <p className="text-xs text-slate-400 sm:text-sm">
            كل كتلة تحمل بصمتها الحالية وبصمة الكتلة السابقة لتكوين سلسلة غير قابلة للتعديل الخفي.
          </p>
        </div>
        <span dir="ltr" className="font-mono-tech text-xs text-cyan-300">
          Block #0 → Block #1 → Block #2
        </span>
      </div>

      <svg
        viewBox="0 0 860 190"
        role="img"
        aria-label="مخطط بصري يوضح ارتباط ثلاث كتل بلوك تشين عبر بصمة Hash"
        className="h-auto w-full"
      >
        <defs>
          <linearGradient id="blockCardGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#131F3D" />
            <stop offset="100%" stopColor="#091024" />
          </linearGradient>
          <linearGradient id="conduitGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>

        {/* Connecting Conduits (Left to Right in LTR coordinates inside SVG) */}
        <line
          x1="252"
          y1="95"
          x2="318"
          y2="95"
          stroke="#1E293B"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="252"
          y1="95"
          x2="318"
          y2="95"
          stroke="url(#conduitGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          className="svg-conduit-flow"
        />

        <line
          x1="542"
          y1="95"
          x2="608"
          y2="95"
          stroke="#1E293B"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="542"
          y1="95"
          x2="608"
          y2="95"
          stroke="url(#conduitGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          className="svg-conduit-flow"
        />

        {/* Block #0 */}
        <g transform="translate(12, 16)">
          <rect
            width="240"
            height="158"
            rx="16"
            fill="url(#blockCardGrad)"
            stroke="#334155"
            strokeWidth="1.5"
          />
          <rect x="16" y="16" width="88" height="22" rx="6" fill="#0F172A" stroke="#22D3EE" strokeOpacity="0.45" />
          <text x="60" y="31" textAnchor="middle" fill="#67E8F9" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700">
            BLOCK #0
          </text>
          <text x="120" y="31" fill="#94A3B8" fontSize="11" fontFamily="JetBrains Mono, monospace">
            Genesis
          </text>
          <text x="18" y="64" fill="#94A3B8" fontSize="11" fontFamily="JetBrains Mono, monospace">
            Prev: 000000
          </text>
          <rect x="16" y="78" width="208" height="30" rx="8" fill="#060B18" stroke="#1E293B" />
          <text x="120" y="97" textAnchor="middle" fill="#E2E8F0" fontSize="12" fontFamily="IBM Plex Sans Arabic, sans-serif">
            سجل البداية المعتمد
          </text>
          <text x="18" y="134" fill="#22D3EE" fontSize="12" fontFamily="JetBrains Mono, monospace" fontWeight="700">
            Hash: a7f3c1
          </text>
        </g>

        {/* Block #1 */}
        <g transform="translate(310, 16)">
          <rect
            width="240"
            height="158"
            rx="16"
            fill="url(#blockCardGrad)"
            stroke="#3B82F6"
            strokeOpacity="0.6"
            strokeWidth="1.5"
          />
          <rect x="16" y="16" width="88" height="22" rx="6" fill="#0F172A" stroke="#22D3EE" strokeOpacity="0.65" />
          <text x="60" y="31" textAnchor="middle" fill="#67E8F9" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700">
            BLOCK #1
          </text>
          <text x="18" y="64" fill="#22D3EE" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700">
            Prev: a7f3c1
          </text>
          <rect x="16" y="78" width="208" height="30" rx="8" fill="#060B18" stroke="#1E293B" />
          <text x="120" y="97" textAnchor="middle" fill="#E2E8F0" fontSize="12" fontFamily="IBM Plex Sans Arabic, sans-serif">
            منح 50 نقطة نشاط
          </text>
          <text x="18" y="134" fill="#818CF8" fontSize="12" fontFamily="JetBrains Mono, monospace" fontWeight="700">
            Hash: d92e08
          </text>
        </g>

        {/* Block #2 */}
        <g transform="translate(608, 16)">
          <rect
            width="240"
            height="158"
            rx="16"
            fill="url(#blockCardGrad)"
            stroke="#334155"
            strokeWidth="1.5"
          />
          <rect x="16" y="16" width="88" height="22" rx="6" fill="#0F172A" stroke="#818CF8" strokeOpacity="0.65" />
          <text x="60" y="31" textAnchor="middle" fill="#A5B4FC" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700">
            BLOCK #2
          </text>
          <text x="18" y="64" fill="#818CF8" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700">
            Prev: d92e08
          </text>
          <rect x="16" y="78" width="208" height="30" rx="8" fill="#060B18" stroke="#1E293B" />
          <text x="120" y="97" textAnchor="middle" fill="#E2E8F0" fontSize="12" fontFamily="IBM Plex Sans Arabic, sans-serif">
            شهادة حضور جامعية
          </text>
          <text x="18" y="134" fill="#22D3EE" fontSize="12" fontFamily="JetBrains Mono, monospace" fontWeight="700">
            Hash: 4b81f2
          </text>
        </g>
      </svg>
    </div>
  );
}

/**
 * Visualizes Centralized vs Distributed (Centralized Control) vs Decentralized Mesh
 * revealed AFTER answering a scenario in Challenge 3.
 */
export function TopologyDiagramSvg({
  type,
}: {
  type: 'centralized' | 'distributed' | 'decentralized';
}) {
  return (
    <div className="mt-5 rounded-2xl border border-slate-800 bg-[#080E1E] p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-bold text-slate-200">
          {type === 'centralized' && 'البنية الهندسية: نظام مركزي (Centralized)'}
          {type === 'distributed' && 'البنية الهندسية: موزّع تحت إدارة مركزية'}
          {type === 'decentralized' && 'البنية الهندسية: شبكة لا مركزية موزّعة (Decentralized)'}
        </span>
        <span dir="ltr" className="font-mono-tech text-cyan-300">
          {type === 'centralized' && 'Single Point of Control'}
          {type === 'distributed' && 'Multiple Servers · Single Owner'}
          {type === 'decentralized' && 'Peer-to-Peer Consensus'}
        </span>
      </div>

      <svg
        viewBox="0 0 520 150"
        role="img"
        aria-label={`مخطط بنية النظام: ${type}`}
        className="mx-auto h-36 w-full max-w-lg"
      >
        {type === 'centralized' && (
          <g>
            {[
              [80, 32],
              [80, 118],
              [440, 32],
              [440, 118],
              [260, 18],
            ].map(([x, y], idx) => (
              <g key={idx}>
                <line
                  x1="260"
                  y1="78"
                  x2={x}
                  y2={y}
                  stroke="#475569"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <circle cx={x} cy={y} r="10" fill="#0F172A" stroke="#64748B" strokeWidth="2" />
              </g>
            ))}
            <circle cx="260" cy="78" r="24" fill="#312E81" stroke="#818CF8" strokeWidth="2.5" />
            <text x="260" y="82" textAnchor="middle" fill="#E0E7FF" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700">
              SERVER
            </text>
          </g>
        )}

        {type === 'distributed' && (
          <g>
            {/* Organizational single boundary */}
            <rect
              x="70"
              y="14"
              width="380"
              height="122"
              rx="18"
              fill="#0B1328"
              stroke="#F59E0B"
              strokeOpacity="0.45"
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />
            <text x="260" y="34" textAnchor="middle" fill="#FCD34D" fontSize="11" fontFamily="IBM Plex Sans Arabic, sans-serif">
              إدارة وصلاحية تحكم واحدة
            </text>
            {[
              [140, 95],
              [220, 75],
              [300, 75],
              [380, 95],
            ].map(([x, y], idx) => (
              <g key={idx}>
                <line x1="260" y1="112" x2={x} y2={y} stroke="#F59E0B" strokeOpacity="0.55" strokeWidth="2" />
                <circle cx={x} cy={y} r="13" fill="#172554" stroke="#60A5FA" strokeWidth="2" />
              </g>
            ))}
            <circle cx="260" cy="112" r="15" fill="#78350F" stroke="#FBBF24" strokeWidth="2.5" />
            <text x="260" y="116" textAnchor="middle" fill="#FEF3C7" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="700">
              ADMIN
            </text>
          </g>
        )}

        {type === 'decentralized' && (
          <g>
            {[
              [130, 40, 260, 26],
              [260, 26, 390, 40],
              [130, 40, 170, 118],
              [390, 40, 350, 118],
              [170, 118, 350, 118],
              [130, 40, 350, 118],
              [390, 40, 170, 118],
              [260, 26, 170, 118],
              [260, 26, 350, 118],
            ].map(([x1, y1, x2, y2], idx) => (
              <line
                key={idx}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#06B6D4"
                strokeOpacity="0.55"
                strokeWidth="2"
              />
            ))}
            {[
              { x: 130, y: 40, label: 'N1' },
              { x: 260, y: 26, label: 'N2' },
              { x: 390, y: 40, label: 'N3' },
              { x: 170, y: 118, label: 'N4' },
              { x: 350, y: 118, label: 'N5' },
            ].map((node) => (
              <g key={node.label}>
                <circle cx={node.x} cy={node.y} r="17" fill="#082F49" stroke="#22D3EE" strokeWidth="2.5" />
                <text
                  x={node.x}
                  y={node.y + 4}
                  textAnchor="middle"
                  fill="#ECFEFF"
                  fontSize="11"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="700"
                >
                  {node.label}
                </text>
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}

/**
 * Visualizes the 5 Network Nodes in Challenge 4 Mystery:
 * 4 Nodes hold matching hash 8a4d2f vs 1 isolated Node holding tampered f91c03.
 */
export function MysteryNodesAuditSvg() {
  const nodes = [
    { id: 'Node 1', hash: '8a4d2f', valid: true },
    { id: 'Node 2', hash: '8a4d2f', valid: true },
    { id: 'Node 3', hash: '8a4d2f', valid: true },
    { id: 'Node 4', hash: '8a4d2f', valid: true },
    { id: 'Node 5', hash: 'f91c03', valid: false },
  ];

  return (
    <div className="mt-5 rounded-2xl border border-slate-800 bg-[#080E1E] p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-bold text-slate-200">
          خريطة فحص العُقد الخمس في الشبكة (Network Consensus View)
        </span>
        <span dir="ltr" className="font-mono-tech text-slate-400">
          Block #1 Hash Check
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`rounded-xl border p-2.5 text-center ${
              node.valid
                ? 'border-cyan-500/40 bg-cyan-950/20'
                : 'border-rose-500/50 bg-rose-950/25'
            }`}
          >
            <div dir="ltr" className="font-mono-tech text-xs font-bold text-white">
              {node.id}
            </div>
            <div
              dir="ltr"
              className={`font-mono-tech mt-1 text-xs font-bold ${
                node.valid ? 'text-cyan-300' : 'text-rose-300'
              }`}
            >
              {node.hash}
            </div>
            <div
              className={`mt-1 text-[11px] font-medium ${
                node.valid ? 'text-emerald-300' : 'text-rose-300'
              }`}
            >
              {node.valid ? 'متطابق' : 'مختلف'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Circular progress gauge for the Final Results Certificate.
 */
export function ScoreRingSvg({ score }: { score: number }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const ratio = Math.min(Math.max(score / MAX_SCORE, 0), 1);
  const strokeDashoffset = circumference * (1 - ratio);

  return (
    <div className="relative flex h-28 w-28 shrink-0 items-center justify-center">
      <svg viewBox="0 0 112 112" className="h-full w-full -rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id="scoreRingGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
        </defs>
        <circle
          cx="56"
          cy="56"
          r={radius}
          fill="none"
          stroke="#1E293B"
          strokeWidth="9"
        />
        <circle
          cx="56"
          cy="56"
          r={radius}
          fill="none"
          stroke="url(#scoreRingGrad)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-mono-tech text-2xl font-extrabold text-white tabular-nums">
          {score}
        </span>
        <span className="font-mono-tech text-[11px] text-slate-400 tabular-nums">
          / {MAX_SCORE}
        </span>
      </div>
    </div>
  );
}
