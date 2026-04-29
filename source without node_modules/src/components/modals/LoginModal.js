import React, { useState, useEffect } from "react";
import PhoneNumModal from "./PhoneNumModal";
import SignupModal from "./SignUpModal";

function LoginModal({ setIsModal }) {
  const [isPhoneNumModal, setIsPhoneNumModal] = useState(true);
  const [isSignupModal, setIsSignupModal] = useState(false);
  const [isValidateModal, setIsValidateModal] = useState(false);

  const closeModal = () => {
    setIsModal(false);
  };

  // ✨ مدیریت تغییر ارتفاع صفحه هنگام باز شدن کیبورد در گوشی اندرویدی
  useEffect(() => {
    const handleResize = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✨ فوکوس روی اینپوت در `PhoneNumModal` هنگام نمایش مودال
  useEffect(() => {
    if (isPhoneNumModal) {
      setTimeout(() => {
        document.getElementById("phoneInput")?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 300);
    }
  }, [isPhoneNumModal]);

  return (
    <div
      className="z-[999] fixed top-0 right-0 w-screen h-screen bg-[rgba(0,0,0,0.6)] flex justify-center items-center"
    >
      {isPhoneNumModal && (
        <PhoneNumModal
          closeModal={closeModal}
          setIsPhoneNumModal={setIsPhoneNumModal}
          setIsSignupModal={setIsSignupModal}
        />
      )}
      {isSignupModal && (
        <SignupModal
          isValidateModal={isValidateModal}
          setIsValidateModal={setIsValidateModal}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default LoginModal;