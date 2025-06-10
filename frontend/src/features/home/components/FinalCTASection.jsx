import { Link } from "react-router-dom";

function FinalCTASection() {
  return (
    <section className="home__final-cta">
      <div className="home__final-cta-container">
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

        <div className="home__final-cta-actions">
          <Link to="/places" className="home__final-cta-primary">
            <span>Explorar Madrid</span>
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
          
          <Link to="/register" className="home__final-cta-secondary">
            <i className="fa-solid fa-user-plus"></i>
            <span>Crear cuenta gratuita</span>
          </Link>
        </div>

        <p className="home__final-cta-social-proof">
          +1K usuarios se unieron esta semana
        </p>
      </div>
    </section>
  );
}

export default FinalCTASection; 