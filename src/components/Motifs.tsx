import { useId } from "react";

// Stylised versions of motifs from Sinhalese decorative art:
// pala-peti (lotus-petal border), nelum mala (lotus ring), liyawel (scrolling vine)
// and the sandakada pahana (moonstone) that sits at temple thresholds.

const round = (n: number) => Math.round(n * 100) / 100;

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return `${round(cx + r * Math.cos(rad))} ${round(cy + r * Math.sin(rad))}`;
}

function petalPaths(
  cx: number,
  cy: number,
  inner: number,
  outer: number,
  count: number,
  from = 0,
  to = 360,
) {
  const step = (to - from) / count;
  const shoulder = inner + (outer - inner) * 0.7;
  return Array.from({ length: count }, (_, i) => {
    const mid = from + step * (i + 0.5);
    const left = mid - step / 2;
    const right = mid + step / 2;
    return [
      `M${polar(cx, cy, inner, left)}`,
      `Q${polar(cx, cy, shoulder, left)} ${polar(cx, cy, outer, mid)}`,
      `Q${polar(cx, cy, shoulder, right)} ${polar(cx, cy, inner, right)}`,
      "Z",
    ].join(" ");
  });
}

function vinePath(
  cx: number,
  cy: number,
  radius: number,
  amplitude: number,
  waves: number,
  from: number,
  to: number,
) {
  const points = 160;
  return Array.from({ length: points + 1 }, (_, i) => {
    const t = i / points;
    const r = radius + amplitude * Math.sin(t * waves * 2 * Math.PI);
    return `${i === 0 ? "M" : "L"}${polar(cx, cy, r, from + (to - from) * t)}`;
  }).join(" ");
}

/** A row of lotus petals. `className` sets the petal colour through `text-*`. */
export function PalaPeti({ className = "" }: { className?: string }) {
  const id = useId();
  return (
    <svg aria-hidden className={`block h-7 w-full ${className}`}>
      <defs>
        <pattern id={id} width="32" height="28" patternUnits="userSpaceOnUse">
          <path d="M0 28 Q0 8 16 0 Q32 8 32 28 Z" fill="currentColor" />
          <path
            d="M8 28 Q8 15 16 10 Q24 15 24 28"
            fill="none"
            className="stroke-husk"
            strokeWidth="1.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="28" fill={`url(#${id})`} />
    </svg>
  );
}

/** A full ring of lotus petals, drawn in a 200×200 box. */
export function LotusRing({
  inner,
  outer,
  count,
  className = "",
}: {
  inner: number;
  outer: number;
  count: number;
  className?: string;
}) {
  return (
    <svg aria-hidden viewBox="0 0 200 200" className={className}>
      {petalPaths(100, 100, inner, outer, count).map((d) => (
        <path
          key={d}
          d={d}
          className="fill-thambili/15 stroke-husk"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

/** Half moonstone: flames, vine, lotus petals and a half lotus at the centre. */
export function Moonstone({ className = "" }: { className?: string }) {
  const cx = 200;
  const cy = 200;
  const arc = (r: number) =>
    `M${cx - r} ${cy} A${r} ${r} 0 0 1 ${cx + r} ${cy} Z`;

  return (
    <svg aria-hidden viewBox="0 0 400 200" className={className}>
      {petalPaths(cx, cy, 178, 200, 44, 180, 360).map((d) => (
        <path key={d} d={d} className="fill-thambili" />
      ))}
      <path d={arc(178)} className="fill-shell" />
      <path
        d={vinePath(cx, cy, 162, 7, 14, 180, 360)}
        fill="none"
        className="stroke-husk"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d={arc(146)} className="fill-husk" />
      <path d={arc(141)} className="fill-frond" />
      {petalPaths(cx, cy, 96, 138, 18, 180, 360).map((d) => (
        <path
          key={d}
          d={d}
          className="fill-water stroke-frond"
          strokeWidth="2"
        />
      ))}
      <path d={arc(96)} className="fill-shell" />
      {petalPaths(cx, cy, 30, 88, 9, 180, 360).map((d) => (
        <path
          key={d}
          d={d}
          className="fill-thambili stroke-shell"
          strokeWidth="2"
        />
      ))}
      {petalPaths(cx, cy, 30, 62, 8, 190, 350).map((d) => (
        <path
          key={d}
          d={d}
          className="fill-kernel stroke-shell"
          strokeWidth="2"
        />
      ))}
      <path d={arc(30)} className="fill-husk" />
    </svg>
  );
}
