import { useRef, useState } from "react";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement>(null);

  const [isPasswordValide, setIsPasswordValide] = useState(true);
  const [passwordsAreEquals, setPasswordsAreEquals] = useState(true);

  const navigate = useNavigate();

  const checkIfPasswordIsValide = () => {
    if (passwordRef.current && passwordRef.current.value.length < 13) {
      setIsPasswordValide(false);
    } else {
      setIsPasswordValide(true);
    }
  };

  const checkPasswords = () => {
    if (passwordRef.current?.value !== passwordConfirmationRef.current?.value) {
      setPasswordsAreEquals(false);
    } else {
      setPasswordsAreEquals(true);
    }
  };

  const [isEmailAlreadyUsed, setIsEmailAlreadyUsed] = useState(false);

  const verifyIfEmailIsAlreadyUsed = async (email: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/${email}`,
      );
      const data = await response.json();

      if (data.email === email) {
        setIsEmailAlreadyUsed(true);
        return true;
      }
      setIsEmailAlreadyUsed(false);
      return false;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      firstnameRef.current &&
      lastnameRef.current &&
      emailRef.current &&
      phoneRef.current &&
      passwordRef.current &&
      passwordConfirmationRef.current &&
      isPasswordValide &&
      passwordsAreEquals
    ) {
      try {
        const isUsed = await verifyIfEmailIsAlreadyUsed(emailRef.current.value);
        if (isUsed) {
          return;
        }
        await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: firstnameRef.current.value,
            last_name: lastnameRef.current.value,
            email: emailRef.current.value,
            phone_number: phoneRef.current.value,
            password: passwordRef.current.value,
          }),
        });
        navigate("/login");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <section className="register-section-container">
      <Link className="back-to-home-link" to={"/"}>
        <p>Revenir au site</p>
      </Link>
      <h2 className="register-title">CarFinder</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Bonjour !</h2>
        <article className="firstname-and-lastname">
          <div className="firstname-input-and-label">
            <label htmlFor="first_name">Prénom</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              required
              ref={firstnameRef}
            />
          </div>
          <div className="lastname-input-and-label">
            <label htmlFor="last_name">Nom</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              required
              ref={lastnameRef}
            />
          </div>
        </article>
        <div className="email-input-and-label">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required ref={emailRef} />
          {isEmailAlreadyUsed && (
            <p className="register-warning-text">Cet email est déjà utilisé</p>
          )}
        </div>
        <div className="phone-input-and-label">
          <label htmlFor="phone">Téléphone</label>
          <input type="tel" id="phone" name="phone" required ref={phoneRef} />
        </div>
        <div className="passwor-input-and-label">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            ref={passwordRef}
            onChange={checkIfPasswordIsValide}
          />
          {!isPasswordValide && (
            <p className="register-warning-text">
              Le mot de passe doit contenir au moins 13 caractères
            </p>
          )}
        </div>
        <div className="password-confirmation-input-and-label">
          <label htmlFor="password_confirmation">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            required
            ref={passwordConfirmationRef}
            onChange={checkPasswords}
          />
          {!passwordsAreEquals && (
            <p className="register-warning-text">
              Les mots de passes ne correspondent pas
            </p>
          )}
        </div>
        <Link className="register-account-already-in-db" to={"/login"}>
          Vous avez déjà un compte ?
        </Link>
        <button className="register-form-button" type="submit">
          S'inscrire
        </button>
      </form>
    </section>
  );
}
