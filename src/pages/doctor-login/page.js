import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import doctorAvatar from "../../assets/Pics/doctorLoginAvatar.png";

// ایمپورت آیکون‌ها
import peopleIcon from "../../assets/Pics/people-blue.png";
import trendDownIcon from "../../assets/Pics/trend-down-icon.png";
import volumeIcon from "../../assets/Pics/volume-high-icon.png";
import monitorIcon from "../../assets/Pics/monitor-mobbile.png";

import {
  DoctorLoginButt,
  DoctorsSignUpButt,
} from "../../components/Buttons/Button";

import { userDoctorStorage } from "../../store/Store";

const cards = [
  {
    id: 1,
    title: "کاهش نرخ کنسلی",
    icon: trendDownIcon,
    caption:
      "پرداخت حق ویزیت به صورت آنلاین باعث شده تا تنها بیمارانی اقدام به دریافت نوبت کنند که واقعاً قصد مراجعه دارند.",
  },
  {
    id: 2,
    title: "تبلیغات",
    icon: volumeIcon,
    caption:
      "میلیون‌ها بیمار ماهانه به وبسایت دکتر رزرو مراجعه می‌کنند و می‌توانند شما را در جایگاه‌های تبلیغاتی مشاهده کنند.",
  },
  {
    id: 3,
    title: "مشاوره حضوری",
    icon: peopleIcon,
    caption:
      "روزها و ساعاتی که تمایل به ویزیت بیمار دارید، بر روی صفحه اختصاصی شما قرار می‌گیرد.",
  },
  {
    id: 4,
    title: "مشاوره آنلاین",
    icon: monitorIcon,
    caption:
      "بدون حضور در مطب و در هر زمان و مکانی با بیماران به صورت غیرحضوری در ارتباط باشید.",
  },
];

function DoctorSignupPage() {
  const navigate = useNavigate();
  const { doctors } = userDoctorStorage();

  useEffect(() => {
    /**
     * اگر doctors آبجکت یا آرایه باشد و خالی نباشد،
     * کاربر به داشبورد پزشک هدایت می‌شود.
     */
    const hasDoctorData =
      doctors &&
      (
        Array.isArray(doctors)
          ? doctors.length > 0
          : Object.keys(doctors).length > 0
      );

    if (hasDoctorData) {
      navigate("/doctor-panel/dashboard");
    }
  }, [doctors, navigate]);

  return (
    <div dir="rtl" className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-12 lg:py-20">
        {/* Hero Section */}
        <div className="bg-[#DBEDFF] rounded-3xl overflow-hidden mb-16">
          <div className="flex flex-col lg:flex-row items-center lg:items-end gap-8 lg:gap-0">
            {/* تصویر پزشک */}
            <div className="lg:w-5/12 flex justify-center lg:justify-end pt-8 lg:pt-0">
              <img
                src={doctorAvatar}
                alt="پزشک"
                className="w-52 lg:w-[340px] h-auto object-contain"
              />
            </div>

            {/* متن و دکمه‌ها */}
            <div className="lg:w-7/12 px-6 lg:px-12 pb-8 lg:pb-12">
              <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-4">
                عضویت پزشک در دکتر رزرو
              </h1>

              <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-8">
                دکتر رزرو پلتفرم رزرو آنلاین پزشک به صورت حضوری و مشاوره آنلاین
                است. با ثبت درخواست عضویت، صفحه نوبت‌دهی اختصاصی شما ساخته
                می‌شود و بیماران می‌توانند به راحتی نوبت خود را رزرو کنند.
              </p>

              <div className="flex flex-wrap gap-4">
                <DoctorsSignUpButt />
                <DoctorLoginButt />
              </div>
            </div>
          </div>
        </div>

        {/* عنوان بخش خدمات */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            خدمات دکتر رزرو برای پزشکان
          </h2>

          <p className="text-gray-500 mt-3 text-lg">
            چرا باید به جمع بزرگ پزشکان دکتر رزرو بپیوندید؟
          </p>
        </div>

        {/* کارت‌های خدمات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#BAD6FB] rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="mb-6">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-14 h-14 object-contain"
                />
              </div>

              <h3 className="text-xl font-semibold text-[#005DAD] mb-4">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-relaxed text-[15px] flex-1">
                {item.caption}
              </p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default DoctorSignupPage;
