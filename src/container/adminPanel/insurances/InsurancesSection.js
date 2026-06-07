import React, { useEffect, useMemo, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { GoPlus } from "react-icons/go";

import LoadingComponent from "../../../components/LoadingComponent";
import InsurancesPagination from "./InsurancesPagination";
import CreateInsuranceModal from "../../../components/modals/CreateInsuranceModal";
import InsuranceDetailsModal from "../../../components/modals/InsuranceDetailsModal";

import { create_insurance, read_all_insirances } from "../../../api/ApiCalling";

function InsurancesSection() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedInsurance, setSelectedInsurance] = useState(null);

  const getInsurances = async () => {
    setIsLoading(true);
    const data = await read_all_insirances();
    if (data) setItems(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getInsurances();
  }, []);

  const totalPages = useMemo(() => {
    const itemsPerPage = 10;
    return Math.max(1, Math.ceil((items?.length ?? 0) / itemsPerPage));
  }, [items]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const handleCreateInsurance = async ({ name, insuranceTypeId }) => {
    setIsSubmitting(true);
    const res = await create_insurance({ name, insuranceTypeId });
    setIsSubmitting(false);

    if (res) {
      setIsCreateOpen(false);
      await getInsurances();
    }
  };

  const openDetails = (insurance) => {
    setSelectedInsurance(insurance);
    setIsDetailsOpen(true);
  };

  return (
    <div className="mt-20 flex w-full flex-col items-center gap-6">
      {/* Header row with button */}
      <div className="flex w-[80%] items-center justify-between">
        <h2 className="text-xl font-semibold text-[#3F444D]">بیمه‌ها</h2>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-[#1F7168] bg-[#F2FEF8] px-4 py-2 text-[#1F7168]"
        >
          <GoPlus />
          افزودن بیمه
        </button>
      </div>

      <div className="w-[80%] rounded-lg border bg-white p-4 shadow-md">
        {/* Table header */}
        <div className="grid w-full grid-cols-12 gap-2 rounded-lg bg-[#F4F4F4] py-3">
          <div className="col-span-3 flex items-center justify-center text-lg text-[#3F444D]">
            نوع <TiArrowSortedDown />
          </div>
          <div className="col-span-3 flex items-center justify-center text-lg text-[#3F444D]">
            بیمه <TiArrowSortedDown />
          </div>
          <div className="col-span-6 flex items-center justify-center text-lg text-[#3F444D]">
            اقدامات <TiArrowSortedDown />
          </div>
        </div>

        {isLoading ? (
          <div className="py-6">
            <LoadingComponent />
          </div>
        ) : (
          <InsurancesPagination
            items={items}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onDetails={openDetails}
          />
        )}
      </div>

      {/* Create modal */}
      <CreateInsuranceModal
        open={isCreateOpen}
        onClose={() => (isSubmitting ? null : setIsCreateOpen(false))}
        onSubmit={handleCreateInsurance}
        isSubmitting={isSubmitting}
      />

      {/* Details modal */}
      <InsuranceDetailsModal
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        insurance={selectedInsurance}
      />
    </div>
  );
}

export default InsurancesSection;
