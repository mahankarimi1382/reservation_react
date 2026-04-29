import DatePickerComponent from "../../components/DatePickerComponent";
import { Filtering_MedicalCenters_Store, myStore } from "../../store/Store";

function DatePicker_Medical() {
  const { setSDate, setEDate } = Filtering_MedicalCenters_Store();
  return (
    <div className=" w-full flex justify-center items-center">
      <div className=" w-full rounded-2xl h-[112px] justify-center gap-4  border shadow-md flex flex-col">
        <h2 className=" px-5">تعیین روز نوبت :</h2>
        <div className=" w-full">
          <div className=" flex justify-around">
            <DatePickerComponent setDate={setSDate} title="از تاریخ" />

            <DatePickerComponent setDate={setEDate} title="تا تاریخ" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatePicker_Medical;
