import React from "react";
import poster from "../../assets/Pics/healthmagezine-pics/poster.png"
const posters = [
  {
    id: 1,
    image: "https://example.com/image1.jpg",
  },
  {
    id: 2,
    image: "https://example.com/image2.jpg",
  },
  {
    id: 3,
    image: "https://example.com/image3.jpg",
  },
  {
    id: 4,
    image: "https://example.com/image4.jpg",
  },
];

function FourPosterSection() {
  return <div className=" w-full mt-10 flex justify-between items-center">
    {posters.map((item)=>{
        return(
            <img className=" rounded-xl" key={item.id} src={poster} width={300} alt="poster"/>

        )
    })}
  </div>;
}

export default FourPosterSection;
