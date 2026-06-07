import React from "react";

const Field = ({ label, value }) => (
  <div className="grid grid-cols-12 gap-2 rounded-lg border bg-white p-3">
    <div className="col-span-4 text-sm text-gray-600">{label}</div>
    <div className="col-span-8 text-sm text-gray-900 break-words">
      {value ?? "-"}
    </div>
  </div>
);

const InsuranceDetailsModal = ({ open, onClose, insurance }) => {
  if (!open) return null;

  const typeTitle =
    insurance?.insuranceType?.type ??
    (insurance?.insuranceTypeId === 2
      ? "بیمه پایه"
      : insurance?.insuranceTypeId === 3
      ? "بیمه تکمیلی"
      : "-");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-[92%] max-w-2xl rounded-xl bg-white p-5 shadow-lg">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="text-lg font-semibold text-[#3F444D]">جزئیات بیمه</h3>
          <button
            className="text-sm text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            بستن
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3">
          <Field label="شناسه (ID)" value={insurance?.id} />
          <Field label="نام بیمه" value={insurance?.name} />
          <Field label="نوع بیمه" value={typeTitle} />
          <Field label="InsuranceTypeId" value={insurance?.insuranceTypeId} />
        </div>

        <div className="mt-5 flex justify-end">
          <button className="rounded-lg border px-4 py-2 text-sm" onClick={onClose}>
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsuranceDetailsModal;
