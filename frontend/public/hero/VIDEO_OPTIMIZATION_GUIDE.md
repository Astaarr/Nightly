# Guía de Optimización de Video para Hero

## Archivos de Video Necesarios

Coloca estos archivos en la carpeta `frontend/public/hero/`:

1. **nightly-hero.webm** (formato principal, mejor compresión)
2. **nightly-hero.mp4** (formato de respaldo, mayor compatibilidad)
3. **img01-min.jpg** (imagen de poster/fallback)

## Especificaciones Técnicas Recomendadas

### Resolución y Duración
- **Resolución**: 1920x1080 (Full HD) máximo
- **Duración**: 10-30 segundos (loop perfecto)
- **Aspect Ratio**: 16:9

### Formato WebM (Prioritario)
```bash
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 1M -c:a libopus -b:a 128k nightly-hero.webm
```

### Formato MP4 (Respaldo)
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -b:v 1.5M -c:a aac -b:a 128k nightly-hero.mp4
```

## Optimizaciones Implementadas en el Código

### HTML5 Video Attributes
- `preload="metadata"`: Carga solo metadatos, no el video completo
- `muted`: Necesario para autoplay en navegadores modernos
- `autoplay`: Inicia automáticamente
- `loop`: Reproducción continua
- `playsInline`: Evita pantalla completa en móviles
- `poster`: Imagen de fallback mientras carga

### CSS Optimizations
- `object-fit: cover`: Mantiene aspect ratio sin distorsión
- `will-change: auto`: Optimización de GPU cuando sea necesario
- `transform: translateZ(0)`: Activa aceleración por hardware
- `backface-visibility: hidden`: Mejora el rendering

## Mejores Prácticas

### Tamaño de Archivo
- WebM: **< 2MB** para carga rápida
- MP4: **< 3MB** para compatibilidad

### Contenido del Video
- **Sin audio**: Los videos de hero deben estar en silencio
- **Loop perfecto**: El final debe conectar suavemente con el inicio
- **Colores oscuros**: Para que el texto blanco se lea bien
- **Movimiento sutil**: Evitar movimientos bruscos que distraigan

### Consideraciones de Red
- **Conexiones lentas**: El poster se muestra inmediatamente
- **Datos móviles**: El video se carga progresivamente
- **Fallos de red**: Graceful fallback a imagen estática

## Testing

### Verificar en diferentes navegadores:
- Chrome/Edge (WebM + MP4)
- Firefox (WebM + MP4)  
- Safari (MP4 principalmente)
- Mobile browsers (iOS/Android)

### Verificar rendimiento:
- Lighthouse Performance Score
- Network tab en DevTools
- Mobile network throttling

## Comandos para Crear Videos de Prueba

Si necesitas crear un video de prueba rápido:

```bash
# Video de 15 segundos con texto
ffmpeg -f lavfi -i "color=c=black:s=1920x1080:d=15" -vf "drawtext=text='NIGHTLY':fontcolor=white:fontsize=100:x=(w-text_w)/2:y=(h-text_h)/2" -c:v libvpx-vp9 -crf 30 test-hero.webm
```

## Creación Rápida de Videos de Prueba

### Desde imágenes existentes (usando FFmpeg):
```bash
# Crear video de 15 segundos desde una imagen
ffmpeg -loop 1 -i /hero/fiesta-categoria.JPG -c:v libvpx-vp9 -t 15 -pix_fmt yuva420p -crf 30 -b:v 1M -an nightly-hero.webm

# Versión MP4
ffmpeg -loop 1 -i /hero/fiesta-categoria.JPG -c:v libx264 -t 15 -pix_fmt yuv420p -crf 28 -b:v 1.5M -an nightly-hero.mp4
```

### Con efecto de zoom lento:
```bash
# WebM con zoom suave
ffmpeg -loop 1 -i /hero/fiesta-categoria.JPG -c:v libvpx-vp9 -t 15 -vf "scale=2000:-1,zoompan=z='min(zoom+0.0015,1.3)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=375" -crf 30 -b:v 1M -an nightly-hero.webm
```

## Optimizaciones HTML5 Implementadas

### Atributos adicionales añadidos:
- `disablePictureInPicture`: Evita el modo picture-in-picture
- `disableRemotePlayback`: Previene reproducción en dispositivos remotos
- `contain: layout style paint`: CSS containment para mejor rendimiento

## Fallbacks de Emergencia

Si no tienes video personalizado, el código actual usará:
- **Poster**: `/hero/fiesta-categoria.JPG` (imagen existente)
- **Mensaje de error**: "Tu navegador no soporta video HTML5"
- **CSS fallback**: El overlay y contenido se mantienen visibles

## Comandos para Testing Local

### Servidor local simple para testing:
```bash
# En la carpeta frontend
npm start
# O con servidor Python simple en public/
python -m http.server 8000
```

### Verificar rendimiento:
1. Abrir DevTools → Network
2. Throttle a "Slow 3G"
3. Verificar tiempo de carga del poster
4. Confirmar carga progresiva del video 