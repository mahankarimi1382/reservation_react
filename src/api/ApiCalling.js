import { Eror, success } from "../components/ToastAlerts";
import { axiosConfig } from "./axiosConfig";
import axios from "axios";
import Cookies from "js-cookie";

export const signup = (setIsLoading, data, setIsValidateModal) => {
  setIsLoading(true);
  console.log(data);
  axiosConfig
    .post("Authentication/sign-up", data)
    .then((res) => {
      console.log(res);
      if (data.phoneNumber == "string") {
        success(`کد تایید به شماره ی ${data.userName} پیامک شد`);
      } else {
        success(`کد تایید به شماره ی ${data.phoneNumber} پیامک شد`);
      }
      setIsValidateModal(true);
      setIsLoading(false);
    })
    .catch((err) => {
      setIsLoading(false);
      console.log(err);
    });
};
export const signin = (
  setIsLoading,
  data2,
  setFullName,
  setToken,
  closeModal,
  setSmeId,
  setDoctors,
  setDoctorId
) => {
  console.log(data2);
  setIsLoading(true);
  axiosConfig
    .put("Authentication/sign-in", data2)
    .then((res) => {
      setIsLoading(false);
      console.log(res);
      console.log(res.data);
      const result = res?.data?.result ?? {};
      let token = result.token;
      let name = result.userFullname;
      let smeId = result.smeprofileId;
      setSmeId(smeId);
      setToken(token);
      Cookies.set("token", token);
      setFullName(name);

      // پزشکان ممکن است مستقیم یا زیر smeprofile بیایند
      const doctorsList = result.smeprofile?.doctors ?? result.doctors ?? [];
      setDoctors && setDoctors(doctorsList);

      // آیدی پزشک را هم ست می‌کنیم تا پنل پزشک (ثبت مطب و ...) کار کند
      if (setDoctorId && Array.isArray(doctorsList) && doctorsList.length > 0) {
        setDoctorId(doctorsList[0].id);
      }

      console.log(doctorsList);
      success(`${name} خوش آمدید`);
      closeModal();
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
    });
};
export const activating_registarion = (
  setDoctorId,
  setDoctors,
  code,
  phoneNumber,
  setIsWrongCode,
  setIsLoading,
  closeModal,
  setToken,
  setFullName,
  setSmeId,
  setPatients
) => {
  console.log("first")
  setIsLoading(true);
  axiosConfig
    .post(`Authentication/activating-registration`, {
      metadata: {
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userName: "string",
      },
      mobile: phoneNumber,
      activationCode: code,
    })
    .then((res) => {
      console.log(res);
            if (res.data.result.smeprofileId) {
        setSmeId(res.data.result.smeprofileId);
      }
      console.log(res.data.result.token);
      setToken(res.data.result.token);
      Cookies.set("token", res.data.result.token);
      if (res.data.result.patients) {
        setPatients(res.data.result.patients);
      }
      success("ورود موفق");

      closeModal();
      setFullName(res.data.result.userFullname);

      // ممکن است کاربر اصلا پزشک نباشد یا لیست خالی باشد → نباید کرش کند
      const doctorsList =
        res.data.result.smeprofile?.doctors ?? res.data.result.doctors ?? [];
      console.log(doctorsList);
      setDoctors(doctorsList);
      if (Array.isArray(doctorsList) && doctorsList.length > 0) {
        setDoctorId(doctorsList[0].id);
      }
      if (res.data.result.smeprofileId) {
        setSmeId(res.data.result.smeprofileId);
      }

      if (res.data.result.userFullname != "string") {
        let name = res.data.result.userFullname;
        setSmeId(create_sme_profile(name, token));
      }
    })
    .catch((err) => {
      setIsLoading(false);
      setIsWrongCode(true);
    });
};

export const add_specialties = (data, setIsLoading, setIsAddSpecialModal) => {
  setIsLoading(true);
  console.log(data);
  axiosConfig
    .post("Specialist/create-specialist", data)
    .then((res) => {
      setIsLoading(false);
      console.log(res);
      success("تخصص با موفقیت ثبت شد");
      setIsAddSpecialModal(false);
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
    });
};

export const get_specialties = async (url) => {
  try {
    const response = await axiosConfig.get(url);
    const specialties = response.data.result.list;
    console.log(specialties);

    return specialties;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const delete_specialties = async (
  id,
  setList,
  closeModal,
  setIsLoading,
  specialist
) => {
  console.log(id);
  try {
    const response = await axiosConfig.delete("Specialist/delete-specialist", {
      data: {
        metadata: {
          userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          userName: "0200013076",
        },
        id: id,
      },
    });
    const newList = specialist.filter((item) => item.id != id);
    setList(newList);
    setIsLoading(false);
    success("تخصص با موفقیت حذف شد");
    closeModal();
    console.log(response);
  } catch (error) {
    console.log(error);
    setIsLoading(false);
  }
};
export const get_province = async () => {
  try {
    const response = await axiosConfig.get("Province/read-province");
    const provinces = response.data.result.list;
    console.log(provinces);
    return provinces;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const read_city = (id, setCities) => {
  axiosConfig
    .post("City/read-city", {
      metadata: {
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userName: "string",
      },
      provinceId: id,
    })
    .then((res) => {
      console.log(res);
      setCities(res.data.result.list);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const add_doctor = async (data, setIsLoading, setIsAddDoctorModal) => {
  console.log(data)
  try {
    const res = await axiosConfig.post("Doctor/create-doctor", data);
    console.log(res);
    if (res?.status === 200) {
      console.log(res);
      console.log(data);
      await axiosConfig.post("RoleManager/add-user-role", {
        metadata: {
          userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          userName: "string",
          smeProfileId: data.smeProfileId,
        },
        userName: data.mobile,
        userRoleName: "Doctor",
      });

      success("پزشک با موفقیت ثبت شد");
      setIsAddDoctorModal(false);

      // آیدی پزشک جدید را برمی‌گردانیم تا caller سشن را تازه کند
      const doctorId = extract_doctor_id(res);
      if (doctorId == null) {
        console.warn("آیدی پزشک از پاسخ create-doctor استخراج نشد", res?.data);
      }
      return doctorId;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    setIsLoading(false);
  }
};

export const add_article = (data, setLoading) => {
  console.log(data);
  axiosConfig
    .post("Article/create-articles", data)
    .then((res) => {
      setLoading(false);
      console.log(res);
      success(`مقاله با عنوان ${data.title} ثبت شد`);
    })
    .catch((err) => {
      setLoading(false);
      console.log(err);
    });
};

export const upload_file = (file, token, setFileId, setIsLoading) => {
  const formData = new FormData();
  formData.append("file", file);

  axios
    .post(
      "https://myapi.dadehavaran.com:8040/api/v1/FileManagement/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token || "",
        },
      }
    )
    .then((res) => {
      setIsLoading(false);
      console.log(res);
      setFileId(res.data.result.id);
    })
    .catch((err) => {
      setIsLoading(false);
      console.log(err);
    });
};
export const edit_specialties = (data, setIsLoading, setIsAddSpecialModal) => {
  setIsLoading(true);
  console.log(data);
  axiosConfig
    .put("Specialist/update-specialist", data)
    .then((res) => {
      setIsLoading(false);
      success("تخصص با موفقیت ویرایش شد");
      console.log(res);

      // setIsAddSpecialModal(false);
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
    });
};
export const get_doctors = async (url) => {
  try {
    const response = await axiosConfig.get(url);
    const doctors = response.data.result.list;
    console.log(doctors);
    return doctors;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const delete_doctor = async (
  id,
  setDoctors,
  closeModal,
  setIsLoading,
  doctors
) => {
  console.log(id);
  setIsLoading(true);
  try {
    const response = await axiosConfig.delete("Doctor/delete-Doctor", {
      data: {
        metadata: {
          userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          userName: "0200013076",
        },
        id: id,
      },
    });
    const url = "Doctor/read-all-doctors";
    const newList = doctors.filter((item) => item.id !== id);
    setDoctors(newList);
    closeModal();
    setIsLoading(false);
    success("پزشک با موفقیت حذف شد");
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const get_specialties_by_id = async (id) => {
  try {
    const response = await axiosConfig.get(
      `Specialist/read-specialist?SpecialistId=${id}`
    );
    const categories = response.data.result.data.categories;
    // console.log(specialist);
    return categories;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const get_doctors_by_special_id = async () => {
  try {
    const response = await axiosConfig.get(
      `Doctor/read-doctors-byspeciality?SpecialistId=1128`
    );
    const doctors = response.data.result.list;
    return doctors;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const edit_doctors = (data, setIsLoading, setIsAddDoctorModal) => {
  console.log(data);
  axiosConfig
    .put("Doctor/update-doctor", data)
    .then((res) => {
      setIsLoading(false);
      console.log(res);
      success("دکتر با موفقیت ویرایش شد");
      setIsAddDoctorModal(false);
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
    });
};
export const add_patient = (data, setIsLoading, setIsAddPatient) => {
  console.log(data);
  axiosConfig
    .post("Patient/create-patient", data)
    .then((res) => {
      console.log(res);
      setIsLoading(false);
      setIsAddPatient(false);
      success("بیمار با موفقیت ثبت شد");
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
    });
};

export const get_patients = async (url) => {
  try {
    const response = await axiosConfig.get(url);
    const patients = response.data.result.list;
    console.log(patients);
    return patients;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const delete_patient = async (id, setPatients) => {
  console.log(id);
  try {
    const response = await axiosConfig.delete("Patient/delete-patient", {
      data: {
        metadata: {
          userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          userName: "0200013076",
        },
        id: id,
      },
    });
    const url = "Patient/read-all-patients";

    const data = await get_patients(url);
    if (data) {
      setPatients(data);
    }
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
export const create_ads = (data, setLoading) => {
  console.log(data);
  axiosConfig
    .post("Ads/create-ads", data)
    .then((res) => {
      setLoading(false);
      console.log(res);
      success("بنر با موفقیت ثبت شد");
    })
    .catch((err) => {
      setLoading(false);
      console.log(err);
    });
};
export const add_medical_center = (data, setLoading, closeModal) => {
  console.log(data);
  axiosConfig
    .post("Clinic/create-Clinic", data)
    .then((res) => {
      setLoading(false);
      console.log(res);
      success("مرکز درمانی با موفقیت ثبت شد");
      closeModal();
    })
    .catch((err) => {
      setLoading(false);
      console.log(err);
    });
};
// استخراج آیدی مطب از پاسخ سرور (ساختار پاسخ در اندپوینت‌ها یکسان نیست)
export const extract_office_id = (res) =>
  res?.data?.result?.office?.id ??
  res?.data?.result?.data?.id ??
  res?.data?.result?.id ??
  res?.data?.id ??
  null;

// استخراج آیدی پزشک از پاسخ create-doctor (ساختار پاسخ ثابت نیست)
export const extract_doctor_id = (res) =>
  res?.data?.result?.doctor?.id ??
  res?.data?.result?.data?.id ??
  res?.data?.result?.id ??
  res?.data?.id ??
  null;

export const add_Office = (data, setLoading, closeModal) => {
  console.log(data);
  return axiosConfig
    .post("Office/create-Office", data)
    .then((res) => {
      setLoading && setLoading(false);
      console.log(res);
      success("مطب با موفقیت ثبت شد");
      closeModal && closeModal(res); // ← res را پاس می‌دهیم
      return res;
    })
    .catch((err) => {
      setLoading && setLoading(false);
      console.log(err);
      return null;
    });
};
export const sendCodeAgain = (phoneNumber) => {
  axiosConfig
    .post("Authentication/generate-registration-code", {
      metadata: {
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userName: "string",
        smeProfileId: 0,
      },
      mobile: phoneNumber,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const get_ads = async (url) => {
  try {
    const response = await axiosConfig.get(url);
    const banners = response.data.result.list;
    console.log(banners);
    return banners;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const delete_ads = async (id, setBanners, closeModal) => {
  console.log(id);
  try {
    const response = await axiosConfig.delete("Ads/delete-ads", {
      data: {
        metadata: {
          userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          userName: "string",
        },
        id: id,
      },
    });
    const url = "Ads/read-smeprofile-ads?SmeProfileId=6";

    const data = await get_ads(url);
    if (data) {
      setBanners(data);
    }
    closeModal();
    console.log(response);
    success("بنر با موفقیت حذف شد");
  } catch (error) {
    console.log(error);
  }
};

export const read_files = async (url) => {
  try {
    const response = await axiosConfig.get(url);
    const file = response.data;
    console.log(file);
    return file;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const search_doctors = async (data) => {
  console.log(data);
  try {
    const response = await axiosConfig.get(
      `Doctor/search-doctors?DoctorName=${data.name}&pagesize=${data.pagesize}&pageNumber=${data.currentPage}&specialistIds=${data.specialistId}&ProvinceId=${data.provinceId}&CityId=${data.cityId}&BimehTakmili=${data.BimehTakmili}&BimeAsli=${data.BimeAsli}&JustOnline=${data.JustOnline}&HasTurn=${data.HasTurn}&AcceptInsurance=${data.AcceptInsurance}&Gender=${data.Gender}&Sdate=${data.Sdate}&Edate=${data.Edate}&OnlineTypeId=${data.OnlineTypeId}&OfficeOrClinicHozoori=${data.OfficeOrClinicHozoori}`
    );
    const doctors = response.data.result;
    console.log(doctors);
    return doctors;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const get_clinics = async () => {
  try {
    const response = await axiosConfig.get("Clinic/read-Clinics");
    const data = response;
    console.log(data);
    return data.data.result.list;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const get_offices = async () => {
  try {
    const response = await axiosConfig.get("Office/read-Offices");
    const data = response;
    console.log(data);
    return data.data.result.list;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const search_doctors_list = async (
  name = "",
  currentPage,
  specialistId
) => {
  console.log("name" + name);
  try {
    const response = await axiosConfig.get(
      `Doctor/search-list-doctors?DoctorName=${name}&pagesize=10&pageNumber=${currentPage}&specialist=${specialistId}`
    );
    const doctors = response.data.result;
    console.log(doctors);
    return doctors;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const get_doctor_treatmentCenter = async (id) => {
  try {
    const response = await axiosConfig.get(
      `DoctorTreatmentCenter/read-DoctorTreatmentCenterByDoctorId?Id=${id}`
    );
    const treatmentCenter = response.data.result.list;
    console.log(treatmentCenter);
    return treatmentCenter;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};

// پزشکانِ تخصیص‌داده‌شده به یک مرکز (مطب/مرکز درمانی) را برمی‌گرداند.
// بک‌اند اندپوینت مستند مشخصی برای این کار ندارد، پس چند مسیر محتمل را با
// { silent: true } امتحان می‌کنیم و در نهایت روی خواندن همه‌ی تخصیص‌ها و
// فیلتر سمت کلاینت fallback می‌کنیم.
export const read_DoctorTreatmentCenterByCenter = async (centerId, type) => {
  const isOffice = type === "office";

  const candidates = isOffice
    ? [
        `DoctorTreatmentCenter/read-DoctorTreatmentCenterByOfficeId?Id=${centerId}`,
        `DoctorTreatmentCenter/read-DoctorTreatmentCenterByOfficeId?OfficeId=${centerId}`,
      ]
    : [
        `DoctorTreatmentCenter/read-DoctorTreatmentCenterByClinicId?Id=${centerId}`,
        `DoctorTreatmentCenter/read-DoctorTreatmentCenterByClinicId?ClinicId=${centerId}`,
      ];

  const pickList = (result) => {
    if (Array.isArray(result)) return result;
    if (result && Array.isArray(result.list)) return result.list;
    if (result && Array.isArray(result.data)) return result.data;
    return null;
  };

  for (const url of candidates) {
    try {
      const response = await axiosConfig.get(url, { silent: true });
      const list = pickList(response?.data?.result);
      if (Array.isArray(list)) return list;
    } catch (error) {
      console.log(
        `[read_DoctorTreatmentCenterByCenter] مسیر یافت نشد: ${url}`,
        error?.message
      );
    }
  }

  // fallback: خواندن همه‌ی تخصیص‌ها و فیلتر سمت کلاینت
  try {
    const response = await axiosConfig.get(
      "DoctorTreatmentCenter/read-DoctorTreatmentCenters",
      { silent: true }
    );
    const list = pickList(response?.data?.result);
    if (Array.isArray(list)) {
      return list.filter((item) =>
        isOffice
          ? String(item?.officeId) === String(centerId)
          : String(item?.clinicId) === String(centerId)
      );
    }
  } catch (error) {
    console.log(
      "[read_DoctorTreatmentCenterByCenter] خواندن همه‌ی تخصیص‌ها ناموفق بود",
      error?.message
    );
  }

  return [];
};
export const create_doctor_treatment = (
  data,
  setIsLoading,
  closeModal,
  message
) => {
  // metadata همیشه باید همراه پیلود ارسال شود
  const payload = {
    metadata: data?.metadata ?? {
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userName: "string",
      smeProfileId: 0,
    },
    ...data,
  };

  return axiosConfig
    .post("/DoctorTreatmentCenter/create-DoctorTreatmentCenter", payload)
    .then((res) => {
      setIsLoading && setIsLoading(false);
      console.log(res);
      success(message);
      closeModal && closeModal(res);
      return res;
    })
    .catch((err) => {
      setIsLoading && setIsLoading(false);
      console.log(err);
      return null;
    });
};

export const delete_office = async (id, setMedicalCenters, closeModal) => {
  try {
    const response = await axiosConfig.delete("Office/delete-Office", {
      data: {
        metadata: {
          userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          userName: "string",
          smeProfileId: 0,
        },
        id,
      },
    });

    const data = await get_offices();
    if (data) {
      setMedicalCenters(data);
    }
    closeModal();
    console.log(response);
    success("مطب با موفقیت حذف شد");
  } catch (error) {
    console.log(error);
  }
};
export const delete_clinic = async (
  id,
  setMedicalCenters,
  closeModal,
  setIsLoading
) => {
  setIsLoading(true);
  try {
    const response = await axiosConfig.delete("Clinic/delete-Clinic", {
      data: {
        metadata: {
          userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          userName: "string",
          smeProfileId: 0,
        },
        id,
      },
    });

    const data = await get_clinics();
    if (data) {
      setMedicalCenters(data);
    }
    closeModal();
    console.log(response);
    setIsLoading(false);
    success("مرکز درمانی با موفقیت حذف شد");
  } catch (error) {
    console.log(error);
  }
};



export const read_office_type = async () => {
  try {
    const response = await axiosConfig.get("OfficeType/read-OfficeTypes");
    const data = response.data.result.list;
    console.log("OfficeType", data);
    return data;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};

export const create_Reservation = (data, setIsLoading, closeModal) => {
  console.log(data);
  axiosConfig
    .post("/Reservation/create-reservation", data)
    .then((res) => {
      console.log(res);
      success("نوبت با موفقیت ثبت شد");
      setIsLoading(false);
      closeModal();
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
    });
};
export const get_doctor_profile_by_id = async (id) => {
  console.log(id);
  try {
    const response = await axiosConfig.get(`Doctor/read-doctor-byid?Id=${id}`);
    const doctorProfile = response.data.result.data;
    console.log(doctorProfile);
    return doctorProfile;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const get_doctor_reservation = async (id) => {
  console.log(id);
  try {
    const response = await axiosConfig.get(
      `Reservation/read-doctor-reservation?DoctorId=${id}`
    );
    const reservation = response.data.result.data;
    console.log(reservation);
    return reservation;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};

export const add_patient_by_user = (
  closeModal,
  data,
  setIsLoading,
  setSteps,
  setPatientId,
  setPatients,
  patients
) => {
  console.log(data);
  axiosConfig
    .post("Patient/create-patient", data)
    .then((res) => {
      success("اطلاعات ثبت شد");
      closeModal();
      console.log(res);
      setPatients && setPatients([...patients, res.data.result.patient]);
      console.log(res.data.result.patient.id);
      setPatientId(res.data.result.patient.id);
      setIsLoading(false);
      {
        setSteps && setSteps(2);
      }
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
    });
};
export const patinet_reservation = (data, setIsLoading, router) => {
  console.log(data);
  axiosConfig
    .post("PatientReservation/create-patientreservation", data)
    .then((res) => {
      console.log(res);
      setIsLoading(false);
      success("نوبت شما با موفقیت رزرو شد");
      router.push("/");
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
    });
};
export const get_doctor_treatment_reservation = async (
  doctorId,
  treatmentId
) => {
  console.log(doctorId, treatmentId);
  try {
    const response = await axiosConfig.get(
      `Reservation/read-doctor-treatmentcenter-reservation?DoctorId=${doctorId}&TreatmentCenterId=${treatmentId}`
    );
    const reservation = response.data.result.data;
    console.log(reservation);
    return reservation;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const get_doctor_treatmentCenter_hozoori = async (id) => {
  try {
    const response = await axiosConfig.get(
      `DoctorTreatmentCenter/read-DoctorTreatmentCenterByDoctorIdHozoori?Id=${id}`
    );
    const treatmentCenter = response.data.result.list;
    console.log(treatmentCenter);
    return treatmentCenter;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const get_doctor_treatmentCenter_online = async (id) => {
  try {
    const response = await axiosConfig.get(
      `DoctorTreatmentCenter/read-DoctorTreatmentCenterByDoctorIdOnline?Id=${id}`
    );
    const treatmentCenter = response.data.result.list;
    console.log(treatmentCenter);
    return treatmentCenter;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};

export const get_all_users = async () => {
  try {
    const response = await axiosConfig.get(`UserProfile/read-all-userprofiles`);
    const users = response.data.result.list;
    console.log(users);
    return users;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};

export const get_user_role_by_username = async (userName = "") => {
  try {
    const response = await axiosConfig.get(
      `UserManager/read-user-role?UserName=${userName}`
    );
    const userRoles = response.data.result.list;
    console.log(userRoles);
    return userRoles;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};

export const get_roles = async () => {
  try {
    const response = await axiosConfig.get(`RoleManager/read-roles`);
    const Roles = response.data.result.list;
    console.log(Roles);
    return Roles;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const add_role_to_user = (data, setIsLoading, closeModal) => {
  axiosConfig
    .post("UserManager/add-role-to-user", data)
    .then(() => {
      success("دسترسی با موفقیت داده شد");
      setIsLoading(false);
      closeModal();
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
    });
};

export const get_4first_doctor_turns = async () => {
  try {
    const response = await axiosConfig.get(
      `Doctor/readfirstfreeturns?DoctorId=1239`
    );
    const turns = response.data.result.list;
    console.log(turns);
    return turns;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};

export const read_all_insirances = async () => {
  try {
    const response = await axiosConfig.get(`Insurance/read-all-insurances`);
    return response?.data?.result?.list ?? [];
  } catch (error) {
    console.error("Error fetching insurances:", error);
    return [];
  }
};

export const create_insurance = async ({ name, insuranceTypeId, metadata }) => {
  try {
    const body = {
      metadata: metadata ?? {
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userName: "string",
        smeProfileId: 0,
      },
      insuranceTypeId,
      name,
    };

    const response = await axiosConfig.post(
      `Insurance/create-insurances`,
      body
    );
    return response.data;
  } catch (error) {
    console.error("Error creating insurance:", error);
    return null;
  }
};
export const read_firsPage_doctors = async () => {
  console.log("first");
  try {
    const response = await axiosConfig.get(
      `Reservation/read-doctor-resevationtop4firstpage`
    );
    const doctors = response.data.result.data;
    console.log(doctors);
    return doctors;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const follow_doctor_profile = (data, setIsLoading) => {
  axiosConfig
    .post("FollowProfile/create-FollowProfile", data)
    .then(() => {
      success("پزشک به علاقه مندی ها اضافه شد");
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
    });
};
export const read_followed_profile = async (smeId) => {
  console.log("first");
  try {
    const response = await axiosConfig.get(
      `FollowProfile/read-FollowProfile?Id=${smeId}`
    );
    const followedList = response.data.result.list;
    console.log(followedList);
    return followedList;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const get_first_page_specialties = async () => {
  try {
    const response = await axiosConfig.get(
      "Specialist/read-specialists-firstpage"
    );
    const specialties = response.data.result.list;
    return specialties;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};

export const get_all_turns = async () => {
  try {
    const response = await axiosConfig.get(
      "PatientReservation/read-all-patientreservations"
    );
    const turns = response.data.result.list;
    return turns;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const edit_clinic = (data, setLoading, closeModal) => {
  setLoading(true);
  console.log(data);
  axiosConfig
    .put("Clinic/update-Clinic", data)
    .then((res) => {
      setLoading(false);
      console.log(res);
      success("مرکز درمانی با موفقیت ویرایش شد");
      closeModal();
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
};
export const edit_office = (data, setLoading, closeModal) => {
  console.log(data);
  axiosConfig
    .put("Office/update-Office", data)
    .then((res) => {
      success("مطب با موفقیت ویرایش شد");
      setLoading(false);
      console.log(res);
      closeModal();
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
};
export const create_role = (data, setIsLoading, closeModal) => {
  axiosConfig
    .post("RoleManager/create-role", data)
    .then(() => {
      success("نقش با موفقیت ثبت شد");
      setIsLoading(false);
      closeModal();
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
    });
};

export const create_reservation_date_to_date = (
  data,
  setIsLoading,
  closeModal
) => {
  console.log(data);
  axiosConfig
    .post("/Reservation/create-reservationfromdatetodate", data)
    .then((res) => {
      console.log(res);
      success("نوبت با موفقیت ثبت شد");
      setIsLoading(false);
      closeModal();
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
    });
};
export const delete_reservation_day = async (
  id,
  seList,
  closeModal,
  setIsLoading,
  list
) => {
  console.log(id);
  try {
    const response = await axiosConfig.delete(
      "Reservation/delete-reservation",
      {
        data: {
          metadata: {
            userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            userName: "string",
            smeProfileId: 0,
          },
          id,
        },
      }
    );

    closeModal();
    setIsLoading(false);
    console.log(response);
    success("نوبت دکتر با موفقیت حذف شد");
  } catch (error) {
    console.log(error);
  }
};
export const create_Specialties_category = (data, setIsLoading, closeModal) => {
  console.log(data);
  axiosConfig
    .post("/Specialist/create-category", data)
    .then((res) => {
      console.log(res);
      success("دسته بندی با موفقیت ثبت شد");
      setIsLoading(false);
      closeModal();
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
    });
};

export const get_specialties_category = async () => {
  try {
    const response = await axiosConfig.get("Specialist/read-categorys");
    const categorys = response.data.result.list;
    return categorys;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const get_Category_by_specialties = async (id = "") => {
  console.log(id);
  try {
    const response = await axiosConfig.get(`Specialist/read-category?Id=${id}`);

    const categorys = response.data.result.list;
    console.log(categorys);
    return categorys;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const add_specialist_to_category = (data, setIsLoading, closeModal) => {
  console.log(data);
  axiosConfig
    .post("Specialist/add-specialist-to-category", data)
    .then(() => {
      success("دسته بندی با موفقیت تخصیص داده شد");
      setIsLoading(false);
      closeModal();
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
    });
};

export const edit_category = (data, setLoading, closeModal) => {
  console.log(data);
  axiosConfig
    .put("Specialist/update-category", data)
    .then((res) => {
      success("دسته بندی با موفقیت ویرایش شد");
      setLoading(false);
      console.log(res);
      closeModal();
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
};

export const delete_category = async (
  id,
  setList,
  closeModal,
  setIsLoading,
  list
) => {
  if (!id) {
    Eror("شناسه دسته‌بندی نامعتبر است");
    return;
  }

  setIsLoading(true);

  try {
    const response = await axiosConfig.delete("Specialist/delete-category", {
      data: {
        metadata: {
          userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          userName: "string",
          smeProfileId: 0,
        },
        id: id, // ← اینجا اصلاح شد (مهم‌ترین قسمت)
      },
    });

    // به‌روزرسانی لیست محلی
    const newList = list.filter((item) => item.id !== id);
    setList(newList);

    success("دسته‌بندی با موفقیت حذف شد");
    closeModal();
  } catch (error) {
    console.error("Delete Category Error:", error);
    Eror(error?.response?.data?.message || "خطا در حذف دسته‌بندی");
  } finally {
    setIsLoading(false);
  }
};
export const remove_specialist_from_category = (
  data,
  setList,
  closeModal,
  setIsLoading,
  list
) => {
  console.log(data);
  axiosConfig
    .post("Specialist/remove-specialist-from-category", data)
    .then(() => {
      success("دسته بندی  از تخصص حذف شد شد");
      setIsLoading(false);
      const newList = list.filter((item) => item.id !== data.categoryId);
      setList(newList);
      closeModal();
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
    });
};
export const search_DoctorTreatmentCenters = async (data) => {
  console.log(data);
  try {
    const response = await axiosConfig.get(
      `DoctorTreatmentCenter/search-DoctorTreatmentCenters?DoctorTreatmentCenterName=${data.name}&pagesize=${data.pagesize}&pageNumber=${data.currentPage}&specialistIds=${data.specialistId}&ProvinceId=${data.provinceId}&CityId=${data.cityId}&BimehTakmili=${data.BimehTakmili}&BimeAsli=${data.BimeAsli}&JustOnline=${data.JustOnline}&HasTurn=${data.HasTurn}&AcceptInsurance=${data.AcceptInsurance}&Gender=${data.Gender}&Sdate=${data.Sdate}&Edate=${data.Edate}&OnlineTypeId=${data.OnlineTypeId}&OfficeOrClinicHozoori=${data.OfficeOrClinicHozoori}`
    );
    const doctors = response.data.result;
    console.log(doctors);
    return doctors;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const searchall = async (
  data,
  setSuggestions,
  setIsSearchLoading,
  setDoctors,
  setMedicals,
  setSpecialist,
  signal = null // اضافه کردن signal برای cancel کردن درخواست
) => {
  console.log("Searching for:", data);

  // اگر جستجو خالی است، نتایج را پاک کن
  if (!data || !data.trim()) {
    setSuggestions([]);
    setDoctors([]);
    setMedicals([]);
    setSpecialist([]);
    setIsSearchLoading(false);
    return null;
  }

  try {
    setIsSearchLoading(true);

    // اضافه کردن signal به axios config
    const config = {
      signal: signal, // برای cancel کردن درخواست
    };

    const response = await axiosConfig.get(
      `MainSearch/searchall?term=${encodeURIComponent(data)}`,
      config
    );

    // بررسی اینکه آیا درخواست cancel شده یا نه
    if (signal && signal.aborted) {
      return null;
    }

    const result = response.data.result;
    console.log("Search result:", result);

    // پردازش suggestions
    let suggestions = result.suggest || "";
    let arr = suggestions.split(",").filter((item) => item.trim());

    // بروزرسانی state ها فقط اگر درخواست cancel نشده باشد
    if (!signal || !signal.aborted) {
      setSuggestions(arr.slice(-6));
      setDoctors(result.doctors || []);
      setMedicals(result.treatMentcenters || []);
      setSpecialist(result.specialists || []);
      setIsSearchLoading(false);
    }

    return result;
  } catch (error) {
    // اگر خطا به دلیل cancel کردن درخواست است، آن را نادیده بگیر
    if (error.name === "AbortError" || error.code === "ERR_CANCELED") {
      console.log("Request cancelled");
      return null;
    }

    console.error("Error fetching search results:", error);

    // بروزرسانی state ها فقط اگر درخواست cancel نشده باشد
    if (!signal || !signal.aborted) {
      setIsSearchLoading(false);
      // در صورت خطا، نتایج را پاک کن
      setSuggestions([]);
      setDoctors([]);
      setMedicals([]);
      setSpecialist([]);
    }

    return null;
  }
};
export const read_DoctorTreatmentCenterByNameSSR = async (name) => {
  console.log(name);
  try {
    const response = await axiosConfig.get(
      `https://myapi.dadehavaran.com:8040/api/v1/DoctorTreatmentCenter/read-DoctorTreatmentCenterByNameSSR?SSRName=${name}`
    );
    const medical = response.data.result;
    console.log(medical);
    return medical;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const Read_DoctorTreatmentCenters4FirstPage = async () => {
  try {
    const response = await axiosConfig.get(
      `https://myapi.dadehavaran.com:8040/api/v1/DoctorTreatmentCenter/Read-DoctorTreatmentCenters4FirstPage`
    );
    const list = response.data.result;
    console.log(list);
    return list;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const Read_DoctorOffice4FirstPage = async () => {
  try {
    const response = await axiosConfig.get(
      `https://myapi.dadehavaran.com:8040/api/v1/DoctorTreatmentCenter/Read-DoctorOffice4FirstPage`
    );
    const list = response.data.result;
    console.log(list);
    return list;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const create_Comment = (
  data,
  setIsNazarModal,
  setIsSuccessModal,
  setIsLoading
) => {
  console.log(data, setIsNazarModal);
  axiosConfig
    .post("Comment/create-Comment", data)
    .then((res) => {
      console.log(res);
      setIsLoading(false);
      setIsNazarModal(false);
      setIsSuccessModal(true);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const Read_ClinicTypes = async () => {
  try {
    const response = await axiosConfig.get(
      `https://myapi.dadehavaran.com:8040/api/v1/ClinicType/read-ClinicTypes`
    );
    const list = response.data.result.list;
    console.log(list);
    return list;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const Read_OfficeType = async () => {
  try {
    const response = await axiosConfig.get(
      `https://myapi.dadehavaran.com:8040/api/v1/OfficeType/read-OfficeTypes`
    );
    const list = response.data.result.list;
    console.log(list);
    return list;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const read_doctor_Comment = async (id) => {
  console.log(id);
  try {
    const response = await axiosConfig.get(
      `https://myapi.dadehavaran.com:8040/api/v1/Comment/read-doctor-Comment?DoctorId=${id}`
    );
    const list = response.data.result.list;
    console.log(list);
    return list;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const read_DoctorByNameSSR = async (name) => {
  console.log(name);
  try {
    const response = await axiosConfig.get(
      `https://myapi.dadehavaran.com:8040/api/v1/Doctor/read-DoctorByNameSSR?SSRName=${name}`
    );
    const doctor = response.data.result;
    console.log(doctor.data);
    return doctor;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};
export const read_DoctorComents = async (id) => {
  console.log(id);
  try {
    const response = await axiosConfig.get(
      `https://myapi.dadehavaran.com:8040/api/v1/Comment/read-doctor-Comment?DoctorId=${id}`
    );
    const res = response.data.result;
    console.log(res);
    return res;
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return null;
  }
};

export const create_doctor_insurance = async (data) => {
  try {
    const payload = {
      ...data,
      metadata: {
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userName: "string",
        smeProfileId: 0,
      },
    };

    console.log("DoctorInsurance payload:", payload);

    const response = await axiosConfig.post(
      "DoctorInsurance/create-DoctorInsurance",
      payload
    );

    return response.data;
  } catch (error) {
    console.error("Error creating doctor insurance:", error);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Backend error data:", error.response.data);
    }

    return null;
  }
};

export const read_doctor_insurances_by_doctor_id = async (doctorId) => {
  try {
    const response = await axiosConfig.get(
      `DoctorInsurance/read-insurances-bydoctorid?DoctorId=${doctorId}`
    );
    console.log(response);
    return response.data?.result?.list || [];
  } catch (error) {
    console.error("Error fetching doctor insurances:", error);
    return [];
  }
};
export const delete_doctor_treatment = async (
  id,                 // آیدی رکورد DoctorTreatmentCenter
  doctorId,           // آیدی دکتر (برای رفرش لیست)
  setTreatmenCenters,
  closeModal
) => {
  console.log("delete id:", id);
  try {
    const response = await axiosConfig.delete(
      "DoctorTreatmentCenter/delete-DoctorTreatmentCenter",
      {
        data: {
          metadata: {
            userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            userName: "string",
            smeProfileId: 0,
          },
          id,
        },
      }
    );

    // رفرش لیست با آیدی دکتر
    const data = await get_doctor_treatmentCenter(doctorId);
    if (data) {
      setTreatmenCenters(data);
    } else {
      setTreatmenCenters([]);
    }

    closeModal && closeModal();
    console.log(response);
    success("مرکز درمانی دکتر با موفقیت حذف شد");
    return response;
  } catch (error) {
    console.log(error);
    closeModal && closeModal();
    return null;
  }
};
export const update_doctor_treatment = async (
  data,
  doctorId,
  setTreatmenCenters,
  closeModal,
  message = "با موفقیت ویرایش شد"
) => {
  try {
    const payload = {
      metadata: data?.metadata ?? {
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userName: "string",
        smeProfileId: 0,
      },
      ...data,
    };

    const response = await axiosConfig.put(
      "DoctorTreatmentCenter/update-DoctorTreatmentCenter",
      payload
    );

    const list = await get_doctor_treatmentCenter(doctorId);
    if (list) {
      setTreatmenCenters(list);
    }

    closeModal && closeModal();
    success(message);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    closeModal && closeModal();
    return null;
  }
};