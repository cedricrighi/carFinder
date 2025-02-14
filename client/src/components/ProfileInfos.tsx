import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthenticationProvider";
import "../styles/ProfileInfos.css";

export default function ProfileInfos() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  if (!auth) {
    navigate("/login");
    return null;
  }

  return (
    <section className="profile-infos-container">
      <article>
        <h1>Mes informations</h1>
        <p>Nom: {auth.user.last_name}</p>
        <p>Prénom: {auth.user.first_name}</p>
        <p>Email: {auth.user.email}</p>
        <p>Téléphone: {auth.user.phone_number}</p>
        <button
          className="button-logout"
          type="button"
          onClick={() => {
            window.location.reload();
          }}
        >
          Se déconnecter
        </button>
      </article>
    </section>
  );
}
