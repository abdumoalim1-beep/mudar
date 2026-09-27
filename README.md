# مُدار — Landing Page

صفحة الهبوط لمنصة **مُدار** لإدارة حملات المؤثرين، مبنية من تصميم Claude Design (FORMA Landing v5) بنفس التصميم حرفيًا.

## التشغيل محليًا

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # يُخرج الموقع في dist/
```

## الملفات

- `src/App.jsx` — الصفحة كاملة (الهيدر، الهيرو، المزايا، الباقات، الأسئلة، الفوتر)
- `src/JoinModal.jsx` — استبيان «انضم مجانًا» (نوع الجهة، عدد الحملات، عدد المؤثرين، القطاع، البريد)
- `src/lead.js` — يرسل بيانات الاستبيان إلى Formspree (يتطلب متغير البيئة `VITE_FORMSPREE_ID`)
- `src/data.jsx` — محتوى الصفحة والبيانات التجريبية للوحة
- `src/ui.jsx` — أدوات مساعدة (الأيقونات، الشعار، أنماط hover)

## تسجيل الدخول

زر «تسجيل الدخول» مخفي حاليًا. لإظهاره غيّر `SHOW_LOGIN` إلى `true` في `src/App.jsx`.

## النشر على GitHub Pages


فعّل مرة واحدة من: **Settings → Pages → Source: GitHub Actions**.
