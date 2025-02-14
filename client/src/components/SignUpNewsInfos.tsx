import "../styles/SignUpNewsInfos.css";

export default function SignUpNewsInfos() {
  return (
    <section className="signup-news-infos-container">
      <p>Restez informé des dernières offres</p>
      <input
        className="signup-news-infos-input"
        type="mail"
        placeholder="Renseignez votre email"
      />
      <button className="signup-news-infos-button" type="button">
        S'enregistrer
      </button>
    </section>
  );
}
