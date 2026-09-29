/**
 * بک‌اند بعضی از لوگوهای SVG را بدون بستن تگ <text> ارسال می‌کند
 * (مثلا: <svg ...><text ...>د</svg>) — XML نامعتبر است و مرورگر آن را
 * به‌عنوان تصویر رندر نمی‌کند و آیکون شکسته نشان داده می‌شود.
 *
 * این helper تگ باز <text ...> را قبل از </svg> می‌بندد و دیتا URI
 * اصلاح‌شده را برمی‌گرداند. ورودی غیر SVG بدون تغییر برمی‌گردد.
 */
const SVG_PREFIX = "data:image/svg+xml;base64,";

export const fixSvgDataUri = (src) => {
  if (typeof src !== "string" || !src.startsWith(SVG_PREFIX)) {
    return src;
  }
  try {
    const b64 = src.slice(SVG_PREFIX.length);
    // atob خروجی byte-string می‌دهد (هر کاراکتر = یک بایت UTF-8)
    let svg = atob(b64);
    if (svg.includes("<text") && !svg.includes("</text>")) {
      svg = svg.replace(
        /(<text[^>]*>)([^<]*)\s*(<\/svg>\s*)?$/,
        "$1$2</text></svg>"
      );
    }
    // چون svg فعلاً byte-string است، مستقیم btoa می‌زنیم؛
    // encodeURIComponent اینجا باعث double-encoding و خرابی حروف فارسی می‌شود
    return SVG_PREFIX + btoa(svg);
  } catch (e) {
    return src;
  }
};

/**
 * هندلر خطای img: تصویر شکسته را با آیکون جایگزین محلی عوض می‌کند
 * استفاده: onError={(e) => handleImgError(e, fallbackSrc)}
 */
export const handleImgError = (e, fallbackSrc) => {
  if (fallbackSrc && e.currentTarget.src !== fallbackSrc) {
    e.currentTarget.src = fallbackSrc;
  }
};
