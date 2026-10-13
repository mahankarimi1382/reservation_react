import { Eror, success } from "../components/ToastAlerts";
import { axiosConfig } from "./axiosConfig";
import axios from "axios";
import Cookies from "js-cookie";
import logger from "../utils/logger";

export const signup = (setIsLoading, data, setIsValidateModal) => {
  setIsLoading(true);
  logger.log(data);
  axiosConfig
    .post("Authentication/sign-up", data)
    .then((res) => {
      logger.log(res);
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
      logger.error(err);
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
  logger.log(data2);
  setIsLoading(true);
  axiosConfig
    .put("Authentication/sign-in", data2)
    .then((res) => {
      setIsLoading(false);
      logger.log(res);
      logger.log(res.data);
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

      logger.log(doctorsList);
      success(`${name} خوش آمدید`);
      closeModal();
    })
    .catch((err) => {
      logger.error(err);
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
  setPatients,
  onLoginSuccess
) => {
  logger.log("first")
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
      logger.log(res);
      setIsLoading(false);
      const result = res.data.result ?? {};
      if (result.smeprofileId) {
        setSmeId(result.smeprofileId);
      }
      setToken(result.token);
      Cookies.set("token", result.token);
      if (result.patients) {
        setPatients(result.patients);
      }
      success("ورود موفق");

      closeModal();
      setFullName(result.userFullname);

      // ممکن است کاربر اصلا پزشک نباشد یا لیست خالی باشد → نباید کرش کند
      const doctorsList =
        result.smeprofile?.doctors ?? result.doctors ?? [];
      setDoctors(doctorsList);
      if (Array.isArray(doctorsList) && doctorsList.length > 0) {
        setDoctorId(doctorsList[0].id);
      }
      if (result.smeprofileId) {
        setSmeId(result.smeprofileId);
      }

      // پروفایل SmeProfile به صورت خودکار توسط بک‌اند بعد از تایید کد ساخته می‌شود
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    })
    .catch((err) => {
      setIsLoading(false);
      setIsWrongCode(true);
    });
};

export const add_specialties = (data, setIsLoading, setIsAddSpecialModal) => {
  setIsLoading(true);
  logger.log(data);
  axiosConfig
    .post("Specialist/create-specialist", data)
    .then((res) => {
      setIsLoading(false);
      logger.log(res);
      success("تخصص با موفقیت ثبت شد");
      setIsAddSpecialModal(false);
    })
    .catch((err) => {
      logger.error(err);
      setIsLoading(false);
    });
};

export const get_specialties = async (url) => {
  try {
    const response = await axiosConfig.get(url);
    const specialties = response.data.result.list;
    logger.log(specialties);

    return specialties;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
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
  logger.log(id);
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
    logger.log(response);
  } catch (error) {
    logger.error(error);
    setIsLoading(false);
  }
};
export const get_province = async () => {
  try {
    const response = await axiosConfig.get("Province/read-province");
    const provinces = response.data.result.list;
    logger.log(provinces);
    return provinces;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
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
      logger.log(res);
      setCities(res.data.result.list);
    })
    .catch((err) => {
      logger.error(err);
    });
};
export const add_doctor = async (data, setIsLoading, setIsAddDoctorModal) => {
  logger.log(data)
  try {
    const res = await axiosConfig.post("Doctor/create-doctor", data);
    logger.log(res);
    if (res?.status === 200) {
      logger.log(res);
      logger.log(data);
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
    logger.error(err);
    return null;
  } finally {
    setIsLoading(false);
  }
};

export const add_article = (data, setLoading) => {
  logger.log(data);
  axiosConfig
    .post("Article/create-articles", data)
    .then((res) => {
      setLoading(false);
      logger.log(res);
      success(`مقاله با عنوان ${data.title} ثبت شد`);
    })
    .catch((err) => {
      setLoading(false);
      logger.error(err);
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
      logger.log(res);
      setFileId(res.data.result.id);
    })
    .catch((err) => {
      setIsLoading(false);
      logger.error(err);
    });
};
export const edit_specialties = (data, setIsLoading, setIsAddSpecialModal) => {
  setIsLoading(true);
  logger.log(data);
  axiosConfig
    .put("Specialist/update-specialist", data)
    .then((res) => {
      setIsLoading(false);
      success("تخصص با موفقیت ویرایش شد");
      logger.log(res);

      // setIsAddSpecialModal(false);
    })
    .catch((err) => {
      logger.error(err);
      setIsLoading(false);
    });
};
export const get_doctors = async (url) => {
  try {
    const response = await axiosConfig.get(url);
    const doctors = response.data.result.list;
    logger.log(doctors);
    return doctors;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
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
  logger.log(id);
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
    logger.log(response);
  } catch (error) {
    logger.error(error);
  }
};

export const get_specialties_by_id = async (id) => {
  try {
    const response = await axiosConfig.get(
      `Specialist/read-specialist?SpecialistId=${id}`
    );
    const categories = response.data.result.data.categories;
    // logger.log(specialist);
    return categories;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
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
    logger.error("Error fetching specialties:", error);
    return null;
  }
};
export const edit_doctors = (data, setIsLoading, setIsAddDoctorModal) => {
  logger.log(data);
  axiosConfig
    .put("Doctor/update-doctor", data)
    .then((res) => {
      setIsLoading(false);
      logger.log(res);
      success("دکتر با موفقیت ویرایش شد");
      setIsAddDoctorModal(false);
    })
    .catch((err) => {
      logger.error(err);
      setIsLoading(false);
    });
};
export const add_patient = (data, setIsLoading, setIsAddPatient) => {
  logger.log(data);
  axiosConfig
    .post("Patient/create-patient", data)
    .then((res) => {
      logger.log(res);
      setIsLoading(false);
      setIsAddPatient(false);
      success("بیمار با موفقیت ثبت شد");
    })
    .catch((err) => {
      logger.error(err);
      setIsLoading(false);
    });
};

export const get_patients = async (url) => {
  try {
    const response = await axiosConfig.get(url);
    const patients = response.data.result.list;
    logger.log(patients);
    return patients;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
    return null;
  }
};
export const delete_patient = async (id, setPatients) => {
  logger.log(id);
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
    logger.log(response);
  } catch (error) {
    logger.error(error);
  }
};
export const create_ads = (data, setLoading) => {
  logger.log(data);
  axiosConfig
    .post("Ads/create-ads", data)
    .then((res) => {
      setLoading(false);
      logger.log(res);
      success("بنر با موفقیت ثبت شد");
    })
    .catch((err) => {
      setLoading(false);
      logger.error(err);
    });
};
export const add_medical_center = (data, setLoading, closeModal) => {
  logger.log(data);
  axiosConfig
    .post("Clinic/create-Clinic", data)
    .then((res) => {
      setLoading(false);
      logger.log(res);
      success("مرکز درمانی با موفقیت ثبت شد");
      closeModal();
    })
    .catch((err) => {
      setLoading(false);
      logger.error(err);
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
  logger.log(data);
  return axiosConfig
    .post("Office/create-Office", data)
    .then((res) => {
      setLoading && setLoading(false);
      logger.log(res);
      success("مطب با موفقیت ثبت شد");
      closeModal && closeModal(res); // ← res را پاس می‌دهیم
      return res;
    })
    .catch((err) => {
      setLoading && setLoading(false);
      logger.error(err);
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
      logger.log(res);
    })
    .catch((err) => {
      logger.error(err);
    });
};
export const get_ads = async (url) => {
  try {
    const response = await axiosConfig.get(url);
    const banners = response.data.result.list;
    logger.log(banners);
    return banners;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
    return null;
  }
};
export const delete_ads = async (id, setBanners, closeModal, setIsLoading, list) => {
  logger.log(id);
  try {
    const response = await axiosConfig.delete("Ads/delete-ads", {
      data: {
        metadata: {
          userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          userName: "string",
        },
        id,
      },
    });
    // به‌جای رفرش با SmeProfileId هاردکد، همان لیست فعلی فیلتر می‌شود
    if (setBanners && list) {
      setBanners(list.filter((item) => item.id !== id));
    }
    closeModal && closeModal();
    setIsLoading && setIsLoading(false);
    logger.log(response);
    success("بنر با موفقیت حذف شد");
  } catch (error) {
    logger.error(error);
    setIsLoading && setIsLoading(false);
  }
};

export const read_files = async (url) => {
  try {
    const response = await axiosConfig.get(url);
    const file = response.data;
    logger.log(file);
    return file;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
    return null;
  }
};
export const search_doctors = async (data) => {
  logger.log(data);

  // پارامترهای خالی ارسال نمی‌شوند؛ بایندر ASP.NET مقدار رشته‌ی خالی
  // برای فیلدهای bool/int/date را 400 می‌کند
  const buildUrl = (endpoint, nameKey, params) => {
    const search = new URLSearchParams();
    const append = (key, value) => {
      if (value !== undefined && value !== null && String(value).trim() !== "") {
        search.append(key, value);
      }
    };
    append(nameKey, data.name);
    append("pagesize", data.pagesize ?? 10);
    append("pageNumber", data.currentPage ?? 1);
    Object.entries(params).forEach(([key, value]) => append(key, value));
    return `${endpoint}?${search.toString()}`;
  };

  const advancedFilters = {
    ProvinceId: data.provinceId,
    CityId: data.cityId,
    BimehTakmili: data.BimehTakmili,
    BimeAsli: data.BimeAsli,
    JustOnline: data.JustOnline,
    HasTurn: data.HasTurn,
    AcceptInsurance: data.AcceptInsurance,
    Gender: data.Gender,
    Sdate: data.Sdate,
    Edate: data.Edate,
    OnlineTypeId: data.OnlineTypeId,
    OfficeOrClinicHozoori: data.OfficeOrClinicHozoori,
  };
  const hasAdvancedFilters = Object.values(advancedFilters).some(
    (v) => v !== undefined && v !== null && String(v).trim() !== ""
  );

  // وقتی فیلتر پیشرفته‌ای نیست، مستقیم از search-list-doctors (سالم) می‌رویم
  // تا درخواست محکوم‌به‌خطای search-doctors (باگ فعلی بک‌اند) زده نشود
  if (!hasAdvancedFilters) {
    try {
      const response = await axiosConfig.get(
        buildUrl("Doctor/search-list-doctors", "DoctorName", {
          specialist: data.specialistId,
        }),
        { silent: true }
      );
      const doctors = response.data.result;
      logger.log(doctors);
      return doctors;
    } catch (fallbackError) {
      logger.error(fallbackError);
      return null;
    }
  }

  try {
    const response = await axiosConfig.get(
      buildUrl("Doctor/search-doctors", "DoctorName", {
        specialistIds: data.specialistId,
        ...advancedFilters,
      }),
      { silent: true }
    );
    const result = response.data.result;
    logger.log(result);

    // اگر بک‌اند پاسخ معتبر ولی خالی داد (totalRecords عددی)، همان خالی را برمی‌گردانیم
    // اما اگر Endpoint خطا/مقدار null داد (باگ فعلی بک‌اند)، از search-list-doctors استفاده می‌کنیم
    const total = result?.totalRecords;
    if (result && Array.isArray(result.list) && (result.list.length > 0 || (typeof total === "number" && total >= 0))) {
      return result;
    }
    throw new Error("search-doctors returned empty/malformed result");
  } catch (error) {
    logger.error("search-doctors failed, falling back to search-list-doctors:", error);
    try {
      const response = await axiosConfig.get(
        buildUrl("Doctor/search-list-doctors", "DoctorName", {
          specialist: data.specialistId,
        }),
        { silent: true }
      );
      const doctors = response.data.result;
      logger.log(doctors);
      return doctors;
    } catch (fallbackError) {
      logger.error(fallbackError);
      return null;
    }
  }
};
export const get_clinics = async () => {
  try {
    const response = await axiosConfig.get("Clinic/read-Clinics");
    const data = response;
    logger.log(data);
    return data.data.result.list;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
    return null;
  }
};
export const get_offices = async () => {
  try {
    const response = await axiosConfig.get("Office/read-Offices");
    const data = response;
    logger.log(data);
    return data.data.result.list;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
    return null;
  }
};
export const search_doctors_list = async (
  name = "",
  currentPage,
  specialistId
) => {
  logger.log("name" + name);
  try {
    const response = await axiosConfig.get(
      `Doctor/search-list-doctors?DoctorName=${name}&pagesize=10&pageNumber=${currentPage}&specialist=${specialistId}`
    );
    const doctors = response.data.result;
    logger.log(doctors);
    return doctors;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
    return null;
  }
};
export const get_doctor_treatmentCenter = async (id) => {
  try {
    const response = await axiosConfig.get(
      `DoctorTreatmentCenter/read-DoctorTreatmentCenterByDoctorId?Id=${id}`
    );
    const treatmentCenter = response.data.result.list;
    logger.log(treatmentCenter);
    return treatmentCenter;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
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
      logger.log(
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
    logger.log(
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
      logger.log(res);
      success(message);
      closeModal && closeModal(res);
      return res;
    })
    .catch((err) => {
      setIsLoading && setIsLoading(false);
      logger.error(err);
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
    logger.log(response);
    success("مطب با موفقیت حذف شد");
  } catch (error) {
    logger.error(error);
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
    logger.log(response);
    setIsLoading(false);
    success("مرکز درمانی با موفقیت حذف شد");
  } catch (error) {
    logger.error(error);
  }
};



export const read_office_type = async () => {
  try {
    const response = await axiosConfig.get("OfficeType/read-OfficeTypes");
    const data = response.data.result.list;
    logger.log("OfficeType", data);
    return data;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
    return null;
  }
};

export const create_Reservation = (data, setIsLoading, closeModal) => {
  logger.log(data);
  axiosConfig
    .post("/Reservation/create-reservation", data)
    .then((res) => {
      logger.log(res);
      success("نوبت با موفقیت ثبت شد");
      setIsLoading(false);
      closeModal();
    })
    .catch((err) => {
      logger.error(err);
      setIsLoading(false);
    });
};
export const get_doctor_profile_by_id = async (id) => {
  logger.log(id);
  try {
    const response = await axiosConfig.get(`Doctor/read-doctor-byid?Id=${id}`);
    const doctorProfile = response.data.result.data;
    logger.log(doctorProfile);
    return doctorProfile;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
    return null;
  }
};
export const get_doctor_reservation = async (id) => {
  logger.log(id);
  try {
    const response = await axiosConfig.get(
      `Reservation/read-doctor-reservation?DoctorId=${id}`
    );
    const reservation = response.data.result.data;
    logger.log(reservation);
    return reservation;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
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
  logger.log(data);
  axiosConfig
    .post("Patient/create-patient", data)
    .then((res) => {
      success("اطلاعات ثبت شد");
      closeModal();
      logger.log(res);
      setPatients && setPatients([...patients, res.data.result.patient]);
      logger.log(res.data.result.patient.id);
      setPatientId(res.data.result.patient.id);
      setIsLoading(false);
      {
        setSteps && setSteps(2);
      }
    })
    .catch((err) => {
      logger.error(err);
      setIsLoading(false);
    });
};
export const patinet_reservation = (data, setIsLoading, onSuccess) => {
  logger.log(data);
  axiosConfig
    .post("PatientReservation/create-patientreservation", data)
    .then((res) => {
      logger.log(res);
      setIsLoading(false);
      success("نوبت شما با موفقیت رزرو شد");
      onSuccess && onSuccess(res);
    })
    .catch((err) => {
      logger.error(err);
      setIsLoading(false);
    });
};
export const get_doctor_treatment_reservation = async (
  doctorId,
  treatmentId
) => {
  logger.log(doctorId, treatmentId);
  try {
    const response = await axiosConfig.get(
      `Reservation/read-doctor-treatmentcenter-reservation?DoctorId=${doctorId}&TreatmentCenterId=${treatmentId}`
    );
    const reservation = response.data.result.data;
    logger.log(reservation);
    return reservation;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
    return null;
  }
};
export const get_doctor_treatmentCenter_hozoori = async (id) => {
  try {
    const response = await axiosConfig.get(
      `DoctorTreatmentCenter/read-DoctorTreatmentCenterByDoctorIdHozoori?Id=${id}`
    );
    const treatmentCenter = response.data.result.list;
    logger.log(treatmentCenter);
    return treatmentCenter;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
    return null;
  }
};
export const get_doctor_treatmentCenter_online = async (id) => {
  try {
    const response = await axiosConfig.get(
      `DoctorTreatmentCenter/read-DoctorTreatmentCenterByDoctorIdOnline?Id=${id}`
    );
    const treatmentCenter = response.data.result.list;
    logger.log(treatmentCenter);
    return treatmentCenter;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
    return null;
  }
};

export const get_all_users = async () => {
  try {
    const response = await axiosConfig.get(`UserProfile/read-all-userprofiles`);
    const users = response.data.result.list;
    logger.log(users);
    return users;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
    return null;
  }
};

export const get_user_role_by_username = async (userName = "") => {
  try {
    const response = await axiosConfig.get(
      `UserManager/read-user-role?UserName=${userName}`
    );
    const userRoles = response.data.result.list;
    logger.log(userRoles);
    return userRoles;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
    return null;
  }
};

export const get_roles = async () => {
  try {
    const response = await axiosConfig.get(`RoleManager/read-roles`);
    const Roles = response.data.result.list;
    logger.log(Roles);
    return Roles;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
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
      logger.error(err);
      setIsLoading(false);
    });
};

export const get_4first_doctor_turns = async (doctorId) => {
  try {
    const response = await axiosConfig.get(
      `Doctor/readfirstfreeturns?DoctorId=${doctorId}`
    );
    const turns = response.data.result.list;
    logger.log(turns);
    return turns;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
    return null;
  }
};

export const read_all_insirances = async () => {
  try {
    const response = await axiosConfig.get(`Insurance/read-all-insurances`);
    return response?.data?.result?.list ?? [];
  } catch (error) {
    logger.error("Error fetching insurances:", error);
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
    logger.error("Error creating insurance:", error);
    return null;
  }
};
export const read_firsPage_doctors = async () => {
  logger.log("first");
  try {
    const response = await axiosConfig.get(
      `Reservation/read-doctor-resevationtop4firstpage`
    );
    const doctors = response.data.result.data;
    logger.log(doctors);
    return doctors;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
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
      logger.error(err);
      setIsLoading(false);
    });
};
export const read_followed_profile = async (smeId) => {
  logger.log("first");
  try {
    const response = await axiosConfig.get(
      `FollowProfile/read-FollowProfile?Id=${smeId}`
    );
    const followedList = response.data.result.list;
    logger.log(followedList);
    return followedList;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
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
    logger.error("Error fetching specialties:", error);
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
    logger.error("Error fetching specialties:", error);
    return null;
  }
};
export const edit_clinic = (data, setLoading, closeModal) => {
  setLoading(true);
  logger.log(data);
  axiosConfig
    .put("Clinic/update-Clinic", data)
    .then((res) => {
      setLoading(false);
      logger.log(res);
      success("مرکز درمانی با موفقیت ویرایش شد");
      closeModal();
    })
    .catch((err) => {
      logger.error(err);
      setLoading(false);
    });
};
export const edit_office = (data, setLoading, closeModal) => {
  logger.log(data);
  axiosConfig
    .put("Office/update-Office", data)
    .then((res) => {
      success("مطب با موفقیت ویرایش شد");
      setLoading(false);
      logger.log(res);
      closeModal();
    })
    .catch((err) => {
      logger.error(err);
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
      logger.error(err);
      setIsLoading(false);
    });
};

export const create_reservation_date_to_date = (
  data,
  setIsLoading,
  closeModal
) => {
  logger.log(data);
  axiosConfig
    .post("/Reservation/create-reservationfromdatetodate", data)
    .then((res) => {
      logger.log(res);
      success("نوبت با موفقیت ثبت شد");
      setIsLoading(false);
      closeModal();
    })
    .catch((err) => {
      logger.error(err);
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
  logger.log(id);
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
    logger.log(response);
    success("نوبت دکتر با موفقیت حذف شد");
  } catch (error) {
    logger.error(error);
  }
};
export const create_Specialties_category = (data, setIsLoading, closeModal) => {
  logger.log(data);
  axiosConfig
    .post("/Specialist/create-category", data)
    .then((res) => {
      logger.log(res);
      success("دسته بندی با موفقیت ثبت شد");
      setIsLoading(false);
      closeModal();
    })
    .catch((err) => {
      logger.error(err);
      setIsLoading(false);
    });
};

export const get_specialties_category = async () => {
  try {
    const response = await axiosConfig.get("Specialist/read-categorys");
    const categorys = response.data.result.list;
    return categorys;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
    return null;
  }
};
export const get_Category_by_specialties = async (id = "") => {
  logger.log(id);
  try {
    const response = await axiosConfig.get(`Specialist/read-category?Id=${id}`);

    const categorys = response.data.result.list;
    logger.log(categorys);
    return categorys;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
    return null;
  }
};
export const add_specialist_to_category = (data, setIsLoading, closeModal) => {
  logger.log(data);
  axiosConfig
    .post("Specialist/add-specialist-to-category", data)
    .then(() => {
      success("دسته بندی با موفقیت تخصیص داده شد");
      setIsLoading(false);
      closeModal();
    })
    .catch((err) => {
      logger.error(err);
      setIsLoading(false);
    });
};

export const edit_category = (data, setLoading, closeModal) => {
  logger.log(data);
  axiosConfig
    .put("Specialist/update-category", data)
    .then((res) => {
      success("دسته بندی با موفقیت ویرایش شد");
      setLoading(false);
      logger.log(res);
      closeModal();
    })
    .catch((err) => {
      logger.error(err);
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
    logger.error("Delete Category Error:", error);
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
  logger.log(data);
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
      logger.error(err);
      setIsLoading(false);
    });
};
export const search_DoctorTreatmentCenters = async (data) => {
  logger.log(data);

  // پارامترهای خالی ارسال نمی‌شوند (بایندر بک‌اند مقدار خالی را 400 می‌کند)
  const search = new URLSearchParams();
  const append = (key, value) => {
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      search.append(key, value);
    }
  };
  append("DoctorTreatmentCenterName", data.name);
  append("pagesize", data.pagesize ?? 10);
  append("pageNumber", data.currentPage ?? 1);
  append("specialistIds", data.specialistId);
  append("ProvinceId", data.provinceId);
  append("CityId", data.cityId);
  append("BimehTakmili", data.BimehTakmili);
  append("BimeAsli", data.BimeAsli);
  append("JustOnline", data.JustOnline);
  append("HasTurn", data.HasTurn);
  append("AcceptInsurance", data.AcceptInsurance);
  append("Gender", data.Gender);
  append("Sdate", data.Sdate);
  append("Edate", data.Edate);
  append("OnlineTypeId", data.OnlineTypeId);
  append("OfficeOrClinicHozoori", data.OfficeOrClinicHozoori);

  try {
    const response = await axiosConfig.get(
      `DoctorTreatmentCenter/search-DoctorTreatmentCenters?${search.toString()}`,
      { silent: true }
    );
    const doctors = response.data.result;
    logger.log(doctors);
    return doctors;
  } catch (error) {
    logger.error("Error fetching treatment centers:", error);
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
  signal = null
) => {
  logger.log("Searching for:", data);

  const applyResult = (result) => {
    const suggestions = String(result?.suggest ?? "")
      .split(",")
      .filter((item) => item.trim());
    setSuggestions(suggestions.slice(-6));
    setDoctors(result?.doctors ?? []);
    setMedicals(result?.treatMentcenters ?? []);
    setSpecialist(result?.specialists ?? []);
  };

  // اگر بک‌اند خطا داد (باگ فعلی: جستجوی پزشک/تخصص ۵۰۰ می‌دهد)،
  // همان نتیجه از سه Endpoint سالم دیگر ساخته می‌شود
  const fallbackSearch = async () => {
    const term = encodeURIComponent(data);
    const [doctorsRes, centersRes, specialistsRes] = await Promise.allSettled([
      axiosConfig.get(
        `Doctor/search-list-doctors?DoctorName=${term}&pagesize=6&pageNumber=1`,
        { silent: true }
      ),
      axiosConfig.get(
        `DoctorTreatmentCenter/search-DoctorTreatmentCenters?DoctorTreatmentCenterName=${term}&pagesize=6&pageNumber=1`,
        { silent: true }
      ),
      axiosConfig.get("Specialist/read-specialists", { silent: true }),
    ]);

    const doctors =
      doctorsRes.status === "fulfilled"
        ? (doctorsRes.value?.data?.result?.list ?? []).map((d) => {
            const fullName = `${d.doctorName ?? ""} ${d.doctorFamily ?? ""}`.trim();
            return {
              id: d.id,
              result: fullName,
              shortDesc: d.desc ?? "",
              link: fullName,
            };
          })
        : [];

    const centers =
      centersRes.status === "fulfilled"
        ? (centersRes.value?.data?.result?.list ?? []).map((c) => ({
            id: c.id,
            result: c.name ?? "",
            shortDesc: c.address ?? c.desc ?? "",
            link: c.name ?? "",
          }))
        : [];

    const termRaw = data.trim();
    const specialists =
      specialistsRes.status === "fulfilled"
        ? (specialistsRes.value?.data?.result?.list ?? [])
            .filter((sp) => (sp.name ?? "").includes(termRaw))
            .slice(0, 6)
            .map((sp) => ({
              id: sp.id,
              result: sp.name,
              name: sp.name,
              shortDesc: sp.maxaName ?? "",
              link: sp.name,
            }))
        : [];

    return { suggest: "", doctors, treatMentcenters: centers, specialists };
  };

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

    const config = {
      signal: signal,
      // خطای ۵۰۰ بک‌اند اینجا با fallback مدیریت می‌شود؛ توست خطا لازم نیست
      silent: true,
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
    logger.log("Search result:", result);

    // بک‌اند ممکن است آرایه‌ها را null برگرداند
    const normalized = {
      suggest: result?.suggest ?? "",
      doctors: result?.doctors ?? [],
      treatMentcenters: result?.treatMentcenters ?? [],
      specialists: (result?.specialists ?? []).map((sp) => ({
        ...sp,
        name: sp.name ?? sp.result,
      })),
    };

    let finalResult = normalized;
    const hasAnyResult =
      normalized.doctors.length > 0 ||
      normalized.treatMentcenters.length > 0 ||
      normalized.specialists.length > 0;

    if (!hasAnyResult) {
      finalResult = await fallbackSearch();
    }

    // بروزرسانی state ها فقط اگر درخواست cancel نشده باشد
    if (!signal || !signal.aborted) {
      applyResult(finalResult);
      setIsSearchLoading(false);
    }

    return finalResult;
  } catch (error) {
    // اگر خطا به دلیل cancel کردن درخواست است، آن را نادیده بگیر
    if (error.name === "AbortError" || error.code === "ERR_CANCELED") {
      logger.log("Request cancelled");
      return null;
    }

    logger.error("MainSearch failed, using fallback search:", error);

    if (!signal || !signal.aborted) {
      try {
        const fallbackResult = await fallbackSearch();
        if (!signal || !signal.aborted) {
          applyResult(fallbackResult);
          setIsSearchLoading(false);
        }
        return fallbackResult;
      } catch (fallbackError) {
        logger.error("Fallback search failed:", fallbackError);
        if (!signal || !signal.aborted) {
          setIsSearchLoading(false);
          setSuggestions([]);
          setDoctors([]);
          setMedicals([]);
          setSpecialist([]);
        }
        return null;
      }
    }

    return null;
  }
};
export const read_DoctorTreatmentCenterByNameSSR = async (name) => {
  logger.log(name);
  try {
    const response = await axiosConfig.get(
      `https://myapi.dadehavaran.com:8040/api/v1/DoctorTreatmentCenter/read-DoctorTreatmentCenterByNameSSR?SSRName=${name}`
    );
    const medical = response.data.result;
    logger.log(medical);
    return medical;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
    return null;
  }
};
export const Read_DoctorTreatmentCenters4FirstPage = async () => {
  try {
    const response = await axiosConfig.get(
      `https://myapi.dadehavaran.com:8040/api/v1/DoctorTreatmentCenter/Read-DoctorTreatmentCenters4FirstPage`
    );
    const list = response.data.result;
    logger.log(list);
    return list;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
    return null;
  }
};
export const Read_DoctorOffice4FirstPage = async () => {
  try {
    const response = await axiosConfig.get(
      `https://myapi.dadehavaran.com:8040/api/v1/DoctorTreatmentCenter/Read-DoctorOffice4FirstPage`
    );
    const list = response.data.result;
    logger.log(list);
    return list;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
    return null;
  }
};
export const create_Comment = (
  data,
  setIsNazarModal,
  setIsSuccessModal,
  setIsLoading
) => {
  logger.log(data, setIsNazarModal);
  axiosConfig
    .post("Comment/create-Comment", data)
    .then((res) => {
      logger.log(res);
      setIsLoading(false);
      setIsNazarModal(false);
      setIsSuccessModal(true);
    })
    .catch((err) => {
      logger.error(err);
    });
};
export const Read_ClinicTypes = async () => {
  try {
    const response = await axiosConfig.get(
      `https://myapi.dadehavaran.com:8040/api/v1/ClinicType/read-ClinicTypes`
    );
    const list = response.data.result.list;
    logger.log(list);
    return list;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
    return null;
  }
};
export const Read_OfficeType = async () => {
  try {
    const response = await axiosConfig.get(
      `https://myapi.dadehavaran.com:8040/api/v1/OfficeType/read-OfficeTypes`
    );
    const list = response.data.result.list;
    logger.log(list);
    return list;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
    return null;
  }
};
export const read_doctor_Comment = async (id) => {
  logger.log(id);
  try {
    const response = await axiosConfig.get(
      `https://myapi.dadehavaran.com:8040/api/v1/Comment/read-doctor-Comment?DoctorId=${id}`
    );
    const list = response.data.result.list;
    logger.log(list);
    return list;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
    return null;
  }
};
export const read_DoctorByNameSSR = async (name) => {
  logger.log(name);
  try {
    const response = await axiosConfig.get(
      `https://myapi.dadehavaran.com:8040/api/v1/Doctor/read-DoctorByNameSSR?SSRName=${name}`
    );
    const doctor = response.data.result;
    logger.log(doctor.data);
    return doctor;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
    return null;
  }
};
export const read_DoctorComents = async (id) => {
  logger.log(id);
  try {
    const response = await axiosConfig.get(
      `https://myapi.dadehavaran.com:8040/api/v1/Comment/read-doctor-Comment?DoctorId=${id}`
    );
    const res = response.data.result;
    logger.log(res);
    return res;
  } catch (error) {
    logger.error("Error fetching specialties:", error);
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

    logger.log("DoctorInsurance payload:", payload);

    const response = await axiosConfig.post(
      "DoctorInsurance/create-DoctorInsurance",
      payload
    );

    return response.data;
  } catch (error) {
    logger.error("Error creating doctor insurance:", error);

    if (error.response) {
      logger.error("Status:", error.response.status);
      logger.error("Backend error data:", error.response.data);
    }

    return null;
  }
};

export const read_doctor_insurances_by_doctor_id = async (doctorId) => {
  try {
    const response = await axiosConfig.get(
      `DoctorInsurance/read-insurances-bydoctorid?DoctorId=${doctorId}`
    );
    logger.log(response);
    return response.data?.result?.list || [];
  } catch (error) {
    logger.error("Error fetching doctor insurances:", error);
    return [];
  }
};
export const delete_doctor_treatment = async (
  id,                 // آیدی رکورد DoctorTreatmentCenter
  doctorId,           // آیدی دکتر (برای رفرش لیست)
  setTreatmenCenters,
  closeModal
) => {
  logger.log("delete id:", id);
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
    logger.log(response);
    success("مرکز درمانی دکتر با موفقیت حذف شد");
    return response;
  } catch (error) {
    logger.error(error);
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
    logger.log(response);
    return response;
  } catch (error) {
    logger.error(error);
    closeModal && closeModal();
    return null;
  }
};

export const get_specialists_by_clinic = async (clinicId) => {
  const response = await axiosConfig.get(
    `MinistryApiReserve/read-specialists-by-clinic/${clinicId}`
  );

  return response.data.result.list;
};

// ---------- توابع کمکی هویت کاربر ----------
// توکن JWT شامل آیدی کاربر (GUID) در claim نام است؛ برای صدا زدن
// Endpointهایی مثل SiteMessage/read-recived-message به همین آیدی نیاز داریم
export const get_current_user_id = () => {
  const token = Cookies.get("token");
  if (!token) return null;
  try {
    const jwt = token.replace("Bearer ", "");
    const payload = JSON.parse(atob(jwt.split(".")[1]));
    // claim نام در JWT به صورت طولانی serializes می‌شود
    const nameClaim =
      payload[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
      ] ?? payload.name;
    return nameClaim ?? null;
  } catch (error) {
    logger.log("token decode error", error);
    return null;
  }
};

// ---------- کنسل کردن نوبت توسط بیمار ----------
export const delete_patient_reservation = async (
  id,
  setList,
  closeModal,
  setIsLoading,
  list
) => {
  try {
    const response = await axiosConfig.delete(
      "PatientReservation/delete-patientreservation",
      {
        data: {
          metadata: {
            userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            userName: "string",
          },
          id,
        },
      }
    );
    if (setList && list) {
      setList(list.filter((item) => item.id !== id));
    }
    setIsLoading && setIsLoading(false);
    closeModal && closeModal();
    success("نوبت با موفقیت کنسل شد");
    return response;
  } catch (error) {
    logger.error(error);
    setIsLoading && setIsLoading(false);
    return null;
  }
};

// ---------- هزینه ویزیت (VisitCost) ----------
export const read_all_visitcosts = async () => {
  try {
    const response = await axiosConfig.get("Reservation/read-all-visitcosts");
    return response?.data?.result?.list ?? [];
  } catch (error) {
    logger.error(error);
    return [];
  }
};

export const read_all_visittypes = async () => {
  try {
    const response = await axiosConfig.get("Reservation/read-all-visittypes");
    return response?.data?.result?.list ?? [];
  } catch (error) {
    logger.error(error);
    return [];
  }
};

// قیمت ویزیت برای پزشک ثبت می‌کند؛ در صورت نبود نوع ویزیت مناسب، اولین نوع موجود استفاده می‌شود
export const create_visitcost = async (doctorId, price, visitTypeName) => {
  try {
    const visitTypes = await read_all_visittypes();
    const visitType =
      visitTypes.find((vt) =>
        visitTypeName ? (vt.visitTypeName ?? "").includes(visitTypeName) : true
      ) ?? visitTypes[0];
    if (!visitType) {
      Eror("نوع ویزیت در سیستم ثبت نشده است");
      return null;
    }
    const response = await axiosConfig.post("Reservation/create-visitcost", {
      metadata: {
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userName: "string",
      },
      doctorId,
      price: Number(price),
      visitTypeId: visitType.id,
    });
    success("هزینه ویزیت با موفقیت ثبت شد");
    return response?.data?.result ?? response?.data;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// اولین هزینه ویزیت ثبت‌شده پزشک را برمی‌گرداند (برای ساخت تقویم کاری لازم است)
export const read_doctor_visitcost = async (doctorId) => {
  const all = await read_all_visitcosts();
  return all.find((vc) => String(vc.doctorId) === String(doctorId)) ?? null;
};

// ---------- ویرایش/حذف بیمار (بستگان کاربر) ----------
export const update_patient = async (data, setIsLoading, closeModal) => {
  try {
    const response = await axiosConfig.put("Patient/update-patient", data);
    setIsLoading && setIsLoading(false);
    closeModal && closeModal();
    success("اطلاعات بیمار با موفقیت ویرایش شد");
    return response;
  } catch (error) {
    logger.error(error);
    setIsLoading && setIsLoading(false);
    return null;
  }
};

// حذف بیمار بدون رفرش لیست سراسری (برای پنل کاربر)
export const delete_patient_simple = async (id) => {
  try {
    const response = await axiosConfig.delete("Patient/delete-patient", {
      data: {
        metadata: {
          userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          userName: "string",
        },
        id,
      },
    });
    return response;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// لیست بیماران ثبت‌شده‌ی یک SmeProfile (بستگانی که کاربر برایشان نوبت می‌گیرد)
export const read_smeprofile_patients = async (smeProfileId) => {
  try {
    const response = await axiosConfig.get(
      `Patient/read-smeprofile-patients?SmeProfileId=${smeProfileId}`
    );
    return response?.data?.result?.list ?? [];
  } catch (error) {
    logger.error(error);
    return [];
  }
};

// ---------- درخواست عضویت پزشک (فرم عمومی) ----------
// بک‌اند فعلاً وضعیت «در انتظار تایید» ندارد؛ پزشک مستقیماً ثبت می‌شود و
// ادمین در پنل مدیریت آن را مشاهده/مدیریت می‌کند
export const request_doctor_membership = async (data, setIsLoading) => {
  try {
    const response = await axiosConfig.post("Doctor/create-doctor", data);
    setIsLoading && setIsLoading(false);
    success("درخواست شما ثبت شد؛ همکاران ما با شما تماس خواهند گرفت");
    return response;
  } catch (error) {
    logger.error(error);
    setIsLoading && setIsLoading(false);
    return null;
  }
};

// لیست بیماران پزشک
export const read_doctor_patients = async (doctorId) => {
  try {
    const response = await axiosConfig.get(
      `Doctor/read-patients-doctor?DoctorId=${doctorId}`
    );
    return response?.data?.result?.list ?? [];
  } catch (error) {
    logger.error(error);
    return [];
  }
};

// ---------- پیام‌های کاربر (اطلاع‌رسانی) ----------
export const read_recived_messages = async (userId) => {
  try {
    const id = userId ?? get_current_user_id();
    if (!id) return [];
    const response = await axiosConfig.get(
      `SiteMessage/read-recived-message?UserId=${id}`
    );
    return response?.data?.result?.list ?? [];
  } catch (error) {
    logger.error(error);
    return [];
  }
};