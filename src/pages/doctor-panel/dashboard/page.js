import { CiSearch } from "react-icons/ci";
import DoctorProfIcon from "../../../assets/Pics/doctor-profile-icon.png";
import { IoIosArrowDown } from "react-icons/io";
import khadamatDarmani from "../../../assets/Pics/khadamatDarmani.png";
import bimehIran from "../../../assets/Pics/bimehIran.png";
import bimehSalamat from "../../../assets/Pics/bimehSalamat.png";
import taminejtemaei from "../../../assets/Pics/taminejtemaei.png";
import profileFake from "../../../assets/Pics/profileFake.png";
import DoctorPanelMenu from "../../../container/doctor-panel/DoctorPanelMenu";
import { GoDotFill } from "react-icons/go";
import DoctorInventory from "../../../container/doctor-panel/dashboard/DoctorInventory";
import DoctorBarChart from "../../../container/doctor-panel/dashboard/DoctorBarChart";
import GaugeChart from "../../../container/doctor-panel/dashboard/GuageChart";
import DrLineChart from "../../../container/doctor-panel/dashboard/DrLineChart";

function page() {
  const fakedata = [
    {
      id: 1,
      visitLocation: "ویزیت حضوری: مطب ونک",
      name: "ایمان خسروی نسب",
      time: "ساعت : 16:45",
      date: "تاریخ 1403/09/23",
    },
    {
      id: 2,
      visitLocation: "ویزیت حضوری: مطب ونک",
      name: "ایمان خسروی نسب",
      time: "ساعت : 16:45",
      date: "تاریخ 1403/09/23",
    },
    {
      id: 3,
      visitLocation: "ویزیت حضوری: مطب ونک",
      name: "ایمان خسروی نسب",
      time: "ساعت : 16:45",
      date: "تاریخ 1403/09/23",
    },
  ];

  return (
    <div dir="rtl" className="flex pb-20  bg-[#F6FBFF]">
      <DoctorPanelMenu />
      <div className=" mt-10 w-full flex flex-col gap-7 items-center">
        <div className=" flex justify-between items-center w-[80%]">
          <label className=" w-[450px] border px-2 p-1 border-[#005DAD] rounded-xl flex justify-between ">
            <input className=" w-full outline-none" placeholder="جستجو" />
            <CiSearch className=" text-white text-4xl p-1 rounded-lg bg-[#005DAD]" />
          </label>
          <button className=" flex justify-center items-center p-2 border text-[#005DAD] gap-2 border-[#005DAD] rounded-xl">
            <img src={DoctorProfIcon} width={24} alt="icon" />
            دکتر طاهر ثابتیان
            <IoIosArrowDown className=" text-xl" />
          </button>
        </div>
        <div className=" bg-white w-[90%] p-2 rounded-3xl shadow-md flex">
          <div className=" flex flex-col w-1/4 gap-5 justify-center h-[100px] items-center relative">
            <h5 className=" text-sm">کل بیمار ها</h5>
            <h2 className=" text-xl font-semibold">4560 نفر</h2>
            <GoDotFill className=" absolute top-0 text-[#FF4D6C] text-4xl left-0" />
            <span className=" absolute left-0 text-6xl bottom-2 rounded-3xl border-2 h-14"></span>
          </div>
          <div className=" flex flex-col w-1/4 gap-5 justify-center h-[100px] items-center relative">
            <h5 className=" text-sm">اشتراک</h5>
            <h2 className=" text-xl font-semibold">234 روز</h2>
            <GoDotFill className=" absolute top-0 text-[#2E6ABB] text-4xl left-0" />
            <span className=" absolute left-0 text-6xl bottom-2 rounded-3xl border-2 h-14"></span>
          </div>{" "}
          <div className=" flex flex-col w-1/4 gap-5 justify-center h-[100px] items-center relative">
            <h5 className=" text-sm">آمار ویزیت غیر حضوری</h5>
            <h2 className=" text-xl font-semibold">123 نفر</h2>
            <GoDotFill className=" absolute top-0 text-[#4FA16C] text-4xl left-0" />
            <span className=" absolute left-0 text-6xl bottom-2 rounded-3xl border-2 h-14"></span>
          </div>{" "}
          <div className=" flex flex-col w-1/4 gap-5 justify-center h-[100px] items-center relative">
            <h5 className=" text-sm">آمار ویزیت حضوری</h5>
            <h2 className=" text-xl font-semibold">345 نفر</h2>
            <GoDotFill className=" absolute top-0 text-[#C45A3B] text-4xl left-0" />
          </div>{" "}
        </div>
        <div className=" w-[90%] flex items-center justify-between">
          <DoctorInventory />
          <DoctorBarChart />
        </div>
        <div className=" w-[90%] min-h-[192px] max-h-[192px] flex items-center justify-between">
          <div className=" shadow-md w-[30%] p-4 gap-10 h-full bg-white rounded-3xl flex flex-col">
            <h5 className=" font-semibold">بیمه های طرف قرار داد شما</h5>
            <div className=" w-full items-center flex justify-between">
              <img width={60} alt="img" src={taminejtemaei} />
              <img width={60} alt="img" src={bimehSalamat} />
              <img width={60} alt="img" src={khadamatDarmani} />
              <img width={60} alt="img" src={bimehIran} />
            </div>
          </div>
          <div className=" w-[68%] p-4 flex gap-3 h-full bg-white rounded-3xl shadow-lg flex-col">
            <h5 className=" font-semibold text-xl">بیماران براساس جنسیت</h5>
            <div className=" flex items-center justify-between">
              <div className=" relative w-1/3 justify-center items-center flex">
                <div className=" flex flex-col">
                  <GaugeChart color={"#AD0068"} />
                  <h5>خانم:40 بیمار</h5>
                </div>
                <span className=" absolute left-0 text-6xl bottom-2 rounded-3xl border-[3px] h-24"></span>
              </div>
              <div className=" relative w-1/3 justify-center items-center flex">
                <div className=" flex flex-col">
                  <GaugeChart color={"#005DAD"} />
                  <h5>آقا:40 بیمار</h5>
                </div>
                <span className=" absolute left-0 text-6xl bottom-2 rounded-3xl border-[3px] h-24"></span>
              </div>
              <div className=" relative w-1/3 justify-center items-center flex">
                <div className=" flex flex-col">
                  <GaugeChart color={"#818181"} />
                  <h5>ناشناس:40 بیمار</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-[90%] flex h-[355px] justify-between items-center">
          <div className=" w-[49%] shadow-xl flex flex-col gap-2 p-4 bg-white  rounded-3xl h-full">
            <h5 className=" text-xl font-semibold">ویزیت های پیش رو</h5>
            <div className=" w-full flex flex-col gap-3">
              {fakedata.map((item) => {
                return (
                  <div
                    key={item.id}
                    className=" font-semibold rounded-xl p-3 gap-2 bg-[#F8F8F8] w-full flex items-start"
                  >
                    <img src={profileFake} alt="img" width={52} />
                    <div className=" w-full flex justify-between items-center">
                      <div className=" flex flex-col justify-center items-start gap-3">
                        <h5>{item.name}</h5>
                        <h5>{item.date}</h5>
                      </div>
                      <div className=" flex flex-col justify-center items-start gap-3">
                        <h5>{item.time}</h5>
                        <h5>{item.visitLocation}</h5>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className=" w-[49%] shadow-xl flex flex-col gap-2 p-4 bg-white  rounded-3xl h-full">

            <DrLineChart />
            <div className=" flex w-full gap-4 px-5 items-center ">
              <div className=" gap-2  flex items-center">
                <span className=" w-2 h-2 rounded-full bg-[#0E5FD9]" />
                <h5>نوبت های گرفته شده</h5>
              </div>
              <div className=" gap-2 flex items-center">
                <span className=" w-2 h-2 rounded-full bg-[#E72E3D]" />
                <h5>نوبت های لغو شده</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
