type SceneProps = {
  active: boolean;
  baseDelay: number;
};

const PINS: [number, number][] = [
  [30, 90],
  [85, 60],
  [140, 95],
  [195, 55],
  [245, 85],
];

const VAN_CENTER: [number, number] = [233, 80];

const CoverageScene = ({ active, baseDelay }: SceneProps) => {
  const delay = (ms: number) =>
    active ? { animationDelay: `${baseDelay + ms}ms` } : undefined;
  const cls = (name: string) => (active ? name : "");

  const [vx, vy] = VAN_CENTER;

  return (
    <div className="wcu-scene-wrap">
      <svg
        viewBox="0 0 280 160"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="wcu-scene-svg"
      >
        <g className="scn-float">
          <path
            d="M10,40 C60,10 140,15 200,25 C250,32 270,70 250,110 C220,140 150,135 100,140 C50,145 15,110 10,80 Z"
            fill="#1d2430"
            opacity="0.06"
          />

          <path
            d="M20,95 C60,60 100,100 140,70 C180,40 210,90 255,75"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2.5"
            strokeDasharray="5 6"
            opacity="0.5"
          />

          <g opacity="0.9">
            <ellipse cx="245" cy="124" rx="18" ry="6" fill="#FFC933" opacity="0.25" />
            <line x1="245" y1="122" x2="245" y2="104" stroke="#1d2430" strokeWidth="2" />
            <line x1="245" y1="104" x2="233" y2="96" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
            <line x1="245" y1="104" x2="239" y2="92" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
            <line x1="245" y1="104" x2="245" y2="90" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
            <line x1="245" y1="104" x2="251" y2="92" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
            <line x1="245" y1="104" x2="257" y2="96" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
          </g>

          {PINS.map(([x, y], i) => (
            <g key={i}>
              <circle
                className={cls("wcu-ring-pulse")}
                style={delay(i * 180 + 500)}
                cx={x}
                cy={y}
                r="6"
                fill="none"
                stroke="#FFC933"
                strokeWidth="2"
              />
              <g
                className={cls("wcu-drop")}
                style={{ ...delay(i * 180), transformOrigin: `${x}px ${y}px` }}
              >
                <path d={`M${x - 4},${y - 2} L${x + 4},${y - 2} L${x},${y + 5} Z`} fill="#FFC933" stroke="#1d2430" strokeWidth="1" />
                <circle cx={x} cy={y - 8} r="6" fill="#FFC933" stroke="#1d2430" strokeWidth="1.5" />
              </g>
            </g>
          ))}

          <g className={cls("wcu-van-travel")} style={delay(1300)}>
            <rect x={vx - 13} y={vy - 7} width="26" height="14" rx="4" fill="#1d2430" />
            <rect x={vx - 13} y={vy} width="26" height="3" fill="#FFC933" />
            <circle cx={vx - 7} cy={vy + 8} r="4" fill="#1d2430" />
            <circle cx={vx - 7} cy={vy + 8} r="1.6" fill="#cbd5e1" />
            <circle cx={vx + 7} cy={vy + 8} r="4" fill="#1d2430" />
            <circle cx={vx + 7} cy={vy + 8} r="1.6" fill="#cbd5e1" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default CoverageScene;
