#!/bin/bash

# Script para optimizar videos MP4 para web
# Requiere FFmpeg instalado

echo "🎬 Optimizador de Videos para Web"
echo "==================================="

# Verificar si FFmpeg está instalado
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ FFmpeg no está instalado."
    echo ""
    echo "Para instalar FFmpeg:"
    echo "macOS:    brew install ffmpeg"
    echo "Ubuntu:   sudo apt install ffmpeg"
    echo "Windows:  Descargar desde https://ffmpeg.org/download.html"
    echo ""
    exit 1
fi

echo "✅ FFmpeg encontrado"
echo ""

# Crear directorio de salida
mkdir -p public/videos-optimized

# Configuraciones de optimización
MAIN_CRF=23      # Calidad para video principal (9.mp4)
SECONDARY_CRF=28 # Calidad para videos secundarios
MAIN_SCALE="1280:720"     # Resolución para video principal
SECONDARY_SCALE="854:480" # Resolución para videos secundarios

# Función para optimizar video
optimize_video() {
    local input_file="$1"
    local output_file="$2"
    local crf="$3"
    local scale="$4"
    local maxrate="$5"
    local bufsize="$6"
    
    echo "Optimizando: $(basename "$input_file")..."
    
    ffmpeg -i "$input_file" \
        -c:v libx264 \
        -crf $crf \
        -maxrate $maxrate \
        -bufsize $bufsize \
        -vf "scale=$scale:force_original_aspect_ratio=decrease,pad=$scale:(ow-iw)/2:(oh-ih)/2" \
        -c:a aac \
        -b:a 128k \
        -movflags +faststart \
        -preset medium \
        -y "$output_file"
    
    if [ $? -eq 0 ]; then
        # Calcular estadísticas
        original_size=$(stat -f%z "$input_file" 2>/dev/null || stat -c%s "$input_file")
        optimized_size=$(stat -f%z "$output_file" 2>/dev/null || stat -c%s "$output_file")
        
        original_mb=$(echo "scale=2; $original_size / 1024 / 1024" | bc)
        optimized_mb=$(echo "scale=2; $optimized_size / 1024 / 1024" | bc)
        reduction=$(echo "scale=1; ($original_size - $optimized_size) * 100 / $original_size" | bc)
        
        echo "✅ $(basename "$input_file") optimizado:"
        echo "   Original: ${original_mb} MB"
        echo "   Optimizado: ${optimized_mb} MB"
        echo "   Reducción: ${reduction}%"
        echo ""
    else
        echo "❌ Error optimizando $(basename "$input_file")"
        echo ""
    fi
}

# Procesar todos los videos MP4
for video in public/videos/*.mp4; do
    if [ -f "$video" ]; then
        filename=$(basename "$video")
        output="public/videos-optimized/$filename"
        
        # Usar configuración específica según el video
        if [ "$filename" = "9.mp4" ]; then
            # Video principal - mayor calidad
            optimize_video "$video" "$output" $MAIN_CRF "$MAIN_SCALE" "2M" "4M"
        else
            # Videos secundarios - mayor compresión
            optimize_video "$video" "$output" $SECONDARY_CRF "$SECONDARY_SCALE" "1M" "2M"
        fi
    fi
done

echo "🎉 Optimización completada!"
echo "Videos optimizados guardados en: public/videos-optimized/"
echo ""
echo "📝 Próximos pasos:"
echo "1. Revisa los videos optimizados"
echo "2. Si estás satisfecho con la calidad, reemplaza los originales:"
echo "   cp public/videos-optimized/* public/videos/"
echo "3. Considera usar un CDN para servir los videos"
echo "4. Implementa lazy loading progresivo"