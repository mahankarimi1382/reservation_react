import DatePickerComponent from "../../../components/DatePickerComponent";
import { SelectFilter } from "../../../components/Inputs/Input";
import AdminPanelMenu from "../../../container/adminPanel/AdminPanelMenu";
import React, { useEffect, useState } from "react";
import excel_icon from "../../../assets/Pics/excelIcon.png";
import printer from "../../../assets/Pics/printer.png";
import { TiArrowSortedDown } from "react-icons/ti";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoEyeOutline } from "react-icons/io5";
import { axiosConfig } from "../../../api/axiosConfig";
import LoadingComponent from "../../../components/LoadingComponent";
import DeletingModal from "../../../components/modals/DeletingModal";
import { RxCross2 } from "react-icons/rx";

// خواندن نظرات واقعی از Comment/read-all-Comment
// ساختار response: result.allCommentDto = { commentDtos: [...], articleCommentDtos: [...] }
const fetchComments = async () => {
  try {
    const res = await axiosConfig.get("Comment/read-all-Comment", {
      silent: true,
    });
    const result = res?.data?.result ?? {};
    const dto = result.allCommentDto ?? {};
    const list = Array.isArray(dto.commentDtos)
      ? dto.commentDtos
      : Array.isArray(dto)
      ? dto
      : [];
    return list;
  } catch (err) {
    console.log("read-all-Comment failed:", err?.message);
    return [];
  }
};

const deleteCommentApi = async (id) => {
  await axiosConfig.delete("Comment/delete-Comment", {
    data: {
      metadata: {
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userName: "string",
      },
      id: id,
    },
  });
};

function page() {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletingModal, setIsDeletingModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetchComments().then((list) => {
      if (!isMounted) return;
      setComments(list);
      setIsLoading(false);
    });
    return () => {
      isMounted = false;
    };
  }, [isDeletingModal]);

  const handleDelete = async (id, setList, closeModal, setIsLoading) => {
    try {
      await deleteCommentApi(id);
      const fresh = await fetchComments();
      setList(fresh);
      setIsLoading(false);
      closeModal();
    } catch (err) {
      console.log("delete comment failed:", err?.message);
      setIsLoading(false);
    }
  };

  return (
    <div dir="rtl" className="flex bg-[#F6FBFF] justify-start">
      <AdminPanelMenu />
      <div className=" gap-10 mt-20 w-full flex flex-col items-center ">
        <div className=" flex w-[80%]  gap-5 items-center">
          <DatePickerComponent title="از تاریخ" />
          <DatePickerComponent title="تا تاریخ" />
        </div>
        <div className=" gap-2 flex justify-end w-[80%] items-center">
          <button className=" border rounded-lg px-3 p-1 gap-2 text-[#185B37] border-[#185B37] flex">
            <img src={excel_icon} alt=" icon" width={24} />
            خروجی اکسل
          </button>
          <button className=" border rounded-lg px-3 p-1 gap-2 text-[#3F444D] border-[#3F444D] flex">
            <img src={printer} alt=" icon" width={24} />
            چاپ اطلاعات{" "}
          </button>
        </div>
        {isLoading && <LoadingComponent />}
        <div className=" gap-3 flex flex-col w-[80%] rounded-lg border shadow-md p-4 bg-white">
          <div className=" py-2 w-full flex rounded-lg bg-[#F4F4F4]">
            <h4 className=" w-[12%] flex justify-center  items-center text-[#3F444D] ">
              شناسه
            </h4>
            <h4 className=" w-[15%] flex justify-center  items-center text-[#3F444D] ">
              نظر
              <TiArrowSortedDown />
            </h4>
            <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D] ">
              لایک
              <TiArrowSortedDown />
            </h4>
            <h4 className=" w-[13%] flex justify-center items-center text-[#3F444D] ">
              تاریخ
              <TiArrowSortedDown />
            </h4>
            <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D] ">
              پیشنهاد <TiArrowSortedDown />
            </h4>
            <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D]">
              وضعیت <TiArrowSortedDown />
            </h4>
            <h4 className=" w-[24%] flex justify-center items-center text-[#3F444D]">
              اقدامات
            </h4>
          </div>
          {comments.length === 0 && !isLoading && (
            <div className=" w-full py-8 text-center text-slate-500 text-sm">
              نظری ثبت نشده است
            </div>
          )}
          {comments.map((item) => {
            return (
              <div
                className=" border flex py-3 rounded-lg bg-white shadow-md"
                key={item.id}
              >
                <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D] ">
                  {item.id}
                </h4>
                <h4 className=" w-[15%] flex justify-center items-center text-[#3F444D] px-2 truncate">
                  {(item.desc || "").slice(0, 40) || "—"}
                </h4>
                <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D] ">
                  {item.likeNumber ?? 0}
                </h4>
                <h4 className=" w-[13%] flex justify-center items-center text-[#3F444D] ">
                  {item.commentDate || "—"}
                </h4>
                <h4 className=" w-[12%] flex justify-center items-center text-[#3F444D] ">
                  {item.isSuggest ? "پیشنهاد می‌کند" : "پیشنهاد نمی‌کند"}
                </h4>
                <h4
                  className={` w-[12%] flex justify-center items-center ${
                    item.isAccept ? "text-green-600" : "text-amber-500"
                  }`}
                >
                  {item.isAccept ? "تایید شده" : "در انتظار تایید"}
                </h4>
                <div className=" w-[24%] flex justify-center items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setIsDeletingModal(true);
                    }}
                    className=" gap-2 border rounded-lg px-5 p-1 flex justify-center items-center bg-[#EED4D7] border-[#C30505] text-[#C30505]"
                  >
                    <HiOutlineTrash />
                    حذف
                  </button>
                  <button
                    onClick={() => setViewItem(item)}
                    className=" text-sm flex justify-center items-center gap-2  bg-[#DBEDFF] text-[#005DAD] border border-[#005DAD] p-2 rounded-lg"
                  >
                    <IoEyeOutline />
                    مشاهده نظر{" "}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isDeletingModal && selectedItem && (
        <DeletingModal
          DeletingFn={handleDelete}
          setList={setComments}
          id={selectedItem.id}
          name={`نظر شماره ${selectedItem.id}`}
          title="حذف نظر بیمار"
          closeModal={() => setIsDeletingModal(false)}
        />
      )}

      {viewItem && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setViewItem(null)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <RxCross2
              onClick={() => setViewItem(null)}
              className="absolute top-4 left-4 w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer"
            />
            <h3 className="text-lg font-bold text-[#3F444D] mb-4">
              متن نظر شماره {viewItem.id}
            </h3>
            <p className="text-[#3F444D] leading-relaxed whitespace-pre-wrap border rounded-xl bg-[#F8F9FA] p-4">
              {viewItem.desc || "متن نظری ثبت نشده است"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
