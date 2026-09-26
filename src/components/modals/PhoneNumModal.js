import React, { useEffect, useRef, useState } from "react";
import ModalLogo from "../../assets/Pics/ModalLogo.png";
import { RxCross2 } from "react-icons/rx";
import { SyncLoader } from "react-spinners";
import {
  fullNameStorage,
  myStore,
  smeIdStorage,
  userDoctorStorage,
  userProfileStore,
} from "../../store/Store";
import { signin, signup } from "../../api/ApiCalling";
import ValidateModal from "./ValidateModal";
function PhoneNumModal({ closeModal, setIsPhoneNumModal, setIsSignupModal, loginPurpose}) {
                  const { doctors,setDoctors,setDoctorId } = userDoctorStorage();
  
  const inputRef = useRef(null);
  const { setToken } = myStore();
  const { setFullName } = fullNameStorage();
  const { setSmeId } = smeIdStorage();
  const [isValidateModal, setIsValidateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [phoneNum, setPhoneNum] = useState("");
  const [loginByPass, setLoginBypass] = useState(false);
  const [nationalCode, setNationalCode] = useState("");
  const [password, setPassword] = useState("");
  const { phoneNum, setPhoneNum } = userProfileStore();
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = () => {
    loginByPass
      ? signin(
          setIsLoading,
          data2,
          setFullName,
          setToken,
          closeModal,
          setSmeId,
          setDoctors,
          setDoctorId
        )
      : signup(setIsLoading, data, setIsValidateModal);
  };
  const handleKeyDown = (e) => {
    if (e.key == "Enter" && loginByPass && nationalCode && password) {
      handleSubmit();
    } else {
      if (e.key == "Enter" && phoneNum.length >= 11) {
        handleSubmit();
      }
    }
  };
  const data = {
    metadata: {
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userName: "string",
    },
    userName: phoneNum ? phoneNum : "string",
    password: password ? password : "string",
    phoneNumber: "string",
    fullname: "string",
  };
  const data2 = {
    metadata: {
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userName: "string",
      smeProfileId: 0,
    },
    userName: nationalCode,
    password: password,
    isPersistent: true,
  };
  const buttRef = useRef();

  return isValidateModal ? (
    <ValidateModal
      setIsValidateModal={setIsValidateModal}
      phoneNumber={phoneNum}
      nationalCode={nationalCode}
      closeModal={closeModal}
      loginPurpose={loginPurpose}
    />
  ) : (
    <div
      onKeyDown={handleKeyDown}
      className=" py-2 w-[394px] gap-5 bg-white flex flex-col justify-between rounded"
    >
      <div className=" w-full flex px-1 justify-end">
        <RxCross2
          onClick={closeModal}
          className=" text-[#717171] z-30 cursor-pointer text-2xl"
        />
      </div>
      <div className=" w-full flex justify-center items-center -mt-8">
        <img src={ModalLogo} alt="Logo" width={67} />
      </div>
      <div className=" flex justify-center gap-2 items-center w-full">
        <button
          onClick={() => setLoginBypass(false)}
          className={!loginByPass && " text-[#005DAD]"}
        >
          ورود با شماره
        </button>
        |
        <button
          className={loginByPass && " text-[#005DAD]"}
          onClick={() => {
            setPhoneNum("");
            setLoginBypass(true);
          }}
        >
          ورود با رمز ثابت
        </button>
      </div>
      {loginByPass ? (
        <div className=" relative w-full justify-center flex items-center">
          <h2 className="absolute bg-white px-2 right-8 -top-3">کد ملی</h2>
          <input
            dir="ltr"
            value={nationalCode}
            onChange={(e) => setNationalCode(e.target.value)}
            className=" px-3 border-2 border-black rounded h-[48px] w-11/12"
          />
        </div>
      ) : (
        <div className=" relative w-full justify-center flex items-center">
          <h2 className="absolute bg-white px-2 right-8 -top-3">شماره همراه</h2>
          <input
            inputMode="numeric"
            ref={inputRef}
            dir="ltr"
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
            className=" px-3 border-2 border-black rounded h-[48px] w-11/12"
          />
        </div>
      )}

      {loginByPass && (
        <div className=" relative w-full justify-center flex items-center">
          <h2 className=" absolute bg-white px-2 right-8 -top-3">رمز عبور</h2>
          <input
            dir="ltr"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" px-3 border-2 border-black rounded h-[48px] w-11/12"
          />
        </div>
      )}
      <div className=" flex w-full justify-center items-center">
        <button
          onKeyDown={(e) => e.stopPropagation()}
          ref={buttRef}
          onClick={handleSubmit}
          disabled={
            loginByPass ? !nationalCode || !password : phoneNum.length < 11
          }
          className=" text-xl w-11/12 h-[48px] rounded bg-[#005DAD] text-white disabled:bg-[#EDEDED] disabled:text-[#CBCBCB]"
        >
          {isLoading ? <SyncLoader color="white" size={10} /> : "ادامه"}
        </button>
      </div>
      <h2 className=" w-full flex justify-center items-center text-[12px] gap-1">
        ورود و عضویت در دکتر رزرو به منزله قبول
        <span className=" cursor-pointer text-[#005DAD]">قوانین و مقررات</span>
        است.
      </h2>
      {loginByPass && (
        <h5 className=" text-xs gap-1 flex w-full justify-center items-center">
          حساب کاربری ندارید؟
          <button
            onClick={() => {
              setIsPhoneNumModal(false);
              setIsSignupModal(true);
            }}
            className="text-[#005DAD]"
          >
            ثبت نام کنید
          </button>
        </h5>
      )}
    </div>
  );
}

export default PhoneNumModal;
