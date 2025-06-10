import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="home__hero">
      {/* Video de fondo */}
      <video 
        className="home__hero-video"
        autoPlay 
        muted 
        loop 
        playsInline
        preload="metadata"
        poster="/hero/fiesta-categoria.JPG"
        disablePictureInPicture
        disableRemotePlayback
      >
        <source src="/hero/nightly-hero.webm" type="video/webm" />
        <source src="/hero/nightly-hero.mp4" type="video/mp4" />
        Tu navegador no soporta video HTML5.
      </video>
      
      <div className="home__hero-overlay"></div>
      <div className="home__hero-content">
        <h1 className="places__title">
          Encuentra tu{" "}
          <span className="home__hero-highlight">noche perfecta</span>
        </h1>
        <p className="places__description">
          Nightly es tu guía definitiva para encontrar los mejores planes
          nocturnos, eventos y experiencias en tu ciudad.
        </p>
        <div className="home__hero-actions">
          <Link to="/place-finder" className="home__hero-cta">
            <i className="fa-solid fa-compass"></i>
            Encuentra tu Plan
          </Link>
          <Link
            to="/events"
            className="home__hero-cta home__hero-cta--secondary"
          >
            <i className="fa-solid fa-calendar"></i>
            Ver Eventos
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection; 