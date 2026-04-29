
import React from "react";


function PaideListTable() {
  const fakeData = [
    {
      id: 1,
      name: "ایمان سالارکیا",
      visit: "مطب",
      type: "حضوری ",
      time: "1403/0402 ساعت 10:30 ",
      code: "55489",
      nationalcode: "0024567980",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      visit: "مطب",
      type: "حضوری ",
      time: "1403/0402 ساعت 10:30 ",
      code: "55489",
      nationalcode: "0024567980",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      visit: "مطب",
      type: "حضوری ",
      time: "1403/0402 ساعت 10:30 ",
      code: "55489",
      nationalcode: "0024567980",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      visit: "مطب",
      type: "حضوری ",
      time: "1403/0402 ساعت 10:30 ",
      code: "55489",
      nationalcode: "0024567980",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      visit: "مطب",
      type: "حضوری ",
      time: "1403/0402 ساعت 10:30 ",
      code: "55489",
      nationalcode: "0024567980",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      visit: "مطب",
      type: "حضوری ",
      time: "1403/0402 ساعت 10:30 ",
      code: "55489",
      nationalcode: "0024567980",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      visit: "مطب",
      type: "حضوری ",
      time: "1403/0402 ساعت 10:30 ",
      code: "55489",
      nationalcode: "0024567980",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      visit: "مطب",
      type: "حضوری ",
      time: "1403/0402 ساعت 10:30 ",
      code: "55489",
      nationalcode: "0024567980",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      visit: "مطب",
      type: "حضوری ",
      time: "1403/0402 ساعت 10:30 ",
      code: "55489",
      nationalcode: "0024567980",
    },
    {
      id: 1,
      name: "ایمان سالارکیا",
      visit: "مطب",
      type: "حضوری ",
      time: "1403/0402 ساعت 10:30 ",
      code: "55489",
      nationalcode: "0024567980",
    },
  ];
  return (
    <div dir="rtl" className="flex pb-20  bg-[#F6FBFF]">
      <div className=" flex flex-col w-full rounded-lg border shadow-md bg-white">
        <div className=" py-4 w-full flex rounded-t-lg bg-[#DBEDFF]">
          <h4 className=" w-1/6 flex justify-center  items-center text-[#3F444D] text-lg">
            کد ملی
          </h4>
          <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
            نام بیمار
          </h4>
          <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
            ویزیت
          </h4>
          <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
            کد رهگیری
          </h4>
          <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
            نوع ویزیت
          </h4>
          <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
            هزینه
          </h4>
        </div>
        {fakeData.map((item) => {
          return (
            <div className=" border flex py-5 px-4  bg-white " key={item.id}>
              <input type="checkbox" />
              <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
                {item.nationalcode}
              </h4>
              <h4 className=" w-[16%] flex justify-center items-center text-[#3F444D] text-lg">
                {item.name}
              </h4>
              <h4 className=" w-[16%] flex justify-center items-center text-[#3F444D] text-lg">
                {item.visit}
              </h4>
              <h4 className=" w-[16%] flex justify-center items-center text-[#3F444D] text-lg">
                {item.code}
              </h4>
              <h4 className=" w-[16%] flex justify-center items-center text-[#3F444D] text-lg">
                {item.type}
              </h4>
              <h4 className=" w-[18%] flex justify-center items-center text-[#3F444D] text-lg">
                250,000 تومان
              </h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PaideListTable;
