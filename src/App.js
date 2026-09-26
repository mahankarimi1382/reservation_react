import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./globals.css";
import Home from "./pages/Home.jsx";

// عمومی
import AboutUs from "./pages/about-us/page";
import ContactUs from "./pages/contact-us/page";
import Dentistry from "./pages/dentistry/page";
import Doctors from "./pages/doctors/page";
import DoctorProfile from "./pages/doctors/[ssrName]/page";
import HealthMagezine from "./pages/healthMagezine/page";
import HealthMagezineNewArticles from "./pages/healthMagezine/new-articles/page";
import HealthMagezineAudioArticles from "./pages/healthMagezine/audio-articles/page";
import HealthMagezineVideoArticles from "./pages/healthMagezine/video-articles/page";
import MedicalCenters from "./pages/medical-centers/page";
import MedicalCenterProfile from "./pages/medical-centers/[SsrName]/page";
import MedicalCentersLogin from "./pages/medicalCentersLogin/page";
import Psychiatry from "./pages/psychiatry/page";
import Reservation from "./pages/Reservation/[id]/page";
import ReservStepsToPay from "./pages/reservStepsToPay/page";
import RulesPage from "./pages/RulesPage/page";
import Specialties from "./pages/Specialties/page";
import MapTest from "./pages/map-test/page";
import TestPage from "./pages/test/page";

// ورود / ثبت‌نام
import DoctorLogin from "./pages/doctor-login/page";
import DoctorSignup from "./pages/doctor-login/signup-form/page";

// پنل کاربر
import UserAccountInfo from "./pages/userPanel/acountInfo/page";
import UserDashboard from "./pages/userPanel/dashboard/page";
import UserFavorites from "./pages/userPanel/favorites/page";
import UserHistory from "./pages/userPanel/history/page";
import UserMessages from "./pages/userPanel/messages/page";
import UserOpinions from "./pages/userPanel/opinions/page";
import UserRewards from "./pages/userPanel/rewards/page";
import UserSaves from "./pages/userPanel/saves/page";
import UserSubsetedUsers from "./pages/userPanel/subsetedusers/page";
import UserTransactions from "./pages/userPanel/transactions/page";
import UserWallet from "./pages/userPanel/wallet/page";

// پنل دکتر
import DoctorPanelArticle from "./pages/doctor-panel/article/page";
import DoctorPanelDashboard from "./pages/doctor-panel/dashboard/page";
import DoctorFinancialInfo from "./pages/doctor-panel/doctor-info/financial/page";
import DoctorMakeProfile from "./pages/doctor-panel/doctor-info/make-profile/page";
import DoctorSubmitMedicalCenter from "./pages/doctor-panel/doctor-info/submit-medicalcenter/page";
import DoctorUploadLicenses from "./pages/doctor-panel/doctor-info/upload-licenses/page";
import DoctorPaidList from "./pages/doctor-panel/financial-reports/paid-list/page";
import DoctorSettlementRequest from "./pages/doctor-panel/financial-reports/Settlement-request/page";
import DoctorPanelInsurances from "./pages/doctor-panel/insurances/page";
import DoctorMedicalCenterSetting from "./pages/doctor-panel/medicalcenter-setting/page";
import DoctorOnlineSupport from "./pages/doctor-panel/online-support/page";
import DoctorOpinionsAboutMe from "./pages/doctor-panel/opinions-about-me/page";
import DoctorPatientsList from "./pages/doctor-panel/patients-list/page";
import CancelReservation from "./pages/doctor-panel/reservation-managment/cancel-reservation/page";
import DelayAndHaste from "./pages/doctor-panel/reservation-managment/delay-&-haste/page";
import WorkCalendar from "./pages/doctor-panel/reservation-managment/work-calendar/page";

// پنل ادمین
import AdminBlacklist from "./pages/adminPanel/blacklist/page";
import AdminDashboard from "./pages/adminPanel/dashboard/page";
import AdminDoctors from "./pages/adminPanel/doctors/page";
import AdminBanner from "./pages/adminPanel/imagesetting/banner/page";
import AdminAddBanner from "./pages/adminPanel/imagesetting/banner/add-banner/page";
import AdminDoctorImage from "./pages/adminPanel/imagesetting/doctorimage/page";
import AdminMagezineImage from "./pages/adminPanel/imagesetting/magezine/page";
import AdminMedicalCenterImage from "./pages/adminPanel/imagesetting/medicalcenterimage/page";
import AdminInsurances from "./pages/adminPanel/insurances/page";
import AdminClinics from "./pages/adminPanel/medicalcenters/clinics/page";
import AdminOffices from "./pages/adminPanel/medicalcenters/offices/page";
import AdminOpinions from "./pages/adminPanel/opinions/page";
import AdminPatients from "./pages/adminPanel/patients/page";
import AdminCenterStatusReport from "./pages/adminPanel/reports/centerstatus/page";
import AdminDoctorsCancelsReport from "./pages/adminPanel/reports/doctorscancels/page";
import AdminDoctorStatusReport from "./pages/adminPanel/reports/doctorstatus/page";
import AdminHozoriReports from "./pages/adminPanel/reports/hozorireports/page";
import AdminOnlineReports from "./pages/adminPanel/reports/onlinereports/page";
import AdminSpecialties from "./pages/adminPanel/specialties/page";
import AdminSupportDoctor from "./pages/adminPanel/support/doctor/page";
import AdminSupportPatient from "./pages/adminPanel/support/patient/page";
import AdminTransactions from "./pages/adminPanel/transactions/page";
import AdminTurns from "./pages/adminPanel/turns/page";
import AdminUserAccess from "./pages/adminPanel/useraccess/page";
import { ToastContainer } from "react-toastify";
import { RequireAdmin, RequireAuth } from "./components/RoleGuard";
import GovernmentHospitals from "./pages/governmentHospital/GovernmentHospitals";
import GovernmentDoctors from "./pages/governmentHospital/Doctors";
import GovernmentAppointments from "./pages/governmentHospital/Appointments";
import GovernmentConfirmAppointment from "./pages/governmentHospital/ConfirmAppointment";
import Specialities from "./pages/governmentHospital/Specialities"
import ConfirmReservation from "./pages/governmentHospital/ConfirmReservation";

function App() {
  return (
    <Router>
      <Routes>
        {/* عمومی */}
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/dentistry" element={<Dentistry />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:ssrName" element={<DoctorProfile />} />
        <Route path="/healthMagezine" element={<HealthMagezine />} />
        <Route
          path="/healthMagezine/new-articles"
          element={<HealthMagezineNewArticles />}
        />
        <Route
          path="/healthMagezine/audio-articles"
          element={<HealthMagezineAudioArticles />}
        />
        <Route
          path="/healthMagezine/video-articles"
          element={<HealthMagezineVideoArticles />}
        />
        <Route path="/medical-centers" element={<MedicalCenters />} />
        <Route
          path="/medical-centers/:SsrName"
          element={<MedicalCenterProfile />}
        />
        <Route path="/medicalCentersLogin" element={<MedicalCentersLogin />} />
        <Route path="/psychiatry" element={<Psychiatry />} />
        <Route path="/Reservation/:id" element={<Reservation />} />
        <Route path="/reservStepsToPay" element={<ReservStepsToPay />} />
        <Route path="/RulesPage" element={<RulesPage />} />
        <Route path="/Specialties" element={<Specialties />} />
        <Route path="/map-test" element={<MapTest />} />
        <Route path="/test" element={<TestPage />} />

        {/* ورود / ثبت‌نام */}
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/doctor-login/signup-form" element={<DoctorSignup />} />

        {/* پنل کاربر — نیازمند ورود */}
        <Route element={<RequireAuth />}>
        <Route path="/userPanel/acountInfo" element={<UserAccountInfo />} />
        <Route path="/userPanel/dashboard" element={<UserDashboard />} />
        <Route path="/userPanel/favorites" element={<UserFavorites />} />
        <Route path="/userPanel/history" element={<UserHistory />} />
        <Route path="/userPanel/messages" element={<UserMessages />} />
        <Route path="/userPanel/opinions" element={<UserOpinions />} />
        <Route path="/userPanel/rewards" element={<UserRewards />} />
        <Route path="/userPanel/saves" element={<UserSaves />} />
        <Route
          path="/userPanel/subsetedusers"
          element={<UserSubsetedUsers />}
        />
        <Route path="/userPanel/transactions" element={<UserTransactions />} />
        <Route path="/userPanel/wallet" element={<UserWallet />} />
        </Route>

        {/* پنل دکتر — نیازمند ورود */}
        <Route element={<RequireAuth />}>
        <Route path="/doctor-panel/article" element={<DoctorPanelArticle />} />
        <Route
          path="/doctor-panel/dashboard"
          element={<DoctorPanelDashboard />}
        />
        <Route
          path="/doctor-panel/doctor-info/financial"
          element={<DoctorFinancialInfo />}
        />
        <Route
          path="/doctor-panel/doctor-info/make-profile"
          element={<DoctorMakeProfile />}
        />
        <Route
          path="/doctor-panel/doctor-info/submit-medicalcenter"
          element={<DoctorSubmitMedicalCenter />}
        />
        <Route
          path="/doctor-panel/doctor-info/upload-licenses"
          element={<DoctorUploadLicenses />}
        />
        <Route
          path="/doctor-panel/financial-reports/paid-list"
          element={<DoctorPaidList />}
        />
        <Route
          path="/doctor-panel/financial-reports/Settlement-request"
          element={<DoctorSettlementRequest />}
        />
        <Route
          path="/doctor-panel/insurances"
          element={<DoctorPanelInsurances />}
        />
        <Route
          path="/doctor-panel/medicalcenter-setting"
          element={<DoctorMedicalCenterSetting />}
        />
        <Route
          path="/doctor-panel/online-support"
          element={<DoctorOnlineSupport />}
        />
        <Route
          path="/doctor-panel/opinions-about-me"
          element={<DoctorOpinionsAboutMe />}
        />
        <Route
          path="/doctor-panel/patients-list"
          element={<DoctorPatientsList />}
        />
        <Route
          path="/doctor-panel/reservation-managment/cancel-reservation"
          element={<CancelReservation />}
        />
        <Route
          path="/doctor-panel/reservation-managment/delay-&-haste"
          element={<DelayAndHaste />}
        />
        <Route
          path="/doctor-panel/reservation-managment/work-calendar"
          element={<WorkCalendar />}
        />
        </Route>

        {/* پنل ادمین — فقط نقش‌های ادمینی */}
        <Route element={<RequireAdmin />}>
        <Route path="/adminPanel/blacklist" element={<AdminBlacklist />} />
        <Route path="/adminPanel/dashboard" element={<AdminDashboard />} />
        <Route path="/adminPanel/doctors" element={<AdminDoctors />} />
        <Route
          path="/adminPanel/imagesetting/banner"
          element={<AdminBanner />}
        />
        <Route
          path="/adminPanel/imagesetting/banner/add-banner"
          element={<AdminAddBanner />}
        />
        <Route
          path="/adminPanel/imagesetting/doctorimage"
          element={<AdminDoctorImage />}
        />
        <Route
          path="/adminPanel/imagesetting/magezine"
          element={<AdminMagezineImage />}
        />
        <Route
          path="/adminPanel/imagesetting/medicalcenterimage"
          element={<AdminMedicalCenterImage />}
        />
        <Route path="/adminPanel/insurances" element={<AdminInsurances />} />
        <Route
          path="/adminPanel/medicalcenters/clinics"
          element={<AdminClinics />}
        />
        <Route
          path="/adminPanel/medicalcenters/offices"
          element={<AdminOffices />}
        />
        <Route path="/adminPanel/opinions" element={<AdminOpinions />} />
        <Route path="/adminPanel/patients" element={<AdminPatients />} />
        <Route
          path="/adminPanel/reports/centerstatus"
          element={<AdminCenterStatusReport />}
        />
        <Route
          path="/adminPanel/reports/doctorscancels"
          element={<AdminDoctorsCancelsReport />}
        />
        <Route
          path="/adminPanel/reports/doctorstatus"
          element={<AdminDoctorStatusReport />}
        />
        <Route
          path="/adminPanel/reports/hozorireports"
          element={<AdminHozoriReports />}
        />
        <Route
          path="/adminPanel/reports/onlinereports"
          element={<AdminOnlineReports />}
        />
        <Route path="/adminPanel/specialties" element={<AdminSpecialties />} />
        <Route
          path="/adminPanel/support/doctor"
          element={<AdminSupportDoctor />}
        />
        <Route
          path="/adminPanel/support/patient"
          element={<AdminSupportPatient />}
        />
        <Route
          path="/adminPanel/transactions"
          element={<AdminTransactions />}
        />
        <Route path="/adminPanel/turns" element={<AdminTurns />} />
        <Route path="/adminPanel/useraccess" element={<AdminUserAccess />} />
        </Route>
          

        {/* پنل بیمارستانهای دولتی */} 
        <Route
          path="/government-hospitals"
            element={<GovernmentHospitals />}
            />
           
         <Route
          path="/government-hospitals/:clinicId/specialties/:specialtyId/doctors"
          element={<GovernmentDoctors />}
          />
          <Route
           path="/government-hospitals/:clinicId/specialties/:specialtyId/doctors/:doctorId/appointments"
           element={<GovernmentAppointments />}
          />
          <Route
           path="/government-hospitals/:clinicId/specialties/:specialtyId/doctors/:doctorId/appointments/confirm"
           element={<GovernmentConfirmAppointment />}
          />

         <Route
         path="/government-hospitals/:clinicId/specialities"
         element={<Specialities />}
         />
         <Route
          path="/government-hospitals/confirm-reservation"
          element={<ConfirmReservation />}
          />


      </Routes>
      
      <ToastContainer />
    </Router>
  );
}

export default App;
