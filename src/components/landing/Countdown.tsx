import { useEffect, useState } from "react";

function getTimeLeft() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  const diff = Math.max(0, end.getTime() - now.getTime());
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { h, m, s };
}

export function Countdown() {
  const [t, setT] = useState(getTimeLeft());
  useEffect(() => {
    const i = setInterval(() => setT(getTimeLeft()), 1000);
    return () => clearInterval(i);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="inline-flex items-center gap-2 font-mono font-bold tabular-nums">
      <span className="bg-foreground/10 px-2 py-1 rounded-md">{pad(t.h)}h</span>
      <span className="bg-foreground/10 px-2 py-1 rounded-md">{pad(t.m)}m</span>
      <span className="bg-foreground/10 px-2 py-1 rounded-md">{pad(t.s)}s</span>
    </div>
  );
}
