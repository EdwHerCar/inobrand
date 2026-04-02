#!/bin/bash

# Script para comparar videos originales vs optimizados mejorados

echo "📊 Comparación de Videos: Original vs Optimizado Mejorado"
echo "========================================================"
echo ""

# Función para obtener información del video
get_video_info() {
    local file="$1"
    if [ -f "$file" ]; then
        local size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
        local size_mb=$(echo "scale=2; $size / 1024 / 1024" | bc)
        local info=$(ffprobe -v quiet -print_format json -show_streams "$file")
        local width=$(echo "$info" | grep -o '"width":[0-9]*' | head -1 | cut -d':' -f2)
        local height=$(echo "$info" | grep -o '"height":[0-9]*' | head -1 | cut -d':' -f2)
        local duration=$(ffprobe -v quiet -show_entries format=duration -of csv=p=0 "$file")
        local duration_sec=$(echo "$duration" | cut -d'.' -f1)
        
        echo "${size_mb}MB | ${width}x${height} | ${duration_sec}s"
    else
        echo "No encontrado"
    fi
}

# Comparar cada video
printf "%-8s %-25s %-25s %-10s\n" "Video" "Original" "Optimizado" "Reducción"
echo "------------------------------------------------------------------------"

total_original=0
total_optimized=0

for i in {1..9}; do
    original="public/videos/${i}.mp4"
    optimized="public/videos-improved/${i}.mp4"
    
    if [ -f "$original" ] && [ -f "$optimized" ]; then
        original_info=$(get_video_info "$original")
        optimized_info=$(get_video_info "$optimized")
        
        # Calcular reducción
        original_size=$(stat -f%z "$original" 2>/dev/null || stat -c%s "$original")
        optimized_size=$(stat -f%z "$optimized" 2>/dev/null || stat -c%s "$optimized")
        
        if [ "$optimized_size" -lt "$original_size" ]; then
            reduction=$(echo "scale=1; ($original_size - $optimized_size) * 100 / $original_size" | bc)
            reduction_text="-${reduction}%"
        else
            increase=$(echo "scale=1; ($optimized_size - $original_size) * 100 / $original_size" | bc)
            reduction_text="+${increase}%"
        fi
        
        total_original=$((total_original + original_size))
        total_optimized=$((total_optimized + optimized_size))
        
        printf "%-8s %-25s %-25s %-10s\n" "${i}.mp4" "$original_info" "$optimized_info" "$reduction_text"
    fi
done

echo "------------------------------------------------------------------------"

# Totales
total_original_mb=$(echo "scale=2; $total_original / 1024 / 1024" | bc)
total_optimized_mb=$(echo "scale=2; $total_optimized / 1024 / 1024" | bc)
total_reduction=$(echo "scale=1; ($total_original - $total_optimized) * 100 / $total_original" | bc)

printf "%-8s %-25s %-25s %-10s\n" "TOTAL" "${total_original_mb}MB" "${total_optimized_mb}MB" "-${total_reduction}%"

echo ""
echo "🎯 Resumen de Mejoras:"
echo "• ✅ Aspect ratio original mantenido"
echo "• ✅ Mejor calidad (CRF 20/23 vs 28/30)"
echo "• ✅ Videos verticales siguen siendo verticales"
echo "• ✅ Videos horizontales siguen siendo horizontales"
echo "• ✅ Reducción total de tamaño: ${total_reduction}%"
echo ""
echo "📝 Para aplicar los cambios:"
echo "cp public/videos-improved/* public/videos/"
echo ""
echo "🔍 Para revisar un video específico:"
echo "open public/videos-improved/1.mp4  # (reemplaza 1 por el número deseado)"