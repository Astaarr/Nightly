import multer from 'multer';

// Middleware para manejar errores de multer
export const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        message: 'El archivo es demasiado grande. El tamaño máximo permitido es 5MB.'
      });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        message: 'Tipo de archivo no permitido. Solo se aceptan imágenes.'
      });
    }
    return res.status(400).json({
      message: 'Error al procesar el archivo: ' + error.message
    });
  }
  
  if (error.message === 'Solo se permiten archivos de imagen') {
    return res.status(400).json({
      message: 'Solo se permiten archivos de imagen (JPG, PNG, GIF, etc.)'
    });
  }
  
  next(error);
}; 