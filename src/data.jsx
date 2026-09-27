import { icon } from "./ui.jsx";

export const tabNames = ["نظرة عامة", "المؤثرون", "حالة النشر"];

const T = (x, y, sz, tilt, dur, delay, g) => ({ x, y, s: sz, tilt, dur, delay, glyph: icon(g, Math.round(sz * 0.46), "#3B3A47") });
export const tilesWide = [
  T("22%", 130, 44, "-6deg", "11s", "0s", "instagram"),
  T("74%", 140, 40, "5deg", "12s", "1.4s", "tiktok"),
  T("81%", 230, 58, "4deg", "10.5s", "0.7s", "youtube"),
  T("12%", 300, 62, "-5deg", "12.5s", "2s", "x"),
  T("20%", 540, 48, "4deg", "11.5s", "1s", "snapchat"),
];
export const tilesNarrow = [
  T("3%", 470, 36, "-6deg", "11s", "0s", "instagram"),
  T("calc(97% - 36px)", 450, 36, "5deg", "12s", "1.4s", "youtube"),
  T("7%", 600, 32, "4deg", "11.5s", "1s", "tiktok"),
  T("calc(93% - 32px)", 590, 32, "-4deg", "10.5s", "0.7s", "x"),
];

const ok = { sInk: "#2F7D5A", sBg: "#E7F1EB" }, wait = { sInk: "#B7791F", sBg: "#F8EFDF" }, neu = { sInk: "#72717F", sBg: "#F2F1F7" }, bad = { sInk: "#2A0AA8", sBg: "#ECE8FD" };

export const infl = [
  { ini: "سخ", name: "سارة خالد", handle: "@sara.k", plats: ["إ", "ت", "ي"], label: "تجميل", camps: "6", fol: "412K", views: "184K", er: "4.8%", status: "معتمد", added: "4 مايو", ...ok },
  { ini: "أن", name: "أحمد ناصر", handle: "@ahmad.tech", plats: ["ي", "X"], label: "تقنية", camps: "3", fol: "268K", views: "96K", er: "3.9%", status: "قيد المراجعة", added: "10 مايو", ...wait },
  { ini: "لف", name: "لينا فاروق", handle: "@lina.life", plats: ["ت", "إ", "س"], label: "أسلوب حياة", camps: "8", fol: "189K", views: "142K", er: "5.2%", status: "معتمد", added: "12 أبريل", ...ok },
  { ini: "عح", name: "عمر حداد", handle: "@omar.eats", plats: ["س", "إ"], label: "طعام", camps: "2", fol: "96K", views: "51K", er: "6.1%", status: "مقترح", added: "28 أبريل", ...neu },
  { ini: "نس", name: "نورة سعد", handle: "@noura.travels", plats: ["إ", "ي", "ت"], label: "سفر", camps: "5", fol: "154K", views: "88K", er: "4.4%", status: "معتمد", added: "2 أبريل", ...ok },
  { ini: "فم", name: "فهد منصور", handle: "@fahad.fit", plats: ["ت", "س"], label: "رياضة", camps: "4", fol: "221K", views: "130K", er: "5.7%", status: "قيد المراجعة", added: "19 مارس", ...wait },
];
const pk = { "إ": "instagram", "ت": "tiktok", "ي": "youtube", "X": "x", "س": "snapchat" };
const avs = [["#ECE8FD", "#2A0AA8"], ["#E7F1EB", "#2F7D5A"], ["#F8EFDF", "#8A5A12"], ["#EDECF3", "#3B3A47"], ["#F1E6DC", "#2A0AA8"], ["#E9EEE6", "#3E5E45"]];
const faces = ["https://plus.unsplash.com/premium_photo-1663957813519-58a2a5cd3fa4", "https://images.unsplash.com/photo-1698510047345-ff32de8a3b74", "https://images.unsplash.com/photo-1640262653851-098ddf520548", "https://images.unsplash.com/photo-1624411024074-18a756682b50", "https://plus.unsplash.com/premium_photo-1681493957529-3d0e2856b3ae", "https://images.unsplash.com/photo-1698509423497-e4bd813c89b4"];
infl.forEach((r, i) => { r.photoBg = "url(" + faces[i] + "?w=96&h=96&fit=crop&crop=faces&auto=format)"; r.platIcons = r.plats.map((p) => icon(pk[p], 12, "#3B3A47")); r.avBg = avs[i % 6][0]; r.avInk = avs[i % 6][1]; });

export const posts = [
  { title: "ريل إطلاق مجموعة الصيف", who: "سارة خالد", plat: "إنستغرام", date: "24 يوليو · 6:00 م", views: "269K", er: "5.1%", status: "نُشر", ...ok },
  { title: "مراجعة المنتج بالتفصيل", who: "أحمد ناصر", plat: "يوتيوب", date: "24 يوليو · 8:00 م", views: "—", er: "—", status: "بانتظار الموافقة", ...wait },
  { title: "يوم كامل مع المنتج", who: "لينا فاروق", plat: "تيك توك", date: "23 يوليو · 5:30 م", views: "1.2M", er: "6.4%", status: "نُشر", ...ok },
  { title: "3 ستوري بكود الخصم", who: "عمر حداد", plat: "سناب شات", date: "23 يوليو · 9:00 م", views: "58K", er: "3.2%", status: "نُشر", ...ok },
  { title: "فيديو الرحلة", who: "نورة سعد", plat: "إنستغرام", date: "22 يوليو · 7:00 م", views: "—", er: "—", status: "متأخر", ...bad },
  { title: "تحدي التمرين الأسبوعي", who: "فهد منصور", plat: "تيك توك", date: "26 يوليو · 4:00 م", views: "—", er: "—", status: "مجدول", ...neu },
];
const pn = { "إنستغرام": "instagram", "تيك توك": "tiktok", "يوتيوب": "youtube", "سناب شات": "snapchat", "X": "x" };
const reelImgs = ["photo-1507525428034-b723cf961d3e", "photo-1523275335684-37898b6baf30", "photo-1495474472287-4d71bcdd2085", "photo-1504674900247-0877df9cc836", "photo-1488646953014-85cb44e25828", "photo-1517836357463-d25dfeac3438"].map((id) => "https://images.unsplash.com/" + id + "?w=120&h=160&fit=crop&auto=format");
const tints = ["#EFE3D6", "#E6E9E1", "#F1E4DA", "#E9E4DB", "#EDE1D8", "#E4E6DF"];
posts.forEach((r, i) => { r.platIcon = icon(pn[r.plat], 13, "#3B3A47"); r.thumb = tints[i % 6]; r.imgBg = "url(" + reelImgs[i] + ")"; r.playIcon = icon("play", 10, "#ffffff"); });

export const kpis = [
  { l: "إجمالي المشاهدات", v: "2.4M", d: "+18%", ic: "play", s: [16, 14, 15, 11, 12, 8, 9, 4] },
  { l: "حملات نشطة", v: "12", d: "+3", ic: "folder", s: [15, 15, 12, 13, 10, 10, 7, 6] },
  { l: "منشورات هذا الشهر", v: "86", d: "+14", ic: "calendar", s: [18, 14, 15, 12, 13, 9, 7, 5] },
  { l: "متوسط التفاعل", v: "4.9%", d: "+0.6", ic: "users", s: [14, 16, 12, 13, 11, 12, 8, 7] },
].map((k) => Object.assign(k, { icon: icon(k.ic, 13, "#3B0CEB"), spark: k.s.map((y, i) => (i ? "L" : "M") + (i * 8 + 2) + " " + y).join(" ") }));

export const camps = [
  { logo: "ن", logoBg: "#F8E7EE", logoInk: "#9C2F5B", name: "حملة الصيف", client: "نوفيا بيوتي", pct: 75, prog: "9 من 12 منشورًا", status: "قيد التنفيذ", sInk: "#3B0CEB", sBg: "#ECE8FD" },
  { logo: "ل", logoBg: "#F8EFDF", logoInk: "#8A5A12", name: "إطلاق رمضان", client: "لوملي", pct: 30, prog: "3 من 10 معتمدين", status: "بانتظار الموافقة", ...wait },
  { logo: "أ", logoBg: "#E6EEF8", logoInk: "#2B5C8F", name: "العودة للمدارس", client: "أوربت", pct: 100, prog: "التقرير جاهز", status: "مكتملة", ...ok },
];

const sideIcons = { "نظرة عامة": "grid", "المؤثرون": "users", "الحملات": "folder", "حالة النشر": "calendar", "أعضاء الفريق": "userplus", "التقارير النهائية": "file" };
const sideCounts = { "نظرة عامة": "", "المؤثرون": "48", "الحملات": "12", "حالة النشر": "6", "أعضاء الفريق": "5", "التقارير النهائية": "3" };
export const sideFor = (tab) => [
  { group: "", items: [{ l: "نظرة عامة", on: tab === 0 }, { l: "المؤثرون", on: tab === 1 }] },
  { group: "المتابعة", items: [{ l: "الحملات", on: false }, { l: "حالة النشر", on: tab === 2 }] },
  { group: "الإدارة", items: [{ l: "أعضاء الفريق", on: false }, { l: "التقارير النهائية", on: false }] },
].map((g) => ({ group: g.group, hasGroup: !!g.group, items: g.items.map((it) => ({ l: it.l, icon: icon(sideIcons[it.l], 16, it.on ? "#16151F" : "#878696"), ink: it.on ? "#16151F" : "#72717F", bg: it.on ? "#ffffff" : "transparent", bd: it.on ? "#E4E3EC" : "transparent", sh: it.on ? "0 1px 2px rgba(22,21,31,0.05)" : "none", bar: it.on ? "#3B0CEB" : "transparent", count: sideCounts[it.l], cInk: it.on ? "#3B0CEB" : "#A4A3B1", cBg: it.on ? "#ECE8FD" : "transparent", w: it.on ? 600 : 500 })) }));

export const platforms = [["إنستغرام", "instagram"], ["تيك توك", "tiktok"], ["يوتيوب", "youtube"], ["X", "x"], ["سناب شات", "snapchat"], ["ثريدز", "threads"], ["فيسبوك", "facebook"]].map((p) => ({ n: p[0], icon: icon(p[1], 20, "#3B3A47") }));

const A = "#3B0CEB";
const b = (t, ink, bg) => ({ t, ink, bg });
const addI = (rows) => rows.map((r) => Object.assign(r, { i: r.a.replace(/^[^؀-ۿ]+/, "").trim().charAt(0) || "•" }));
export const features = [
  { title: "أضف المؤثر برابط", body: "الصق رابط حساب من أي منصة ويجمع مُدار المتابعين ومتوسط المشاهدات والتفاعل خلال ثوانٍ دون أي إعداد", isInput: true, input: "الصق رابط حساب المؤثر", btn: "إضافة", resName: "@sara.k", resBadge: "412K متابع" },
  { title: "ملف أداء لكل مؤثر", body: "كل مؤثر له ملف يحفظ أرقامه وملاحظات فريقك وسجل حملاته السابقة ونتائجها", isList: true, head: "سارة خالد · ملف الأداء", rows: [{ a: "حملات سابقة", s: "آخرها حملة الصيف", ...b("6 حملات", "#72717F", "#F2F1F7") }, { a: "متوسط التفاعل", s: "آخر 90 يومًا", ...b("4.8%", "#2F7D5A", "#E7F1EB") }] },
  { title: "موافقات وتقارير بروابط", body: "حوّل القائمة المختصرة إلى ملف موافقة وشاركه مع العميل برابط للقراءة فقط يبقى محدّثًا دائمًا واعرف فورًا من اعتمد", isList: true, head: "ملف الموافقة · حملة الصيف", rows: [{ a: "سارة خالد", s: "2 ريلز · 3 ستوري", ...b("معتمد", "#ffffff", A) }, { a: "أحمد ناصر", s: "فيديو يوتيوب", ...b("قيد المراجعة", "#72717F", "#F2F1F7") }, { a: "رابط العميل", s: "forma.app/r/summer-24", ...b("للقراءة فقط", "#72717F", "#F2F1F7") }] },
  { title: "كل المنصات في رسم واحد", body: "مشاهدات إنستغرام وتيك توك ويوتيوب وسناب شات وبقية المنصات مجمعة في رسم بياني حي واحد", isChart: true, head: "المشاهدات", sub: "آخر 30 يومًا" },
  { title: "تابع حالة كل منشور", body: "كل مخرج له موعد وحالة واضحة فتعرف ما نُشر وما تأخر قبل أن يسألك العميل", isList: true, head: "حالة النشر · اليوم", rows: [{ a: "ريل · سارة خالد", s: "إنستغرام · 6:00 م", ...b("نُشر", "#2F7D5A", "#E7F1EB") }, { a: "فيديو · نورة سعد", s: "إنستغرام · أمس", ...b("متأخر", "#2A0AA8", "#ECE8FD") }, { a: "3 ستوري · عمر حداد", s: "سناب شات · 9:00 م", ...b("مجدول", "#72717F", "#F2F1F7") }] },
  { title: "التقرير النهائي بنقرة", body: "يجمع مُدار النتائج حسب المنصة والمؤثر في تقرير نهائي بهويتك جاهز للإرسال للعميل", isList: true, head: "تقرير حملة الصيف", rows: [{ a: "ملخص النتائج", s: "2.4M مشاهدة · 4.9% تفاعل", ...b("جاهز", "#2F7D5A", "#E7F1EB") }, { a: "الأداء حسب المؤثر", s: "12 مؤثرًا · 4 منصات", ...b("جاهز", "#2F7D5A", "#E7F1EB") }] },
];
features.forEach((f) => { if (f.rows) addI(f.rows); });

export const audiences = [
  { icon: icon("brief", 22, "#16151F"), title: "الوكالات", body: "تابع مؤثري كل عميل في مكان واحد وحافظ على دقة الأرقام وسلّم تقريرًا حيًا بدل عرض شهري" },
  { icon: icon("bag", 22, "#16151F"), title: "العلامات التجارية", body: "اعرف أداء حملات المؤثرين عبر المنصات وأي الشركاء والمحتوى يحققون النتائج فعلًا" },
  { icon: icon("users", 22, "#16151F"), title: "فرق التسويق الداخلية", body: "نظّم قائمة المؤثرين وسجل التعاون وملفات الحملات ولا تبدأ كل حملة من الصفر" },
];

const L = { bg: "#ffffff", border: "#E4E3EC", ink: "#16151F", sub: "#72717F", body: "#3B3A47", chkBg: "#ECE8FD", chkInk: "#3B0CEB", btnBg: "#ffffff", btnInk: "#16151F", btnBorder: "#D9D8E3", lift: "0px", shadow: "none", hasTag: false };
const D = { bg: "#191826", border: "#191826", ink: "#ffffff", sub: "rgba(255,255,255,0.62)", body: "rgba(255,255,255,0.9)", chkBg: "rgba(255,255,255,0.1)", chkInk: "#A996F5", btnBg: "#3B0CEB", btnInk: "#ffffff", btnBorder: "#3B0CEB", lift: "-12px", shadow: "0 20px 44px rgba(22,21,31,0.14)", hasTag: true };
export const plans = [
  { name: "أساسي", desc: "كل ما تحتاجه لإدارة حملاتك بوضوح", price: "299", old: "399", yearly: "2,870 ر.س تُدفع سنويًا · وفّر 20%", items: ["مستخدمان", "حتى 10 حملات نشطة", "200 ملف مؤثر محفوظ", "تنظيم ملفات الموافقات ومتابعة حالة النشر", "تقارير أساسية لكل حملة"], cta: "ابدأ بالباقة الأساسية", ...L },
  { name: "وكالة", desc: "حملات عدة عملاء وفريق واحد يعرف ما أُنجز وما ينتظر الموافقة", price: "499", old: "699", yearly: "4,790 ر.س تُدفع سنويًا · وفّر 20%", items: ["كل ما في الباقة الأساسية", "5 مستخدمين", "حتى 30 حملة نشطة", "1,000 ملف مؤثر محفوظ", "حتى 5 مساحات عملاء منفصلة", "تقارير مستقلة لكل عميل"], cta: "ابدأ باقة الوكالة", ...D },
  { name: "وكالة بلس", desc: "مساحة تشغيل أوسع لوكالتك مع تقارير جاهزة بهويتها", price: "699", old: "999", yearly: "6,710 ر.س تُدفع سنويًا · وفّر 20%", items: ["كل ما في باقة الوكالة", "15 مستخدمًا", "حتى 100 حملة نشطة", "5,000 ملف مؤثر محفوظ", "حتى 20 مساحة عملاء", "تقارير بهوية الوكالة", "دعم مخصص في الإعداد"], cta: "تواصل معنا للبدء", contact: true, ...L },
];

export const faqData = [
  { q: "ما هو مُدار ولمن صُمّم", a: "مُدار مساحة عمل لإدارة حملات المؤثرين صُمّمت للفرق والوكالات التي تريد تنظيم بيانات المؤثرين والموافقات ومتابعة النشر وتقارير الحملات في مكان واحد" },
  { q: "كيف يساعد مُدار فريقي في إدارة الحملات", a: "يمنح فريقك صورة واضحة لكل حملة المؤثرون المشاركون الملفات المطلوبة الموافقات وما نُشر وما يزال قيد المتابعة هكذا يعرف كل فرد الخطوة التالية دون الرجوع إلى جداول ورسائل متفرقة" },
  { q: "هل يمكنني إدارة حملات عدة عملاء في مُدار", a: "نعم يمكنك تنظيم أعمال العملاء في مساحات منفصلة لتبقى حملات كل عميل وملفاته وتقاريره واضحة لفريقك" },
  { q: "كيف أتابع الموافقات وحالة النشر", a: "يمكنك حفظ ملفات الموافقة ومتابعة حالة النشر ضمن الحملة نفسها حتى ترى ما اكتمل وما يحتاج متابعة قبل موعد التسليم" },
  { q: "هل يمكنني استخدام قائمة المؤثرين التي أعمل معها حاليًا", a: "نعم يمكنك إضافة بيانات المؤثرين الحاليين وحفظ ملفاتهم داخل مُدار ثم استخدامها عند تنظيم حملاتك" },
  { q: "هل تشمل رسوم الاشتراك أتعاب المؤثرين", a: "لا رسوم الاشتراك مقابل استخدام منصة مُدار أتعاب المؤثرين وميزانية الحملة يحددها فريقك وفق اتفاقاته مع المؤثرين" },
];

const mk = (pts) => pts.map((y, i) => (i ? "L" : "M") + (i * 20) + " " + y).join(" ");
export const chartPath = mk([62, 70, 58, 66, 50, 54, 40, 46, 30, 36, 22, 28, 12, 34, 16]);
export const line2 = mk([70, 72, 68, 70, 64, 66, 60, 62, 56, 58, 50, 54, 46, 52, 48]);
export const line3 = mk([76, 75, 74, 75, 72, 73, 70, 71, 68, 69, 66, 67, 64, 66, 65]);
export const areaPath = chartPath + " L280 80 L0 80 Z";
export const legend = [{ n: "إنستغرام", c: "#3B0CEB" }, { n: "تيك توك", c: "#9A86F5" }, { n: "يوتيوب", c: "#D6CEFB" }];

export const icSearch = icon("search", 14, "#A4A3B1");
export const icBell = icon("bell", 16, "#72717F");
export const icTik = icon("tiktok", 12, "#ffffff");
