import { Link } from 'react-router-dom';


function UserCard({avatar="https://unavatar.io/substack/bankless", username="Nombre", email="correo@gmail.com"}) {
  return (
    <article className="user-card">
      <header className="user-card__header">
        <img
          className="user-card__avatar"
          src={avatar}
          alt="Avatar usuario"
        />
        <div className="user-card__info">
          <strong className="user-card__username">{username}</strong>
          <span className="user-card__email">{email}</span>
        </div>
      </header>

      <Link className=" button user-card__edit" to="/preferences">Editar Perfil</Link>
    </article>
  );
}

export default UserCard;
