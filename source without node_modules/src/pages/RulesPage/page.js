import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  ShieldCheckIcon,
  CalendarDaysIcon,
  WalletIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const rules = [
  {
    title: "قانون ۱ – ثبت‌نام و احراز هویت",
    desc: "برای استفاده از خدمات دکتر رزرو، کاربران باید اطلاعات صحیح و کامل خود را در زمان ثبت‌نام وارد کرده و مراحل احراز هویت را با ارائه مدارک معتبر طی کنند.",
    icon: ShieldCheckIcon,
    side: "left",
  },
  {
    title: "قانون ۲ – نوبت‌گیری و کنسل کردن",
    desc: "کاربران می‌توانند حداکثر تا ۲ ساعت قبل از زمان نوبت، بدون جریمه رزرو را لغو کنند. در صورت عدم حضور یا لغو دیرهنگام، امتیاز منفی در پروفایل کاربر ثبت می‌شود.",
    icon: CalendarDaysIcon,
    side: "right",
  },
  {
    title: "قانون ۳ – کیف پول و پرداخت",
    desc: "شارژ کیف پول به‌صورت آنی انجام می‌شود. برداشت وجه فقط به حساب بانکی ثبت‌شده به نام همان کاربر امکان‌پذیر است. مسئولیت حفظ امنیت حساب بر عهده کاربر است.",
    icon: WalletIcon,
    side: "left",
  },
  {
    title: "قانون ۴ – کدهای تخفیف و اعتبار",
    desc: "هر کد تخفیف فقط یک‌بار و بر اساس شرایط اعلام‌شده قابل استفاده است. در صورت تقلب یا سوء‌استفاده، حساب کاربری مسدود و امتیازات بازیابی نخواهند شد.",
    icon: TicketIcon,
    side: "right",
  },
];

export default function RulesPage() {
  return (
    <div className="lg:gap-10 gap-4 bg-gradient-to-b to-transparent   from-[#C4E2FF] flex flex-col" dir="rtl">
      <Navbar />

      {/* Hero */}
      <div className="w-full flex  justify-center">
        <div className="relative   w-full flex lg:p-4 lg:px-12 ">
          <div className="lg:gap-4 lg:w-full items-center justify-center flex flex-col">
            <h5 className="text-[#005DAD] lg:text-3xl font-bold">
              قوانین و مقررات
            </h5>
            <p className="hidden lg:flex lg:tracking-wide text-xs lg:text-lg lg:leading-[3]">
              برای حفظ حقوق کاربران و ارائه تجربه‌ای یکپارچه، رعایت مقررات زیر
              الزامی است. لطفاً پیش از استفاده از خدمات دکتر رزرو این موارد را
              به‌دقت مطالعه فرمایید.
            </p>
          </div>
        </div>
      </div>

      {/* Rules */}
      {rules.map((rule, idx) => (
        <RuleCard key={idx} {...rule} />
      ))}

      <Footer />
    </div>
  );
}

const RuleCard = ({
  title,
  desc,
  icon: Icon,
  side,
}) => {
  const isLeft = side === "left";
  return (
    <div className="w-full justify-center lg:mt-5 flex">
      <div className="flex flex-col lg:mt-20 mt-10 lg:gap-10 items-center w-full lg:w-[60%]">
        <div className="w-full flex items-center justify-between">
          {isLeft ? (
            <>
              <Icon className="w-24 h-24 lg:w-36 lg:h-36 text-[#005DAD]" />
              <div className="relative rounded-xl p-2 lg:p-4 lg:w-[35%] gap-2 lg:gap-4 bg-[#DFE6FF] bg-opacity-70 shadow-lg flex flex-col">
                <h5 className="text-[#005DAD] font-bold">{title}</h5>
                <p className="text-[10px] lg:text-base">{desc}</p>
              </div>
            </>
          ) : (
            <>
              <div className="relative rounded-xl p-2 lg:p-4 lg:w-[35%] gap-2 lg:gap-4 bg-[#DFE6FF] bg-opacity-70 shadow-lg flex flex-col">
                <h5 className="text-[#005DAD] font-bold">{title}</h5>
                <p className="text-[10px] lg:text-base">{desc}</p>
              </div>
              <Icon className="w-24 h-24 lg:w-36 lg:h-36 text-[#005DAD]" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};