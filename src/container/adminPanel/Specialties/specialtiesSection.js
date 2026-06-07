import React, { useEffect, useState, useMemo } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { GoPlus } from "react-icons/go";
import { FiSearch } from "react-icons/fi";

import SubmitSpecialtiesModal from "../../../components/modals/SubmitSpecialtiesModal";
import SpecialtiesCategoryModal from "../../../components/modals/SpecialtiesCategoryModal";
import SpecialistPagination from "./SpecialistPagination";
import LoadingComponent from "../../../components/LoadingComponent";

import { get_specialties } from "../../../api/ApiCalling";
import { myStore } from "../../../store/Store";

function SpecialtiesPanelSection() {
  const { setIsSerchDoctorLoading, isSerchDoctorLoading } = myStore();

  const [specialist, setSpecialist] = useState([]);     // داده خام
  const [searchTerm, setSearchTerm] = useState("");     // کنترل شده
  const [isAddSpecialModal, setIsAddSpecialModal] = useState(false);
  const [isCategoryModal, setIsCategoryModal] = useState(false);
  const [isAddCategory, setIsAddCategory] = useState(false);
  const [item, setItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // دریافت داده‌ها
  const fetchData = async () => {
    const data = await get_specialties("Specialist/read-specialists");
    if (data) {
      setSpecialist(data);
      setIsSerchDoctorLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    setIsSerchDoctorLoading(true);
  }, [isAddSpecialModal, isAddCategory]); // فقط وقتی مودال بسته شد رفرش شود

  // فیلتر هوشمند با useMemo
  const filteredSpecialists = useMemo(() => {
    if (!searchTerm.trim()) return specialist;

    return specialist.filter((item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [specialist, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // برگشت به صفحه اول
  };

  const openAddModal = () => {
    setItem(null);
    setIsAddSpecialModal(true);
  };

  return (
    <div className="mt-20 w-full flex flex-col items-center px-4">
      {/* Loading */}
      {isSerchDoctorLoading && <LoadingComponent />}

      {/* مودال‌ها */}
      {isCategoryModal && (
        <SpecialtiesCategoryModal closeModal={() => setIsCategoryModal(false)} />
      )}

      {isAddSpecialModal && (
        <SubmitSpecialtiesModal
          setIsAddSpecialModal={setIsAddSpecialModal}
          item={item}
          setItem={setItem}
        />
      )}

      <div className="w-full max-w-6xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        {/* جستجو */}
        <div className="relative w-full lg:w-2/3">
          <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="جستجوی تخصص..."
            className="w-full bg-white border border-gray-300 focus:border-[#005DAD] focus:ring-1 focus:ring-[#005DAD] rounded-xl py-3 pr-12 pl-4 text-base outline-none transition-all"
          />
        </div>

        {/* دکمه‌ها */}
        <div className="flex items-center gap-4 w-full lg:w-auto">
          <button
            onClick={() => setIsCategoryModal(true)}
            className="flex-1 lg:flex-none px-5 py-3 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl text-sm lg:text-base font-medium transition-all"
          >
            دسته‌بندی‌ها
          </button>

          <button
            onClick={openAddModal}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#005DAD] hover:bg-[#00438a] text-white rounded-xl font-medium transition-all"
          >
            <GoPlus className="text-2xl" />
            افزودن تخصص
          </button>
        </div>
      </div>

      {/* جدول */}
      <div className="w-full max-w-6xl bg-white rounded-2xl border shadow-sm overflow-hidden">
{/* هدر جدول */}
<div className="hidden md:grid grid-cols-12 bg-[#F8F9FA] py-4 border-b text-[#3F444D] font-medium">
  <div className="col-span-2 flex justify-center items-center gap-1">
    آیکون
    <TiArrowSortedDown />
  </div>
  <div className="col-span-3 flex justify-center items-center gap-1">
    تخصص
    <TiArrowSortedDown />
  </div>
  <div className="col-span-3 flex justify-center items-center gap-1">
    کد مکسا
    <TiArrowSortedDown />
  </div>
  <div className="col-span-4 flex justify-center items-center gap-1">
    اقدامات
    <TiArrowSortedDown />
  </div>
</div>

        {/* محتوا */}
        <SpecialistPagination
          items={filteredSpecialists}
          specialist={filteredSpecialists}
          setSpecialist={setSpecialist} // اگر نیاز به آپدیت محلی داری
          setItem={setItem}
          setIsAddSpecialModal={setIsAddSpecialModal}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isAddCategory={isAddCategory}
          setIsAddCategory={setIsAddCategory}
        />
      </div>

      {/* نمایش تعداد نتایج */}
      {searchTerm && (
        <div className="text-sm text-gray-500 mt-3 self-start">
          {filteredSpecialists.length} نتیجه برای "
          <span className="font-medium">{searchTerm}</span>"
        </div>
      )}
    </div>
  );
}

export default SpecialtiesPanelSection;