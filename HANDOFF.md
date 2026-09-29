# HANDOFF — دکتر رزرو ( reservation_react )

> این سند برای هر ایجنت/توسعه‌دهنده‌ای است که کار را ادامه می‌دهد. آخرین به‌روزرسانی: بعد از دور دوم QC کامل (تست مرورگری انتها-به-انتها).

---

## ۱) تصویر کلی

| مورد | مقدار |
|---|---|
| فرانت‌اند | CRA (React 18) — همین ریپو، شاخه `main` |
| ریپوی فرانت | `https://github.com/mahankarimi1382/reservation_react` |
| بک‌اند | ASP.NET Core + CQRS/MediatR — ریپو `https://github.com/hasannazem1450/DRR` (کلون محلی: `C:\Users\Lenovo\Downloads\DRR-backend`) — **فقط خواندنی برای ما؛ تغییر بک‌اند با تیم بک‌اند است** |
| سرور بک‌اند (لایو) | `https://myapi.dadehavaran.com:8040` (همان `84.47.224.220:8040`) — HTTPS با سرتیفیکیت self-signed |
| Swagger | `https://myapi.dadehavaran.com:8040/swagger/v1/swagger.json` (کپی محلی: `C:\Users\Lenovo\Downloads\drr-swagger.json`) |
| پوشه فرانت (لوکال) | `C:\Users\Lenovo\Downloads\reservation-react-last` |

## ۲) قراردادهای API (مهم!)

- پاکت پاسخ: `{ hasError, message, code, result }` — داده همیشه در `result` است.
- خطای بیزینسی: HTTP 409 با `message.message` (فارسی). خطای هندل‌نشده: **HTTP 400 با `code:500`** (middleware استثنا را 400 می‌کند!) — پس «400» در این سرور لزوماً خطای اعتبارسنجی نیست، NRE هم هست.
- احراز هویت: JWT Bearer. توکنِ برگشتی خودش با `Bearer ` شروع می‌شود؛ فرانت آن را خام در کوکی `token` می‌گذارد و interceptor آن را در هدر `Authorization` می‌گذارد — درست کار می‌کند.
- **`metadata` را نباید فرستاد** — بک‌اند آن را `[JsonIgnore]` کرده و از JWT claims بازنویسی می‌کند. فرانت فعلاً می‌فرستد؛ بی‌ضرر ولی زائد.
- JSON: camelCase. تاریخ‌ها: رشته شمسی `yyyy/MM/dd`. id ها: int همه‌جا به‌جز Clinic/Office/File که Guid هستند.
- لایه API فرانت: `src/api/ApiCalling.js` (~۹۰ تابع) + `src/api/axiosConfig.js` (interceptor ها؛ پرچم `{ silent: true }` توست خطا را خاموش می‌کند).

## ۳) آنچه الان انتها-به-انتها کار می‌کند (تست‌شده با مرورگر + تأیید سرور)

1. **جستجو:** سرچ لندینگ (`MainSearch/searchall` + fallback سه‌سروره در `searchall`) — «حسن» نتیجه پزشک می‌دهد.
2. **پروفایل پزشک:** `/doctors/{نام فامیل با فاصله}` از طریق `read-DoctorByNameSSR`.
3. **نوبت‌گیری:** پروفایل → ویزیت حضوری → کارت مرکز → مودال روز/ساعت (`read-doctor-treatmentcenter-reservation`) → روز (تطبیق تاریخ داخل `visitCost.reservations` — به `[0]` اعتماد نکن، روزِ انتخاب‌شده را match کن) → ساعت → تایید → ثبت بیمار (`create-patient`) → پرداخت (UI) → `create-patientreservation` (فقط `turnId` مهم است؛ `reservationId` بک‌اند نادیده می‌گیرد).
4. **کنسل نوبت بیمار:** `/userPanel/history` → دکمه کنسل (`delete-patientreservation`). ⚠️ باگ بک‌اند: `Turn.IsFree` برنمی‌گردد.
5. **پنل‌ها:** گارد نقش (`src/components/RoleGuard.js`) — ادمین فقط با نقش‌های ادمینی. تقویم کاری پزشک، کنسل نوبت پزشک، لیست بیماران، نظرات، بنرها، تخصص‌ها/دسته‌ها، بیمه‌ها — همه به API واقعی وصل‌اند.
6. **بخش دولتی** (`/government-hospitals`): کامل و به `MinistryApiReserve/*` وصل (صفحه `ConfirmAppointment.js` یتیم است — استفاده نمی‌شود؛ نسخه اصلی `ConfirmReservation.js` است).

## ۴) داده‌های تست روی سرور لایو (برای تست بدون seed مجدد)

- **پزشک کامل:** دکتر ۱ «حسن ناظم» — تخصص دارد، مرکز «۲پرفوسور ناظم»، هزینه ویزیت ۲,۳۰۱,۰۰۰، تقویم کاری: ۳ روز آینده (۱۴۰۵/۰۷/۱۰ تا ۱۲) هر کدام ۱۲ نوبت ۰۹:۰۰–۱۳:۰۰. (نوبت ۰۹:۰۰ روز اول توسط تست مصرف شده.)
- **دسته‌بندی تخصص‌ها:** ۱۲ دسته واقعی با آیکون + ۲۸۱ تخصص توزیع‌شده (`Specialist/read-categorys`).
- **اکانت ادمین:** کد ملی `0069269904` / رمز `Nn123456` → نقش **SuperAdmin**، smeProfileId=7، ۷ بیمار (بیمار id=16 «مدیر سایت» توسط تست ساخته شد).
- **اکانت تست OTP:** کد ملی `1234567891` / رمز `QcTest1234` — ⚠️ لاگین رمزی این اکانت ۵۰۰ می‌دهد (باگ B1 پایین).

## ۵) 🐛 باگ‌های بک‌اند (فقط به تیم بک‌اند گزارش شود — فرانت دورشان زده)

1. **[بحرانی] لاگین دوم کاربر OTP می‌شکند:** `ActivatingRegistrationCommandHandler` (else-branch) SmeProfile می‌سازد ولی **ردیف `UserProfile` را نمی‌سازد** → `SignInCommandHandler` (حدود خط ۹۵) روی لیست خالی `FirstOrDefault().SmeProfileId` → NRE. اصلاح: در else-branch `_userProfileRepository.Create(new UserProfile(userUpdate.Id, smep.Id))` هم اضافه شود.
2. **[بحرانی] `Doctor/search-doctors`** همیشه ۵۰۰/خالی (`SearchDoctorsQueryHandler` → `ConvertToBoxDto` روی پزشکانِ بدون تخصص NRE می‌دهد؛ ۵۲۵۴ پزشک ایمپورت‌شده اکثراً Specialist ندارند). فرانت با `search-list-doctors` جبران می‌کند.
3. `MainSearch/searchall` خط ۲۳۳: `s.Specialist.Name` → با پزشک بی‌تخصص ۵۰۰. اصلاح: `s.Specialist?.Name ?? ""`. همچنین fallback لوشتاین در `DoctorTreatmentCenterRepository` (~خط ۴۲۹) بدون چک null.
4. **کنسل نوبت، `Turn.IsFree` را true نمی‌کند** (`DeletePatientReservationCommandHandler`) → وقت کنسل‌شده برای همیشه اشغال می‌ماند. همینطور `delete-reservation` نوبت‌ها را یتیم می‌گذارد.
5. `create-sme-profile` با پیلود کامل معتبر هم در SaveChanges می‌شکند (لاگ inner-exception سمت سرور لازم؛ پیلود بازتولید در تاریخ چت هست).
6. ورود با موبایل ۱۱ رقمی `09...` در sign-in به `+9898...` تبدیل می‌شود → کاربر پیدا نمی‌شود. رمز اکانت‌های موبایلی هاردکد `String123456` است. OTP انقضا ندارد؛ `reset-password` کد را چک نمی‌کند.
7. Endpointهای حذف/ویرایش Province، City، Insurance، Article، DoctorInsurance دستور نامرتبط اجرا می‌کنند (مثلاً `delete-province` کاربر را sign-out می‌کند!).
8. **امنیت:** کلید JWT هاردکد + پسورد DB/SMS در `appsettings.json` داخل ریپوی عمومی؛ Endpointهای ادمین role-guard ندارند (فقط یکی).
9. **ندارند (تا ساخته نشدند فرانت قابل اتصال نیست):** ویزیت آنلاین (room)، فروشگاه، یادآور/زمان‌بند نوبت، Endpoint آمار داشبورد/گزارشات، کیف پول/تراکنش، امتیاز/جایزه، Endpoint «نظراتِ خودِ بیمار»، درگاه پرداخت، و Endpoint خواندن Turns یک روز (گرید کامل ساعت‌ها فقط از داخل `visitCost.reservations` می‌آید).

## ۶) 🐛 نکات شناخته‌شده فرانت (فیکس‌نشده — اولویت بعدی)

1. **دراپ‌داون جستجو** گاهی re-render می‌شود و کلیک روی لینک نتایج رد می‌شود (رفرش نتایج روی focus). پیشنهاد: debounce لینک‌ها یا state پایدار.
2. **`/Reservation/:id` و `ConfirmAppointment.js` صفحات یتیم mock هستند** — در جریان استفاده نمی‌شوند. حذف یا اتصال بعدی.
3. **پنل ادمین `/adminPanel/doctors`**: در آخرین تست به پروفایل پزشک ری‌دایرکت می‌شد — احتمالاً تغییرات در حال کارِ ایجنت قبلی؛ دوباره بررسی شود.
4. داشبوردها/گزارشات ادمین و پزشک static با اعداد قلابی‌اند تا API آمار ساخته شود.
5. `Receipt.js` «کد رهگیری» را «—» نشان می‌دهد چون بک‌اند در پاسخ create هیچ id برنمی‌گرداند.
6. ردیف‌های قدیمی تاریخچه «محل ویزیت: —» دارند (داده seed قدیمی بدون آدرس).
7. ۳۴۳ عدد `console.log` در سورس هست — یک دور پاک‌سازی بهداشتی لازم دارد.

## ۷) فیکس‌های مهمی که در این ریپو انجام شده (برای زمینه)

- رفع کرش لاگین OTP (`create_sme_profile` تعریف‌نشده)، گارد نقش پنل‌ها، fallback جستجو، کنسل نوبت بیمار/پزشک، تقویم کاری پزشک، فرم ثبت‌نام پزشک، پیام‌ها/نظرات/بیماران پزشک/فالوها، ست‌شدن `doctorProfileStore` از پروفایل (رفع لودینگ بی‌نهایت مودال نوبت)، تطبیق روز→turns، قیمت واقعی ویزیت در صفحه پرداخت (`reservationStore.visitPrice`)، اعتبارسنجی استان/شهر فرم بیمار، ثبت `phoneNum` در لاگین رمزی (رفع بلاک شدن ادمین)، `pointer-events-none` تصاویر تزئینی، دکمه‌های «انصراف» مرده، global `overflow-x: clip`، فیکس Footer، ریسپانسیو نوبار.

## ۸) اجرا و تست

```bash
cd C:\Users\Lenovo\Downloads\reservation-react-last
npm start        # http://localhost:3000
```

**تست مسیر طلایی:** لاگین (OTP با شماره واقعی، یا رمزی با اکانت ادمین) → جستجوی «حسن» → پروفایل → ویزیت حضوری → نوبت بگیرید → روز → ساعت → تایید → انتخاب/ثبت بیمار (استان/شهر اجباری!) → ادامه → تایید و پرداخت → رسید → `/userPanel/history`.

## ۹) نکات محیطی (وقتت را نمی‌گیرد!)

- **curl روی localhost جواب نمی‌دهد؟** متغیر محیط `http_proxy=127.0.0.1:2081` ست است؛ با `curl --noproxy "*"` بزن.
- سرتیفیکیت سرور self-signed است: `curl -k`؛ مرورگر بار اول هشدار می‌دهد.
- **دو ایجنت همزمان روی این ریپو کار می‌کنند** — قبل از push حتماً `git pull --rebase` و قبل از ویرایش فایل را تازه بخوان.
- اسکرین‌شات‌های تست در `gui-test-screenshots/` هستند (untracked؛ کامیت نشده — می‌توانی حذف کنی).
- `admin_login.json`/`admin_token.txt` و اسکریپت‌های seed در `C:\Users\Lenovo\Downloads\` هستند (خارج از ریپو).
