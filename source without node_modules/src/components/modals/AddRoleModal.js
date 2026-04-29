import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import ModalLogo from "../../assets/Pics/ModalLogo.png";
import Confetti from "react-confetti";
import { SyncLoader } from "react-spinners";
import { create_role } from "../../api/ApiCalling";

function AddRoleModal({ closeModal }) {
  const [rollName, setRollName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let data = {
    metadata: {
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userName: "string",
      smeProfileId: 0,
    },
    rollName,
  };
  const handleSubmit = () => {
    create_role(data, setIsLoading, closeModal);
  };
  return (
    <div className=" w-screen z-10 h-screen top-0 justify-center items-center flex right-0 fixed bg-[rgba(0,0,0,0.6)]">
      <div className=" relative w-[450px] h-[240px] bg-white flex flex-col justify-between py-2 px-2 pb-5  items-center rounded-2xl">
        <RxCross2
          onClick={closeModal}
          className=" absolute cursor-pointer top-2 left-2"
        />
        <div className=" mt-5 w-full h-full flex flex-col">
          <h5>افزودن نقش:</h5>
          <div className=" gap-2 flex flex-col p-5 relative w-full h-full rounded-lg border border-[#005DAD]">
            <h5>عنوان</h5>
            <input
              onChange={(e) => setRollName(e.target.value)}
              placeholder="عنوان نقش را وارد کنید"
              className=" w-full rounded border-[#005DAD] border p-2"
            />
            <div className=" absolute bottom-1 w-full flex justify-center items-center">
              <button
                onClick={handleSubmit}
                className=" flex justify-center items-center min-h-10 w-1/3 gap-2 rounded-lg bg-[#005DAD] text-white"
              >
                {isLoading ? <SyncLoader color="white" size={10} /> : "ثبت"}
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRoleModal;
