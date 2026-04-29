import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Checkbox } from "@mui/material";
import { get_specialties } from "../../api/ApiCalling";
import { myStore } from "../../store/Store";

function SearchSpecialites() {
  const {
    setCurrentPageDoctorSearch,
    storedIdsMultipleSearch,
    setStoredIdsMultipleSearch,
  } = myStore();
  // const [storedIDs, setStoredIDs] = useState("");
  const [storedNames, setStoredNames] = useState("");
  const [checkedItems, setCheckedItems] = useState({});
  const {
    setSpecialistSearch,
    setSpecialistNames,
    specialistNames,
    setMultiSpecialtiesBoxes,
  } = myStore();
  const [specialties, setSpecialties] = useState([]);
  const [filtredArr, setFiltredArr] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const { multiSpecialtiesBoxes } = myStore();

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
    // if (storedIDs) {
    //   setStoredIDs(`${storedIDs},${id}`);
    // } else {
    //   setStoredIDs(id);
    // }

    // if (storedNames) {
    //   setStoredNames(`${storedNames},${name}`);
    // } else {
    //   setStoredNames(name);
    // }

    // if (storedIDs) {
    //   setSpecialistSearch(`${storedNames},${name}`, `${storedIDs},${id}`);
    // } else {
    //   setSpecialistSearch(name, id);
    // }

    // setCurrentPageDoctorSearch(1);
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
    // const newCheckedItems = { ...checkedItems, [id]: !checkedItems[id] };
    // setCheckedItems(newCheckedItems);

    console.log(id);
    if (storedIdsMultipleSearch) {
      setStoredIdsMultipleSearch(`${storedIdsMultipleSearch},${id}`);
    } else {
      setStoredIdsMultipleSearch(id);
    }

    // if (storedNames) {
    //   setStoredNames(`${storedNames},${name}`);
    // } else {
    //   setStoredNames(name);
    // }

    if (storedIdsMultipleSearch) {
      setSpecialistSearch(`${storedIdsMultipleSearch},${id}`);
    } else {
      setSpecialistSearch(id);
    }

    setCurrentPageDoctorSearch(1);
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
                    // console.log(multiSpecialtiesBoxes);
                    // if (multiSpecialtiesBoxes.length == 1) {
                    //   setSpecialistSearch(item.name, item.id);
                    // } else {
                    //   const captions = multiSpecialtiesBoxes.map(
                    //     (item) => item.caption
                    //   );
                    //   const IDs = multiSpecialtiesBoxes.map(
                    //     (item) => item.id
                    //   );
                    //   console.log(
                    //     `${captions},${item.name}`,
                    //     `${IDs},${item.id}`
                    //   );
                    // }

                    // handleSelectOption(item.name, item.id);
                  }}
                />
                <h5>{item.name}</h5>
              </div>
            );
          })}
        </div>
        {/* <button
          disabled={!specialistIDval}
          onClick={handleSubmit}
          className=" disabled:bg-slate-300 lg: bg-[#005DAD] text-white w-[80%] rounded-xl p-2 mt-2"
        >
          تایید
        </button> */}
      </div>
    </div>
  );
}

export default SearchSpecialites;
