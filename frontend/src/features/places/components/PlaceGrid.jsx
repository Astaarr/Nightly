import { useState, useEffect } from 'react';

function Grid({ children, itemsPerPage = 12 }) {
    const [currentPage, setCurrentPage] = useState(1);
    
    // Convertir children a array si no lo es
    const childrenArray = Array.isArray(children) ? children : [children];
    
    // Calcular el total de páginas
    const totalPages = Math.ceil(childrenArray.length / itemsPerPage);
    
    // Obtener los elementos de la página actual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = childrenArray.slice(startIndex, endIndex);

    // Función para scroll suave hacia arriba
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Scroll hacia arriba cuando cambie la página
        scrollToTop();
    };

    // Effect para resetear la página actual cuando cambie el número de elementos
    useEffect(() => {
        setCurrentPage(1);
    }, [childrenArray.length]);

    return (
        <div className="events-container">
            <div className="events">
                {currentItems}
            </div>
            
            {totalPages > 1 && (
                <div className="pagination">
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="pagination__button"
                    >
                        Anterior
                    </button>
                    
                    <span className="pagination__info">
                        {currentPage} de {totalPages}
                    </span>
                    
                    <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="pagination__button"
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
}

export default Grid;