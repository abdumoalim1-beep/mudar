import React from "react";
import { s, Logo } from "./ui.jsx";
import { tabNames, infl, posts, kpis, camps, chartPath, line2, line3, areaPath, legend, icSearch, icBell } from "./data.jsx";

// Phone-sized version of the hero dashboard mockup: same data and palette as the desktop one,
// laid out as stacked cards so every label stays readable at phone width.
const subtitles = ["أداء كل حملاتك النشطة في مكان واحد", "48 مؤثرًا في كل الحملات", "تابع كل منشور موعده وحالته ونتائجه"];

function Pill({ ink, bg, children }) {
  return <span style={s(`flex: none; display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 600; color: ${ink}; background: ${bg}; border-radius: 999px; padding: 3px 9px; white-space: nowrap;`)}><span style={s("width: 5px; height: 5px; border-radius: 50%; background: currentColor;")}></span>{children}</span>;
}

function Overview() {
  return (
    <>
      <div style={s("display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px;")}>
        {kpis.map((k) => (
          <div key={k.l} style={s("border: 1px solid #E4E3EC; border-radius: 12px; padding: 11px 12px; background: #ffffff;")}>
            <div style={s("display: flex; align-items: center; justify-content: space-between; gap: 6px;")}><span style={s("font-size: 11.5px; font-weight: 500; color: #72717F; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;")}>{k.l}</span><span style={s("flex: none; width: 22px; height: 22px; border-radius: 7px; background: #F3F0FE; display: flex; align-items: center; justify-content: center;")}>{k.icon}</span></div>
            <div style={s("margin-top: 6px; display: flex; align-items: baseline; justify-content: space-between; gap: 6px;")}><span style={s("font-size: 21px; font-weight: 600; letter-spacing: -0.01em; line-height: 1.1;")}>{k.v}</span><span style={s("font-size: 10.5px; font-weight: 600; color: #2F7D5A; background: #E7F1EB; border-radius: 999px; padding: 1px 6px; direction: ltr;")}>{k.d}</span></div>
          </div>
        ))}
      </div>
      <div style={s("margin-top: 8px; border: 1px solid #E4E3EC; border-radius: 12px; padding: 12px;")}>
        <div style={s("display: flex; align-items: baseline; justify-content: space-between; gap: 8px;")}><span style={s("font-size: 13px; font-weight: 600;")}>المشاهدات عبر كل المنصات</span><span style={s("font-size: 15px; font-weight: 600;")}>2.4M</span></div>
        <div style={s("margin-top: 6px; display: flex; gap: 12px; font-size: 10.5px; font-weight: 500; color: #72717F;")}>{legend.map((lg) => <span key={lg.n} style={s("display: flex; align-items: center; gap: 5px;")}><span style={s(`width: 8px; height: 8px; border-radius: 3px; background: ${lg.c};`)}></span>{lg.n}</span>)}</div>
        <div style={s("position: relative; margin-top: 10px; height: 96px;")}>
          <div style={s("position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: space-between;")}><div style={s("border-top: 1px dashed #EDECF3;")}></div><div style={s("border-top: 1px dashed #EDECF3;")}></div><div style={s("border-top: 1px solid #E4E3EC;")}></div></div>
          <svg viewBox="0 0 280 80" preserveAspectRatio="none" style={s("position: absolute; inset: 0; width: 100%; height: 100%; transform: scaleX(-1);")}><defs><linearGradient id="fmAreaM" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3B0CEB" stopOpacity="0.16"></stop><stop offset="1" stopColor="#3B0CEB" stopOpacity="0"></stop></linearGradient></defs><path d={areaPath} fill="url(#fmAreaM)"></path><path d={line3} fill="none" stroke="#D6CEFB" strokeWidth="1.5" vectorEffect="non-scaling-stroke"></path><path d={line2} fill="none" stroke="#9A86F5" strokeWidth="1.5" vectorEffect="non-scaling-stroke"></path><path d={chartPath} fill="none" stroke="#3B0CEB" strokeWidth="2" vectorEffect="non-scaling-stroke"></path></svg>
        </div>
        <div style={s("margin-top: 6px; display: flex; justify-content: space-between; font-size: 10px; color: #A4A3B1;")}><span>1 يوليو</span><span>15 يوليو</span><span>30 يوليو</span></div>
      </div>
      <div style={s("margin-top: 8px; border: 1px solid #E4E3EC; border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 12px;")}>
        <div style={s("display: flex; align-items: center; justify-content: space-between;")}><span style={s("font-size: 13px; font-weight: 600;")}>الحملات النشطة</span><span style={s("font-size: 11px; font-weight: 600; color: #3B0CEB;")}>عرض الكل</span></div>
        {camps.map((c) => (
          <div key={c.name} style={s("display: flex; gap: 10px; align-items: flex-start;")}><span style={s(`flex: none; width: 30px; height: 30px; border-radius: 9px; background: ${c.logoBg}; color: ${c.logoInk}; font-size: 12px; font-weight: 600; display: flex; align-items: center; justify-content: center;`)}>{c.logo}</span><div style={s("flex: 1; min-width: 0;")}><div style={s("display: flex; justify-content: space-between; align-items: center; gap: 8px; font-size: 13px; font-weight: 600;")}><span>{c.name}</span><span style={s(`font-size: 10.5px; color: ${c.sInk}; background: ${c.sBg}; border-radius: 999px; padding: 2px 8px; white-space: nowrap;`)}>{c.status}</span></div><div style={s("margin-top: 2px; font-size: 11px; color: #878696;")}>{c.client} · {c.prog}</div><div style={s("margin-top: 7px; display: flex; align-items: center; gap: 8px;")}><div style={s("flex: 1; height: 5px; border-radius: 999px; background: #EDECF3; overflow: hidden;")}><div style={s(`width: ${c.pct}%; height: 100%; background: #3B0CEB; border-radius: 999px;`)}></div></div><span style={s("font-size: 10.5px; font-weight: 600; color: #3B3A47; direction: ltr;")}>{c.pct}%</span></div></div></div>
        ))}
      </div>
    </>
  );
}

function Influencers() {
  return (
    <>
      <div style={s("font-size: 12px; color: #A4A3B1; border: 1px solid #E4E3EC; border-radius: 10px; padding: 9px 12px; display: flex; align-items: center; gap: 8px;")}><span style={s("display: flex;")}>{icSearch}</span>ابحث بالاسم أو الحساب</div>
      <div style={s("margin-top: 8px; display: flex; flex-direction: column; gap: 8px;")}>
        {infl.map((r) => (
          <div key={r.handle} style={s("border: 1px solid #E4E3EC; border-radius: 12px; padding: 11px 12px;")}>
            <div style={s("display: flex; align-items: center; gap: 10px;")}>
              <span style={s(`flex: none; width: 36px; height: 36px; border-radius: 50%; background-color: ${r.avBg}; background-image: ${r.photoBg}; background-size: cover; background-position: center;`)}></span>
              <div style={s("flex: 1; min-width: 0;")}><div style={s("font-size: 13.5px; font-weight: 600;")}>{r.name}</div><div style={s("font-size: 11px; color: #A4A3B1; direction: ltr; text-align: right;")}>{r.handle}</div></div>
              <Pill ink={r.sInk} bg={r.sBg}>{r.status}</Pill>
            </div>
            <div style={s("margin-top: 10px; display: flex; align-items: center; justify-content: space-between; gap: 8px;")}>
              <div style={s("display: flex; align-items: center; gap: 4px;")}>{r.platIcons.map((p, i) => <span key={i} style={s("width: 22px; height: 22px; border-radius: 6px; background: #F8F8FB; border: 1px solid #E4E3EC; display: flex; align-items: center; justify-content: center;")}>{p}</span>)}<span style={s("margin-inline-start: 4px; font-size: 10.5px; font-weight: 600; border: 1px solid #E4E3EC; border-radius: 999px; padding: 2px 8px;")}>{r.label}</span></div>
              <div style={s("display: flex; gap: 12px; font-size: 11px; color: #878696;")}><span><b style={s("color: #16151F; font-weight: 600;")}>{r.fol}</b> متابع</span><span><b style={s("color: #16151F; font-weight: 600;")}>{r.er}</b> تفاعل</span></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Posts() {
  return (
    <div style={s("display: flex; flex-direction: column; gap: 8px;")}>
      {posts.map((r) => (
        <div key={r.title} style={s("border: 1px solid #E4E3EC; border-radius: 12px; padding: 10px 12px; display: flex; align-items: center; gap: 11px;")}>
          <span style={s(`flex: none; position: relative; width: 38px; height: 50px; border-radius: 7px; overflow: hidden; background: ${r.thumb}; display: flex; align-items: center; justify-content: center;`)}><span style={s(`position: absolute; inset: 0; background-image: ${r.imgBg}; background-size: cover; background-position: center;`)}></span><span style={s("position: relative; width: 18px; height: 18px; border-radius: 50%; background: rgba(22,21,31,0.45); display: flex; align-items: center; justify-content: center;")}>{r.playIcon}</span></span>
          <div style={s("flex: 1; min-width: 0;")}>
            <div style={s("display: flex; align-items: center; justify-content: space-between; gap: 8px;")}><span style={s("font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;")}>{r.title}</span><Pill ink={r.sInk} bg={r.sBg}>{r.status}</Pill></div>
            <div style={s("margin-top: 4px; display: flex; align-items: center; gap: 6px; font-size: 11px; color: #72717F;")}><span style={s("display: flex;")}>{r.platIcon}</span>{r.who} · {r.plat}</div>
            <div style={s("margin-top: 3px; display: flex; justify-content: space-between; gap: 8px; font-size: 11px; color: #A4A3B1;")}><span>{r.date}</span><span style={s("color: #16151F; font-weight: 600;")}>{r.views !== "—" ? r.views + " مشاهدة" : ""}</span></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MobileDash({ tab, tilt }) {
  return (
    <div style={s(`height: 560px; overflow: hidden; border-radius: 22px 22px 0 0; transform: rotateX(${tilt.toFixed(2)}deg); transform-origin: 50% 0%; transition: transform 0.2s linear; will-change: transform; -webkit-mask-image: linear-gradient(to bottom, #000 80%, transparent); mask-image: linear-gradient(to bottom, #000 80%, transparent);`)}>
      <div style={s("background: #ffffff; border: 1px solid #E4E3EC; border-radius: 22px 22px 0 0; box-shadow: 0 20px 50px rgba(22,21,31,0.07); min-height: 620px; text-align: right;")}>
        <div style={s("display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 12px 14px; border-bottom: 1px solid #EDECF3; background: #F8F8FB;")}>
          <div style={s("display: flex; align-items: center; gap: 9px; min-width: 0;")}><Logo width={20} height={21} /><span style={s("display: flex; align-items: center; gap: 7px; font-size: 12.5px; font-weight: 600; background: #ffffff; border: 1px solid #E4E3EC; border-radius: 9px; padding: 4px 8px 4px 10px;")}><span style={s("width: 20px; height: 20px; border-radius: 6px; background: #16151F; color: #ffffff; font-size: 10.5px; display: flex; align-items: center; justify-content: center;")}>س</span>وكالة سهم<span style={s("color: #A4A3B1; font-size: 11px;")}>⇅</span></span></div>
          <div style={s("display: flex; align-items: center; gap: 12px;")}><span style={s("display: flex;")}>{icSearch}</span><span style={s("display: flex;")}>{icBell}</span><img src="https://images.unsplash.com/photo-1667514044945-bcbb6a8e1919?w=96&h=96&fit=crop&crop=faces&auto=format" alt="" style={s("width: 26px; height: 26px; border-radius: 50%; object-fit: cover; background: #ECE8FD;")} /></div>
        </div>
        <div key={tab} style={s("padding: 14px; animation: fmIn 0.6s ease both;")}>
          <div style={s("margin-bottom: 12px;")}><div style={s("font-size: 18px; font-weight: 600;")}>{tabNames[tab]}</div><div style={s("margin-top: 2px; font-size: 12px; color: #878696;")}>{subtitles[tab]}</div></div>
          {tab === 0 && <Overview />}
          {tab === 1 && <Influencers />}
          {tab === 2 && <Posts />}
        </div>
      </div>
    </div>
  );
}
