function ReviewsSection() {
  const reviews = [
    {
      id: 1,
      name: "María González",
      rating: 5,
      comment: "Nightly me ayudó a encontrar lugares increíbles que nunca habría descubierto por mi cuenta. ¡La recomendación personalizada es perfecta!",
      avatar: "https://unavatar.io/github/maria-gonzalez",
    },
    {
      id: 2,
      name: "Carlos Ruiz",
      rating: 5,
      comment: "Increíble variedad de planes y eventos. La interfaz es muy intuitiva y siempre encuentro algo que hacer los fines de semana.",
      avatar: "https://unavatar.io/github/carlos-ruiz",
    },
    {
      id: 3,
      name: "Ana Martín",
      rating: 4,
      comment: "Perfecto para descubrir la vida nocturna madrileña. He encontrado sitios únicos y he conocido gente genial en los eventos.",
      avatar: "https://unavatar.io/github/ana-martin",
    },
    {
      id: 4,
      name: "Diego Fernández",
      rating: 5,
      comment: "La mejor app para salir en Madrid. Cada recomendación ha sido un acierto total. Me encanta poder reservar directamente desde la app.",
      avatar: "https://unavatar.io/github/diego-fernandez",
    },
    {
      id: 5,
      name: "Laura Sánchez",
      rating: 5,
      comment: "Gracias a Nightly he descubierto mi restaurante favorito y los mejores rooftops de la ciudad. ¡No puedo vivir sin esta app!",
      avatar: "https://unavatar.io/github/laura-sanchez",
    },
    {
      id: 6,
      name: "Javier López",
      rating: 4,
      comment: "Excelente para encontrar planes de último momento. La función de eventos cercanos es genial y siempre hay algo interesante.",
      avatar: "https://unavatar.io/github/javier-lopez",
    },
    {
      id: 7,
      name: "Sofia Ramírez",
      rating: 5,
      comment: "Como nueva en Madrid, Nightly fue mi salvación. Me ayudó a conocer la ciudad y hacer amigos en poco tiempo. ¡Súper recomendada!",
      avatar: "https://unavatar.io/github/sofia-ramirez",
    },
    {
      id: 8,
      name: "Miguel Torres",
      rating: 5,
      comment: "Uso Nightly cada semana y siempre encuentro planes perfectos. La calidad de las recomendaciones es impresionante.",
      avatar: "https://unavatar.io/github/miguel-torres",
    },
    {
      id: 9,
      name: "Carmen Jiménez",
      rating: 4,
      comment: "Me encanta poder ver las valoraciones reales de otros usuarios. Nunca me han fallado las recomendaciones de 5 estrellas.",
      avatar: "https://unavatar.io/github/carmen-jimenez",
    },
    {
      id: 10,
      name: "Roberto García",
      rating: 5,
      comment: "Perfecto para citas románticas y salidas con amigos. Siempre encuentro el lugar ideal según el mood del momento.",
      avatar: "https://unavatar.io/github/roberto-garcia",
    },
  ];

  return (
    <section className="home__reviews">
      <h2 className="places__title">Lo que dicen nuestros usuarios</h2>
      <div className="home__reviews-carousel">
        <div className="home__reviews-track">
          {/* Duplicamos las reseñas para crear un loop infinito */}
          {[...reviews, ...reviews].map((review, index) => (
            <div key={`${review.id}-${index}`} className="home__review-item">
              <div className="home__review-rating">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`fa-solid fa-star ${
                      i < review.rating
                        ? "home__review-star--active"
                        : "home__review-star"
                    }`}
                  ></i>
                ))}
              </div>
              <p className="home__review-comment">"{review.comment}"</p>
              <div className="home__review-author">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="home__review-avatar"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://unavatar.io/fallback";
                  }}
                />
                <div className="home__review-name">{review.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReviewsSection; 