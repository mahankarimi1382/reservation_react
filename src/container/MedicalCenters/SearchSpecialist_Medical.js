import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Checkbox } from "@mui/material";
import { get_specialties } from "../../api/ApiCalling";
import { Filtering_MedicalCenters_Store, myStore } from "../../store/Store";

function SearchSpecialist_Medical() {
  const {
    // setCurrentPageDoctorSearch,
  } = myStore();
  
  const {
    storedIdsMultipleSearch,
    setStoredIdsMultipleSearch,
    setSpecialistSearch,
    setSpecialistNames,
    setMultiSpecialtiesBoxes,
    multiSpecialtiesBoxes,
  } = Filtering_MedicalCenters_Store();
  const [specialties, setSpecialties] = useState([]);
  const [filtredArr, setFiltredArr] = useState([]);
  const [inputVal, setInputVal] = useState("");

  const handleInputChange = (event) => {
    filterArray(event.target.value);
    setInputVal(event.target.value);
  };

  const filterArray = (value) => {
    const filtered = specialties.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFiltredArr(filtered);
  };

  const fetchData = async () => {
    const url = "Specialist/read-specialists";
    const data = await get_specialties(url);
    if (data) {
      setSpecialties(data);
      setFiltredArr(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRemoveOption = (name, idToRemove) => {
    console.log(storedIdsMultipleSearch);
    if (typeof storedIdsMultipleSearch == "string") {
      let newIds = storedIdsMultipleSearch
        .split(",")
        .filter((id) => id !== idToRemove.toString())
        .join(",");
      console.log(newIds);
      setStoredIdsMultipleSearch(newIds);
      setSpecialistSearch(newIds);
    } else {
      setSpecialistSearch("");
    }

    let removedBox = multiSpecialtiesBoxes
      .filter((item) => item.caption != name)
      .filter((item) => item.caption);
    console.log(removedBox);
    setMultiSpecialtiesBoxes(removedBox);
    setSpecialistNames();

  };

  const handleSelectOption = (name, id) => {
    setMultiSpecialtiesBoxes([
      ...multiSpecialtiesBoxes,
      {
        id: id,
        caption: name,
        type: "specialties",
      },
    ]);
    setSpecialistNames(name);


    console.log(id);
    if (storedIdsMultipleSearch) {
      setStoredIdsMultipleSearch(`${storedIdsMultipleSearch},${id}`);
    } else {
      setStoredIdsMultipleSearch(id);
    }



    if (storedIdsMultipleSearch) {
      setSpecialistSearch(`${storedIdsMultipleSearch},${id}`);
    } else {
      setSpecialistSearch(id);
    }

    // setCurrentPageDoctorSearch(1);
  };

  return (
    <div className=" w-full flex justify-center items-center ">
      <div className=" py-4 w-full rounded-xl items-center flex flex-col border max-h-[400px] shadow-md">
        <label className=" px-2 gap-2 bg-[#F4F4F4] h-[43px] flex items-center w-[85%] rounded-xl">
          <CiSearch className=" text-2xl " />
          <input
            onChange={handleInputChange}
            placeholder="جستجو تخصص"
            className=" py-2 bg-[#F4F4F4] outline-none"
          />
        </label>
        <div className=" w-[95%] overflow-auto customScroll flex flex-col">
          {filtredArr.map((item) => {
            return (
              <div className=" border-b mx-2 flex items-center" key={item.id}>
                <Checkbox
                  checked={multiSpecialtiesBoxes.some(
                    (boxItem) => boxItem.id === item.id
                  )}
                  onChange={(e) => {
                    console.log(e.target.value);
                    let isCheked = e.target.checked;
                    if (isCheked) {
                      handleSelectOption(item.name, item.id);
                    } else {
                      handleRemoveOption(item.name, item.id);
                    }

                  }}
                />
                <h5>{item.name}</h5>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default SearchSpecialist_Medical;
