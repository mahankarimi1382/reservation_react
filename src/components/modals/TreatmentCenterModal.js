"use client";
import {
  delete_doctor_treatment,
  get_doctor_treatmentCenter,
  update_doctor_treatment,
} from "../../api/ApiCalling";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import ModalLogo from "../../assets/Pics/ModalLogo.png";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AddTreatmentButt } from "../Buttons/Button";
import DeletingModal from "./DeletingModal";
import SeeReservsModal from "./SeeReservsModal";

function TreatmentCenterModal({ setIsTreatmentCenter, id, name }) {
  const [isSeeReservsModal, setIsSeeReservsModal] = useState(false);
  const [isAddTreatmentModal, setIsAddTreatmentModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [editDesc, setEditDesc] = useState("");
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const handleEditSave = async () => {
    setIsEditLoading(true);
    await update_doctor_treatment(
      {
        id: selectedItem.id,
        doctorId: selectedItem.doctorId || Number(id),
        clinicId: selectedItem.clinicId || "",
        officeId: selectedItem.officeId || "",
        desc: editDesc,
        cityId: selectedItem.cityId || 0,
      },
      id,
      setTreatmenCenters,
      () => setIsEditModal(false),
      "توضیحات با موفقیت ویرایش شد"
    );
    setIsEditLoading(false);
  };
  console.log(selectedItem);
  const [treatmentCenters, setTreatmenCenters] = useState([]);
  const [treatmentId, setTrearmentId] = useState("");
  const [clinicId, setClinicId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  console.log(treatmentCenters);
  const getTreatMent = async () => {
    const data = await get_doctor_treatmentCenter(id);
    if (data) {
      console.log(data);
      setTreatmenCenters(data);
    }
  };
  console.log(treatmentCenters);

  useEffect(() => {
    getTreatMent();
  }, [isAddTreatmentModal]);
  const handleClose = () => {
    setIsTreatmentCenter(false);
  };
  return (
    <div className=" w-screen z-10 h-screen top-0 justify-center items-center flex right-0 fixed bg-[rgba(0,0,0,0.6)]">
      {isSeeReservsModal && (
        <SeeReservsModal
          doctorId={doctorId}
          clinicId={clinicId}
          treatmentId={treatmentId}
          closeModal={() => setIsSeeReservsModal(false)}
        />
      )}
      {isEditModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-[rgba(0,0,0,0.6)] p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-base font-semibold text-[#005DAD]">
                ویرایش توضیحات
              </h3>
              <RxCross2
                onClick={() => setIsEditModal(false)}
                className="cursor-pointer text-xl text-[#717171]"
              />
            </div>

            <div className="p-4 flex flex-col gap-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  نام مرکز
                </label>
                <input
                  disabled
                  value={
                    selectedItem.officeName || selectedItem.clinicName || ""
                  }
                  className="w-full bg-gray-100 py-2 px-3 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  توضیحات
                </label>
                <textarea
                  rows={4}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  placeholder="توضیحات را وارد کنید..."
                  className="w-full resize-none py-2 px-3 border border-gray-300 rounded-lg outline-none focus:border-[#005DAD]"
                />
              </div>
            </div>

            <div className="p-4 border-t flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditModal(false)}
                disabled={isEditLoading}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm hover:bg-gray-50"
              >
                انصراف
              </button>
              <button
                type="button"
                onClick={handleEditSave}
                disabled={isEditLoading}
                className="px-4 py-2 rounded-lg bg-[#005DAD] text-white text-sm hover:bg-[#004a8f] disabled:opacity-60"
              >
                {isEditLoading ? "در حال ذخیره..." : "ذخیره"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModal && (
        <DeletingModal
          // امضای delete_doctor_treatment: (id, doctorId, setList, closeModal)
          // پس آیدی خودِ رکورد تخصیص را می‌فرستیم نه officeId/clinicId
          DeletingFn={(recordId, _setList, closeModal) =>
            delete_doctor_treatment(
              recordId,
              id,
              setTreatmenCenters,
              closeModal
            )
          }
          id={selectedItem.id}
          name={selectedItem.officeName || selectedItem.clinicName}
          setList={setTreatmenCenters}
          closeModal={() => setIsDeleteModal(false)}
        />
      )}
      <div className=" w-[450px] h-2/3 bg-white flex flex-col justify-between py-2 px-2 pb-5  items-center rounded-2xl">
        <div className=" relative w-full h-full gap-2 flex items-center flex-col">
          <RxCross2
            onClick={handleClose}
            className=" absolute cursor-pointer top-0 left-0  text-xl text-[#717171] "
          />

          <img src={ModalLogo} alt="logo" width={67} />
          <div className=" w-full items-start justify-start">
            <h5 className=" flex gap-1">
              مراکز درمانی دکتر
              <span className=" text-[#005DAD]">{name}</span>:
            </h5>
          </div>
          {treatmentCenters.length == 0 ? (
            <h5 className=" w-full h-full flex justify-center items-center text-[#858585]">
              هیچ مرکز درمانی برای {name} ثبت نشده است
            </h5>
          ) : (
            <div className=" overflow-auto rounded-xl border p-2 border-[#005DAD] w-full h-full flex flex-col">
              <div className=" p-2 border-b w-full  flex items-center justify-center">
                <h5 className=" w-[15%] "></h5>
                <h5 className=" w-[25%]">نام مرکز </h5>
                <h5 className=" w-[30%]  text-center">نوع مرکز</h5>
                <h5 className=" w-[30%] "></h5>
              </div>
              {treatmentCenters.map((item) => {
                return (
                  <div
                    className=" text-[#858585] border-b last:border-none p-2  flex items-center justify-center"
                    key={item.id}
                  >
                    <div className=" w-[15%] flex items-center justify-start gap-3 ">
                      <FaEdit
                        onClick={() => {
                          setSelectedItem(item);
                          setEditDesc(item.desc || "");
                          setIsEditModal(true);
                        }}
                        className=" cursor-pointer text-green-400 hover:text-green-600 transition-all"
                      />
                      <MdDelete
                        onClick={() => {
                          setSelectedItem(item);
                          setIsDeleteModal(true);
                        }}
                        className=" cursor-pointer text-red-400 hover:text-red-600 transition-all"
                      />
                    </div>
                    <div className=" w-[25%] flex flex-col">
                      <h5>{item.officeName || item.clinicName}</h5>
                      {item.desc ? (
                        <span className="text-[10px] text-gray-400 truncate">
                          {item.desc}
                        </span>
                      ) : null}
                    </div>
                    <h5 className=" w-[30%]  text-center">
                      {item.officeName ? "مطب" : "بیمارستان,درمانگاه"}
                    </h5>
                    <button
                      onClick={() => {
                        setDoctorId(item.doctorId);
                        setClinicId(item.clinicId || item.officeId);
                        setTrearmentId(item.id);
                        setIsSeeReservsModal(true);
                      }}
                      className=" w-[30%] border rounded-lg  flex text-sm justify-center items-center bg-[#F2FEF8] border-[#1F7168] text-[#1F7168]"
                    >
                      مشاهده نوبت ها
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          <AddTreatmentButt
            isAddTreatmentModal={isAddTreatmentModal}
            setIsAddTreatmentModal={setIsAddTreatmentModal}
            id={id}
            assignedIds={treatmentCenters.map(
              (item) => item.officeId || item.clinicId
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default TreatmentCenterModal;
