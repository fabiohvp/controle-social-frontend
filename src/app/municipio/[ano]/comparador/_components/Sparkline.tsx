export default function Sparkline({
  values,
  color = "#607D8B",
  width = 120,
  height = 24,
}: {
  values?: (number | null | undefined)[];
  color?: string;
  width?: number;
  height?: number;
}) {
  if (!values || values.length === 0) return null;

  const valid = values.map((v) => (typeof v === "number" && !Number.isNaN(v) ? v : 0));
  const min = Math.min(...valid);
  const max = Math.max(...valid);
  const range = max - min || 1;

  const padding = 2;
  const drawWidth = width - padding * 2;
  const drawHeight = height - padding * 2;

  const points = valid
    .map((v, i) => {
      const x = padding + (i / (valid.length - 1 || 1)) * drawWidth;
      const y = height - padding - ((v - min) / range) * drawHeight;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const lastX = padding + drawWidth;
  const lastY = height - padding - ((valid[valid.length - 1] - min) / range) * drawHeight;

  return (
    <svg
      width={width}
      height={height}
      className="inline-block overflow-visible align-middle"
    >
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
      <circle cx={lastX} cy={lastY} r="2.5" fill={color} />
    </svg>
  );
}
