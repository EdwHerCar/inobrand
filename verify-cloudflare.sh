#!/bin/bash

# Script para verificar configuración de Cloudflare

echo "🌐 Verificación de Cloudflare"
echo "============================="
echo ""

# Solicitar dominio al usuario
read -p "🔗 Ingresa tu dominio (ej: midominio.com): " DOMAIN

if [ -z "$DOMAIN" ]; then
    echo "❌ Error: Debes ingresar un dominio"
    exit 1
fi

# Añadir https si no está presente
if [[ ! $DOMAIN =~ ^https?:// ]]; then
    DOMAIN="https://$DOMAIN"
fi

echo "📡 Verificando: $DOMAIN"
echo ""

# Función para verificar headers
check_headers() {
    local url="$1"
    local description="$2"
    
    echo "🔍 Verificando $description..."
    
    # Obtener headers
    local headers=$(curl -s -I "$url" 2>/dev/null)
    
    if [ $? -ne 0 ]; then
        echo "   ❌ Error: No se pudo conectar a $url"
        return 1
    fi
    
    # Verificar Cloudflare
    if echo "$headers" | grep -qi "cf-ray\|cloudflare"; then
        echo "   ✅ Cloudflare detectado"
        
        # Extraer CF-Ray
        local cf_ray=$(echo "$headers" | grep -i "cf-ray" | cut -d':' -f2 | tr -d ' \r')
        if [ ! -z "$cf_ray" ]; then
            echo "   📍 CF-Ray: $cf_ray"
        fi
        
        # Verificar cache status
        local cache_status=$(echo "$headers" | grep -i "cf-cache-status" | cut -d':' -f2 | tr -d ' \r')
        if [ ! -z "$cache_status" ]; then
            echo "   💾 Cache Status: $cache_status"
        else
            echo "   ⚠️  Cache Status: No disponible (primera carga)"
        fi
        
    else
        echo "   ❌ Cloudflare NO detectado"
        echo "   💡 Verifica que los DNS estén configurados correctamente"
        return 1
    fi
    
    # Verificar HTTPS
    if echo "$headers" | grep -qi "HTTP/2\|HTTP/3"; then
        local http_version=$(echo "$headers" | head -1 | cut -d' ' -f1)
        echo "   🔒 Protocolo: $http_version"
    fi
    
    # Verificar compresión
    local encoding=$(echo "$headers" | grep -i "content-encoding" | cut -d':' -f2 | tr -d ' \r')
    if [ ! -z "$encoding" ]; then
        echo "   📦 Compresión: $encoding"
    fi
    
    # Verificar cache-control
    local cache_control=$(echo "$headers" | grep -i "cache-control" | cut -d':' -f2 | tr -d ' \r')
    if [ ! -z "$cache_control" ]; then
        echo "   ⏰ Cache-Control: $cache_control"
    fi
    
    echo ""
}

# Verificar página principal
check_headers "$DOMAIN" "página principal"

# Verificar video (si existe)
check_headers "$DOMAIN/videos/1.mp4" "video de prueba"

# Verificar assets
check_headers "$DOMAIN/assets/" "assets estáticos"

# Test de velocidad básico
echo "⚡ Test de velocidad básico..."
start_time=$(date +%s.%N)
curl -s -o /dev/null "$DOMAIN"
end_time=$(date +%s.%N)
load_time=$(echo "$end_time - $start_time" | bc)
echo "   ⏱️  Tiempo de respuesta: ${load_time}s"
echo ""

# Verificar DNS
echo "🔍 Verificación DNS..."
domain_only=$(echo "$DOMAIN" | sed 's|https\?://||' | sed 's|/.*||')
nslookup_result=$(nslookup "$domain_only" 2>/dev/null)

if echo "$nslookup_result" | grep -q "cloudflare"; then
    echo "   ✅ DNS apunta a Cloudflare"
else
    echo "   ⚠️  DNS podría no estar configurado para Cloudflare"
    echo "   📋 Resultado nslookup:"
    echo "$nslookup_result" | grep "Address" | head -3
fi
echo ""

# Verificar SSL
echo "🔒 Verificación SSL..."
ssl_info=$(echo | openssl s_client -servername "$domain_only" -connect "$domain_only:443" 2>/dev/null | openssl x509 -noout -issuer 2>/dev/null)

if echo "$ssl_info" | grep -qi "cloudflare"; then
    echo "   ✅ Certificado SSL de Cloudflare"
else
    echo "   ⚠️  Certificado SSL no es de Cloudflare"
    echo "   📋 Emisor: $ssl_info"
fi
echo ""

# Recomendaciones
echo "💡 Recomendaciones:"
echo ""

echo "📊 Para verificar rendimiento completo:"
echo "   • PageSpeed Insights: https://pagespeed.web.dev/analysis?url=$DOMAIN"
echo "   • GTmetrix: https://gtmetrix.com/"
echo "   • WebPageTest: https://www.webpagetest.org/"
echo ""

echo "⚙️  Para configurar optimizaciones:"
echo "   1. Ve a tu dashboard de Cloudflare"
echo "   2. Configura Page Rules para /videos/*"
echo "   3. Activa Auto Minify y Brotli"
echo "   4. Revisa la guía: cloudflare-setup.md"
echo ""

echo "🔄 Para verificar cache:"
echo "   • Primera carga: cf-cache-status = MISS"
echo "   • Segunda carga: cf-cache-status = HIT"
echo "   • Purgar cache si necesario desde Cloudflare dashboard"
echo ""

echo "🎉 Verificación completada!"
echo "Si ves ✅ en las verificaciones principales, Cloudflare está funcionando correctamente."