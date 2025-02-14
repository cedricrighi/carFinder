import { useState } from "react";
import Navbar from "../components/Navbar";
import ProfileNavbar from "../components/ProfileNavbar";
import { useAuth } from "../contexts/AuthenticationProvider";
import "../styles/Profile.css";
import ProfileInfos from "../components/ProfileInfos";
import ProfileVehicles from "../components/ProfileVehicles";
export default function Profile() {
  const { auth } = useAuth();

  const [activeOutlet, setActiveOutlet] = useState("Mes infos");

  if (!auth) {
    return (
      <>
        <Navbar />
        <section className="profile-container">
          <p>Vous n'êtes pas connecté.</p>
        </section>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <section className="profile-container">
        {activeOutlet === "Mes infos" && (
          <p className="header-title-profile">
            Bienvenue dans votre profil {auth.user.first_name}.
          </p>
        )}
        <ProfileNavbar
          activeOutlet={activeOutlet}
          setActiveOutlet={setActiveOutlet}
        />
        {activeOutlet === "Mes infos" && <ProfileInfos />}
        {activeOutlet === "Mes véhicules" && <ProfileVehicles />}
      </section>
    </>
  );
}
