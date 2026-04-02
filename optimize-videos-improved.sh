#!/bin/bash

# Script mejorado para optimizar videos MP4 para web
# Mantiene aspect ratio original y mejora calidad

echo "🎬 Optimizador de Videos Mejorado para Web"
echo "============================================"

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
mkdir -p public/videos-improved

# Configuraciones mejoradas de optimización
MAIN_CRF=20      # Mejor calidad para video principal (9.mp4)
SECONDARY_CRF=23 # Mejor calidad para videos secundarios

# Función para optimizar video manteniendo aspect ratio original
optimize_video_improved() {
    local input_file="$1"
    local output_file="$2"
    local crf="$3"
    local maxrate="$4"
    local bufsize="$5"
    local max_width="$6"
    
    echo "Optimizando: $(basename "$input_file")..."
    
    # Obtener información del video original
    local video_info=$(ffprobe -v quiet -print_format json -show_streams "$input_file")
    local width=$(echo "$video_info" | grep -o '"width":[0-9]*' | head -1 | cut -d':' -f2)
    local height=$(echo "$video_info" | grep -o '"height":[0-9]*' | head -1 | cut -d':' -f2)
    
    echo "   Resolución original: ${width}x${height}"
    
    # Determinar si es vertical u horizontal
    if [ "$height" -gt "$width" ]; then
        echo "   Formato: Vertical (manteniendo aspect ratio)"
        # Para videos verticales, limitar altura máxima y asegurar dimensiones pares
        local scale_filter="scale='min($max_width,iw)':'min(1280,ih)':force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2"
    else
        echo "   Formato: Horizontal (manteniendo aspect ratio)"
        # Para videos horizontales, limitar ancho máximo y asegurar dimensiones pares
        local scale_filter="scale='min($max_width,iw)':'min(720,ih)':force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2"
    fi
    
    ffmpeg -i "$input_file" \
        -c:v libx264 \
        -crf $crf \
        -maxrate $maxrate \
        -bufsize $bufsize \
        -vf "$scale_filter" \
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
        
        # Obtener resolución final
        local final_info=$(ffprobe -v quiet -print_format json -show_streams "$output_file")
        local final_width=$(echo "$final_info" | grep -o '"width":[0-9]*' | head -1 | cut -d':' -f2)
        local final_height=$(echo "$final_info" | grep -o '"height":[0-9]*' | head -1 | cut -d':' -f2)
        
        echo "✅ $(basename "$input_file") optimizado:"
        echo "   Original: ${original_mb} MB (${width}x${height})"
        echo "   Optimizado: ${optimized_mb} MB (${final_width}x${final_height})"
        echo "   Reducción: ${reduction}%"
        echo "   Aspect ratio: Mantenido"
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
        output="public/videos-improved/$filename"
        
        # Usar configuración específica según el video
        if [ "$filename" = "9.mp4" ]; then
            # Video principal - mayor calidad y resolución
            optimize_video_improved "$video" "$output" $MAIN_CRF "2.5M" "5M" "1920"
        else
            # Videos secundarios - buena calidad pero más compresión
            optimize_video_improved "$video" "$output" $SECONDARY_CRF "1.5M" "3M" "1280"
        fi
    fi
done

echo "🎉 Optimización mejorada completada!"
echo "Videos optimizados guardados en: public/videos-improved/"
echo ""
echo "🔍 Mejoras aplicadas:"
echo "• Mejor calidad (CRF reducido)"
echo "• Aspect ratio original mantenido"
echo "• Sin padding forzado"
echo "• Resolución adaptativa según orientación"
echo ""
echo "📝 Próximos pasos:"
echo "1. Revisa los videos mejorados"
echo "2. Compara calidad y orientación"
echo "3. Si estás satisfecho: cp public/videos-improved/* public/videos/"
echo "4. Considera ajustar CRF si necesitas más/menos calidad"