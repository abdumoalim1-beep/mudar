import React, { useState } from "react";
import { X } from "./ui.jsx";
import { submitLead } from "./lead.js";

const Q = [
  { title: "ما الذي يصف جهتك بشكل أفضل", opts: ["وكالة تسويق", "علامة تجارية", "إدارة مؤثرين", "مستقل"] },
  { title: "كم حملة تديرون في الشهر", opts: ["1 إلى 2", "3 إلى 5", "6 إلى 10", "أكثر من 10"] },
  { title: "كم مؤثرًا تتعاملون معه عادةً", opts: ["أقل من 20", "20 إلى 100", "100 إلى 500", "أكثر من 500"] },
];

export default function JoinModal({ onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [sector, setSector] = useState("");
  const [email, setEmail] = useState("");

  const cur = Q[Math.min(step, 2)];
  const valid = sector.trim() && /\S+@\S+\.\S+/.test(email);
  const isQuestion = step < 3, isFinal = step === 3, isDone = step === 4, canBack = step > 0 && step < 4;

  const pick = (label) => {
    const a = answers.slice();
    a[step] = label;
    setAnswers(a);
    setStep(step + 1);
  };
  const submit = () => {
    if (!valid) return;
    submitLead({ companyType: answers[0], campaigns: answers[1], influencers: answers[2], sector: sector.trim(), email: email.trim(), submittedAt: new Date().toISOString() });
    setStep(4);
  };

  return (
    <div dir="rtl" onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(22,21,31,0.42)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", animation: "fmIn 0.25s both" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: "480px", background: "#ffffff", border: "1px solid #E4E3EC", borderRadius: "24px", padding: "28px 28px 30px", boxShadow: "0 30px 80px rgba(22,21,31,0.18)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <div style={{ display: "flex", gap: "6px" }}>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} style={{ width: i === step ? "22px" : "6px", height: "6px", borderRadius: "999px", background: i <= step ? "#3B0CEB" : "#E4E3EC", transition: "width 0.3s ease, background 0.3s ease" }}></span>
            ))}
          </div>
          <button onClick={onClose} aria-label="إغلاق" style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid #E4E3EC", background: "#ffffff", color: "#72717F", fontSize: "18px", lineHeight: 1, cursor: "pointer", fontFamily: "inherit" }}>×</button>
        </div>

        {isQuestion && (
          <>
            <div style={{ marginTop: "26px", fontSize: "13px", fontWeight: 500, color: "#3B0CEB" }}>{"السؤال " + (step + 1) + " من 3"}</div>
            <h3 style={{ margin: "8px 0 0", fontSize: "24px", lineHeight: 1.4, fontWeight: 600, color: "#16151F", textWrap: "balance" }}>{cur.title}</h3>
            <div style={{ marginTop: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {cur.opts.map((label) => {
                const sel = answers[step] === label;
                return (
                  <X as="button" key={step + label} onClick={() => pick(label)} style={`display: flex; align-items: center; justify-content: space-between; gap: 12px; width: 100%; text-align: right; font-family: inherit; font-size: 16px; font-weight: 500; color: #16151F; background: ${sel ? "#F3F0FE" : "#ffffff"}; border: 1px solid ${sel ? "#3B0CEB" : "#E4E3EC"}; border-radius: 14px; padding: 15px 18px; cursor: pointer; transition: border-color 0.2s ease, background 0.2s ease;`} hover="border-color: #3B0CEB;">
                    {label}<span style={{ color: "#A4A3B1", fontSize: "16px" }}>←</span>
                  </X>
                );
              })}
            </div>
          </>
        )}

        {isFinal && (
          <>
            <div style={{ marginTop: "26px", fontSize: "13px", fontWeight: 500, color: "#3B0CEB" }}>الخطوة الأخيرة</div>
            <h3 style={{ margin: "8px 0 0", fontSize: "24px", lineHeight: 1.4, fontWeight: 600, color: "#16151F" }}>أخبرنا عن شركتك</h3>
            <div style={{ marginTop: "22px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", fontWeight: 500, color: "#3B3A47" }}>قطاع الشركة
                <X as="input" value={sector} onChange={(e) => setSector(e.target.value)} placeholder="مثال تجميل أغذية سياحة" style="font-family: inherit; font-size: 16px; color: #16151F; background: #F8F8FB; border: 1px solid #E4E3EC; border-radius: 12px; padding: 13px 14px; outline: none;" focus="border-color: #3B0CEB; background: #ffffff;" />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", fontWeight: 500, color: "#3B3A47" }}>البريد الإلكتروني
                <X as="input" type="email" dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" style="font-family: inherit; font-size: 16px; color: #16151F; background: #F8F8FB; border: 1px solid #E4E3EC; border-radius: 12px; padding: 13px 14px; outline: none; text-align: right;" focus="border-color: #3B0CEB; background: #ffffff;" />
              </label>
            </div>
            <X as="button" onClick={submit} style={`margin-top: 22px; width: 100%; font-family: inherit; font-size: 16px; font-weight: 600; color: #ffffff; background: #3B0CEB; border: none; border-radius: 999px; padding: 15px 16px; cursor: pointer; opacity: ${valid ? 1 : 0.45}; transition: background 0.2s ease, opacity 0.2s ease;`} hover="background: #2A0AA8;">انضم مجانًا</X>
          </>
        )}

        {isDone && (
          <div style={{ marginTop: "30px", textAlign: "center" }}>
            <div style={{ width: "56px", height: "56px", margin: "0 auto", borderRadius: "50%", background: "#ECE8FD", color: "#3B0CEB", fontSize: "24px", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</div>
            <h3 style={{ margin: "18px 0 0", fontSize: "24px", fontWeight: 600, color: "#16151F" }}>شكرًا لانضمامك</h3>
            <p style={{ margin: "10px auto 0", maxWidth: "340px", fontSize: "16px", lineHeight: 1.8, color: "#72717F" }}>انضممت للنسخة التجريبية وبنتواصل معك قريبًا</p>
            <button onClick={onClose} style={{ marginTop: "22px", fontFamily: "inherit", fontSize: "15px", fontWeight: 600, color: "#16151F", background: "#ffffff", border: "1px solid #D9D8E3", borderRadius: "999px", padding: "12px 28px", cursor: "pointer" }}>إغلاق</button>
          </div>
        )}

        {canBack && (
          <button onClick={() => setStep(Math.max(0, step - 1))} style={{ marginTop: "16px", fontFamily: "inherit", fontSize: "14px", fontWeight: 500, color: "#72717F", background: "none", border: "none", padding: "4px 0", cursor: "pointer" }}>→ رجوع</button>
        )}
      </div>
    </div>
  );
}
