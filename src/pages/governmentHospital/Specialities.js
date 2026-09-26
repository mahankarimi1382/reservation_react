import React, { useEffect, useState } from "react";
import {
  useParams,
  useLocation,
  Link,
} from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: "https://myapi.dadehavaran.com:8040/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

const Specialities = () => {
  const { clinicId } = useParams();
  const location = useLocation();

  // اطلاعات مرکز که از صفحه قبل ارسال شده است
  const hospital = location.state?.hospital;

  const [specialities, setSpecialities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSpecialities = async () => {
      if (!clinicId) {
        setError("شناسه مرکز درمانی مشخص نیست.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        console.log("Clinic ID:", clinicId);
        console.log("Hospital in Specialities.js:", hospital);

        const response = await api.get(
          `MinistryApiReserve/read-specialists-by-clinic/${clinicId}`
        );

        console.log(
          "Specialities API response:",
          response.data
        );

        const apiData = response.data;

        if (apiData?.hasError) {
          throw new Error(
            apiData.message ||
              "دریافت تخصص‌ها با خطا مواجه شد."
          );
        }

        const list = apiData?.result?.list ?? [];

        setSpecialities(list);
      } catch (err) {
        console.error(
          "Error loading specialities:",
          err
        );

        setError(
          "دریافت تخصص‌های این مرکز با خطا مواجه شد."
        );
      } finally {
        setLoading(false);
      }
    };

    loadSpecialities();
  }, [clinicId, hospital]);

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        padding: "40px",
        backgroundColor: "#f8fafc",
      }}
    >
     <h1>
  تخصص‌های مرکز درمانی
  {hospital?.name || hospital?.Name
    ? ` - ${hospital.name || hospital.Name}`
    : ""}
</h1>

      {loading && (
        <p>در حال دریافت تخصص‌ها...</p>
      )}

      {!loading && error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {!loading &&
        !error &&
        specialities.length === 0 && (
          <p>
            برای این مرکز تخصصی ثبت نشده است.
          </p>
        )}

      {!loading &&
        !error &&
        specialities.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px",
              marginTop: "24px",
            }}
          >
            {specialities.map((speciality) => (
              <Link
                key={speciality.id}
                to={`/government-hospitals/${clinicId}/specialties/${speciality.id}/doctors`}
                state={{
                  hospital,
                  specialty: {
                    id: speciality.id,
                    title: speciality.name,
                    name: speciality.name,
                  },
                }}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    padding: "20px",
                    boxShadow:
                      "0 2px 8px rgba(0,0,0,0.08)",
                    cursor: "pointer",
                    height: "100%",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-4px)";

                    e.currentTarget.style.boxShadow =
                      "0 6px 16px rgba(0,0,0,0.14)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0)";

                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(0,0,0,0.08)";
                  }}
                >
                  <h3>{speciality.name}</h3>

                  <p
                    style={{
                      marginTop: "10px",
                      color: "#64748b",
                      fontSize: "14px",
                    }}
                  >
                    مشاهده پزشکان این تخصص
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
    </div>
  );
};

export default Specialities;