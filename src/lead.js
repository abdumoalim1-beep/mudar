// Survey submissions are sent to Formspree (https://formspree.io):
// each signup arrives by email and is listed in the Formspree dashboard (exportable to CSV).
// Set FORMSPREE_ID to the form's ID (the part after /f/ in its endpoint URL).
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || "";

export async function submitLead(payload) {
  if (!FORMSPREE_ID) {
    console.warn("[mudar] FORMSPREE_ID is not set; submission not stored", payload);
    return;
  }
  try {
    await fetch("https://formspree.io/f/" + FORMSPREE_ID, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        email: payload.email,
        "نوع الجهة": payload.companyType,
        "عدد الحملات شهريًا": payload.campaigns,
        "عدد المؤثرين": payload.influencers,
        "قطاع الشركة": payload.sector,
        "وقت التسجيل": payload.submittedAt,
        _subject: "تسجيل جديد في مُدار",
      }),
    });
  } catch (err) {
    console.error("[mudar] failed to submit signup", err);
  }
}
