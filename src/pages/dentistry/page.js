import Navbar from "../../components/Navbar";
import PhoneMenu from "../../components/PhoneMenu";
import Footer from "../../components/Footer";
import QuestionsSection from "../../container/Home/QuestionsSection";
import SamaneSection from "../../container/Home/SamaneSection";
import UserOpinions from "../../container/Home/UserOpinions";
import "react-toastify/dist/ReactToastify.css";
import MainSearchBar from "../../components/MainSearchBar";
import SpecialtiesSection_dentist from "../../container/dentistry/SpecialtiesSection_dentist";
import DoctorsSection_dentist from "../../container/dentistry/DoctorsSection_dentist";
import HospitalsSection_dentist from "../../container/dentistry/HospitalsSection_dentist";
import MagezineSection_dentist from "../../container/dentistry/MagezineSection_dentist";
import MatabSection from "../../container/Home/MatabSection";
import BannersSection from "../../container/Home/BannersSection";
import FullBanerSection from "../../container/Home/FullBanerSection";
export default function Dentist() {
  return (
    <div dir="rtl">
      <div className=" lg:rounded-bl-[300px] rounded-bl-[80px] w-full h-[291px] md:h-[400px] lg:h-[600px]  flex flex-col justify-start gap-20 dintistBg">
        <Navbar />
        <MainSearchBar />
      </div>
      <SpecialtiesSection_dentist />
      <DoctorsSection_dentist />
      <BannersSection />
      <HospitalsSection_dentist />
      <FullBanerSection />
      <MatabSection />
      <QuestionsSection />
      <SamaneSection />
      <UserOpinions />
      <MagezineSection_dentist />
      <Footer />
      <PhoneMenu />
    </div>
  );
}
