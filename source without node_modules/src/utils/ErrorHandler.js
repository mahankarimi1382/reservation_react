import { Eror } from "../components/ToastAlerts";

export const ErrorHandler = (err) => {
  if (err == "empty value") {
    Eror("لطفا اطلاعات را کامل وارد کنید");
  }

  console.log(err);
};
