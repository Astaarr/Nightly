import { Link } from "react-router-dom";

function CategoriesSection() {
  const categories = [
    {
      id: 1,
      name: "Salir de Fiesta",
      image: "/hero/fiesta-categoria.JPG",
      description: "Descubre los mejores lugares para bailar y vivir la noche",
      categoryId: 1,
    },
    {
      id: 2,
      name: "Tomar Algo",
      image: "/hero/tomar-algo-categoria.JPG",
      description: "Bares y coctelerías para disfrutar de una buena bebida",
      categoryId: 2,
    },
    {
      id: 3,
      name: "Planes Gastronómicos",
      image: "/hero/plan-gastronomico-categoria.JPG",
      description: "Restaurantes y experiencias culinarias únicas",
      categoryId: 3,
    },
    {
      id: 4,
      name: "Planes con Acción",
      image: "/hero/plan-accion-categoria.JPG",
      description: "Aventuras y actividades llenas de adrenalina",
      categoryId: 4,
    },
    {
      id: 5,
      name: "Planes Culturales",
      image: "/hero/plan-cultural-categoria.JPG",
      description: "Arte, música y eventos culturales",
      categoryId: 5,
    },
  ];

  return (
    <section className="home__categories-wrapper">
      {/* Mobile: Intro section */}
      <div className="home__categories-intro-mobile">
        <div className="home__categories-text">
          <h2 className="home__categories-title">¿Te sientes aburrido?</h2>
          <p className="home__categories-description">
            Encuentra el plan perfecto que se adapte a tu estado de ánimo y
            preferencias. Desde aventuras gastronómicas hasta noches de baile
            desenfrenado, tenemos la experiencia ideal esperándote.
          </p>
        </div>
      </div>

      {/* Desktop + Mobile: Categories with text */}
      <div className="home__categories-container">
        {/* Desktop sticky text */}
        <div className="home__categories-text-sticky">
          <div className="home__categories-text">
            <h2 className="home__categories-title">¿Te sientes aburrido?</h2>
            <p className="home__categories-description">
              Encuentra el plan perfecto que se adapte a tu estado de ánimo y
              preferencias. Desde aventuras gastronómicas hasta noches de baile
              desenfrenado, tenemos la experiencia ideal esperándote.
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="home__categories-cards">
          {categories.map((category) => (
            <div key={category.id} className="home__category-section">
              <div className="home__category-content">
                <div className="home__category-image">
                  <img src={category.image} alt={category.name} />
                  <div className="home__category-overlay"></div>
                  <div className="home__category-info">
                    <h3 className="home__category-name">{category.name}</h3>
                    <p className="home__category-desc">
                      {category.description}
                    </p>
                    <Link
                      to={`/places?categoria=${category.categoryId}`}
                      className="home__category-button"
                    >
                      Ver Más
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoriesSection; 