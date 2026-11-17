"use client";

type VehicleSceneProps = {
  activeIndex: number;
  prevIndex: number | null;
  cycle: number;
};

const renderWheel = (cx: number, cy: number, r: number, spin?: boolean) => (
  <g
    className={spin ? "vt-spin" : undefined}
    style={spin ? { transformOrigin: `${cx}px ${cy}px` } : undefined}
  >
    <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1d2430" strokeWidth={r > 14 ? 6 : 4} />
    {spin ? (
      <>
        <line x1={cx - r + 4} y1={cy} x2={cx + r - 4} y2={cy} stroke="#1d2430" strokeWidth={2} />
        <line x1={cx} y1={cy - r + 4} x2={cx} y2={cy + r - 4} stroke="#1d2430" strokeWidth={2} />
      </>
    ) : (
      <circle cx={cx} cy={cy} r={r * 0.4} fill="#cbd5e1" />
    )}
  </g>
);

const renderVehicleBody = (index: number) => {
  switch (index) {
    case 0:
      return (
        <>
          <g className="vt-vehicle-idle">
            <rect x="220" y="256" width="120" height="34" rx="10" fill="#334155" />
            <rect x="248" y="232" width="64" height="28" rx="8" fill="#334155" />
            <rect x="254" y="238" width="52" height="16" rx="4" fill="#cbd5e1" opacity="0.9" />
            {renderWheel(245, 296, 16)}
            {renderWheel(315, 296, 16)}
          </g>
          <g className="vt-pop" style={{ transformOrigin: "280px 204px" }}>
            <rect x="271" y="192" width="18" height="24" rx="3" fill="none" stroke="#FFC933" strokeWidth={2} />
            <rect x="276" y="188" width="8" height="4" fill="#FFC933" />
            <path d="M283,197 L277,206 L280.5,206 L278,214 L287,203 L282.5,203 Z" fill="#FFC933" />
          </g>
        </>
      );
    case 1:
      return (
        <>
          <g className="vt-vehicle-idle">
            <rect x="215" y="262" width="130" height="26" rx="13" fill="#1d2430" />
            <rect x="250" y="244" width="58" height="20" rx="10" fill="#1d2430" />
            <rect x="255" y="248" width="48" height="12" rx="4" fill="#94a3b8" />
            <rect x="215" y="272" width="130" height="4" fill="#FFC933" />
            {renderWheel(240, 296, 15)}
            {renderWheel(320, 296, 15)}
          </g>
          <g className="vt-sweep">
            <path d="M225,288 L245,244 L261,244 L241,288 Z" fill="#ffffff" />
          </g>
        </>
      );
    case 2:
      return (
        <g className="vt-vehicle-idle vt-bounce">
          <rect x="210" y="250" width="140" height="42" rx="8" fill="#334155" />
          <rect x="210" y="224" width="55" height="30" rx="6" fill="#334155" />
          <rect x="216" y="230" width="40" height="16" rx="3" fill="#cbd5e1" />
          <rect x="268" y="250" width="82" height="4" fill="#0f172a" opacity="0.4" />
          {renderWheel(235, 296, 18)}
          {renderWheel(325, 296, 18)}
        </g>
      );
    case 3:
      return (
        <g className="vt-vehicle-idle">
          <rect x="255" y="270" width="50" height="14" rx="6" fill="#1d2430" />
          <rect x="270" y="260" width="22" height="10" rx="4" fill="#334155" />
          <line x1="296" y1="250" x2="310" y2="262" stroke="#334155" strokeWidth={4} strokeLinecap="round" />
          {renderWheel(255, 296, 20, true)}
          {renderWheel(315, 296, 20, true)}
        </g>
      );
    case 4:
      return (
        <g className="vt-vehicle-idle">
          <rect x="175" y="272" width="50" height="20" rx="6" fill="#334155" />
          <rect x="185" y="260" width="30" height="14" rx="5" fill="#334155" />
          {renderWheel(185, 296, 10)}
          {renderWheel(215, 296, 10)}

          <rect x="255" y="268" width="50" height="20" rx="6" fill="#1d2430" />
          <rect x="265" y="256" width="30" height="14" rx="5" fill="#1d2430" />
          {renderWheel(265, 296, 10)}
          {renderWheel(295, 296, 10)}

          <rect x="335" y="274" width="50" height="20" rx="6" fill="#334155" />
          <rect x="345" y="262" width="30" height="14" rx="5" fill="#334155" />
          {renderWheel(345, 296, 10)}
          {renderWheel(375, 296, 10)}
        </g>
      );
    case 5:
    default:
      return (
        <>
          <g className="vt-vehicle-idle">
            <rect x="220" y="256" width="120" height="34" rx="10" fill="#334155" />
            <rect x="248" y="232" width="64" height="28" rx="8" fill="#334155" />
            <rect x="254" y="238" width="52" height="16" rx="4" fill="#cbd5e1" opacity="0.9" />
            {renderWheel(245, 296, 16)}
            {renderWheel(315, 296, 16)}
            <rect
              className="vt-charge-fill"
              x="226"
              y="276"
              width="108"
              height="5"
              rx="2.5"
              fill="#22c55e"
              style={{ transformOrigin: "226px 278.5px" }}
            />
          </g>
          <g className="vt-ev-bolt" style={{ transformOrigin: "280px 204px" }}>
            <path d="M286,190 L271,210 L278,210 L274,222 L292,198 L284,198 Z" fill="#22c55e" />
          </g>
        </>
      );
  }
};

const VehicleScene = ({ activeIndex, prevIndex, cycle }: VehicleSceneProps) => {
  const slots = [0, 1, 2, 3, 4, 5].filter((i) => i === activeIndex || i === prevIndex);

  return (
    <div className="vt-scene-wrap">
      <svg
        className="vt-scene-svg"
        viewBox="0 0 560 360"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Animated scene of sedans, luxury cars, pickups, motorcycles, fleet vehicles and electric cars each receiving on-site battery service"
      >
        <circle className="vt-sun" cx="460" cy="70" r="40" fill="#FFC933" opacity="0.25" />

        <g className="vt-sky-far" fill="#334155" opacity="0.25">
          <rect x="30" y="150" width="26" height="70" />
          <rect x="70" y="120" width="30" height="100" />
          <rect x="115" y="160" width="22" height="60" />
          <rect x="400" y="140" width="28" height="80" />
          <rect x="440" y="110" width="24" height="110" />
        </g>

        <g className="vt-sky-near" fill="#1d2430" opacity="0.3">
          <rect x="150" y="170" width="34" height="50" />
          <rect x="195" y="140" width="26" height="80" />
          <rect x="330" y="165" width="30" height="55" />
          <rect x="365" y="130" width="26" height="90" />
        </g>

        <rect x="0" y="300" width="560" height="40" fill="#1d2430" />
        <g className="vt-lane">
          {Array.from({ length: 18 }).map((_, i) => (
            <rect key={i} x={i * 46} y="318" width="26" height="4" rx="2" fill="#FFC933" opacity="0.8" />
          ))}
        </g>

        {slots.map((i) => {
          const isActive = i === activeIndex;
          const stateClass =
            i === 4 ? "vt-fleet-pass" : isActive ? "vt-enter" : "vt-exit";
          const key = `v-${i}-${cycle}`;
          return (
            <g key={key} className={`vt-vehicle-outer ${stateClass}`}>
              {renderVehicleBody(i)}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default VehicleScene;
