import "../styles/ProfileNavbar.css";

interface NavbarOutlet {
  activeOutlet: string;
  setActiveOutlet: (outlet: string) => void;
}

export default function ProfileNavbar({
  activeOutlet,
  setActiveOutlet,
}: NavbarOutlet) {
  return (
    <section className="profile-navbar-container">
      <ul className="profile-navbar-outlets">
        <li>
          <button
            className={`${activeOutlet === "Mes infos" ? "active-outlet" : ""} button-profile-navbar-outlet`}
            type="button"
            onClick={() => setActiveOutlet("Mes infos")}
          >
            Mes infos
          </button>
        </li>
        <li>
          <button
            className={`${activeOutlet === "Mes véhicules" ? "active-outlet" : ""} button-profile-navbar-outlet`}
            type="button"
            onClick={() => setActiveOutlet("Mes véhicules")}
          >
            Mes véhicules
          </button>
        </li>
      </ul>
    </section>
  );
}
