"use client";
import heroPerson from "../assets/Pics/hero-small-pesron-pic.png";
import heroArrow from "../assets/Pics/heroArrow.png";
import heroLines from "../assets/Pics/3lines.png";
import { CiSearch } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { useRef, useState, useCallback, useEffect } from "react";
import PhoneMenuHref from "./PhoneMenuHref";
import { SyncLoader } from "react-spinners";
import { searchall } from "../api/ApiCalling";
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import doctorIcon from "../assets/Pics/doctor-icon.jpg";
import medicalIcon from "../assets/Pics/MattabIcon.png";
import { Link } from "react-router-dom";
import { myStore } from "../store/Store";
import { useNavigate } from "react-router-dom";
function MainSearchBar() {
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [medicals, setMedicals] = useState([]);
  const [specialist, setSpecialist] = useState([]);
  const [inputVal, setInputVal] = useState("");

  // برای کنترل debounce و cancel کردن درخواست‌های قبلی
  const debounceTimeoutRef = useRef(null);
  const abortControllerRef = useRef(null);
  const MainSearchinputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const lastSearchedTermRef = useRef("");
  const {
    setSpecialistSearch,
    setMultiSpecialtiesBoxes,
    multiSpecialtiesBoxes,
  } = myStore();
  const navigate = useNavigate();

  // تابع جستجو با debounce و abort controller
  const performSearch = useCallback(async (searchTerm) => {
    // کنسل کردن درخواست قبلی اگر هنوز در حال اجرا است
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const trimmed = (searchTerm || "").trim();

    // اگر جستجو خالی است، نتایج را پاک کن
    if (!trimmed) {
      setSuggestions([]);
      setDoctors([]);
      setMedicals([]);
      setSpecialist([]);
      setIsSearchLoading(false);
      lastSearchedTermRef.current = "";
      return;
    }

    // ایجاد AbortController جدید
    abortControllerRef.current = new AbortController();

    try {
      setIsSearchLoading(true);

      const result = await searchall(
        trimmed,
        setSuggestions,
        setIsSearchLoading,
        setDoctors,
        setMedicals,
        setSpecialist,
        abortControllerRef.current.signal // ارسال signal برای cancel کردن
      );
      lastSearchedTermRef.current = trimmed;
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Search error:", error);
        setIsSearchLoading(false);
      }
    }
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback(
    (searchTerm) => {
      // پاک کردن timeout قبلی
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      // تنظیم timeout جدید
      debounceTimeoutRef.current = setTimeout(() => {
        performSearch(searchTerm);
      }, 300); // 300ms تاخیر
    },
    [performSearch]
  );

  // پاک کردن timeout‌ها هنگام unmount و مدیریت کلیک خارج از دراپ‌داون
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearching(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputVal(value);
    setIsSearching(true);
    debouncedSearch(value);
  };

  const handleInputFocus = () => {
    setIsSearching(true);
    const trimmed = inputVal.trim();
    // فقط در صورتی که متن تغییر کرده و سرچ نشده باشد درخواست جدید می‌زنیم تا کلیک‌ها روی نتایج قبلی drop نشوند
    if (trimmed && trimmed !== lastSearchedTermRef.current) {
      debouncedSearch(trimmed);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputVal(suggestion);
    lastSearchedTermRef.current = suggestion.trim();
    performSearch(suggestion);
  };

  const handleClearSearch = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    setDoctors([]);
    setMedicals([]);
    setSpecialist([]);
    setInputVal("");
    setSuggestions([]);
    lastSearchedTermRef.current = "";
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
  };

  const handleSearchButtClick = () => {
    if (MainSearchinputRef.current) {
      MainSearchinputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setTimeout(() => {
        MainSearchinputRef.current.focus();
      }, 1000);
    } else {
      console.error("Input ref is not set.");
    }
  };

  return (
    <div
      onClick={() => setIsSearching(false)}
      className="relative flex flex-col gap-5 justify-center items-center"
    >
      <div className="flex flex-col relative justify-center items-center gap-5 -mb-10">
        <img
          alt="icon"
          width={191}
          className="hidden lg:flex w-[191px] absolute -right-20 top-10 pointer-events-none"
          src={heroArrow}
        />
        <img
          alt="icon"
          width={50}
          className="lg:hidden absolute right-2 pointer-events-none"
          src={heroArrow}
        />
        <img
          width={59}
          className="hidden lg:flex absolute -right-36 top-24 pointer-events-none"
          src={heroPerson}
          alt="icon"
        />
        <img
          width={20}
          className="lg:hidden flex absolute -right-2 xs:-right-5 w-[20px] xs:w-[30px] top-10 pointer-events-none"
          src={heroPerson}
          alt="icon"
        />
        <img
          width={60}
          src={heroLines}
          alt="icon"
          className="hidden lg:flex absolute left-10 -top-10 pointer-events-none"
        />
        <img
          width={20}
          src={heroLines}
          alt="icon"
          className="lg:hidden flex absolute left-6 -top-4 pointer-events-none"
        />
        <h2 className="font-semibold lg:font-medium text-[18px] flex gap-1 lg:gap-3 lg:text-[38px]">
          با
          <section className="animate-bounce text-[#005DAD]">دکتر رزرو</section>
          به راحتی نوبت خود را رزرو کنید
        </h2>
        <h2 className="text-[16px] lg:text-2xl">
          بهترین خدمات پزشکی در دستان شما
        </h2>
      </div>

      <div
        ref={searchContainerRef}
        className="gap-6 relative w-[100%] lg:w-4/5 xl:w-3/5 flex lg:mt-20 justify-center items-center rounded-xl h-[119px]"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="rounded-lg px-3 items-center justify-center gap-1 flex h-[43px] lg:h-[56px] mt-8 lg:mt-0 w-[85%] border bg-white border-[#C7C6C6]"
        >
          <CiSearch className="text-[#919191] text-3xl" />
          <input
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            value={inputVal}
            ref={MainSearchinputRef}
            className="text-sm outline-none h-full w-[80%]"
            placeholder="جستجو پزشک،درمانگر،کلینیک..."
          />
          <IoLocationOutline className="bg-[#005DAD21] lg:bg-white lg:border-none bg-opacity-20 w-8 h-8 rounded p-1 border border-[#005DAD] text-lg text-[#005DAD]" />
          <p className="hidden lg:flex text-[12px] text-[#919191] font-medium">
            انتخاب شهر
          </p>
        </div>

        {isSearching && (
          <div
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            className="gap-2 flex flex-col z-50 overflow-auto p-1 lg:p-3 top-[100px] lg:top-[90px] border rounded-lg absolute bg-[#F5F5F5] w-[85%] h-72"
          >
            <RxCross2
              onClick={() => setIsSearching(false)}
              className="cursor-pointer absolute left-1 top-1"
            />

            {isSearchLoading ? (
              <div className="w-full h-full flex justify-center items-center">
                <SyncLoader color="#005DAD" />
              </div>
            ) : (
              <div className="lg:py-0 py-5 flex flex-row gap-1 overflow-auto lg:text-base text-sm lg:gap-3">
                <h5 className="min-w-[100px]">جستجو های اخیر:</h5>
                {suggestions.map((item, index) => {
                  return (
                    <button
                      onClick={() => handleSuggestionClick(item)}
                      className="min-w-[80px] bg-[#E7E7E7] lg:px-2 rounded-full text-[#757575] items-center lg:text-base lg:gap-2 flex"
                      key={index}
                    >
                      {item}
                      {doctors.length > 0 ? (
                        <RxCross2 onClick={handleClearSearch} />
                      ) : (
                        <IoSearch className="text-[#757575]" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            <hr className="w-full" />

            <div className="w-full flex flex-col gap-2">
              {doctors && doctors.length !== 0 && (
                <h5>نتایج جستجو در پزشکان:</h5>
              )}
              {doctors &&
                doctors.map((item, index) => {
                  return (
                    <Link
                      to={`doctors/${item.link}`}
                      onClick={() => setIsSearching(false)}
                      className="border-b p-2 relative text-xs text-right lg:text-base text-gray-700 items-end lg:gap-2 flex"
                      key={index}
                    >
                      <img
                        className="rounded-full"
                        src={doctorIcon}
                        alt="prof"
                        width={74}
                      />
                      <div className="flex flex-col gap-2">
                        <h5>{item.result}</h5>
                        <h5 className="text-sm text-[#757575]">
                          متخصص مغز و اعصاب
                        </h5>
                      </div>
                      <div className="top-0 left-0 lg:bottom-2 lg:top-auto lg:bg-[#F0F0F0] text-xs font-semibold p-1 rounded text-[#005DAD] absolute">
                        97% پیشنهاد کاربران
                      </div>
                    </Link>
                  );
                })}

              {medicals && medicals.length !== 0 && (
                <h5>نتایج جستجو در مراکز درمانی:</h5>
              )}
              {medicals &&
                medicals.map((item, index) => {
                  return (
                    <Link
                      to={`medical-centers/${item.link}`}
                      onClick={() => setIsSearching(false)}
                      className="border-b p-2 relative text-xs text-right lg:text-base text-gray-700 items-end lg:gap-2 flex"
                      key={index}
                    >
                      <img
                        className="p-2"
                        src={medicalIcon}
                        alt="prof"
                        width={74}
                      />
                      <div className="flex flex-col gap-2">
                        <h5>{item.result}</h5>
                        <h5 className="text-sm text-[#757575]">
                          متخصص مغز و اعصاب
                        </h5>
                      </div>
                      <div className="left-0 bottom-2 bg-[#F0F0F0] text-xs font-semibold p-1 rounded text-[#005DAD] absolute">
                        97% پیشنهاد کاربران
                      </div>
                    </Link>
                  );
                })}

              {specialist && specialist.length !== 0 && (
                <h5>نتایج جستجو در تخصص:</h5>
              )}
              {specialist &&
                specialist.map((item, index) => {
                  return (
                    <button
                      onClick={() => {
                        const exists = multiSpecialtiesBoxes.some(
                          (box) => box.id === item.id
                        );
                        if (!exists) {
                          setMultiSpecialtiesBoxes([
                            {
                              id: item.id,
                              caption: item.name,
                              type: "specialties",
                            },
                          ]);
                        }
                        setIsSearching(false);
                        navigate("/doctors");
                        setSpecialistSearch(item.id);
                      }}
                      className="text-xs text-right lg:text-base text-gray-700 items-start lg:gap-2 flex"
                      key={index}
                    >
                      <IoSearch className="text-[#005DAD]" />
                      {item.result}
                    </button>
                  );
                })}
            </div>
          </div>
        )}
      </div>
      <PhoneMenuHref handleSearchButtClick={handleSearchButtClick} />
    </div>
  );
}

export default MainSearchBar;
