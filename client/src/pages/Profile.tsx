import { useState } from "react";
import Navbar from "../components/Navbar";
import ProfileNavbar from "../components/ProfileNavbar";
import { useAuth } from "../contexts/AuthenticationProvider";

export default function Profile() {
  const { auth } = useAuth();

  const [activeOutlet, setActiveOutlet] = useState("Mes infos");

  if (!auth) {
    return (
      <>
        <Navbar />
        <p>Vous n'êtes pas connecté.</p>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <p>Bienvenue dans votre profil {auth.user.first_name}.</p>
      <ProfileNavbar
        activeOutlet={activeOutlet}
        setActiveOutlet={setActiveOutlet}
      />
    </>
  );
}
