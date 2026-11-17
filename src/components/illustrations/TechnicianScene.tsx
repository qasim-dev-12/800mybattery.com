type SceneProps = {
  active: boolean;
  baseDelay: number;
};

const TechnicianScene = ({ active, baseDelay }: SceneProps) => {
  const delay = (ms: number) =>
    active ? { animationDelay: `${baseDelay + ms}ms` } : undefined;
  const cls = (name: string) => (active ? name : "");

  return (
    <div className="wcu-scene-wrap">
      <svg
        viewBox="0 0 280 160"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="wcu-scene-svg"
      >
        <g className="scn-float">
          <line x1="12" y1="130" x2="268" y2="130" stroke="#94a3b8" strokeWidth="2" opacity="0.4" />

          <g>
            <rect x="58" y="112" width="7" height="18" fill="#1d2430" />
            <rect x="72" y="112" width="7" height="18" fill="#1d2430" />
            <rect x="52" y="84" width="33" height="32" rx="10" fill="#FFC933" />
            <rect x="83" y="92" width="9" height="26" rx="4" fill="#f1c27d" />
            <circle cx="68" cy="74" r="13" fill="#f1c27d" />
            <path d="M55,73 a13,11 0 0,1 26,0 Z" fill="#1d2430" />
            <rect x="53" y="70" width="18" height="4" rx="2" fill="#1d2430" />
          </g>

          <g>
            <rect x="96" y="96" width="26" height="20" rx="4" fill="#1d2430" />
            <path d="M101,112 A8,8 0 0,1 109,104" stroke="#ef4444" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M109,104 A8,8 0 0,1 117,112" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" />
            <line
              className={cls("tec-needle")}
              style={{ ...delay(0), transformOrigin: "109px 112px" }}
              x1="109"
              y1="112"
              x2="109"
              y2="105"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          <g>
            <rect x="175" y="108" width="48" height="22" rx="4" fill="#1d2430" />
            <rect x="193" y="102" width="12" height="4" rx="2" fill="#334155" />
            <rect
              className={cls("tec-lid")}
              style={{ ...delay(700), transformOrigin: "175px 108px" }}
              x="175"
              y="100"
              width="48"
              height="10"
              rx="3"
              fill="#334155"
            />
          </g>

          <g className={cls("wcu-pop")} style={{ ...delay(1500), transformOrigin: "235px 42px" }}>
            <circle cx="235" cy="42" r="16" fill="#FFC933" stroke="#1d2430" strokeWidth="2" />
            <path d="M226,54 L231,66 L235,58 Z" fill="#1d2430" />
            <path d="M244,54 L239,66 L235,58 Z" fill="#1d2430" />
            <path d="M235,34 L237,40 L243,40 L238,44 L240,50 L235,46 L230,50 L232,44 L227,40 L233,40 Z" fill="#1d2430" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default TechnicianScene;
