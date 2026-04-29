"use client"
import { useEffect } from "react";

export default function TawkToChat() {
  useEffect(() => {
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();

    (function () {
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/689dda6ded02831924d2275b/1j2k9qgij';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

  return null; // این کامپوننت چیزی رندر نمی‌کنه
}
