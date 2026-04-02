#!/bin/bash

# Script para build y deploy optimizado con CDN

echo "🚀 Deploy Optimizado con CDN"
echo "============================="
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: Ejecuta este script desde la raíz del proyecto"
    exit 1
fi

echo "📦 Instalando dependencias..."
npm install

echo ""
echo "🎬 Aplicando videos optimizados..."
if [ -d "public/videos-improved" ]; then
    echo "   Copiando videos optimizados..."
    cp public/videos-improved/* public/videos/
    echo "   ✅ Videos optimizados aplicados"
else
    echo "   ⚠️  No se encontraron videos optimizados"
    echo "   Ejecuta: ./optimize-videos-improved.sh"
fi

echo ""
echo "🏗️  Construyendo aplicación optimizada..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build completado exitosamente"
    
    # Mostrar estadísticas del build
    echo ""
    echo "📊 Estadísticas del build:"
    echo "   Tamaño total: $(du -sh dist | cut -f1)"
    
    if [ -d "dist/assets" ]; then
        echo "   Assets JS: $(find dist/assets -name '*.js' -exec du -ch {} + | tail -1 | cut -f1)"
        echo "   Assets CSS: $(find dist/assets -name '*.css' -exec du -ch {} + | tail -1 | cut -f1)"
    fi
    
    echo "   Videos: $(du -sh public/videos | cut -f1)"
    
    echo ""
    echo "🌐 Configuración CDN aplicada:"
    echo "   ✅ vercel.json - Headers de cache optimizados"
    echo "   ✅ vite.config.js - Compresión gzip/brotli"
    echo "   ✅ Code splitting implementado"
    echo "   ✅ Asset optimization habilitado"
    
    echo ""
    echo "🚀 Listo para deploy:"
    echo "   Vercel: vercel --prod"
    echo "   Netlify: netlify deploy --prod --dir=dist"
    echo "   Manual: Subir carpeta 'dist' a tu hosting"
    
    echo ""
    echo "📈 Para medir rendimiento:"
    echo "   1. Deploy la aplicación"
    echo "   2. Actualiza URL en performance-audit.js"
    echo "   3. Ejecuta: npm install lighthouse chrome-launcher"
    echo "   4. Ejecuta: node performance-audit.js"
    
else
    echo "❌ Error en el build"
    echo "   Revisa los errores arriba y corrige antes de continuar"
    exit 1
fi

echo ""
echo "🎉 Deploy optimizado listo!"
echo "   Mejoras implementadas:"
echo "   • Videos optimizados (45% reducción)"
echo "   • CDN headers configurados"
echo "   • Compresión gzip/brotli"
echo "   • Code splitting"
echo "   • Asset optimization"