import heart from "../../assets/Pics/Specialties/heart-icon.png";
import brain from "../../assets/Pics/Specialties/brain-icon.png";
import dakheli from "../../assets/Pics/Specialties/dakheli-icon.png";
import eye from "../../assets/Pics/Specialties/eye-icon.png";
import zayman from "../../assets/Pics/Specialties/zayman-icon.png";
import kollie from "../../assets/Pics/Specialties/kollie-icon.png";
import dentist from "../../assets/Pics/Specialties/dentist-icon.png";
import { SpecialtiesSectionButton } from "../../components/Buttons/Button";
import SwipperSection from "../../components/SwipperSection";
function SpecialtiesSection_dentist() {
  const categorys = [
    {
      id: 1,
      name: "متخصص ارتودنسی",
      icon: heart,
    },
    {
      id: 2,
      name: "متخصص پروتز دندانی و ایمپلنت",
      icon: brain,
    },
    {
      id: 3,
      name: "متخصص دندانپزشکی کودکان",
      icon: zayman,
    },
    {
      id: 4,
      name: "متخصص دندانپزشکی ترمیمی و زیبایی",
      icon: dentist,
    },
    {
      id: 5,
      name: "متخصص درمان ریشه",
      icon: kollie,
    },
    {
      id: 6,
      name: "متخصص رادیولوژی دهان و دندان",
      icon: eye,
    },
    {
      id: 8,
      name: "متخصص رادیولوژی دهان و دندان",
      icon: dakheli,
    },
  ];
  return (
    <div className=" w-full flex-col items-center lg:gap-16 mt-5  lg:mt-24 justify-center flex">
      <div className=" w-full items-center justify-center px-4 flex">
        <h2 className=" flex gap-2  lg:text-[32px]">
          <span className=" text-[#005DAD]">تخصص</span>
          های دندانپزشکی
        </h2>
      </div>
      <div className=" pl-3 w-full flex lg:w-[80%] lg:-mr-28 items-center">
        <SwipperSection categorys={categorys} />
        <SpecialtiesSectionButton />
      </div>
    </div>
  );
}

export default SpecialtiesSection_dentist;
