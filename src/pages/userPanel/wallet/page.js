import Navbar from "../../../components/Navbar";
import UserPanelMenue from "../../../container/userPanel/UserPanelMenue";
import React from "react";
import cardLayer from "../../../assets/Pics/Card-layer1.png";
import cardTarashe from "../../../assets/Pics/card-tarashe.png";
import WalletCharge from "../../../container/userPanel/wallet/WalletCharge";
import { UserPanel_PhoneTitle } from "../dashboard/page";

function page() {
  return (
    <div dir="rtl" className=" bg-[#F6FBFF] w-full">
      <Navbar />
      <UserPanel_PhoneTitle />
      <div className=" mb-20 lg:mb-0 flex items-start w-full">
        <UserPanelMenue />
        <div className=" lg:w-[82%] mx-auto w-[90%] flex justify-center">
          <div className=" lg:w-2/3 w-full flex flex-col gap-5 justify-center items-center bg-white p-5 border-2 rounded-lg shadow-md">
            <div className=" flex justify-center items-center flex-col relative">
              <img
                className=" absolute top-5"
                alt=""
                src={cardLayer}
                width={427}
              />
              <img className=" mt-7" alt="" src={cardLayer} width={489} />
              <div className=" p-2 lg:p-0 cardBg top-14 justify-center items-center gap-5 absolute rounded-xl lg:w-[540px] lg:h-[288px] flex flex-col">
                <div className=" flex flex-col gap-2 ">
                  <h2 className=" mt-5 lg:mt-0 lg:text-lg text-sm text-white">
                    موجودی حساب شما 70،000 تومان
                  </h2>
                  <img
                    className=" left-2 top-2 lg:top-10 lg:left-10 absolute lg:w-[45px] w-[35px]"
                    src={cardTarashe}
                    alt="icon"
                    width={45}
                  />

                  <h2 className=" lg:text-lg text-sm text-white">
                    سود شما : یک درصد
                  </h2>
                  <h2 className=" lg:text-lg text-sm text-white">
                    مجموع سود و موجودی شما : 70,700 تومان
                  </h2>
                </div>
                <div className=" w-[80%]">
                  <h5 className=" lg:text-lg text-sm text-white">
                    شاهین خسروی{" "}
                  </h5>
                </div>
              </div>
            </div>
            <h5 className=" mt-20 lg:text-xl">
              مبلغ مورد نظرتان را جهت شارژ حساب انتخاب کنید
            </h5>
            <WalletCharge />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
