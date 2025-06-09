import { Link } from "react-router-dom";

function FinalCTASection() {
  const ctaFeatures = [
    {
      id: 1,
      icon: "fa-solid fa-compass",
      title: "Descubre",
      description: "Lugares únicos cada día"
    },
    {
      id: 2,
      icon: "fa-solid fa-users",
      title: "Conecta",
      description: "Con personas afines"
    },
    {
      id: 3,
      icon: "fa-solid fa-heart",
      title: "Vive",
      description: "Experiencias inolvidables"
    }
  ];

  return (
    <section className="home__final-cta">
      <div className="home__final-cta-container">
        {/* Background decorativo */}
        <div className="home__final-cta-bg">
          <div className="home__final-cta-circle home__final-cta-circle--1"></div>
          <div className="home__final-cta-circle home__final-cta-circle--2"></div>
          <div className="home__final-cta-circle home__final-cta-circle--3"></div>
        </div>

        {/* Contenido principal */}
        <div className="home__final-cta-content">
          <div className="home__final-cta-badge">
            <i className="fa-solid fa-star"></i>
            <span>Tu próxima aventura te espera</span>
          </div>
          
          <h2 className="home__final-cta-title">
            Madrid nunca duerme,
            <span className="home__final-cta-highlight"> ¿y tú?</span>
          </h2>
          
          <p className="home__final-cta-description">
            Más de 5.000 usuarios activos descubren cada noche experiencias únicas. 
            Desde cenas exclusivas hasta fiestas legendarias, tu plan perfecto está 
            a un clic de distancia.
          </p>

          {/* Cards interactivas */}
          <div className="home__final-cta-cards">
            {ctaFeatures.map((feature) => (
              <div key={feature.id} className="home__final-cta-card">
                <div className="home__final-cta-card-icon">
                  <i className={feature.icon}></i>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Botones de acción principales */}
          <div className="home__final-cta-actions">
            <Link to="/places" className="home__final-cta-primary">
              <span className="home__final-cta-btn-text">Explorar Madrid</span>
              <div className="home__final-cta-btn-icon">
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </Link>
            
            <Link to="/register" className="home__final-cta-secondary">
              <i className="fa-solid fa-user-plus"></i>
              <span>Crear cuenta gratuita</span>
            </Link>
          </div>

          {/* Footer con garantía social */}
          <div className="home__final-cta-footer">
            <div className="home__final-cta-avatars">
              <img src="https://unavatar.io/github/user1" alt="Usuario" />
              <img src="https://unavatar.io/github/user2" alt="Usuario" />
              <img src="https://unavatar.io/github/user3" alt="Usuario" />
              <img src="https://unavatar.io/github/user4" alt="Usuario" />
              <div className="home__final-cta-more">+1K</div>
            </div>
            <p className="home__final-cta-social-proof">
              Se unieron esta semana a la comunidad nocturna de Madrid
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FinalCTASection; 