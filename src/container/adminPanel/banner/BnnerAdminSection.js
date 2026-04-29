import React, { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { HiOutlineTrash } from "react-icons/hi2";

import { Link, useNavigate } from "react-router-dom";

import { SelectFilter } from "../../../components/Inputs/Input";
import { delete_ads, get_ads } from "../../../api/ApiCalling";
import DeletingModal from "../../../components/modals/DeletingModal";
import { myStore } from "../../../store/Store";

function BnnerAdminSection() {
  const navigate = useNavigate();
  const { setSelectedBaner } = myStore();

  const [selectedItem, setSelectedItem] = useState({});
  const [isDeletingModal, setIsDeletingModal] = useState(false);
  const [banners, setbanners] = useState([]);
  const [banerPosition, setBanerPosition] = useState(4);

  useEffect(() => {
    const url = `Ads/read-smeprofile-ads?SmeProfileId=${banerPosition}`;

    const fetchData = async () => {
      const data = await get_ads(url);
      if (data) {
        setbanners(data);
      }
    };
    fetchData();
  }, [banerPosition, isDeletingModal]);

  return (
    <div className="gap-10 mt-20 w-full flex flex-col items-center">
      {isDeletingModal && (
        <DeletingModal
          DeletingFn={delete_ads}
          id={selectedItem.id}
          name={selectedItem.title}
          setList={setbanners}
          closeModal={() => setIsDeletingModal(false)}
        />
      )}

      <div className="flex w-[80%] gap-5 items-center">
        <SelectFilter
          title="جایگاه بنر"
          options={[
            { id: 1, name: "صفحه لندینگ اصلی", value: 4 },
            { id: 2, name: "صفحه لندینگ دندانپزشکی", value: 5 },
            { id: 3, name: "صفحه لندینگ روانپزشک", value: 6 },
          ]}
          setVal={setBanerPosition}
        />
        <SelectFilter title="نوع ویزیت" />
        <SelectFilter title="محل ویزیت" />
        <SelectFilter title="ساعت" />
      </div>

      <div className="w-[80%] justify-end flex items-center">
        <Link
          to="/adminPanel/imagesetting/banner/add-banner"
          className="flex justify-center items-center gap-2 rounded-lg p-2 bg-[#005DAD] text-white"
        >
          افزودن
          <GoPlus className="text-2xl" />
        </Link>
      </div>

      <div className="gap-2 flex justify-end w-[80%] items-center">
        <button className="border rounded-lg px-3 p-1 gap-2 text-[#185B37] border-[#185B37] flex">
          <img src="/Pics/excelIcon.png" alt="excel icon" width={24} />
          خروجی اکسل
        </button>

        <button className="border rounded-lg px-3 p-1 gap-2 text-[#3F444D] border-[#3F444D] flex">
          <img src="/Pics/printer.png" alt="printer icon" width={24} />
          چاپ اطلاعات
        </button>
      </div>

      <div className="gap-3 flex flex-col w-[80%] rounded-lg border shadow-md p-4 bg-white">
        <div className="py-2 w-full flex rounded-lg bg-[#F4F4F4]">
          <h4 className="w-[16%] flex justify-center items-center text-[#3F444D]">
            بنر <TiArrowSortedDown />
          </h4>

          <h4 className="w-[16%] flex justify-center items-center text-[#3F444D]">
            عنوان بنر <TiArrowSortedDown />
          </h4>

          <h4 className="w-[16%] flex justify-center items-center text-[#3F444D]">
            تاریخ شروع <TiArrowSortedDown />
          </h4>

          <h4 className="w-[16%] flex justify-center items-center text-[#3F444D]">
            تاریخ پایان <TiArrowSortedDown />
          </h4>
        </div>

        {banners.map((item) => {
          return (
            <div
              className="border flex py-3 items-center rounded-lg bg-white shadow-md"
              key={item.id}
            >
              <div className="w-[16%] flex justify-center items-center text-[#3F444D]">
                <img src="/Pics/folder.png" alt="folder icon" width={56} />
              </div>

              <h4 className="w-[16%] flex justify-center items-center text-[#3F444D]">
                {item.title}
              </h4>

              <h4 className="text-[#005DAD] w-[16%] flex justify-center items-center"></h4>
              <h4 className="text-[#005DAD] w-[16%] flex justify-center items-center"></h4>

              <div className="flex justify-center gap-10 items-center w-[36%]">
                <button
                  onClick={() => {
                    navigate("/adminPanel/imagesetting/banner/add-banner");
                    setSelectedBaner(item);
                  }}
                  className="gap-2 border rounded-lg px-5 p-1 flex justify-center items-center bg-[#F2FEF8] border-[#1F7168] text-[#1F7168]"
                >
                  <CiEdit className="font-bold text-2xl" />
                  ویرایش
                </button>

                <button
                  onClick={() => {
                    setSelectedItem(item);
                    setIsDeletingModal(true);
                  }}
                  className="gap-2 border rounded-lg px-5 p-1 flex justify-center items-center bg-[#EED4D7] border-[#C30505] text-[#C30505]"
                >
                  <HiOutlineTrash />
                  حذف
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BnnerAdminSection;
