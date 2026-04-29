import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css/scrollbar";
import { get_first_page_specialties } from "../api/ApiCalling";

import { useNavigate } from "react-router-dom";

import { myStore, TotalLoadingStore } from "../store/Store";
import LoadingComponent from "./LoadingComponent";

function SwipperSection() {
  const {
    setSpecialistSearch,
    setMultiSpecialtiesBoxes,
    multiSpecialtiesBoxes,
  } = myStore();

  const navigate = useNavigate();

  const [categorys, setCategorys] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setIsTotalLoading } = TotalLoadingStore();

  const fetchData = async () => {
    const data = await get_first_page_specialties();
    if (data) {
      setCategorys(data);
      setLoading(false);
      setIsTotalLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const mappingCategoryFn = () => {
    return (
      <div>
        {loading && <LoadingComponent />}
        {categorys.map((item) => {
          return (
            <SwiperSlide
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

                navigate("/doctors");
                setSpecialistSearch(item.id);
              }}
              key={item.id}
              className="py-2 group cursor-pointer  w-32 md:p-3 xl:p-[25px]"
            >
              <button
                key={item.id}
                className="group-hover:shadow-lg lg:group-hover:shadow-[#6991b4] lg:group-hover:-mt-3
                pointer-events-none lg:my-0 my-2 text-[10px] md:font-semibold font-light
                w-[95px] h-[120px] md:w-[100px] md:h-[130px] transition-all 
                lg:w-[131px] lg:h-[170px] flex flex-col justify-evenly items-center
                rounded-xl border border-[#DBD7D7]"
              >
                <div className="bg-[#eaeaea] group-hover:bg-[#6eb6f6] transition-all rounded-full w-[77px] h-[77px] flex justify-center items-center">
                  <img
                    className="pointer-events-none"
                    alt="icon"
                    width={51}
                    height={51}
                    src={item.logoFile}
                  />
                </div>

                <h2 className="pointer-events-none auto text-center lg:font-medium lg:text-[12px]">
                  {item.name}
                </h2>
              </button>
            </SwiperSlide>
          );
        })}
      </div>
    );
  };

  return (
    <Swiper
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        300: {
          slidesPerView: 2,
          spaceBetween: 2,
          scrollbar: {
            dragSize: 50,
          },
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 0,
          dragClass: "scrollbar-drag",
        },
        1280: {
          a11y: false,
          slidesPerView: 6,
          spaceBetween: -20,
          dragClass: "scrollbar-drag",
          preventClicks: true,
        },
      }}
      modules={[Scrollbar, Autoplay]}
      scrollbar={{
        draggable: true,
        dragSize: 50,
        dragClass: "scrollbar-drag",
      }}
      className="flex lg:w-[80%] justify-center items-center"
    >
      {mappingCategoryFn()}
    </Swiper>
  );
}

export default SwipperSection;
