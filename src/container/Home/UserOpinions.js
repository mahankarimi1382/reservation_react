import React from "react";
import userProfile from "../../assets/Pics/user-profile.png";
import rate from "../../assets/Pics/rate.png";
function UserOpinions() {
  const opinions = [
    {
      id: 1,
      text: "واقعا دکتر سریع دسترسی به دکترها رو برام سریع تر کرده و خیلی راحت میتونم اون دکتری که میخوام و پیدا کنم.",
      date: " 22 شهریور 1402",
      rate: 5,
      img: userProfile,
      name: "ایمان",
    },
    {
      id: 2,
      text: "واقعا دکتر سریع دسترسی به دکترها رو برام سریع تر کرده و خیلی راحت میتونم اون دکتری که میخوام و پیدا کنم.",
      date: " 22 شهریور 1402",
      rate: 5,
      img: userProfile,
      name: "ایمان",
    },
    {
      id: 3,
      text: "واقعا دکتر سریع دسترسی به دکترها رو برام سریع تر کرده و خیلی راحت میتونم اون دکتری که میخوام و پیدا کنم.",
      date: " 22 شهریور 1402",
      rate: 5,
      img: userProfile,
      name: "ایمان",
    },
    {
      id: 4,
      text: "واقعا دکتر سریع دسترسی به دکترها رو برام سریع تر کرده و خیلی راحت میتونم اون دکتری که میخوام و پیدا کنم.",
      date: " 22 شهریور 1402",
      rate: 5,
      img: userProfile,
      name: "ایمان",
    },
    {
      id: 5,
      text: "واقعا دکتر سریع دسترسی به دکترها رو برام سریع تر کرده و خیلی راحت میتونم اون دکتری که میخوام و پیدا کنم.",
      date: " 22 شهریور 1402",
      rate: 5,
      img: userProfile,
      name: "ایمان",
    },
  ];
  return (
    <div className=" mt-32 bg-[#F3F6FF] w-full flex justify-center items-center h-[288px] lg:h-[431px]">
      <div className=" w-11/12 flex flex-col justify-center items-center">
        <h2 className=" mt-5 w-full flex gap-2 text-[18px] lg:text-[38px]">
          <span className=" text-[#005DAD]">نظرات</span>
          کاربران
        </h2>
        <div className=" lg:p-10 p-5 py-10 lg:py-0 gap-4 lg:mt-10 flex lg:gap-12 no-scrollbar overflow-x-auto w-[109%]">
          {opinions.map((item) => {
            return (
              <div
                key={item.id}
                className=" rounded-xl min-w-[263px] lg:min-w-[432px] flex flex-col gap-2 lg:gap-10 px-5 my-10 h-[165px] lg:h-[257px] shadow-md bg-white"
              >
                <div className=" flex items-center justify-between">
                  <div className=" flex flex-col gap-2 justify-center -mt-8 lg:mr-5   items-center">
                    <img
                      className=" w-[55px] lg:w-[67px]"
                      width={67}
                      src={item.img}
                      alt=""
                    />
                    <h2>{item.name}</h2>
                  </div>
                  <div className=" flex">
                    {Array.from({ length: item.rate }).map((_, index) => {
                      return (
                        <div key={index}>
                          <img width={17} alt="" src={rate} />
                        </div>
                      );
                    })}

                  </div>
                </div>
                <h2 className=" text-[#636E88] text-[14px] lg:text-[18px]">{item.text}</h2>
                <h5 className=" w-full flex text-[12px] lg:text-base justify-end">{item.date}</h5>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UserOpinions;
