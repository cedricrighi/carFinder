import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthenticationProvider";

export default function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!email || !password) {
      return;
    }
    const responseWithToken = await fetch(
      `${import.meta.env.VITE_API_URL}/api/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );
    if (responseWithToken.status === 422) {
      setError("Email ou mot de passe incorrect");
      return;
    }

    const dataWithToken = await responseWithToken.json();

    if (responseWithToken.ok) {
      setAuth({
        token: dataWithToken.token,
        user: dataWithToken.user,
      });
      navigate("/profile");
    }
  };

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <section className="login-container">
      <Link className="back-to-home-link" to={"/"}>
        <p>Revenir au site</p>
      </Link>
      <h2 className="register-title">CarFinder</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Ravi de vous revoir !</h2>
        <div className="email-input-and-label">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required ref={emailRef} />
        </div>
        <div className="passwor-input-and-label">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            ref={passwordRef}
          />
        </div>
        {error && <p className="register-warning-text">{error}</p>}
        <Link className="register-account-already-in-db" to={"/register"}>
          Vous n'êtes pas inscrit ?
        </Link>
        <button className="register-form-button" type="submit">
          Se connecter
        </button>
      </form>
    </section>
  );
}
