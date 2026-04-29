import star from "../assets/Pics/star.png";

export const RateCounter = ({ rate,width }) => {
  return (
    <div className=" flex">
      {Array.from({ length: rate }).map((_, index) => {
        return (
          <div className="" key={index}>
            <img width={width} alt="" src={star} />
          </div>
        );
      })}
    </div>
  );
};
