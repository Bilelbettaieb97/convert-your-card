import { j as jsxRuntimeExports } from "../_libs/react.mjs";
function PhoneFrame({ children, gridOverlay = false, scrollHint = false }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-auto", style: { width: 360 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "relative rounded-[44px] p-[10px] shadow-2xl",
      style: {
        background: "linear-gradient(180deg, oklch(0.22 0.01 250), oklch(0.1 0.01 250))",
        boxShadow: "0 30px 80px -20px oklch(0 0 0 / 0.7), 0 0 0 1px oklch(0.3 0.02 250 / 0.5)"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-[36px] bg-background", style: { height: 720 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-1/2 -translate-x-1/2 z-30 h-6 w-28 rounded-full bg-black/90 border border-white/10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", children }),
        scrollHint && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent z-20" }),
        gridOverlay && /* @__PURE__ */ jsxRuntimeExports.jsx(GridOverlay, {})
      ] })
    }
  ) });
}
function GridOverlay() {
  const GUTTER = 20;
  const COLS = 4;
  const innerW = 340 - GUTTER * 2;
  const colW = innerW / COLS;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute inset-0 z-40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 opacity-[0.18]",
        style: {
          backgroundImage: "repeating-linear-gradient(to bottom, oklch(0.78 0.13 200) 0 1px, transparent 1px 8px)"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute top-0 bottom-0 border-x border-dashed",
        style: { left: GUTTER, right: GUTTER, borderColor: "oklch(0.85 0.18 25 / 0.55)" }
      }
    ),
    Array.from({ length: COLS - 1 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute top-0 bottom-0 w-px",
        style: {
          left: GUTTER + colW * (i + 1),
          background: "oklch(0.78 0.13 200 / 0.45)"
        }
      },
      i
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute left-0 right-0 border-y border-dashed",
        style: { top: 8, height: 44, borderColor: "oklch(0.85 0.18 140 / 0.5)" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute top-0 bottom-0 w-px left-1/2",
        style: { background: "oklch(0.85 0.18 25 / 0.6)" }
      }
    )
  ] });
}
export {
  PhoneFrame as P
};
