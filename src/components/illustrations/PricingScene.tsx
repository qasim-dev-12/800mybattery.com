type SceneProps = {
  active: boolean;
  baseDelay: number;
};

const PricingScene = ({ active, baseDelay }: SceneProps) => {
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
          <g transform="rotate(-6 140 70)">
            <g className={cls("wcu-flip")} style={{ ...delay(0), transformOrigin: "140px 70px" }}>
              <rect x="110" y="50" width="60" height="40" rx="8" fill="#FFC933" stroke="#1d2430" strokeWidth="2" />
              <circle cx="120" cy="58" r="4" fill="#ffffff" stroke="#1d2430" strokeWidth="1.5" />
              <text x="140" y="68" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1d2430">AED</text>
              <text x="140" y="84" textAnchor="middle" fontSize="15" fontWeight="800" fill="#1d2430">149</text>
            </g>
          </g>

          <text x="140" y="114" textAnchor="middle" fontSize="10" fill="#94a3b8">call-out fee</text>
          <line
            className={cls("wcu-draw")}
            style={{ ...delay(650), ["--wcu-len" as string]: 64 }}
            x1="109"
            y1="110"
            x2="173"
            y2="110"
            stroke="#1d2430"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="64"
            strokeDashoffset={active ? undefined : 0}
          />

          <path
            className={cls("wcu-draw")}
            style={{ ...delay(1250), ["--wcu-len" as string]: 26 }}
            d="M118,128 L124,134 L134,120"
            fill="none"
            stroke="#22c55e"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="26"
            strokeDashoffset={active ? undefined : 0}
          />
          <text
            className={cls("wcu-fade")}
            style={delay(1350)}
            x="142"
            y="133"
            fontSize="10"
            fontWeight="600"
            fill="#1d2430"
          >
            No hidden fees
          </text>
        </g>
      </svg>
    </div>
  );
};

export default PricingScene;
