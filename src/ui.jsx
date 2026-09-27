import React, { useState } from "react";

// Parses an inline CSS string (as written in the design file) into a React style object,
// so every style from the Claude Design handoff can be kept verbatim.
export function s(str) {
  const out = {};
  if (!str) return out;
  str.split(";").forEach((decl) => {
    const i = decl.indexOf(":");
    if (i < 0) return;
    let key = decl.slice(0, i).trim();
    const val = decl.slice(i + 1).trim();
    if (!key) return;
    if (!key.startsWith("--")) {
      key = key.replace(/^-webkit-/, "Webkit-").replace(/-([a-zA-Z])/g, (_, c) => c.toUpperCase());
    }
    out[key] = val;
  });
  return out;
}

// Element with the design's `style-hover` / `style-focus` behaviour.
export function X({ as: Tag = "div", style, hover, focus, ...rest }) {
  const [h, setH] = useState(false);
  const [f, setF] = useState(false);
  const st = { ...s(style), ...(h && hover ? s(hover) : null), ...(f && focus ? s(focus) : null) };
  const props = { ...rest, style: st };
  if (hover) {
    props.onMouseEnter = () => setH(true);
    props.onMouseLeave = () => setH(false);
  }
  if (focus) {
    props.onFocus = () => setF(true);
    props.onBlur = () => setF(false);
  }
  return <Tag {...props} />;
}

const P = {
  instagram: [["rect", { x: 3, y: 3, width: 18, height: 18, rx: 5 }], ["circle", { cx: 12, cy: 12, r: 4 }], ["circle", { cx: 17.3, cy: 6.7, r: 0.7, fill: "currentColor" }]],
  youtube: [["rect", { x: 2.5, y: 5.5, width: 19, height: 13, rx: 4 }], ["path", { d: "M10.5 9.5l4.5 2.5-4.5 2.5z" }]],
  x: [["path", { d: "M4.5 4h4l11 16h-4z" }], ["path", { d: "M19.5 4l-6.6 7.6M4.5 20l6.6-7.6" }]],
  tiktok: [["path", { d: "M14 3.5v11a3.5 3.5 0 1 1-3.5-3.5" }], ["path", { d: "M14 3.5c.4 2.4 2.3 4.3 4.8 4.6" }]],
  snapchat: [["path", { d: "M12 3.2C15.1 3.2 16.9 5.4 16.9 8.3V10.6C17.6 10.4 18.6 10.3 18.9 10.9C19.2 11.6 18.3 12 17.4 12.3C17.8 14.2 19.3 15.7 20.8 16.3C20.4 17.1 19 17.2 17.9 17.4C17.6 18.2 17.3 18.7 16.4 18.6C15.3 18.5 14.4 18.9 13.6 19.6C12.9 20.2 11.1 20.2 10.4 19.6C9.6 18.9 8.7 18.5 7.6 18.6C6.7 18.7 6.4 18.2 6.1 17.4C5 17.2 3.6 17.1 3.2 16.3C4.7 15.7 6.2 14.2 6.6 12.3C5.7 12 4.8 11.6 5.1 10.9C5.4 10.3 6.4 10.4 7.1 10.6V8.3C7.1 5.4 8.9 3.2 12 3.2Z" }]],
  threads: [["path", { d: "M16.5 11.2c-.5-2.8-2.4-4.2-4.8-4.2-2.9 0-4.9 2.2-4.9 5.3S8.6 18 12 18c2.9 0 4.9-1.7 4.9-3.9 0-2.4-2.4-3.1-4.4-2.9-1.9.2-2.9 1.1-2.9 2.2 0 1.1 1 1.9 2.2 1.9 1.9 0 2.9-1.6 3.1-4.1" }]],
  facebook: [["path", { d: "M14 8.5h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.5L17 11h-3V9a.5.5 0 0 1 .5-.5z" }]],
  brief: [["rect", { x: 3, y: 7, width: 18, height: 13, rx: 2 }], ["path", { d: "M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7" }], ["path", { d: "M3 12.5h18" }]],
  bag: [["path", { d: "M6 3 3.5 6.5V19a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V6.5L18 3z" }], ["path", { d: "M3.5 6.5h17" }], ["path", { d: "M15.5 10a3.5 3.5 0 0 1-7 0" }]],
  grid: [["rect", { x: 3.5, y: 3.5, width: 7, height: 7, rx: 1.5 }], ["rect", { x: 13.5, y: 3.5, width: 7, height: 7, rx: 1.5 }], ["rect", { x: 3.5, y: 13.5, width: 7, height: 7, rx: 1.5 }], ["rect", { x: 13.5, y: 13.5, width: 7, height: 7, rx: 1.5 }]],
  folder: [["path", { d: "M3.5 7.5A2 2 0 0 1 5.5 5.5h4l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" }]],
  calendar: [["rect", { x: 3.5, y: 5, width: 17, height: 15.5, rx: 2 }], ["path", { d: "M3.5 10h17M8 3v4M16 3v4" }]],
  file: [["path", { d: "M14 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5z" }], ["path", { d: "M14 3.5v5h5M9 13h6M9 16.5h4" }]],
  userplus: [["path", { d: "M15 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 3 18.5V20" }], ["circle", { cx: 9, cy: 8, r: 3.5 }], ["path", { d: "M19 8v6M16 11h6" }]],
  search: [["circle", { cx: 11, cy: 11, r: 6.5 }], ["path", { d: "m20 20-4.2-4.2" }]],
  bell: [["path", { d: "M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" }], ["path", { d: "M10 20.5a2 2 0 0 0 4 0" }]],
  play: [["path", { d: "M8 5.5v13l10-6.5z" }]],
  link: [["path", { d: "M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1" }], ["path", { d: "M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" }]],
  users: [["path", { d: "M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20" }], ["circle", { cx: 10, cy: 8, r: 3.5 }], ["path", { d: "M20 20v-1.5a3.5 3.5 0 0 0-2.5-3.35" }], ["path", { d: "M15.5 4.6a3.5 3.5 0 0 1 0 6.8" }]],
};

export function Icon({ kind, size, color }) {
  const parts = P[kind] || [];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", color }}>
      {parts.map(([Tag, attrs], i) => <Tag key={i} {...attrs} />)}
    </svg>
  );
}

export const icon = (kind, size, color) => <Icon kind={kind} size={size} color={color} />;

export function Logo({ width = 20, height = 21, label }) {
  return (
    <svg width={width} height={height} viewBox="0 0 258 268" fill="#3B0CEB" aria-hidden={label ? undefined : "true"} aria-label={label} style={{ display: "block", flex: "none" }}>
      <path d="M50 0H258V13L210 60H70L42 89H0V50Z" />
      <path d="M218 75H258V115L210 163H70L42 192H0V153L50 104H188Z" />
      <path d="M218 179H258V219L210 268H0V258L50 209H188Z" />
    </svg>
  );
}
