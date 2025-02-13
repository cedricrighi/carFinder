export default function Register() {
  return (
    <>
      <form>
        <h2>Bonjour !</h2>
        <label htmlFor="pseudo">Pseudo</label>
        <input type="text" id="pseudo" name="pseudo" required />
        <label htmlFor="first_name">Prénom</label>
        <input type="text" id="first_name" name="first_name" required />
        <label htmlFor="last_name">Nom</label>
        <input type="text" id="last_name" name="last_name" required />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="phone">Téléphone</label>
        <input type="tel" id="phone" name="phone" required />
        <label htmlFor="password">Mot de passe</label>
        <input type="password" id="password" name="password" required />
      </form>
    </>
  );
}
