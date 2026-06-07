import React, { useEffect, useState } from "react";

const CreateInsuranceModal = ({ open, onClose, onSubmit, isSubmitting }) => {
  const [name, setName] = useState("");
  const [insuranceTypeId, setInsuranceTypeId] = useState(2); // default: پایه
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setName("");
      setInsuranceTypeId(2);
      setError("");
    }
  }, [open]);

  const handleSubmit = async () => {
    setError("");

    if (!name.trim()) {
      setError("نام بیمه الزامی است.");
      return;
    }
    if (![2, 3].includes(Number(insuranceTypeId))) {
      setError("نوع بیمه معتبر نیست.");
      return;
    }

    await onSubmit({
      name: name.trim(),
      insuranceTypeId: Number(insuranceTypeId),
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={isSubmitting ? undefined : onClose}
      />

      {/* Modal */}
      <div className="relative w-[92%] max-w-lg rounded-xl bg-white p-5 shadow-lg">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="text-lg font-semibold text-[#3F444D]">افزودن بیمه</h3>
          <button
            className="text-sm text-gray-500 hover:text-gray-800"
            onClick={onClose}
            disabled={isSubmitting}
          >
            بستن
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#3F444D]">نام بیمه</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border p-2 outline-none focus:border-[#1F7168]"
              placeholder="مثلاً: تامین اجتماعی"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#3F444D]">نوع بیمه</label>
            <select
              value={insuranceTypeId}
              onChange={(e) => setInsuranceTypeId(e.target.value)}
              className="w-full rounded-lg border p-2 outline-none focus:border-[#1F7168]"
              disabled={isSubmitting}
            >
              <option value={2}>بیمه پایه</option>
              <option value={3}>بیمه تکمیلی</option>
            </select>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-2 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            className="rounded-lg border px-4 py-2 text-sm"
            onClick={onClose}
            disabled={isSubmitting}
          >
            انصراف
          </button>

          <button
            className="rounded-lg bg-[#1F7168] px-4 py-2 text-sm text-white disabled:opacity-60"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "در حال ثبت..." : "ثبت بیمه"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateInsuranceModal;
