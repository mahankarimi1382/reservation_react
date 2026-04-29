import Navbar from "../../../components/Navbar";
import UserPanelMenue from "../../../container/userPanel/UserPanelMenue";
import gooshiPezeshkiBlack from "../../../assets/Pics/gooshiPezeshki-black.png";
import hospitalIconBlack from "../../../assets/Pics/hospital-black.png";
import bookIconBlack from "../../../assets/Pics/book-black.png";
import SavedCardContainer from "../../../container/userPanel/saves/SavedCardContainer";
import MagezineSave from "../../../container/userPanel/saves/MagezineSave";
import DoctorSave from "../../../container/userPanel/saves/DoctorSave";
import MedicalCenterSave from "../../../container/userPanel/saves/MedicalCenterSave";
import { UserPanel_PhoneTitle } from "../dashboard/page";
function page() {
  return (
    <div dir="rtl" className=" bg-[#F6FBFF] w-full">
      <Navbar />
      <UserPanel_PhoneTitle />

      <div className=" flex w-full min-h-screen lg:flex-row flex-col">
        <UserPanelMenue />
        <div className=" flex justify-center w-[90%] mx-auto lg:w-[82%]">
          <div className=" lg:w-[80%] h-14 flex flex-col gap-8">
            <div className=" border-b-2 pb-5 flex items-center gap-2 lg:gap-5">
              <button className=" text-[#005DAD] bg-[#D3E9FD] text-sm lg:text-base px-3 p-1 rounded-md">
                همه
              </button>
              <button className=" whitespace-nowrap flex justify-center items-center lg:gap-2 text-sm lg:text-base bg-[rgba(206,206,206,0.17)] px-3 p-1 rounded-md">
                <img src={gooshiPezeshkiBlack} alt="icon" width={24} />
                دکتر
              </button>
              <button className=" whitespace-nowrap flex justify-center items-center lg:gap-2 text-sm lg:text-base bg-[rgba(206,206,206,0.17)] px-3 p-1 rounded-md">
                <img src={hospitalIconBlack} alt="icon" width={24} />
                مراکز درمانی
              </button>
              <button className=" whitespace-nowrap flex justify-center items-center lg:gap-2 text-sm lg:text-base bg-[rgba(206,206,206,0.17)] px-3 p-1 rounded-md">
                <img src={bookIconBlack} alt="icon" width={24} />
                مجله سلامت
              </button>
            </div>
            <div className=" pb-20 lg:pb-0 flex flex-col gap-4">
              <SavedCardContainer>
                <MagezineSave />
              </SavedCardContainer>
              <SavedCardContainer>
                <DoctorSave />
              </SavedCardContainer>
              <SavedCardContainer>
                <MedicalCenterSave />
              </SavedCardContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
