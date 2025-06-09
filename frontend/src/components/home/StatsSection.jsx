function StatsSection() {
  const stats = [
    {
      id: 1,
      icon: "fa-solid fa-map-marked-alt",
      number: "1000+",
      label: "Lugares"
    },
    {
      id: 2,
      icon: "fa-solid fa-users",
      number: "5000+",
      label: "Usuarios activos"
    },
    {
      id: 3,
      icon: "fa-solid fa-star",
      number: "4.8",
      label: "Valoración media"
    },
    {
      id: 4,
      icon: "fa-solid fa-calendar-days",
      number: "500+",
      label: "Eventos mensuales"
    }
  ];

  return (
    <section className="home__stats-wrapper">
      {/* Mobile: Intro section */}
      <div className="home__stats-intro-mobile">
        <div className="home__stats-text">
          <h2 className="home__stats-title">Nightly en números</h2>
          <p className="home__stats-description">
            Miles de usuarios confían en Nightly para descubrir los mejores 
            planes nocturnos de Madrid. Cada día, ayudamos a más personas a 
            encontrar experiencias únicas que se adaptan perfectamente a sus gustos.
          </p>
        </div>
      </div>

      {/* Desktop + Mobile: Stats with text */}
      <div className="home__stats-container">
        {/* Stats Cards */}
        <div className="home__stats-cards">
          {stats.map((stat) => (
            <div key={stat.id} className="home__stat-section">
              <div className="home__stat-content">
                <div className="home__stat-card">
                  <div className="home__stat-icon">
                    <i className={stat.icon}></i>
                  </div>
                  <div className="home__stat-number">{stat.number}</div>
                  <div className="home__stat-label">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop sticky text */}
        <div className="home__stats-text-sticky">
          <div className="home__stats-text">
            <h2 className="home__stats-title">Nightly en números</h2>
            <p className="home__stats-description">
              Miles de usuarios confían en Nightly para descubrir los mejores 
              planes nocturnos de Madrid. Cada día, ayudamos a más personas a 
              encontrar experiencias únicas que se adaptan perfectamente a sus gustos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsSection; 