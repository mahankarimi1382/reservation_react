import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { get_specialties_category } from "../../api/ApiCalling";
import LoadingComponent from "../../components/LoadingComponent";
import { myStore } from "../../store/Store";
import { useNavigate } from "react-router-dom";

export default function SpecialtiesSwipper({ Specialties, setSpecialties }) {
  const {
    setSpecialistSearch,
    setMultiSpecialtiesBoxes,
    multiSpecialtiesBoxes,
  } = myStore();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [categorys, setCategorys] = useState([]);

  const getcategorys = async () => {
    const data = await get_specialties_category();
    if (data) {
      setCategorys(data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getcategorys();
  }, []);

  const swiperRef = useRef(null);

  const goNext = () => {
    swiperRef.current?.swiper?.slideNext();
  };

  const goPrev = () => {
    swiperRef.current?.swiper?.slidePrev();
  };

  return Specialties[0] !== null && Specialties.length !== 0 ? (
    <div className="lg:w-[55%] w-[50%] lg:py-10 lg:px-10 lg:min-h-[529px] py-3 rounded-xl bg-[rgba(219,237,255,0.35)] flex flex-col items-center">
      <div className="w-full gap-y-8 text-xs lg:text-base flex flex-col h-[400px] lg:h-auto overflow-auto lg:flex-row lg:flex-wrap items-start justify-start">
        {Specialties.map((item, index) => (
          <div
            key={index}
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

              navigate("/doctors"); // تبدیل شده از router.push
              setSpecialistSearch(item.id);
            }}
            className="hover:text-[#005DAD] cursor-pointer w-full lg:w-1/3 gap-3 flex"
          >
            <h5 className="hidden lg:flex">|</h5>
            <h5>{item.name}</h5>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="lg:w-[792px] w-[50%] lg:py-10 lg:px-5 lg:h-[529px] h-1/3 py-3 rounded-xl bg-[rgba(219,237,255,0.35)] flex flex-col items-center">
      <h2 className="text-[10px] font-semibold lg:font-normal lg:text-3xl">
        لطفا تخصص خود را انتخاب کنید
      </h2>

      <div className="lg:mt-20 mt-5 w-full flex justify-center items-center">
        {isLoading && <LoadingComponent />}

        <IoIosArrowForward
          onClick={goNext}
          className="text-4xl text-[#3E88F6] cursor-pointer"
        />

        <Swiper
          breakpoints={{
            300: { slidesPerView: 3, spaceBetween: 2 },
            640: { slidesPerView: 3, spaceBetween: 2 },
            768: { slidesPerView: 4, spaceBetween: 40 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
            1280: { slidesPerView: 4, spaceBetween: 20 },
          }}
          ref={swiperRef}
          loop={true}
          className="w-[95%] lg:w-[80%]"
        >
          {categorys.map((item) => (
            <SwiperSlide
              key={item.id}
              className="flex justify-center cursor-pointer items-center"
            >
              <div
                onClick={() => setSpecialties(item.specialists)}
                className="lg:w-48 lg:min-w-[93px] gap-2 flex flex-col justify-center items-center"
              >
                {item.categoryLogoFile &&
                  item.categoryLogoFile !== "string" && (
                    <img
                      className="w-[40px] lg:w-[74px]"
                      src={item.categoryLogoFile}
                      alt="icon"
                      width={74}
                      height={74}
                    />
                  )}
                <h5 className="text-[10px] lg:text-base">
                  {item.categoryName}
                </h5>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <IoIosArrowBack
          onClick={goPrev}
          className="text-4xl text-[#3E88F6] cursor-pointer"
        />
      </div>
    </div>
  );
}
