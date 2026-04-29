import { SerchDropDowns, SerchDropDownsbimeh } from "../../components/Inputs/Input";
import { Filtering_MedicalCenters_Store  } from "../../store/Store";
import React from "react";

function SearchBimeh_Medical() {
  const { setBimehTakmili, setBimeAsli} =
    Filtering_MedicalCenters_Store();
  const takmili = [
    { id: 1, name: "بیمه دی" },
    { id: 2, name: "بیمه البرز" },
  ];
  const paye = [
    { id: 1, name: "بیمه تامین اجتماعی" },
    { id: 2, name: "بیمه نیروهای مسلح" },
  ];
  return (
    <div className=" min-h-[261px] p-2 py-5 rounded-xl bg-white border shadow-md">
      <h2 className=" text-xl">بیمه :</h2>
      <SerchDropDownsbimeh
        fn={setBimehTakmili}
        details={takmili}
        title="بیمه تکمیلی :"
      />
      <SerchDropDownsbimeh
        fn={setBimeAsli}
        details={paye}
        title="بیمه پایه :"
      />
    </div>
  );
}

export default SearchBimeh_Medical;
