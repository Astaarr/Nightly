import { useState } from 'react';

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

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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