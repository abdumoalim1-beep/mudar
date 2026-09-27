import React, { useEffect, useRef, useState } from "react";
import { s, X, Logo } from "./ui.jsx";
import JoinModal from "./JoinModal.jsx";
import {
  tabNames, tilesWide, tilesNarrow, tilesMobile, infl, posts, kpis, camps, sideFor, platforms, features, audiences, plans, faqData,
  chartPath, line2, line3, areaPath, legend, icSearch, icBell, icTik,
} from "./data.jsx";

// Login is hidden until the platform is ready. Flip to true to show it in the nav and footer.
const SHOW_LOGIN = false;

function useReveal() {
  useEffect(() => {
    const init = () => {
      const targets = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]:not([data-rv])"));
      targets.forEach((t) => {
        t.setAttribute("data-rv", "1");
        t.style.opacity = "0";
        t.style.transform = "translateY(18px)";
        t.style.transition = "opacity 0.9s ease, transform 1s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s ease";
      });
      return targets;
    };
    let pending = init();
    const check = () => {
      pending = pending.concat(init());
      const vh = window.innerHeight || 800;
      let n = 0;
      pending = pending.filter((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh - 40 && r.bottom > 0) {
          const d = (n++ % 3) * 90;
          setTimeout(() => { el.style.opacity = "1"; el.style.transform = ""; }, d);
          return false;
        }
        return true;
      });
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    const timer = setInterval(check, 400);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);
}

export default function App() {
  const [tab, setTab] = useState(1);
  const [openFaq, setOpenFaq] = useState(0);
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  const [scrolled, setScrolled] = useState(false);
  const [tilt, setTilt] = useState(16);
  const [joinOpen, setJoinOpen] = useState(false);
  const dash = useRef(null);
  const userPicked = useRef(false);
  const tiltRef = useRef(16);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (dash.current) {
        const vh = window.innerHeight || 800;
        const top = dash.current.getBoundingClientRect().top;
        const t = Math.max(0, Math.min(1, (top - vh * 0.12) / (vh * 0.6))) * 16;
        if (Math.abs(t - tiltRef.current) > 0.2) { tiltRef.current = t; setTilt(t); }
      }
    };
    onResize(); onScroll();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    const tabTimer = setInterval(() => { if (!userPicked.current) setTab((t) => (t + 1) % 3); }, 5000);
    return () => {
      clearInterval(tabTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useReveal();

  const openJoin = (e) => { if (e) e.preventDefault(); setJoinOpen(true); };
  const wide = vw >= 1100;
  const mobile = vw < 640;
  const tiles = wide ? tilesWide : mobile ? tilesMobile : tilesNarrow;
  // Below desktop width the dashboard mockup is rendered at a fixed virtual width and scaled
  // down as a whole, so it keeps the desktop layout instead of squeezing its tables.
  // On phones the sidebar is dropped so the content stays legible.
  const dashW = mobile ? 900 : 1180;
  const dashK = Math.min(1, (Math.min(vw, 1180 + 40) - 40) / dashW);
  const dashH = mobile ? 540 : 600;
  const side = sideFor(tab);
  const navBg = scrolled ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.28)";
  const navShadow = scrolled ? "0 8px 24px rgba(22,21,31,0.06)" : "0 2px 10px rgba(22,21,31,0.03)";

  return (
    <>
      <header dir="rtl" style={s("position: fixed; top: 12px; left: 0; right: 0; z-index: 50; padding: 0 16px; pointer-events: none;")}>
        <nav style={s(`pointer-events: auto; max-width: 780px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 5px; padding-inline-start: 20px; border-radius: 999px; background: ${navBg}; border: 1px solid rgba(255,255,255,0.7); box-shadow: inset 0 1px 0 rgba(255,255,255,0.8), ${navShadow}; backdrop-filter: blur(24px) saturate(1.8); -webkit-backdrop-filter: blur(24px) saturate(1.8); transition: background 0.35s ease, box-shadow 0.35s ease;`)}>
          <a href="#top" style={s("display: flex; align-items: center; gap: 9px; color: #16151F;")}>
            <Logo /><span style={s("font-size: 16px; font-weight: 600;")}>مُدار</span>
          </a>
          <div style={s("display: flex; align-items: center; gap: 26px; font-size: 15px; font-weight: 500;")}>
            <a href="#features" style={s("color: #72717F;")}>المزايا</a>
            <a href="#pricing" style={s("color: #72717F;")}>الأسعار</a>
          </div>
          <div style={s("display: flex; align-items: center; gap: 6px;")}>
            {SHOW_LOGIN && <a href="#cta" style={s("font-size: 14px; font-weight: 500; color: #72717F; padding: 8px 12px;")}>تسجيل الدخول</a>}
            <X as="a" href="#cta" onClick={openJoin} style="font-size: 14.5px; font-weight: 600; color: #ffffff; background: #3B0CEB; border-radius: 999px; padding: 8px 16px; white-space: nowrap; box-shadow: none; transition: background 0.2s ease;" hover="background: #2A0AA8; color: #ffffff;">انضم مجانًا</X>
          </div>
        </nav>
      </header>

      <section id="top" dir="rtl" style={s(`position: relative; overflow: hidden; padding: ${mobile ? 120 : 150}px 20px 0; background: linear-gradient(180deg, #ECE8FD 0%, #EFECFD 30%, #F3F1FE 55%, #F5F3FE 78%, #F8F8FB 96%);`)}>
        <div aria-hidden="true" style={s("position: absolute; inset: 0; pointer-events: none; overflow: hidden;")}>
          <div style={s("position: absolute; top: 60px; left: -8%; width: 60%; height: 220px; border-radius: 50%; background: radial-gradient(closest-side, rgba(255,255,255,0.55), rgba(255,255,255,0)); filter: blur(16px); animation: fmDrift 26s ease-in-out infinite;")}></div>
          <div style={s("position: absolute; top: 20px; right: -10%; width: 55%; height: 180px; border-radius: 50%; background: radial-gradient(closest-side, rgba(255,255,255,0.55), rgba(255,255,255,0)); filter: blur(16px); animation: fmDrift 32s ease-in-out infinite reverse;")}></div>
          <div style={s("position: absolute; top: 330px; left: 20%; width: 70%; height: 260px; border-radius: 50%; background: radial-gradient(closest-side, rgba(226,219,253,0.45), rgba(226,219,253,0)); filter: blur(14px);")}></div>
          <div style={s("position: absolute; top: 520px; left: -15%; width: 50%; height: 240px; border-radius: 50%; background: radial-gradient(closest-side, rgba(255,255,255,0.55), rgba(255,255,255,0)); filter: blur(16px); animation: fmDrift 30s ease-in-out infinite;")}></div>
          <div style={s("position: absolute; top: 560px; right: -12%; width: 55%; height: 260px; border-radius: 50%; background: radial-gradient(closest-side, rgba(248,247,255,0.6), rgba(248,247,255,0)); filter: blur(12px); animation: fmDrift 36s ease-in-out infinite reverse;")}></div>
        </div>

        <div aria-hidden="true" style={s("position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 1280px; height: 1000px; pointer-events: none; z-index: 2;")}>
          {tiles.map((t, i) => (
            <div key={(wide ? "w" : "n") + i} style={s(`position: absolute; left: ${t.x}; top: ${t.y}px; width: ${t.s}px; height: ${t.s}px; border-radius: 28%; background: rgba(255,255,255,0.78); border: 1px solid #E4E3EC; backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); box-shadow: 0 10px 24px rgba(22,21,31,0.06); display: flex; align-items: center; justify-content: center; --tilt: ${t.tilt}; animation: fmFloat ${t.dur} ease-in-out infinite; animation-delay: ${t.delay};`)}>{t.glyph}</div>
          ))}
        </div>

        <div style={s("position: relative; z-index: 3; max-width: 820px; margin: 0 auto; text-align: center;")}>
          <h1 style={s(`margin: 0; font-family: 'IBM Plex Sans Arabic', sans-serif; letter-spacing: -0.01em; font-size: clamp(${mobile ? 31 : 38}px, 5vw, 66px); line-height: 1.2; font-weight: 600; color: #16151F; text-wrap: balance; animation: fmIn 0.8s both;`)}>أدر حملات المؤثرين<br />لعملائك من <span style={s("color: #3B0CEB;")}>مكان واحد</span></h1>
          <p style={s("margin: 22px auto 0; max-width: 560px; font-size: clamp(16px, 1.5vw, 19px); line-height: 1.75; font-weight: 400; color: #72717F; text-wrap: pretty; animation: fmIn 0.8s 0.1s both;")}>نظّم بيانات المؤثرين وملفات الموافقة وتابع حالة النشر وجهّز تقارير كل عميل في لوحة واحدة بدل التنقّل بين الجداول والرسائل</p>
          <div style={s("margin-top: 32px; display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; animation: fmIn 0.8s 0.2s both;")}>
            <X as="a" href="#cta" onClick={openJoin} style="display: inline-flex; align-items: center; gap: 10px; font-size: 15.5px; font-weight: 600; color: #ffffff; background: #3B0CEB; border-radius: 999px; padding: 13px 26px; box-shadow: 0 1px 2px rgba(22,21,31,0.08); transition: transform 0.2s ease, background 0.2s ease;" hover="background: #2A0AA8; color: #ffffff; transform: translateY(0);">ابدأ مجانًا</X>
            <X as="a" href="mailto:hello@mudar.app" style="display: inline-flex; align-items: center; font-size: 15.5px; font-weight: 600; color: #16151F; background: rgba(255,255,255,0.7); border: 1px solid #D9D8E3; border-radius: 999px; padding: 13px 28px; transition: background 0.2s ease;" hover="background: #ffffff;">تواصل معنا</X>
          </div>
          <p style={s("margin: 16px 0 0; font-size: 14px; color: #72717F; animation: fmIn 0.8s 0.3s both;")}>جرّب مُدار مجانًا · بدون بطاقة ائتمانية</p>
        </div>

        <div style={s("position: relative; z-index: 3; margin-top: 52px; display: flex; justify-content: center; gap: 8px;")}>
          {tabNames.map((label, i) => {
            const on = i === tab;
            return (
              <button key={label} onClick={() => { userPicked.current = true; setTab(i); }} style={s(`border: 1px solid ${on ? "#16151F" : "#E4E3EC"}; cursor: pointer; font: inherit; font-size: 15px; font-weight: 600; color: ${on ? "#ffffff" : "#72717F"}; background: ${on ? "#16151F" : "rgba(255,255,255,0.85)"}; border-radius: 999px; padding: 9px 22px; white-space: nowrap; flex: none; transition: background 0.3s ease, color 0.3s ease;`)}>{label}</button>
            );
          })}
        </div>

        <div ref={dash} style={s("position: relative; z-index: 3; max-width: 1180px; margin: 34px auto 0; perspective: 1600px;")}>
          <div style={s(`height: ${Math.round(dashH * dashK)}px; overflow: hidden; border-radius: ${Math.round(22 * dashK)}px ${Math.round(22 * dashK)}px 0 0; transform: rotateX(${tilt.toFixed(2)}deg); transform-origin: 50% 0%; transition: transform 0.2s linear; will-change: transform; -webkit-mask-image: linear-gradient(to bottom, #000 78%, transparent); mask-image: linear-gradient(to bottom, #000 78%, transparent);`)}>
            <div style={s(`background: #ffffff; border: 1px solid #E4E3EC; border-radius: 22px 22px 0 0; box-shadow: 0 20px 50px rgba(22,21,31,0.07); display: grid; grid-template-columns: ${mobile ? "minmax(0, 1fr)" : "230px minmax(0, 1fr)"}; min-height: 640px; overflow: hidden; width: ${dashW}px; box-sizing: border-box; transform: scale(${dashK}); transform-origin: top right;`)}>
              {!mobile && <aside style={s("border-inline-end: 1px solid #E4E3EC; background: #F8F8FB; padding: 16px 14px; display: flex; flex-direction: column; gap: 4px;")}>
                <div style={s("display: flex; align-items: center; padding: 6px 6px 2px;")}><Logo width={22} height={23} label="مُدار" /></div>
                <div style={s("margin-top: 12px; display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 8px; background: #ffffff; border: 1px solid #E4E3EC; border-radius: 11px; box-shadow: 0 1px 2px rgba(22,21,31,0.04);")}><span style={s("display: flex; align-items: center; gap: 9px; min-width: 0;")}><span style={s("flex: none; width: 28px; height: 28px; border-radius: 8px; background: #16151F; color: #ffffff; font-size: 12px; font-weight: 600; display: flex; align-items: center; justify-content: center;")}>س</span><span style={s("min-width: 0;")}><span style={s("display: block; font-size: 12.5px; font-weight: 600;")}>وكالة سهم</span><span style={s("display: block; font-size: 10.5px; color: #A4A3B1;")}>خطة ستوديو</span></span></span><span style={s("color: #A4A3B1; font-size: 12px;")}>⇅</span></div>
                {side.map((g, gi) => (
                  <div key={gi} style={s("margin-top: 10px; display: flex; flex-direction: column; gap: 2px;")}>
                    {g.hasGroup && <div style={s("font-size: 10.5px; font-weight: 600; color: #A4A3B1; padding: 6px 8px 4px; letter-spacing: 0.04em;")}>{g.group}</div>}
                    {g.items.map((it) => (
                      <div key={it.l} style={s(`position: relative; display: flex; align-items: center; gap: 9px; font-size: 13px; font-weight: ${it.w}; color: ${it.ink}; background: ${it.bg}; border: 1px solid ${it.bd}; box-shadow: ${it.sh}; border-radius: 9px; padding: 7px 9px; transition: background 0.3s ease;`)}><span style={s(`position: absolute; inset-inline-start: -14px; top: 8px; bottom: 8px; width: 3px; border-radius: 0 3px 3px 0; background: ${it.bar};`)}></span><span style={s("display: flex;")}>{it.icon}</span><span style={s("flex: 1;")}>{it.l}</span><span style={s(`font-size: 10.5px; font-weight: 600; color: ${it.cInk}; background: ${it.cBg}; border-radius: 999px; padding: 1px 7px;`)}>{it.count}</span></div>
                    ))}
                  </div>
                ))}
                <div style={s("margin-top: auto; display: flex; align-items: center; gap: 9px; padding: 12px 6px 4px; border-top: 1px solid #E4E3EC;")}><img src="https://images.unsplash.com/photo-1667514044945-bcbb6a8e1919?w=96&h=96&fit=crop&crop=faces&auto=format" alt="" style={s("flex: none; width: 28px; height: 28px; border-radius: 50%; object-fit: cover; background: #ECE8FD;")} /><div style={s("min-width: 0; flex: 1;")}><div style={s("font-size: 12px; font-weight: 600;")}>ريم العتيبي</div><div style={s("font-size: 10.5px; color: #A4A3B1;")}>مديرة الحملات</div></div><span style={s("color: #A4A3B1; font-size: 14px; line-height: 1;")}>⋯</span></div>
              </aside>}
              <div style={s("min-width: 0;")}>
                <div style={s("display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 11px 24px; border-bottom: 1px solid #EDECF3;")}>
                  <div style={s("font-size: 12px; color: #878696; display: flex; gap: 6px;")}><span>وكالة سهم</span><span style={s("color: #D4D3DE;")}>/</span><span style={s("color: #16151F; font-weight: 600;")}>{tabNames[tab]}</span></div>
                  <div style={s("display: flex; align-items: center; gap: 10px;")}><div style={s("display: flex; align-items: center; gap: 8px; width: 220px; font-size: 11.5px; color: #A4A3B1; background: #F8F8FB; border: 1px solid #E4E3EC; border-radius: 8px; padding: 6px 10px;")}><span style={s("display: flex;")}>{icSearch}</span><span style={s("flex: 1;")}>بحث سريع</span><span style={s("font-size: 10px; border: 1px solid #E4E3EC; border-radius: 4px; padding: 0 4px; direction: ltr;")}>⌘K</span></div><span style={s("display: flex;")}>{icBell}</span></div>
                </div>
                <div style={s("padding: 20px 24px;")}>
                  {tab === 0 && (
                    <div style={s("animation: fmIn 0.6s ease both;")}>
                      <div style={s("display: flex; align-items: center; justify-content: space-between; gap: 12px;")}><div><div style={s("font-size: 19px; font-weight: 600;")}>نظرة عامة</div><div style={s("margin-top: 3px; font-size: 12.5px; color: #878696;")}>أداء كل حملاتك النشطة في مكان واحد</div></div><div style={s("display: flex; gap: 8px;")}><span style={s("display: flex; background: #F2F1F7; border-radius: 9px; padding: 3px; font-size: 11.5px; font-weight: 600;")}><span style={s("padding: 4px 10px; color: #878696;")}>7 أيام</span><span style={s("padding: 4px 10px; background: #ffffff; border-radius: 7px; box-shadow: 0 1px 2px rgba(22,21,31,0.08);")}>30 يومًا</span><span style={s("padding: 4px 10px; color: #878696;")}>90 يومًا</span></span><span style={s("font-size: 12px; font-weight: 600; color: #ffffff; background: #16151F; border-radius: 9px; padding: 7px 12px;")}>تصدير</span></div></div>
                      <div style={s("margin-top: 18px; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px;")}>
                        {kpis.map((k) => (
                          <div key={k.l} style={s("border: 1px solid #E4E3EC; border-radius: 12px; padding: 13px 14px 12px; background: #ffffff;")}>
                            <div style={s("display: flex; align-items: center; justify-content: space-between; gap: 8px;")}><span style={s("font-size: 11.5px; font-weight: 500; color: #72717F;")}>{k.l}</span><span style={s("width: 24px; height: 24px; border-radius: 7px; background: #F3F0FE; display: flex; align-items: center; justify-content: center;")}>{k.icon}</span></div>
                            <div style={s("margin-top: 8px; display: flex; align-items: flex-end; justify-content: space-between; gap: 8px;")}><div><div style={s("font-size: 23px; font-weight: 600; letter-spacing: -0.01em; line-height: 1.1;")}>{k.v}</div><div style={s("margin-top: 6px; display: flex; align-items: center; gap: 5px; font-size: 10.5px; color: #A4A3B1;")}><span style={s("font-weight: 600; color: #2F7D5A; background: #E7F1EB; border-radius: 999px; padding: 1px 6px; direction: ltr;")}>{k.d}</span>عن الشهر الماضي</div></div><svg viewBox="0 0 60 24" width="60" height="24" style={s("flex: none; transform: scaleX(-1);")}><path d={k.spark} fill="none" stroke="#3B0CEB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path></svg></div>
                          </div>
                        ))}
                      </div>
                      <div style={s("margin-top: 12px; display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); gap: 12px;")}>
                        <div style={s("border: 1px solid #E4E3EC; border-radius: 12px; padding: 14px;")}>
                          <div style={s("display: flex; align-items: flex-start; justify-content: space-between; gap: 10px;")}><div><div style={s("font-size: 13px; font-weight: 600;")}>المشاهدات عبر كل المنصات</div><div style={s("margin-top: 4px; display: flex; align-items: baseline; gap: 6px;")}><span style={s("font-size: 18px; font-weight: 600;")}>2.4M</span><span style={s("font-size: 10.5px; color: #A4A3B1;")}>يوليو 2026</span></div></div><div style={s("display: flex; gap: 12px; font-size: 10.5px; font-weight: 500; color: #72717F;")}>{legend.map((lg) => <span key={lg.n} style={s("display: flex; align-items: center; gap: 5px;")}><span style={s(`width: 8px; height: 8px; border-radius: 3px; background: ${lg.c};`)}></span>{lg.n}</span>)}</div></div>
                          <div style={s("margin-top: 12px; display: grid; grid-template-columns: 30px minmax(0, 1fr); gap: 6px;")}>
                            <div style={s("height: 150px; display: flex; flex-direction: column; justify-content: space-between; font-size: 9.5px; color: #A4A3B1; direction: ltr; text-align: right; margin-top: -5px;")}><span>120K</span><span>80K</span><span>40K</span><span>0</span></div>
                            <div style={s("position: relative; height: 150px;")}>
                              <div style={s("position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: space-between;")}><div style={s("border-top: 1px dashed #EDECF3;")}></div><div style={s("border-top: 1px dashed #EDECF3;")}></div><div style={s("border-top: 1px dashed #EDECF3;")}></div><div style={s("border-top: 1px solid #E4E3EC;")}></div></div>
                              <svg viewBox="0 0 280 80" preserveAspectRatio="none" style={s("position: absolute; inset: 0; width: 100%; height: 100%; transform: scaleX(-1);")}><defs><linearGradient id="fmArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3B0CEB" stopOpacity="0.16"></stop><stop offset="1" stopColor="#3B0CEB" stopOpacity="0"></stop></linearGradient></defs><path d={areaPath} fill="url(#fmArea)"></path><path d={line3} fill="none" stroke="#D6CEFB" strokeWidth="1.5" vectorEffect="non-scaling-stroke"></path><path d={line2} fill="none" stroke="#9A86F5" strokeWidth="1.5" vectorEffect="non-scaling-stroke"></path><path d={chartPath} fill="none" stroke="#3B0CEB" strokeWidth="2" vectorEffect="non-scaling-stroke"></path><line x1="200" y1="0" x2="200" y2="80" stroke="#C9C8D4" strokeDasharray="2 2" vectorEffect="non-scaling-stroke"></line></svg>
                              <div style={s("position: absolute; top: 27.5%; right: 71.4%; width: 9px; height: 9px; margin-right: -4.5px; margin-top: -4.5px; border-radius: 50%; background: #ffffff; border: 2px solid #3B0CEB; box-sizing: border-box;")}></div>
                              <div style={s("position: absolute; top: 4px; right: calc(71.4% + 10px); background: #16151F; color: #ffffff; border-radius: 8px; padding: 6px 9px; font-size: 10.5px; line-height: 1.5; white-space: nowrap; box-shadow: 0 6px 16px rgba(22,21,31,0.18);")}><div style={s("color: rgba(255,255,255,0.6);")}>22 يوليو</div><div style={s("font-weight: 600;")}>104K مشاهدة</div></div>
                            </div>
                          </div>
                          <div style={s("margin-top: 8px; margin-inline-start: 36px; display: flex; justify-content: space-between; font-size: 10px; color: #A4A3B1;")}><span>1 يوليو</span><span>8 يوليو</span><span>15 يوليو</span><span>22 يوليو</span><span>30 يوليو</span></div>
                        </div>
                        <div style={s("border: 1px solid #E4E3EC; border-radius: 12px; padding: 14px; display: flex; flex-direction: column; gap: 14px;")}>
                          <div style={s("display: flex; align-items: center; justify-content: space-between;")}><span style={s("font-size: 13px; font-weight: 600;")}>الحملات النشطة</span><span style={s("font-size: 11px; font-weight: 600; color: #3B0CEB;")}>عرض الكل</span></div>
                          {camps.map((c) => (
                            <div key={c.name} style={s("display: flex; gap: 10px; align-items: flex-start;")}><span style={s(`flex: none; width: 30px; height: 30px; border-radius: 9px; background: ${c.logoBg}; color: ${c.logoInk}; font-size: 12px; font-weight: 600; display: flex; align-items: center; justify-content: center;`)}>{c.logo}</span><div style={s("flex: 1; min-width: 0;")}><div style={s("display: flex; justify-content: space-between; align-items: center; gap: 8px; font-size: 12.5px; font-weight: 600;")}><span>{c.name}</span><span style={s(`font-size: 10.5px; color: ${c.sInk}; background: ${c.sBg}; border-radius: 999px; padding: 2px 8px;`)}>{c.status}</span></div><div style={s("margin-top: 2px; font-size: 11px; color: #878696;")}>{c.client} · {c.prog}</div><div style={s("margin-top: 7px; display: flex; align-items: center; gap: 8px;")}><div style={s("flex: 1; height: 5px; border-radius: 999px; background: #EDECF3; overflow: hidden;")}><div style={s(`width: ${c.pct}%; height: 100%; background: #3B0CEB; border-radius: 999px;`)}></div></div><span style={s("font-size: 10.5px; font-weight: 600; color: #3B3A47; direction: ltr;")}>{c.pct}%</span></div></div></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {tab === 1 && (
                    <div style={s("animation: fmIn 0.6s ease both;")}>
                      <div style={s("display: flex; align-items: center; justify-content: space-between; gap: 12px;")}><div style={s("font-size: 19px; font-weight: 600;")}>المؤثرون</div><div style={s("display: flex; gap: 8px;")}><span style={s("font-size: 12px; font-weight: 600; color: #72717F; border: 1px solid #E4E3EC; border-radius: 9px; padding: 7px 12px;")}>كل الحملات ⌄</span><span style={s("font-size: 12px; font-weight: 600; color: #ffffff; background: #16151F; border-radius: 9px; padding: 7px 12px;")}>+ إضافة مؤثر</span></div></div>
                      <div style={s("margin-top: 14px; display: grid; grid-template-columns: minmax(0, 1fr) auto auto auto; gap: 8px;")}><div style={s("font-size: 12px; color: #A4A3B1; border: 1px solid #E4E3EC; border-radius: 9px; padding: 9px 12px; display: flex; align-items: center; gap: 8px;")}><span style={s("display: flex;")}>{icSearch}</span>ابحث بالاسم أو الحساب أو المجال</div><span style={s("font-size: 12px; color: #72717F; border: 1px solid #E4E3EC; border-radius: 9px; padding: 9px 12px;")}>المنصة ⌄</span><span style={s("font-size: 12px; color: #72717F; border: 1px solid #E4E3EC; border-radius: 9px; padding: 9px 12px;")}>المجال ⌄</span><span style={s("font-size: 12px; color: #72717F; border: 1px solid #E4E3EC; border-radius: 9px; padding: 9px 12px;")}>الحالة ⌄</span></div>
                      <div style={s("margin-top: 14px; border: 1px solid #E4E3EC; border-radius: 12px; overflow: hidden;")}>
                        <div style={s("display: grid; grid-template-columns: minmax(150px, 2fr) 90px 90px 60px 80px 90px 60px 100px 70px; gap: 10px; padding: 11px 14px; font-size: 11px; font-weight: 500; color: #878696; background: #F8F8FB; border-bottom: 1px solid #E4E3EC;")}><span>المؤثر</span><span>المنصات</span><span>المجال</span><span>الحملات</span><span>المتابعون</span><span>متوسط المشاهدات</span><span>التفاعل</span><span>الحالة</span><span>أُضيف</span></div>
                        {infl.map((r) => (
                          <div key={r.handle} style={s("display: grid; grid-template-columns: minmax(150px, 2fr) 90px 90px 60px 80px 90px 60px 100px 70px; gap: 10px; align-items: center; padding: 11px 14px; font-size: 12.5px; border-bottom: 1px solid #F2F1F7;")}>
                            <div style={s("display: flex; align-items: center; gap: 9px; min-width: 0;")}><span style={s(`flex: none; width: 30px; height: 30px; border-radius: 50%; background-color: ${r.avBg}; background-image: ${r.photoBg}; background-size: cover; background-position: center;`)}></span><div style={s("min-width: 0;")}><div style={s("font-weight: 600;")}>{r.name}</div><div style={s("font-size: 10.5px; color: #A4A3B1; direction: ltr; text-align: right;")}>{r.handle}</div></div></div>
                            <div style={s("display: flex; gap: 3px;")}>{r.platIcons.map((p, i) => <span key={i} style={s("width: 22px; height: 22px; border-radius: 6px; background: #F8F8FB; border: 1px solid #E4E3EC; display: flex; align-items: center; justify-content: center;")}>{p}</span>)}</div>
                            <span style={s("justify-self: start; font-size: 10.5px; font-weight: 600; border: 1px solid #E4E3EC; border-radius: 999px; padding: 2px 8px;")}>{r.label}</span>
                            <span>{r.camps}</span><span style={s("font-weight: 600;")}>{r.fol}</span><span style={s("font-weight: 600;")}>{r.views}</span><span>{r.er}</span>
                            <span style={s(`justify-self: start; display: flex; align-items: center; gap: 5px; font-size: 10.5px; font-weight: 600; color: ${r.sInk}; background: ${r.sBg}; border-radius: 999px; padding: 3px 9px;`)}><span style={s("width: 5px; height: 5px; border-radius: 50%; background: currentColor;")}></span>{r.status}</span>
                            <span style={s("color: #878696;")}>{r.added}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {tab === 2 && (
                    <div style={s("animation: fmIn 0.6s ease both;")}>
                      <div style={s("display: flex; align-items: center; justify-content: space-between; gap: 12px;")}><div><div style={s("font-size: 19px; font-weight: 600;")}>حالة النشر</div><div style={s("margin-top: 3px; font-size: 12.5px; color: #878696;")}>تابع كل منشور في حملاتك موعده وحالته ونتائجه</div></div><span style={s("font-size: 12px; font-weight: 600; color: #ffffff; background: #16151F; border-radius: 9px; padding: 7px 12px;")}>تصدير التقرير</span></div>
                      <div style={s("margin-top: 16px; border: 1px solid #E4E3EC; border-radius: 12px; overflow: hidden;")}>
                        <div style={s("display: grid; grid-template-columns: minmax(170px, 2fr) 110px 90px 140px 80px 70px 120px; gap: 10px; padding: 11px 14px; font-size: 11px; font-weight: 500; color: #878696; background: #F8F8FB; border-bottom: 1px solid #E4E3EC;")}><span>المنشور</span><span>المؤثر</span><span>المنصة</span><span>موعد النشر</span><span>المشاهدات</span><span>التفاعل</span><span>الحالة</span></div>
                        {posts.map((r) => (
                          <div key={r.title} style={s("display: grid; grid-template-columns: minmax(170px, 2fr) 110px 90px 140px 80px 70px 120px; gap: 10px; align-items: center; padding: 12px 14px; font-size: 12.5px; border-bottom: 1px solid #F2F1F7;")}>
                            <div style={s("display: flex; align-items: center; gap: 9px; min-width: 0;")}><span style={s(`flex: none; position: relative; width: 30px; height: 40px; border-radius: 6px; overflow: hidden; background: ${r.thumb}; display: flex; align-items: center; justify-content: center;`)}><span style={s(`position: absolute; inset: 0; background-image: ${r.imgBg}; background-size: cover; background-position: center;`)}></span><span style={s("position: relative; width: 16px; height: 16px; border-radius: 50%; background: rgba(22,21,31,0.45); display: flex; align-items: center; justify-content: center;")}>{r.playIcon}</span></span><span style={s("font-weight: 600;")}>{r.title}</span></div>
                            <span>{r.who}</span><span style={s("display: flex; align-items: center; gap: 6px; font-weight: 500;")}><span style={s("display: flex;")}>{r.platIcon}</span>{r.plat}</span><span style={s("color: #878696;")}>{r.date}</span><span style={s("font-weight: 600;")}>{r.views}</span><span>{r.er}</span>
                            <span style={s(`justify-self: start; display: flex; align-items: center; gap: 5px; font-size: 10.5px; font-weight: 600; color: ${r.sInk}; background: ${r.sBg}; border-radius: 999px; padding: 3px 9px;`)}><span style={s("width: 5px; height: 5px; border-radius: 50%; background: currentColor;")}></span>{r.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section dir="rtl" style={s("border-top: 1px solid #E4E3EC; padding: 30px 20px 34px; background: transparent;")}>
        <p style={s("margin: 0; text-align: center; font-size: 14px; font-weight: 500; letter-spacing: 0.02em; color: #878696;")}>لوحة واحدة لكل منصة يعمل عليها مؤثروك</p>
        <div style={s("margin-top: 22px; display: flex; flex-wrap: wrap; justify-content: center; gap: 16px 40px;")}>
          {platforms.map((p) => (
            <div key={p.n} style={s("display: flex; align-items: center; gap: 10px; font-size: 16px; font-weight: 500; color: #3B3A47;")}><span style={s("display: flex;")}>{p.icon}</span>{p.n}</div>
          ))}
        </div>
      </section>

      <section id="features" dir="rtl" style={s("padding: clamp(64px, 10vw, 130px) 20px clamp(64px, 10vw, 130px);")}>
        <div style={s("max-width: 1180px; margin: 0 auto;")}>
          <div data-reveal="1" style={s("text-align: center; max-width: 720px; margin: 0 auto;")}>
            <h2 style={s("margin: 0; font-family: 'IBM Plex Sans Arabic', sans-serif; letter-spacing: -0.01em; font-size: clamp(30px, 3.4vw, 48px); line-height: 1.25; font-weight: 600; color: #16151F; text-wrap: balance;")}>شغّل عمليات حملاتك كلها<br />من لوحة واحدة</h2>
            <p style={s("margin: 18px auto 0; max-width: 640px; font-size: 17px; line-height: 1.8; color: #72717F; text-wrap: pretty;")}>أضف المؤثرين وأرسل ملفات الموافقة وتابع النشر وشارك تقارير بروابط تبقي الجميع على اطلاع</p>
          </div>
          <div style={s("margin-top: 60px; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 12px;")}>
            {features.map((f) => (
              <X key={f.title} data-reveal="1" style="background: #ffffff; border: 1px solid #E4E3EC; border-radius: 22px; padding: 14px; display: flex; flex-direction: column; transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.45s ease;" hover="transform: translateY(-2px); box-shadow: 0 10px 28px rgba(22,21,31,0.05);">
                <div style={s(`height: ${mobile ? 180 : 220}px; background: #F2F1F7; border-radius: 18px; display: flex; align-items: center; justify-content: center; padding: 24px; box-sizing: border-box; overflow: hidden;`)}>
                  <div style={s("width: 100%; max-width: 250px; zoom: 0.88; background: #ffffff; border: 1px solid #E4E3EC; border-radius: 12px; box-shadow: 0 1px 2px rgba(22,21,31,0.04), 0 8px 24px rgba(22,21,31,0.05); padding: 12px 14px; box-sizing: border-box;")}>
                    {f.isInput && (
                      <>
                        <div style={s("display: flex; gap: 6px;")}><div style={s("flex: 1; min-width: 0; font-size: 10.5px; color: #A4A3B1; border: 1px solid #E4E3EC; border-radius: 5px; padding: 6px 8px; white-space: nowrap; overflow: hidden;")}>{f.input}</div><span style={s("flex: none; font-size: 10.5px; font-weight: 600; color: #ffffff; background: #3B0CEB; border-radius: 5px; padding: 6px 9px;")}>{f.btn}</span></div>
                        <div style={s("margin-top: 8px; display: flex; align-items: center; justify-content: space-between; gap: 8px; border: 1px solid #EDECF3; border-radius: 6px; padding: 7px 8px;")}><span style={s("display: flex; align-items: center; gap: 6px; font-size: 10.5px; font-weight: 600;")}><span style={s("width: 18px; height: 18px; border-radius: 5px; background: #16151F; display: flex; align-items: center; justify-content: center;")}>{icTik}</span>{f.resName}</span><span style={s("font-size: 9.5px; font-weight: 600; color: #3B0CEB; background: #ECE8FD; border-radius: 999px; padding: 2px 7px;")}>{f.resBadge}</span></div>
                      </>
                    )}
                    {f.isList && (
                      <>
                        <div style={s("font-size: 11.5px; font-weight: 600; padding-bottom: 8px;")}>{f.head}</div>
                        {f.rows.map((r) => (
                          <div key={r.a} style={s("display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 7px 0; border-top: 1px solid #F2F1F7;")}><span style={s("display: flex; align-items: center; gap: 7px; min-width: 0;")}><span style={s("flex: none; width: 20px; height: 20px; border-radius: 50%; background: #ECE8FD; color: #2A0AA8; font-size: 9px; font-weight: 600; display: flex; align-items: center; justify-content: center;")}>{r.i}</span><span style={s("min-width: 0;")}><span style={s("display: block; font-size: 10.5px; font-weight: 600;")}>{r.a}</span><span style={s("display: block; font-size: 9px; color: #A4A3B1;")}>{r.s}</span></span></span><span style={s(`flex: none; font-size: 9.5px; font-weight: 600; color: ${r.ink}; background: ${r.bg}; border-radius: 999px; padding: 2px 7px;`)}>{r.t}</span></div>
                        ))}
                      </>
                    )}
                    {f.isChart && (
                      <>
                        <div style={s("display: flex; justify-content: space-between;")}><div><div style={s("font-size: 11.5px; font-weight: 600;")}>{f.head}</div><div style={s("font-size: 9px; color: #A4A3B1;")}>{f.sub}</div></div><div style={s("display: flex; gap: 3px;")}><span style={s("width: 7px; height: 7px; border-radius: 2px; background: #3B0CEB;")}></span><span style={s("width: 7px; height: 7px; border-radius: 2px; background: #16151F;")}></span><span style={s("width: 7px; height: 7px; border-radius: 2px; background: #A4A3B1;")}></span><span style={s("width: 7px; height: 7px; border-radius: 2px; background: #D4D3DE;")}></span></div></div>
                        <svg viewBox="0 0 280 80" preserveAspectRatio="none" style={s("display: block; margin-top: 8px; width: 100%; height: 76px; transform: scaleX(-1);")}><path d={chartPath} fill="none" stroke="#3B0CEB" strokeWidth="1.6" vectorEffect="non-scaling-stroke"></path></svg>
                      </>
                    )}
                  </div>
                </div>
                <div style={s("padding: 22px 12px 16px;")}>
                  <h3 style={s("margin: 0; font-size: 20px; font-weight: 600; color: #16151F;")}>{f.title}</h3>
                  <p style={s("margin: 10px 0 0; font-size: 16px; line-height: 1.8; color: #72717F; text-wrap: pretty;")}>{f.body}</p>
                </div>
              </X>
            ))}
          </div>
        </div>
      </section>

      <section dir="rtl" style={s("border-top: 1px solid #E4E3EC; padding: clamp(64px, 10vw, 130px) 20px;")}>
        <div style={s("max-width: 1180px; margin: 0 auto;")}>
          <div data-reveal="1" style={s("text-align: center; max-width: 760px; margin: 0 auto;")}>
            <h2 style={s("margin: 0; font-family: 'IBM Plex Sans Arabic', sans-serif; letter-spacing: -0.01em; font-size: clamp(30px, 3.4vw, 48px); line-height: 1.25; font-weight: 600; color: #16151F;")}>مصمم لطريقة عملك الفعلية</h2>
            <p style={s("margin: 18px auto 0; max-width: 640px; font-size: 17px; line-height: 1.8; color: #72717F; text-wrap: pretty;")}>سواء كنت تدير حملات لعملاء أو لعلامتك التجارية أو لفريق داخلي تبقى كل البيانات والملفات في مكان واحد</p>
          </div>
          <div style={s("margin-top: 56px; display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 12px;")}>
            {audiences.map((a) => (
              <X key={a.title} data-reveal="1" style="background: #ffffff; border: 1px solid #E4E3EC; border-radius: 22px; padding: 36px 34px 38px; transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.45s ease;" hover="transform: translateY(-2px); box-shadow: 0 10px 28px rgba(22,21,31,0.05);">
                <div style={s("display: flex; color: #16151F;")}>{a.icon}</div>
                <h3 style={s("margin: 22px 0 0; font-size: 21px; font-weight: 600;")}>{a.title}</h3>
                <p style={s("margin: 12px 0 0; font-size: 16px; line-height: 1.8; color: #72717F; text-wrap: pretty;")}>{a.body}</p>
              </X>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" dir="rtl" style={s("border-top: 1px solid #E4E3EC; padding: clamp(64px, 10vw, 130px) 20px clamp(56px, 9vw, 110px);")}>
        <div style={s("max-width: 1180px; margin: 0 auto;")}>
          <div data-reveal="1" style={s("text-align: center;")}>
            <h2 style={s("margin: 0; font-family: 'IBM Plex Sans Arabic', sans-serif; letter-spacing: -0.01em; font-size: clamp(30px, 3.4vw, 48px); line-height: 1.25; font-weight: 600; color: #16151F;")}>باقات مُدار</h2>
            <p style={s("margin: 14px auto 0; font-size: 17px; line-height: 1.8; color: #72717F;")}>نظّم حملات المؤثرين تابع الموافقات والنشر واطّلع على تقدم العمل من مكان واحد</p>
          </div>
          <div style={s("margin-top: 58px; display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 12px; align-items: center;")}>
            {plans.map((p) => (
              <div key={p.name} data-reveal="1" style={s(`position: relative; background: ${p.bg}; border: 1px solid ${p.border}; border-radius: 22px; padding: 34px 32px 32px; box-shadow: ${p.shadow}; margin-top: ${p.lift}; margin-bottom: ${p.lift}; display: flex; flex-direction: column;`)}>
                {p.hasTag && <span style={s("position: absolute; top: 16px; left: 16px; font-size: 12px; font-weight: 600; color: #ffffff; background: rgba(255,255,255,0.1); border-radius: 999px; padding: 5px 12px;")}>الأكثر طلبًا</span>}
                <div style={s(`font-size: 20px; font-weight: 600; color: ${p.ink};`)}>{p.name}</div>
                <div style={s(`margin-top: 8px; font-size: 15px; color: ${p.sub};`)}>{p.desc}</div>
                <div style={s("margin-top: 26px; display: flex; align-items: baseline; gap: 6px;")}><span style={s(`font-family: 'IBM Plex Sans Arabic', sans-serif; letter-spacing: -0.01em; font-size: 44px; line-height: 1; font-weight: 600; color: ${p.ink};`)}>{p.price}</span><span style={s(`font-size: 16px; color: ${p.sub};`)}>ر.س / شهريًا</span><span style={s(`margin-inline-start: 6px; font-size: 18px; font-weight: 500; color: ${p.sub}; text-decoration: line-through; text-decoration-thickness: 1.5px;`)}>{p.old}</span></div>
                <div style={s(`margin-top: 10px; font-size: 14px; color: ${p.sub};`)}>{p.yearly}</div>
                <div style={s("margin-top: 22px; display: flex; flex-direction: column; gap: 12px;")}>
                  {p.items.map((it) => (
                    <div key={it} style={s(`display: flex; align-items: center; gap: 12px; font-size: 16px; color: ${p.body};`)}><span style={s(`flex: none; width: 24px; height: 24px; border-radius: 50%; background: ${p.chkBg}; color: ${p.chkInk}; font-size: 12px; font-weight: 600; display: flex; align-items: center; justify-content: center;`)}>✓</span>{it}</div>
                  ))}
                </div>
                <X as="a" href={p.contact ? "mailto:hello@mudar.app" : "#cta"} onClick={p.contact ? undefined : openJoin} style={`margin-top: 26px; display: block; text-align: center; font-size: 15.5px; font-weight: 600; color: ${p.btnInk}; background: ${p.btnBg}; border: 1px solid ${p.btnBorder}; border-radius: 999px; padding: 15px 16px; transition: transform 0.2s ease;`} hover="transform: translateY(0);">{p.cta}</X>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" dir="rtl" style={s("border-top: 1px solid #E4E3EC; padding: clamp(64px, 7vw, 88px) 20px;")}>
        <div data-reveal="1" style={s("max-width: 760px; margin: 0 auto;")}>
          <h2 style={s("margin: 0; text-align: center; font-family: 'IBM Plex Sans Arabic', sans-serif; letter-spacing: -0.01em; font-size: clamp(30px, 3.4vw, 48px); line-height: 1.25; font-weight: 600; color: #16151F;")}>الأسئلة الشائعة</h2>
          <div style={s("margin-top: 36px; display: flex; flex-direction: column; gap: 8px;")}>
            {faqData.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} style={s("background: #ffffff; border: 1px solid #E4E3EC; border-radius: 14px; overflow: hidden;")}>
                  <div onClick={() => setOpenFaq((o) => (o === i ? -1 : i))} style={s("display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px 20px; cursor: pointer;")}>
                    <span style={s("font-size: 16px; font-weight: 600;")}>{f.q}</span>
                    <span style={s(`flex: none; width: 22px; height: 22px; border-radius: 50%; background: transparent; border: 1px solid #E4E3EC; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 500; color: #72717F; transform: rotate(${open ? "45deg" : "0deg"}); transition: transform 0.45s ease;`)}>+</span>
                  </div>
                  <div style={s(`max-height: ${open ? "220px" : "0px"}; opacity: ${open ? 1 : 0}; overflow: hidden; transition: max-height 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.4s ease;`)}>
                    <p style={s("margin: 0; padding: 0 20px 18px; font-size: 16px; line-height: 1.8; color: #72717F;")}>{f.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="cta" dir="rtl" style={s("border-top: 1px solid #E4E3EC; padding: clamp(64px, 10vw, 140px) 20px;")}>
        <div data-reveal="1" style={s("position: relative; overflow: hidden; max-width: 960px; margin: 0 auto; border-radius: 26px; border: 1px solid #E4E3EC; padding: clamp(56px, 6vw, 84px) 24px; text-align: center; background: linear-gradient(160deg, #EEEBFB 0%, #ECE8FC 45%, #E9E4FC 100%);")}>
          <div aria-hidden="true" style={s("position: absolute; inset: 0; pointer-events: none;")}>
            <div style={s("position: absolute; bottom: -80px; left: -10%; width: 70%; height: 260px; border-radius: 50%; background: radial-gradient(closest-side, rgba(255,255,255,0.6), rgba(255,255,255,0)); filter: blur(16px); animation: fmDrift 24s ease-in-out infinite;")}></div>
            <div style={s("position: absolute; bottom: -60px; right: -12%; width: 65%; height: 240px; border-radius: 50%; background: radial-gradient(closest-side, rgba(226,219,253,0.5), rgba(226,219,253,0)); filter: blur(16px); animation: fmDrift 30s ease-in-out infinite reverse;")}></div>
            <div style={s("position: absolute; top: 40px; right: 8%; width: 40%; height: 140px; border-radius: 50%; background: radial-gradient(closest-side, rgba(255,255,255,0.45), rgba(255,255,255,0)); filter: blur(16px);")}></div>
          </div>
          <div style={s("position: relative; z-index: 1; max-width: 720px; margin: 0 auto;")}>
            <h2 style={s("margin: 0; font-family: 'IBM Plex Sans Arabic', sans-serif; letter-spacing: -0.01em; font-size: clamp(30px, 3.6vw, 50px); line-height: 1.25; font-weight: 600; color: #16151F; text-wrap: balance;")}>توقف عن إدارة حملاتك<br />بين الجداول والمجلدات</h2>
            <p style={s("margin: 20px auto 0; font-size: 17px; line-height: 1.8; color: #3B3A47;")}>اجمع المؤثرين والملفات والنتائج في مكان واحد وشاهد الصورة كاملة</p>
            <div style={s("margin-top: 34px; display: flex; justify-content: center;")}>
              <X as="a" href="#cta" onClick={openJoin} style="display: inline-flex; align-items: center; gap: 10px; font-size: 15.5px; font-weight: 600; color: #ffffff; background: #3B0CEB; border-radius: 999px; padding: 13px 28px; box-shadow: 0 1px 2px rgba(22,21,31,0.08); transition: transform 0.2s ease, background 0.2s ease;" hover="background: #2A0AA8; color: #ffffff; transform: translateY(0);">انضم مجانًا <span style={s("font-size: 18px; line-height: 1;")}><br /></span></X>
            </div>
          </div>
        </div>
      </section>

      <footer dir="rtl" style={s("border-top: 1px solid #E4E3EC; padding: 30px 20px;")}>
        <div style={s("max-width: 1180px; margin: 0 auto; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px;")}>
          <div style={s("display: flex; align-items: center; gap: 10px;")}>
            <Logo /><span style={s("font-size: 15px; font-weight: 600;")}>مُدار</span>
            <span style={s("font-size: 15px; color: #878696;")}>إدارة حملات المؤثرين</span>
          </div>
          <div style={s("display: flex; flex-wrap: wrap; gap: 26px; font-size: 15px;")}>
            {SHOW_LOGIN && <a href="#cta" style={s("color: #72717F;")}>تسجيل الدخول</a>}
            <a href="#features" style={s("color: #72717F;")}>المزايا</a>
            <a href="#pricing" style={s("color: #72717F;")}>الأسعار</a>
            <a href="#" style={s("color: #72717F;")}>الشروط</a>
            <a href="#" style={s("color: #72717F;")}>الخصوصية</a>
          </div>
        </div>
      </footer>

      {joinOpen && <JoinModal onClose={() => setJoinOpen(false)} />}
    </>
  );
}
