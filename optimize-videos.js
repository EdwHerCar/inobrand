const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuración de optimización para web
const VIDEO_CONFIG = {
  // Configuración para video principal (más calidad)
  main: {
    crf: 23,        // Calidad (18-28, menor = mejor calidad)
    maxrate: '2M',  // Bitrate máximo
    bufsize: '4M',  // Buffer size
    scale: '1280:720' // Resolución máxima
  },
  // Configuración para videos secundarios (más compresión)
  secondary: {
    crf: 28,
    maxrate: '1M',
    bufsize: '2M',
    scale: '854:480'
  }
};

const videosDir = path.join(__dirname, 'public', 'videos');
const optimizedDir = path.join(__dirname, 'public', 'videos-optimized');

// Crear directorio de salida
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

// Función para optimizar un video
function optimizeVideo(inputFile, outputFile, config) {
  return new Promise((resolve, reject) => {
    const ffmpegCommand = `ffmpeg -i "${inputFile}" \
      -c:v libx264 \
      -crf ${config.crf} \
      -maxrate ${config.maxrate} \
      -bufsize ${config.bufsize} \
      -vf "scale=${config.scale}:force_original_aspect_ratio=decrease,pad=${config.scale}:(ow-iw)/2:(oh-ih)/2" \
      -c:a aac \
      -b:a 128k \
      -movflags +faststart \
      -preset medium \
      -y "${outputFile}"`;

    console.log(`Optimizando: ${path.basename(inputFile)}...`);
    
    exec(ffmpegCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error optimizando ${inputFile}:`, error.message);
        reject(error);
        return;
      }
      
      // Mostrar estadísticas de compresión
      const originalSize = fs.statSync(inputFile).size;
      const optimizedSize = fs.statSync(outputFile).size;
      const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
      
      console.log(`✅ ${path.basename(inputFile)} optimizado:`);
      console.log(`   Original: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   Optimizado: ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   Reducción: ${reduction}%\n`);
      
      resolve();
    });
  });
}

// Función principal
async function optimizeAllVideos() {
  try {
    // Verificar si FFmpeg está instalado
    await new Promise((resolve, reject) => {
      exec('ffmpeg -version', (error) => {
        if (error) {
          console.error('❌ FFmpeg no está instalado.');
          console.log('Para instalar FFmpeg:');
          console.log('macOS: brew install ffmpeg');
          console.log('Ubuntu: sudo apt install ffmpeg');
          console.log('Windows: Descargar desde https://ffmpeg.org/download.html');
          reject(error);
        } else {
          console.log('✅ FFmpeg encontrado\n');
          resolve();
        }
      });
    });

    // Obtener lista de videos
    const videoFiles = fs.readdirSync(videosDir)
      .filter(file => file.endsWith('.mp4'))
      .sort();

    if (videoFiles.length === 0) {
      console.log('No se encontraron archivos MP4 en el directorio de videos.');
      return;
    }

    console.log(`Encontrados ${videoFiles.length} videos para optimizar:\n`);

    // Optimizar cada video
    for (const videoFile of videoFiles) {
      const inputPath = path.join(videosDir, videoFile);
      const outputPath = path.join(optimizedDir, videoFile);
      
      // Usar configuración principal para video 9.mp4, secundaria para el resto
      const config = videoFile === '9.mp4' ? VIDEO_CONFIG.main : VIDEO_CONFIG.secondary;
      
      await optimizeVideo(inputPath, outputPath, config);
    }

    console.log('🎉 Optimización completada!');
    console.log(`Videos optimizados guardados en: ${optimizedDir}`);
    console.log('\n📝 Próximos pasos:');
    console.log('1. Revisa los videos optimizados');
    console.log('2. Si estás satisfecho con la calidad, reemplaza los originales');
    console.log('3. Considera usar un CDN para servir los videos');

  } catch (error) {
    console.error('Error durante la optimización:', error.message);
  }
}

// Ejecutar optimización
optimizeAllVideos();