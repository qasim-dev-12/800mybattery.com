type SceneProps = {
  active: boolean;
  baseDelay: number;
};

const ResponseScene = ({ active, baseDelay }: SceneProps) => {
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
            <rect x="55" y="96" width="72" height="28" rx="9" fill="#334155" />
            <rect x="70" y="80" width="36" height="20" rx="6" fill="#334155" />
            <rect x="76" y="85" width="24" height="11" rx="3" fill="#cbd5e1" />
            <circle cx="72" cy="126" r="10" fill="#1d2430" />
            <circle cx="72" cy="126" r="4" fill="#cbd5e1" />
            <circle cx="110" cy="126" r="10" fill="#1d2430" />
            <circle cx="110" cy="126" r="4" fill="#cbd5e1" />
            <rect
              className={cls("rsp-hazard")}
              style={delay(800)}
              x="87"
              y="76"
              width="7"
              height="7"
              rx="1.5"
              fill="#FFC933"
            />
          </g>

          <g className={cls("wcu-pop")} style={{ ...delay(2450), transformOrigin: "91px 62px" }}>
            <circle cx="91" cy="62" r="11" fill="#22c55e" />
            <path
              d="M85,62 L89,67 L97,55"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          <g>
            <rect x="16" y="8" width="8" height="6" rx="2" fill="#1d2430" />
            <circle cx="36" cy="40" r="24" fill="#ffffff" stroke="#1d2430" strokeWidth="3" />
            <text
              x="36"
              y="57"
              textAnchor="middle"
              fontSize="8"
              fontWeight="700"
              fill="#1d2430"
              className={cls("wcu-fade")}
              style={delay(750)}
            >
              30
            </text>
            <line
              className={cls("rsp-hand")}
              style={{ ...delay(0), transformOrigin: "36px 40px" }}
              x1="36"
              y1="40"
              x2="36"
              y2="22"
              stroke="#FFC933"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>

          <g className={cls("wcu-enter-right")} style={delay(100)}>
            <rect x="172" y="84" width="76" height="38" rx="10" fill="#1d2430" />
            <rect x="172" y="104" width="76" height="6" fill="#FFC933" />
            <rect x="224" y="90" width="18" height="16" rx="3" fill="#cbd5e1" />
            <circle cx="192" cy="126" r="11" fill="#1d2430" />
            <circle cx="192" cy="126" r="4" fill="#cbd5e1" />
            <circle cx="232" cy="126" r="11" fill="#1d2430" />
            <circle cx="232" cy="126" r="4" fill="#cbd5e1" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default ResponseScene;
