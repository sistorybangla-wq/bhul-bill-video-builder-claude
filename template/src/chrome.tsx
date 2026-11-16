import React, { useEffect, useState } from 'react';
import { AbsoluteFill, Sequence, delayRender, continueRender, interpolate, spring, staticFile, useCurrentFrame } from 'remotion';
import { C, FPS, SPRING, T, clamp } from './theme';
import { CAPS, SCENE_TAGS, Cap } from './data';
import { PAGE_NAME } from './brand';

const FONTS: [string, string, string][] = [
  ['Hind', '600', 'hind-siliguri-bengali-600-normal.woff2'],
  ['Hind', '700', 'hind-siliguri-bengali-700-normal.woff2'],
  ['NSB', '800', 'noto-serif-bengali-bengali-800-normal.woff2'],
];

export const useFonts = () => {
  const [h] = useState(() => delayRender('fonts'));
  useEffect(() => {
    Promise.all(FONTS.map(([f, w, u]) => new FontFace(f, `url(${staticFile('fonts/' + u)})`, { weight: w }).load().then((ff) => document.fonts.add(ff))))
      .then(() => continueRender(h))
      .catch(() => continueRender(h));
  }, [h]);
};

export const Stage: React.FC<{ dur: number; push?: number; children: React.ReactNode; bg?: string }> = ({ dur, push = 0.05, children, bg }) => {
  const f = useCurrentFrame();
  const sc = 1 + push * (f / dur);
  const op = interpolate(f, [0, 4], [0.55, 1], clamp);
  return (
    <AbsoluteFill style={{ background: bg ?? C.beige, opacity: op }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${sc})`, transformOrigin: '50% 58%' }}>
        <div style={{ width: 540, height: 960, transform: 'scale(2)', transformOrigin: '0 0', position: 'relative', overflow: 'hidden' }}>
          <svg width={540} height={960} viewBox="0 0 540 960" style={{ position: 'absolute', left: 0, top: 0 }}>{children}</svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const parse = (t: string) =>
  t.split('\n').map((line, i) => (
    <div key={i}>
      {line.split(/(\{[^}]+\})/).map((p, j) =>
        p.startsWith('{') ? <b key={j} style={{ color: C.red }}>{p.slice(1, -1)}</b> : <span key={j}>{p}</span>
      )}
    </div>
  ));

const Caption: React.FC<{ cap: Cap; len: number }> = ({ cap, len }) => {
  const f = useCurrentFrame();
  const sp = spring({ frame: f, fps: FPS, config: SPRING });
  const out = interpolate(f, [len - 5, len], [1, 0], clamp);
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 168, display: 'flex', justifyContent: 'center', opacity: Math.min(1, sp) * out, transform: `translateY(${(1 - sp) * 14}px) scale(${1 + (1 - sp) * 0.02})` }}>
      <div style={{ maxWidth: 460, padding: '12px 24px', borderRadius: 20, background: C.card, boxShadow: '0 4px 14px #0003', fontFamily: 'Hind', fontWeight: 700, fontSize: 28, lineHeight: 1.38, color: C.ink, textAlign: 'center', border: `2px solid ${C.outline}33` }}>
        {cap.who && <div style={{ fontSize: 14, fontWeight: 600, color: '#8a7a68', marginBottom: 2 }}>● {cap.who}</div>}
        {parse(cap.t)}
      </div>
    </div>
  );
};

export const Overlay: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const tag = SCENE_TAGS.find((x) => t >= x.s + 0.15 && t < x.e);
  const ts = tag ? tag.s : 0;
  const tsp = spring({ frame: f - T(ts + 0.2), fps: FPS, config: SPRING });
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', inset: 0 }}>
        <div style={{ width: 540, height: 960, transform: 'scale(2)', transformOrigin: '0 0', position: 'relative' }}>
          {PAGE_NAME !== '' && (
            <div style={{ position: 'absolute', left: '50%', top: 26, transform: 'translateX(-50%)', padding: '6px 26px', borderRadius: 24, background: '#f1e8d8d9', fontFamily: 'NSB', fontWeight: 800, fontSize: 18, color: C.ink, border: `2px solid ${C.outline}`, boxShadow: '0 3px 10px #0002' }}>{PAGE_NAME}</div>
          )}
          {tag && (
            <div style={{ position: 'absolute', left: '50%', top: 68, transform: `translateX(-50%) scale(${0.85 + 0.15 * Math.min(1, tsp)})`, opacity: Math.min(1, tsp), padding: '7px 24px 8px', borderRadius: 20, background: '#f6efe8', border: `3px solid ${C.red}`, fontFamily: 'NSB', fontWeight: 800, fontSize: 26, color: C.ink, boxShadow: '0 3px 10px #0002' }}>
              <i style={{ display: 'inline-block', width: 13, height: 13, borderRadius: '50%', background: C.red, marginRight: 11, verticalAlign: 'middle' }} />{tag.tag}
            </div>
          )}
          {CAPS.map((c, i) => {
            const len = T(c.e + 0.18) - T(c.s);
            return (
              <Sequence key={i} from={T(c.s)} durationInFrames={len}>
                <Caption cap={c} len={len} />
              </Sequence>
            );
          })}
        </div>
      </div>
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(30,15,5,0.22) 100%)', pointerEvents: 'none' }} />
      <AbsoluteFill style={{ opacity: 0.1, mixBlendMode: 'multiply', pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncA type='table' tableValues='0 0.15'/></feComponentTransfer></filter><rect width='300' height='300' filter='url(%23n)'/></svg>")` }} />
    </AbsoluteFill>
  );
};
