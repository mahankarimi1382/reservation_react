"use client";
import React, { useEffect, useMemo, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { Filtering_MedicalCenters_Store, myStore } from "../../store/Store";
import { get_province, get_specialties, read_city } from "../../api/ApiCalling";

export const SerchDropDowns = () => {
  const {
    setCurrentPageDoctorSearch,
    setMultiSpecialtiesBoxes,
    multiSpecialtiesBoxes,
    setSpecialistNames,
    storedIdsMultipleSearch,
    setStoredIdsMultipleSearch,
  } = myStore();
  const { setSpecialistSearch, specialistSearch } = myStore();
  const [specialties, setSpecialties] = useState([]);
  const [filtredArr, setFiltredArr] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
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
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [isSearching, setIsSearching] = useState(false);
  // const [selectedOption, setSelectedOption] = useState("");
  const handleSelectOption = (name, id) => {
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

    setCurrentPageDoctorSearch(1);
    setIsSearching(false);
    setInputVal("");
    setSpecialistNames(name);
    setCurrentPageDoctorSearch(1);
    let IsBoxExist = multiSpecialtiesBoxes.find((item) => item.id == id);
    if (!IsBoxExist) {
      setMultiSpecialtiesBoxes([
        ...multiSpecialtiesBoxes,
        {
          id: id,
          caption: name,
          type: "specialties",
        },
      ]);
    }
  };
  return (
    <div className=" flex flex-col gap-3">
      <div
        onClick={() => setIsSearching(!isSearching)}
        className=" px-2 border shadow-[0_1px_15px_-5px_rgba(0,0,0,0.3)] flex justify-center items-center  rounded-xl w-full"
      >
        <CiSearch className=" text-4xl text-[#005DAD]" />
        <input
          value={inputVal}
          onChange={handleInputChange}
          placeholder={"نام بیماری را جستجو کنید"}
          className=" outline-none h-[54px] w-full rounded-xl"
        />
        <IoIosArrowDown
          className={` ${
            isSearching && "rotate-180"
          } transition-all   duration-300 text-xl text-[#858585]`}
        />
      </div>
      <div className="bg-white shadow-lg rounded-xl">
        {isSearching ? (
          <div className="  mt-6 mr-2  p-2 transition-all duration-500 w-[95%] h-52 overflow-auto customScroll flex flex-col">
            {filtredArr.length != 0 ? (
              filtredArr.map((item) => {
                return (
                  <div
                    className=" hover:text-[#005dad]  p-1 border-b mx-2 flex items-center"
                    key={item.id}
                  >
                    <button
                      onClick={() => handleSelectOption(item.name, item.id)}
                    >
                      {item.name}
                    </button>
                  </div>
                );
              })
            ) : (
              <div className=" w-full flex justify-center items-center">
                نتیجه ای یافت نشد
              </div>
            )}
          </div>
        ) : (
          <div className=" transition-all mr-2 duration-300  w-[95%] h-0 overflow-auto customScroll flex flex-col">
            {filtredArr.map((item) => {
              return (
                <div
                  className=" border-b mx-2 p-1 flex items-center"
                  key={item.id}
                >
                  <h5> {item.name}</h5>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export const AcountInfoInputs = (props) => {
  const { isEdit } = myStore();

  const [value, setValue] = useState(props.value);
  return (
    <div className="lg:w-[48%] w-[90%] flex flex-col gap-2">
      <h2>{props.title}</h2>

      <input
        disabled={!isEdit}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="  h-10 rounded-lg border disabled:bg-[rgba(219,215,215,0.44)]"
      />
    </div>
  );
};
export const BirthDayInput = () => {
  const { isEdit } = myStore();

  return (
    <div className=" flex justify-between items-center">
      <input
        disabled={!isEdit}
        className=" w-[86px] h-10 rounded-lg border disabled:bg-[rgba(219,215,215,0.44)]"
      />
      <input
        disabled={!isEdit}
        className=" w-[86px] h-10 rounded-lg border disabled:bg-[rgba(219,215,215,0.44)]"
      />
      <input
        disabled={!isEdit}
        className=" w-[86px] h-10 rounded-lg border disabled:bg-[rgba(219,215,215,0.44)]"
      />
    </div>
  );
};
export const CitySelect = ({ isWfull }) => {
  const { isEdit } = myStore();

  return (
    <select
      disabled={!isEdit}
      className={`${
        isWfull ? "w-full" : "w-[320px]"
      } h-10 rounded-lg border disabled:bg-[rgba(219,215,215,0.44)]`}
    >
      <option></option>
      <option>تهران</option>
      <option>شیراز</option>
      <option>اردبیل</option>
    </select>
  );
};
export const SelectFilter = ({ title, options, setVal }) => {
  return options ? (
    <select
      onChange={(e) => setVal(e.target.value)}
      className=" w-[200px] text-[#AAAAAA] h-10 rounded-lg border-2 bg-white border-[rgba(219,215,215,0.44)]"
    >
      <option>{title}</option>
      {options.map((item) => {
        return (
          <option key={item.id} value={item.value}>
            {item.name}
          </option>
        );
      })}
    </select>
  ) : (
    <select className=" w-[200px] text-[#AAAAAA] h-10 rounded-lg border-2 bg-white border-[rgba(219,215,215,0.44)]">
      <option>{title}</option>
      <option>تهران</option>
      <option>شیراز</option>
      <option>اردبیل</option>
    </select>
  );
};
export const CitySelectInput = ({
  height,
  borderColor,
  setCityId,
  cities,
  hiddentitle,
  fromFilter,
  cityId,
}) => {
  return (
    <div className=" lg:text-base text-xs  flex gap-2 flex-col items-start">
      {!hiddentitle && <h5>شهر</h5>}
      <select
        value={(cityId && cityId.id) || cityId}
        onChange={(e) => {
          console.log(e.target.value);
          if (e.target.value) {
            setCityId({
              id: e.target.value,
              label:
                e.target.options[e.target.selectedIndex].getAttribute(
                  "data-name"
                ),
            });
          }
        }}
        className={`border w-full text-lg ${
          borderColor ? borderColor : "border-[#636972]"
        } ${height && height}  rounded-lg p-2`}
      >
        <option value={0}>
          {cities.length !== 0
            ? "شهر را انتخاب کنید"
            : "ابتدا استان را انتخاب کنید"}
        </option>
        {fromFilter && (
          <option data-name="همه ی شهر ها" value="">
            {cities.length !== 0 && "همه ی شهر ها"}
          </option>
        )}
        {cities.map((item) => {
          return (
            <option data-name={item.cityName} value={item.id} key={item.id}>
              {item.cityName}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export const ProvinceSelectInput = ({
  height,
  borderColor,
  setCities,
  hiddentitle,
  initProvince,
  setInitProvince,
  setProvince = () => console.log("first"),
}) => {
  const [provinces, setProvinces] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await get_province();
      if (initProvince) {
        read_city(initProvince, setCities);
      }
      if (data) {
        setProvinces(data);
      }
    };
    fetchData();
  }, []);
  return (
    <div className=" flex lg:text-base text-xs gap-2 flex-col items-start">
      {!hiddentitle && <h5>استان</h5>}
      <select
        value={initProvince}
        onChange={(e) => {
          console.log(e.target.value);
          if (e.target.value) {
            read_city(e.target.value, setCities);
            setInitProvince && setInitProvince(e.target.value);
            setProvince({
              id: e.target.value,
              label:
                e.target.options[e.target.selectedIndex].getAttribute(
                  "data-name"
                ),
            });
          } else {
            setCities([]);
          }
        }}
        className={` border w-full text-lg ${
          borderColor ? borderColor : "border-[#636972]"
        }  rounded-lg ${height && height} p-2`}
      >
        <option value={0}>استان را انتخاب کنید</option>
        {provinces.map((item) => {
          return (
            <option
              className=" text-lg"
              data-name={item.label}
              key={item.id}
              value={item.value}
            >
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};



export const SpecialtiesSelectInput = ({
  specialistId,
  setSpecialistId,
  hiddenTitle,
  all = true,
}) => {
  const [specialists, setSpecialists] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { setSpecialistSearch } = myStore();

  useEffect(() => {
    const fetchData = async () => {
      const data = await get_specialties("Specialist/read-specialists");
      if (data) setSpecialists(data);
    };
    fetchData();
  }, []);

  const filteredSpecialists = useMemo(() => {
    if (!searchTerm.trim()) return specialists;
    return specialists.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [specialists, searchTerm]);

  const handleSelect = (id, name) => {
    setSpecialistId(id);
    setSpecialistSearch(id);
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleClear = () => {
    setSpecialistId("");
    setSearchTerm("");
    setIsOpen(false);
  };

  return (
    <div className="relative flex flex-col gap-2">
      {!hiddenTitle && <h5 className="text-sm font-medium">تخصص</h5>}

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="border border-gray-300 bg-white rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer hover:border-[#005DAD] transition-all"
      >
        <span className="text-gray-700">
          {specialistId
            ? specialists.find((s) => s.id === specialistId)?.name || "انتخاب تخصص"
            : "همه تخصص‌ها"}
        </span>
        <IoIosArrowDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div className="absolute top-[110%] left-0 w-full bg-white border border-gray-300 rounded-xl shadow-lg z-50 max-h-60 overflow-auto">
          {all && (
            <div
              onClick={handleClear}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b"
            >
              همه تخصص‌ها
            </div>
          )}

          {filteredSpecialists.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelect(item.id, item.name)}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b last:border-none"
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export const ClinicSelectInput = ({ setType }) => {
  const [clinicTypes, setClinicTypes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await get_province();
      if (data) {
        setProvinces(data);
      }
    };
    fetchData();
  }, []);
  return (
    <div className=" flex gap-2 flex-col items-start">
      {!hiddentitle && <h5>استان</h5>}
      <select
        onChange={(e) => read_city(e.target.value, setCities)}
        className=" border w-full border-[#636972] rounded-lg p-2"
      >
        <option></option>
        {provinces.map((item) => {
          return (
            <option key={item.id} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export const SerchDropDownsbimeh = ({ details, title, fn }) => {
  const { setCurrentPageDoctorSearch } = myStore();
  const [filtredArr, setFiltredArr] = useState(details);
  const [inputVal, setInputVal] = useState("");
  const handleInputChange = (event) => {
    filterArray(event.target.value);
    setInputVal(event.target.value);
  };
  const filterArray = (value) => {
    const filtered = details.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFiltredArr(filtered);
  };

  const [isSearching, setIsSearching] = useState(false);
  const handleSelectOption = (name, id) => {
    setIsSearching(false);
    setInputVal("");
    setCurrentPageDoctorSearch(1);
    fn(name);
  };
  return (
    <div className=" flex flex-col gap-3">
      <h5>{title}</h5>
      <div
        onClick={() => setIsSearching(!isSearching)}
        className=" px-2 border shadow-[0_1px_15px_-5px_rgba(0,0,0,0.3)] flex justify-center items-center  rounded-xl w-full"
      >
        <CiSearch className=" text-4xl text-[#005DAD]" />
        <input
          value={inputVal}
          onChange={handleInputChange}
          placeholder={"نام بیمه را جستجو کنید"}
          className=" outline-none h-[54px] w-full rounded-xl"
        />
        <IoIosArrowDown
          className={` ${
            isSearching && "rotate-180"
          } transition-all   duration-300 text-xl text-[#858585]`}
        />
      </div>
      <div className="bg-white shadow-lg rounded-xl">
        {isSearching ? (
          <div className="  mt-6 mr-2  p-2 transition-all duration-500 w-[95%] h-52 overflow-auto customScroll flex flex-col">
            {filtredArr.length != 0 ? (
              filtredArr.map((item) => {
                return (
                  <div
                    className=" hover:text-[#005dad]  p-1 border-b mx-2 flex items-center"
                    key={item.id}
                  >
                    <button
                      onClick={() => handleSelectOption(item.name, item.id)}
                    >
                      {item.name}
                    </button>
                  </div>
                );
              })
            ) : (
              <div className=" w-full flex justify-center items-center">
                نتیجه ای یافت نشد
              </div>
            )}
          </div>
        ) : (
          <div className=" transition-all mr-2 duration-300  w-[95%] h-0 overflow-auto customScroll flex flex-col">
            {filtredArr.map((item) => {
              return (
                <div
                  className=" border-b mx-2 p-1 flex items-center"
                  key={item.id}
                >
                  <h5> {item.name}</h5>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export const Search_Provience_MedicalCenters = () => {
  const { setProvinceID, setProvinceName, provinceName } =
    Filtering_MedicalCenters_Store();
  const [provinces, setProvinces] = useState([]);
  console.log(provinces);
  useEffect(() => {
    const fetchData = async () => {
      const data = await get_province();
      if (data) {
        setProvinces(data);
        setFiltredArr(data);
      }
    };
    fetchData();
  }, []);
  const [filtredArr, setFiltredArr] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const handleInputChange = (event) => {
    filterArray(event.target.value);
    setInputVal(event.target.value);
  };
  const filterArray = (value) => {
    const filtered = provinces.filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase())
    );
    setFiltredArr(filtered);
  };

  const [isSearching, setIsSearching] = useState(false);
  // const [selectedOption, setSelectedOption] = useState("");
  const handleSelectOption = (label, value) => {
    setIsSearching(false);
    setProvinceID(value);
    setProvinceName(label);
    // if (storedIdsMultipleSearch) {
    //   setStoredIdsMultipleSearch(`${storedIdsMultipleSearch},${id}`);
    // } else {
    //   setStoredIdsMultipleSearch(id);
    // }
    // if (storedIdsMultipleSearch) {
    //   setSpecialistSearch(`${storedIdsMultipleSearch},${id}`);
    // } else {
    //   setSpecialistSearch(id);
    // }

    // setCurrentPageDoctorSearch(1);
    // setIsSearching(false);
    // setInputVal("");
    // setSpecialistNames(name);
    // setCurrentPageDoctorSearch(1);
    // let IsBoxExist = multiSpecialtiesBoxes.find((item) => item.id == id);
    // if (!IsBoxExist) {
    //   setMultiSpecialtiesBoxes([
    //     ...multiSpecialtiesBoxes,
    //     {
    //       id: id,
    //       caption: name,
    //       type: "specialties",
    //     },
    //   ]);
    // }
  };
  return (
    <div className=" flex flex-col gap-3">
      <div
        onClick={() => setIsSearching(!isSearching)}
        className=" bg-white px-2 border shadow-[0_1px_15px_-5px_rgba(0,0,0,0.3)] flex justify-center items-center  rounded-xl w-full"
      >
        <CiSearch className=" text-4xl text-[#005DAD]" />
        <input
          value={inputVal}
          onChange={handleInputChange}
          placeholder={provinceName ? provinceName : "نام استان را جستجو کنید"}
          className=" outline-none h-[54px] w-full rounded-xl"
        />
        <IoIosArrowDown
          className={` ${
            isSearching && "rotate-180"
          } transition-all   duration-300 text-xl text-[#858585]`}
        />
      </div>
      <div className="bg-white shadow-lg rounded-xl">
        {isSearching ? (
          <div className="  mt-6 mr-2  p-2 transition-all duration-500 w-[95%] h-52 overflow-auto customScroll flex flex-col">
            {filtredArr.length != 0 ? (
              filtredArr.map((item) => {
                return (
                  <div
                    className=" hover:text-[#005dad]  p-1 border-b mx-2 flex items-center"
                    key={item.id}
                  >
                    <button
                      onClick={() => handleSelectOption(item.label, item.value)}
                    >
                      {item.label}
                    </button>
                  </div>
                );
              })
            ) : (
              <div className=" w-full flex justify-center items-center">
                نتیجه ای یافت نشد
              </div>
            )}
          </div>
        ) : (
          <div className=" transition-all mr-2 duration-300  w-[95%] h-0 overflow-auto customScroll flex flex-col">
            {filtredArr.map((item) => {
              return (
                <div
                  className=" border-b mx-2 p-1 flex items-center"
                  key={item.id}
                >
                  <h5> {item.name}</h5>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export const Search_City_MedicalCenters = () => {
  const { setCityID, setCityName, provinceID } =
    Filtering_MedicalCenters_Store();
  const [cities, setCities] = useState([]);
  console.log(provinceID);
  console.log(cities);
  useEffect(() => {
    const fetchData = () => {
      if (provinceID) {
        read_city(provinceID, setCities);
      } else {
        setCities([]);
      }
    };
    fetchData();
  }, [provinceID]);
  useEffect(() => {
    setFiltredArr(cities);
  }, [cities]);
  const [filtredArr, setFiltredArr] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const handleInputChange = (event) => {
    filterArray(event.target.value);
    setInputVal(event.target.value);
  };
  const filterArray = (value) => {
    const filtered = cities.filter((item) =>
      item.cityName.toLowerCase().includes(value.toLowerCase())
    );
    setFiltredArr(filtered);
  };

  const [isSearching, setIsSearching] = useState(false);
  // const [selectedOption, setSelectedOption] = useState("");
  const handleSelectOption = (label, value) => {
    setIsSearching(false);

    setCityID(value);
    setCityName(label);
    // if (storedIdsMultipleSearch) {
    //   setStoredIdsMultipleSearch(`${storedIdsMultipleSearch},${id}`);
    // } else {
    //   setStoredIdsMultipleSearch(id);
    // }
    // if (storedIdsMultipleSearch) {
    //   setSpecialistSearch(`${storedIdsMultipleSearch},${id}`);
    // } else {
    //   setSpecialistSearch(id);
    // }

    // setCurrentPageDoctorSearch(1);
    // setIsSearching(false);
    // setInputVal("");
    // setSpecialistNames(name);
    // setCurrentPageDoctorSearch(1);
    // let IsBoxExist = multiSpecialtiesBoxes.find((item) => item.id == id);
    // if (!IsBoxExist) {
    //   setMultiSpecialtiesBoxes([
    //     ...multiSpecialtiesBoxes,
    //     {
    //       id: id,
    //       caption: name,
    //       type: "specialties",
    //     },
    //   ]);
    // }
  };
  return (
    <div className=" flex flex-col gap-3">
      <div
        onClick={() => setIsSearching(!isSearching)}
        className="bg-white px-2 border shadow-[0_1px_15px_-5px_rgba(0,0,0,0.3)] flex justify-center items-center  rounded-xl w-full"
      >
        <CiSearch className=" text-4xl text-[#005DAD]" />
        <input
          value={inputVal}
          onChange={handleInputChange}
          placeholder={"نام شهر را جستجو کنید"}
          className=" outline-none h-[54px] w-full rounded-xl"
        />
        <IoIosArrowDown
          className={` ${
            isSearching && "rotate-180"
          } transition-all   duration-300 text-xl text-[#858585]`}
        />
      </div>
      <div className="bg-white shadow-lg rounded-xl">
        {isSearching ? (
          <div className="  mt-6 mr-2  p-2 transition-all duration-500 w-[95%] h-52 overflow-auto customScroll flex flex-col">
            {filtredArr.length != 0 ? (
              filtredArr.map((item) => {
                return (
                  <div
                    className=" hover:text-[#005dad]  p-1 border-b mx-2 flex items-center"
                    key={item.id}
                  >
                    <button
                      onClick={() => handleSelectOption(item.cityName, item.id)}
                    >
                      {item.cityName}
                    </button>
                  </div>
                );
              })
            ) : (
              <div className=" w-full flex justify-center items-center">
                ابتدا استان را انتخاب کنید
              </div>
            )}
          </div>
        ) : (
          <div className=" transition-all mr-2 duration-300  w-[95%] h-0 overflow-auto customScroll flex flex-col">
            {filtredArr.map((item) => {
              return (
                <div
                  className=" border-b mx-2 p-1 flex items-center"
                  key={item.id}
                >
                  <h5> {item.name}</h5>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export const Search_Special_MedicalCenters = () => {
  const { setSpecialID, setSpecialName } = Filtering_MedicalCenters_Store();
  const [specialties, setSpecialties] = useState([]);
  const [filtredArr, setFiltredArr] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
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
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [isSearching, setIsSearching] = useState(false);
  // const [selectedOption, setSelectedOption] = useState("");
  const handleSelectOption = (name, id) => {
    setIsSearching(false);

    setSpecialID(id);
    setSpecialName(name);
    // if (storedIdsMultipleSearch) {
    //   setStoredIdsMultipleSearch(`${storedIdsMultipleSearch},${id}`);
    // } else {
    //   setStoredIdsMultipleSearch(id);
    // }
    // if (storedIdsMultipleSearch) {
    //   setSpecialistSearch(`${storedIdsMultipleSearch},${id}`);
    // } else {
    //   setSpecialistSearch(id);
    // }

    // setCurrentPageDoctorSearch(1);
    // setIsSearching(false);
    // setInputVal("");
    // setSpecialistNames(name);
    // setCurrentPageDoctorSearch(1);
    // let IsBoxExist = multiSpecialtiesBoxes.find((item) => item.id == id);
    // if (!IsBoxExist) {
    //   setMultiSpecialtiesBoxes([
    //     ...multiSpecialtiesBoxes,
    //     {
    //       id: id,
    //       caption: name,
    //       type: "specialties",
    //     },
    //   ]);
    // }
  };
  return (
    <div className=" flex flex-col gap-3">
      <div
        onClick={() => setIsSearching(!isSearching)}
        className=" px-2 border shadow-[0_1px_15px_-5px_rgba(0,0,0,0.3)] flex justify-center items-center  rounded-xl w-full"
      >
        <CiSearch className=" text-4xl text-[#005DAD]" />
        <input
          value={inputVal}
          onChange={handleInputChange}
          placeholder={"نام تخصص را جستجو کنید"}
          className=" outline-none h-[54px] w-full rounded-xl"
        />
        <IoIosArrowDown
          className={` ${
            isSearching && "rotate-180"
          } transition-all   duration-300 text-xl text-[#858585]`}
        />
      </div>
      <div className="bg-white shadow-lg rounded-xl">
        {isSearching ? (
          <div className="  mt-6 mr-2  p-2 transition-all duration-500 w-[95%] h-52 overflow-auto customScroll flex flex-col">
            {filtredArr.length != 0 ? (
              filtredArr.map((item) => {
                return (
                  <div
                    className=" hover:text-[#005dad]  p-1 border-b mx-2 flex items-center"
                    key={item.id}
                  >
                    <button
                      onClick={() => handleSelectOption(item.name, item.id)}
                    >
                      {item.name}
                    </button>
                  </div>
                );
              })
            ) : (
              <div className=" w-full flex justify-center items-center">
                نتیجه ای یافت نشد
              </div>
            )}
          </div>
        ) : (
          <div className=" transition-all mr-2 duration-300  w-[95%] h-0 overflow-auto customScroll flex flex-col">
            {filtredArr.map((item) => {
              return (
                <div
                  className=" border-b mx-2 p-1 flex items-center"
                  key={item.id}
                >
                  <h5> {item.name}</h5>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export const Search_TreatmentCenterType_MedicalCenters = () => {
  const { setTreatmentID, setTreatmentName } = Filtering_MedicalCenters_Store();

  const treatments = [
    { id: 1, name: "بیمارستان دولتی" },
    { id: 2, name: "بیمارستان خصوصی" },
    { id: 3, name: "بیمارستان خیریه" },
    { id: 4, name: "مطب" },
  ];

  const [filtredArr, setFiltredArr] = useState(treatments);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const handleInputChange = (event) => {
    filterArray(event.target.value);
    setInputVal(event.target.value);
  };
  const filterArray = (value) => {
    const filtered = cities.filter((item) =>
      item.cityName.toLowerCase().includes(value.toLowerCase())
    );
    setFiltredArr(filtered);
  };

  const [isSearching, setIsSearching] = useState(false);
  // const [selectedOption, setSelectedOption] = useState("");
  const handleSelectOption = (label, value) => {
    setIsSearching(false);

    setTreatmentID(value);
    setTreatmentName(label);
    // if (storedIdsMultipleSearch) {
    //   setStoredIdsMultipleSearch(`${storedIdsMultipleSearch},${id}`);
    // } else {
    //   setStoredIdsMultipleSearch(id);
    // }
    // if (storedIdsMultipleSearch) {
    //   setSpecialistSearch(`${storedIdsMultipleSearch},${id}`);
    // } else {
    //   setSpecialistSearch(id);
    // }

    // setCurrentPageDoctorSearch(1);
    // setIsSearching(false);
    // setInputVal("");
    // setSpecialistNames(name);
    // setCurrentPageDoctorSearch(1);
    // let IsBoxExist = multiSpecialtiesBoxes.find((item) => item.id == id);
    // if (!IsBoxExist) {
    //   setMultiSpecialtiesBoxes([
    //     ...multiSpecialtiesBoxes,
    //     {
    //       id: id,
    //       caption: name,
    //       type: "specialties",
    //     },
    //   ]);
    // }
  };
  return (
    <div className=" flex flex-col gap-3">
      <div
        onClick={() => setIsSearching(!isSearching)}
        className=" px-2 border shadow-[0_1px_15px_-5px_rgba(0,0,0,0.3)] flex justify-center items-center  rounded-xl w-full"
      >
        <CiSearch className=" text-4xl text-[#005DAD]" />
        <input
          value={inputVal}
          onChange={handleInputChange}
          placeholder={"نوع مرکز را جستجو کنید"}
          className=" outline-none h-[54px] w-full rounded-xl"
        />
        <IoIosArrowDown
          className={` ${
            isSearching && "rotate-180"
          } transition-all   duration-300 text-xl text-[#858585]`}
        />
      </div>
      <div className="bg-white shadow-lg rounded-xl">
        {isSearching ? (
          <div className="  mt-6 mr-2  p-2 transition-all duration-500 w-[95%] h-52 overflow-auto customScroll flex flex-col">
            {filtredArr.length != 0 ? (
              filtredArr.map((item) => {
                return (
                  <div
                    className=" hover:text-[#005dad]  p-1 border-b mx-2 flex items-center"
                    key={item.id}
                  >
                    <button
                      onClick={() => handleSelectOption(item.name, item.id)}
                    >
                      {item.name}
                    </button>
                  </div>
                );
              })
            ) : (
              <div className=" w-full flex justify-center items-center">
                ابتدا استان را انتخاب کنید
              </div>
            )}
          </div>
        ) : (
          <div className=" transition-all mr-2 duration-300  w-[95%] h-0 overflow-auto customScroll flex flex-col">
            {filtredArr.map((item) => {
              return (
                <div
                  className=" border-b mx-2 p-1 flex items-center"
                  key={item.id}
                >
                  <h5> {item.name}</h5>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export const Phone_specialFilter_medicalcenter_dropDown = () => {
  const {
    setCurrentPageDoctorSearch,
    setMultiSpecialtiesBoxes,
    multiSpecialtiesBoxes,
    setSpecialistNames,
    storedIdsMultipleSearch,
    setStoredIdsMultipleSearch,
  } = myStore();
  const { setSpecialistSearch, specialistSearch } = myStore();
  const [specialties, setSpecialties] = useState([]);
  const [filtredArr, setFiltredArr] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
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
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [isSearching, setIsSearching] = useState(false);
  // const [selectedOption, setSelectedOption] = useState("");
  const handleSelectOption = (name, id) => {
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

    setCurrentPageDoctorSearch(1);
    setIsSearching(false);
    setInputVal("");
    setSpecialistNames(name);
    setCurrentPageDoctorSearch(1);
    let IsBoxExist = multiSpecialtiesBoxes.find((item) => item.id == id);
    if (!IsBoxExist) {
      setMultiSpecialtiesBoxes([
        ...multiSpecialtiesBoxes,
        {
          id: id,
          caption: name,
          type: "specialties",
        },
      ]);
    }
  };
  return (
    <div className=" lg:hidden flex flex-col gap-3">
      <div
        onClick={() => setIsSearching(!isSearching)}
        className=" px-2 border shadow-[0_1px_15px_-5px_rgba(0,0,0,0.3)] flex justify-center items-center  rounded-xl w-full"
      >
        <CiSearch className=" text-4xl text-[#005DAD]" />
        <input
          value={inputVal}
          onChange={handleInputChange}
          placeholder={"نام بیماری را جستجو کنید"}
          className=" outline-none h-[54px] w-full rounded-xl"
        />
        <IoIosArrowDown
          className={` ${
            isSearching && "rotate-180"
          } transition-all   duration-300 text-xl text-[#858585]`}
        />
      </div>
      <div className="bg-white shadow-lg rounded-xl">
        {isSearching ? (
          <div className="  mt-6 mr-2  p-2 transition-all duration-500 w-[95%] h-52 overflow-auto customScroll flex flex-col">
            {filtredArr.length != 0 ? (
              filtredArr.map((item) => {
                return (
                  <div
                    className=" hover:text-[#005dad]  p-1 border-b mx-2 flex items-center"
                    key={item.id}
                  >
                    <button
                      onClick={() => handleSelectOption(item.name, item.id)}
                    >
                      {item.name}
                    </button>
                  </div>
                );
              })
            ) : (
              <div className=" w-full flex justify-center items-center">
                نتیجه ای یافت نشد
              </div>
            )}
          </div>
        ) : (
          <div className=" transition-all mr-2 duration-300  w-[95%] h-0 overflow-auto customScroll flex flex-col">
            {filtredArr.map((item) => {
              return (
                <div
                  className=" border-b mx-2 p-1 flex items-center"
                  key={item.id}
                >
                  <h5> {item.name}</h5>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
