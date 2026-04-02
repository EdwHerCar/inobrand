# 🎬 Guía de Optimización de Videos para Web

Esta guía te ayudará a optimizar los archivos MP4 para mejorar el rendimiento en producción.

## 🚀 Problema Identificado

En producción, la VideoGallery puede experimentar:
- Carga lenta de videos
- Timeouts de red
- Errores ERR_ABORTED
- Alto consumo de ancho de banda

## 📋 Prerrequisitos

### Instalar FFmpeg

**macOS:**
```bash
brew install ffmpeg
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install ffmpeg
```

**Windows:**
1. Descargar desde [https://ffmpeg.org/download.html](https://ffmpeg.org/download.html)
2. Agregar al PATH del sistema

### Verificar instalación
```bash
ffmpeg -version
```

## 🛠️ Métodos de Optimización

### Opción 1: Script Bash (Recomendado)

```bash
# Ejecutar el script de optimización
./optimize-videos.sh
```

### Opción 2: Script Node.js

```bash
# Instalar dependencias si es necesario
npm install

# Ejecutar optimización
node optimize-videos.js
```

### Opción 3: Comandos Manuales

**Para video principal (9.mp4):**
```bash
ffmpeg -i public/videos/9.mp4 \
  -c:v libx264 \
  -crf 23 \
  -maxrate 2M \
  -bufsize 4M \
  -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  -preset medium \
  -y public/videos-optimized/9.mp4
```

**Para videos secundarios:**
```bash
ffmpeg -i public/videos/2.mp4 \
  -c:v libx264 \
  -crf 28 \
  -maxrate 1M \
  -bufsize 2M \
  -vf "scale=854:480:force_original_aspect_ratio=decrease,pad=854:480:(ow-iw)/2:(oh-ih)/2" \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  -preset medium \
  -y public/videos-optimized/2.mp4
```

## ⚙️ Configuraciones de Optimización

### Video Principal (9.mp4)
- **CRF:** 23 (alta calidad)
- **Resolución:** 1280x720
- **Bitrate máximo:** 2M
- **Audio:** AAC 128k

### Videos Secundarios (2-8.mp4)
- **CRF:** 28 (mayor compresión)
- **Resolución:** 854x480
- **Bitrate máximo:** 1M
- **Audio:** AAC 128k

### Parámetros Explicados

- **CRF (Constant Rate Factor):** 18-28, menor = mejor calidad
- **maxrate:** Bitrate máximo para evitar picos
- **bufsize:** Tamaño del buffer de red
- **movflags +faststart:** Optimiza para streaming web
- **preset medium:** Balance entre velocidad y compresión

## 📊 Resultados Esperados

- **Reducción de tamaño:** 40-70%
- **Carga más rápida:** 2-3x mejora
- **Menos errores de red:** Significativa reducción
- **Mejor experiencia móvil:** Especialmente notable

## 🔄 Proceso de Implementación

1. **Ejecutar optimización:**
   ```bash
   ./optimize-videos.sh
   ```

2. **Revisar resultados:**
   ```bash
   ls -la public/videos-optimized/
   ```

3. **Probar calidad:**
   - Abrir videos optimizados
   - Verificar calidad visual
   - Comprobar reproducción

4. **Reemplazar originales:**
   ```bash
   # Hacer backup
   cp -r public/videos public/videos-backup
   
   # Reemplazar con optimizados
   cp public/videos-optimized/* public/videos/
   ```

5. **Probar en desarrollo:**
   ```bash
   npm run dev
   ```

6. **Desplegar a producción:**
   ```bash
   npm run build
   # Subir a tu plataforma de hosting
   ```

## 🚀 Optimizaciones Adicionales

### 1. Lazy Loading Mejorado

Modificar `VideoGallery.jsx` para cargar videos progresivamente:

```javascript
// Cambiar preload según prioridad
preload={isMain ? "metadata" : "none"}
```

### 2. CDN para Videos

Considerar usar un CDN como:
- Cloudflare
- AWS CloudFront
- Vercel Edge Network

### 3. Formatos Modernos

Para navegadores modernos, considerar:
- WebM (VP9)
- AV1 (futuro)

### 4. Responsive Videos

Servir diferentes resoluciones según dispositivo:

```javascript
const getVideoSrc = (videoId, deviceType) => {
  const suffix = deviceType === 'mobile' ? '-mobile' : '';
  return `/videos/${videoId}${suffix}.mp4`;
};
```

## 🔍 Monitoreo y Métricas

### Herramientas de Análisis

1. **Chrome DevTools:**
   - Network tab
   - Performance tab
   - Lighthouse audit

2. **Métricas clave:**
   - Time to First Byte (TTFB)
   - Largest Contentful Paint (LCP)
   - Cumulative Layout Shift (CLS)

### Comandos de Prueba

```bash
# Simular conexión lenta
# En Chrome DevTools > Network > Throttling

# Analizar tamaño de archivos
du -h public/videos/*

# Comparar antes/después
du -sh public/videos public/videos-optimized
```

## 🐛 Solución de Problemas

### Error: "ffmpeg: command not found"
- Instalar FFmpeg según tu sistema operativo

### Error: "Permission denied"
```bash
chmod +x optimize-videos.sh
```

### Videos muy pixelados
- Reducir CRF (usar 20-25)
- Aumentar maxrate

### Archivos muy grandes
- Aumentar CRF (usar 28-32)
- Reducir resolución

## 📞 Soporte

Si encuentras problemas:
1. Verificar logs de FFmpeg
2. Probar con un solo video primero
3. Ajustar configuraciones según necesidades

---

**Nota:** Siempre haz backup de tus videos originales antes de reemplazarlos.