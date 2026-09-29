import logo from "../assets/Pics/logo-doctor.png";

import { BurgerMenuButt, LoginButton, GovernmentHospitalButton } from "./Buttons/Button";
import { NavLinks } from "./Links/Links";

function Navbar() {
  return (
    <div className="vazir w-full py-2 px-5 flex flex-nowrap justify-between items-center gap-3">
      <div className=" hidden lg:flex items-center text-[13px] xl:text-base font-medium gap-3 xl:gap-6 justify-center">
        {/* <Image
          className=" xl:w-[150px] lg:w-[100px]"
          alt="logo"
          width={150}
          src={logo}
        /> */}
        <div className="flex items-center gap-3 shrink-0">
  <img
    className="xl:w-[150px] lg:w-[90px]"
    alt="logo"
    src={logo}
  />

  <GovernmentHospitalButton />
</div>
        <NavLinks title="خانه" href="/" />
        <NavLinks title="تخصص ها" href="/Specialties" />
        <NavLinks title="دکتر ها" href="/doctors" />
        <NavLinks title="مراکز درمانی" href="/medical-centers" />
        {/* نمایش لینک‌های ثانویه فقط از 2xl به بالا تا هدر در عرض 1280 سرریز نکند */}
        <div className="hidden 2xl:contents">
          <NavLinks title="دندان پزشکی" href="/dentistry" />
          <NavLinks title="روانپزشک" href="/psychiatry" />
          <NavLinks title="مجله درمانی" href="/healthMagezine" />
        </div>
      </div>
      <div className=" lg:hidden rounded-lg p-[1px] border-2 border-[#005DAD]">
        <BurgerMenuButt />
      </div>
      <div className=" flex items-center gap-4 justify-center shrink-0">
        <LoginButton />
      </div>
    </div>
  );
}

export default Navbar;
