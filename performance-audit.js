#!/usr/bin/env node

// Script para auditar rendimiento web
// Requiere: npm install lighthouse puppeteer

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

const AUDIT_CONFIG = {
  // URL a auditar (cambiar por tu URL de producción)
  url: 'http://localhost:5173',
  // Configuración de Lighthouse
  options: {
    onlyCategories: ['performance'],
    formFactor: 'mobile',
    throttling: {
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 4
    }
  }
};

async function runAudit() {
  console.log('🚀 Iniciando auditoría de rendimiento...');
  console.log(`📱 URL: ${AUDIT_CONFIG.url}`);
  console.log('⏳ Esto puede tomar 1-2 minutos...');
  
  let chrome;
  
  try {
    // Lanzar Chrome
    chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--no-sandbox']
    });
    
    // Configurar opciones
    const options = {
      logLevel: 'info',
      output: 'json',
      port: chrome.port,
      ...AUDIT_CONFIG.options
    };
    
    // Ejecutar Lighthouse
    const runnerResult = await lighthouse(AUDIT_CONFIG.url, options);
    
    // Procesar resultados
    const report = runnerResult.lhr;
    const metrics = extractMetrics(report);
    
    // Mostrar resultados
    displayResults(metrics);
    
    // Guardar reporte detallado
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportPath = `performance-report-${timestamp}.json`;
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`\n📄 Reporte detallado guardado en: ${reportPath}`);
    
  } catch (error) {
    console.error('❌ Error durante la auditoría:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Sugerencias:');
      console.log('1. Asegúrate de que el servidor esté corriendo: npm run dev');
      console.log('2. Verifica que la URL sea correcta');
      console.log('3. Para auditar producción, cambia la URL en el script');
    }
    
  } finally {
    if (chrome) {
      await chrome.kill();
    }
  }
}

function extractMetrics(report) {
  const audits = report.audits;
  
  return {
    // Core Web Vitals
    lcp: audits['largest-contentful-paint']?.numericValue || 0,
    fid: audits['max-potential-fid']?.numericValue || 0,
    cls: audits['cumulative-layout-shift']?.numericValue || 0,
    
    // Otras métricas importantes
    fcp: audits['first-contentful-paint']?.numericValue || 0,
    si: audits['speed-index']?.numericValue || 0,
    tti: audits['interactive']?.numericValue || 0,
    
    // Métricas de recursos
    totalBytes: audits['total-byte-weight']?.numericValue || 0,
    unusedCss: audits['unused-css-rules']?.details?.overallSavingsBytes || 0,
    unusedJs: audits['unused-javascript']?.details?.overallSavingsBytes || 0,
    
    // Score general
    performanceScore: report.categories.performance.score * 100
  };
}

function displayResults(metrics) {
  console.log('\n📊 RESULTADOS DE RENDIMIENTO');
  console.log('================================');
  
  // Core Web Vitals
  console.log('\n🎯 Core Web Vitals:');
  console.log(`   LCP: ${(metrics.lcp / 1000).toFixed(2)}s ${getScoreEmoji(metrics.lcp, 2500, 4000)}`);
  console.log(`   FID: ${metrics.fid.toFixed(0)}ms ${getScoreEmoji(metrics.fid, 100, 300)}`);
  console.log(`   CLS: ${metrics.cls.toFixed(3)} ${getScoreEmoji(metrics.cls, 0.1, 0.25, true)}`);
  
  // Otras métricas
  console.log('\n⚡ Otras métricas:');
  console.log(`   FCP: ${(metrics.fcp / 1000).toFixed(2)}s`);
  console.log(`   SI:  ${(metrics.si / 1000).toFixed(2)}s`);
  console.log(`   TTI: ${(metrics.tti / 1000).toFixed(2)}s`);
  
  // Recursos
  console.log('\n📦 Recursos:');
  console.log(`   Total: ${(metrics.totalBytes / 1024 / 1024).toFixed(2)} MB`);
  if (metrics.unusedCss > 0) {
    console.log(`   CSS no usado: ${(metrics.unusedCss / 1024).toFixed(0)} KB`);
  }
  if (metrics.unusedJs > 0) {
    console.log(`   JS no usado: ${(metrics.unusedJs / 1024).toFixed(0)} KB`);
  }
  
  // Score general
  console.log(`\n🏆 Score de rendimiento: ${metrics.performanceScore.toFixed(0)}/100 ${getPerformanceEmoji(metrics.performanceScore)}`);
  
  // Recomendaciones
  console.log('\n💡 Recomendaciones:');
  
  if (metrics.lcp > 2500) {
    console.log('   • Optimizar LCP: Implementar CDN, comprimir imágenes/videos');
  }
  
  if (metrics.totalBytes > 3 * 1024 * 1024) {
    console.log('   • Reducir tamaño total: Lazy loading, code splitting');
  }
  
  if (metrics.unusedCss > 50 * 1024) {
    console.log('   • Eliminar CSS no usado');
  }
  
  if (metrics.unusedJs > 100 * 1024) {
    console.log('   • Eliminar JavaScript no usado');
  }
  
  if (metrics.performanceScore < 90) {
    console.log('   • Implementar CDN para mejorar score general');
  }
}

function getScoreEmoji(value, good, poor, reverse = false) {
  if (reverse) {
    return value <= good ? '✅' : value <= poor ? '⚠️' : '❌';
  }
  return value <= good ? '✅' : value <= poor ? '⚠️' : '❌';
}

function getPerformanceEmoji(score) {
  if (score >= 90) return '🚀';
  if (score >= 70) return '⚡';
  if (score >= 50) return '⚠️';
  return '🐌';
}

// Verificar dependencias
function checkDependencies() {
  try {
    require('lighthouse');
    require('chrome-launcher');
    return true;
  } catch (error) {
    console.log('❌ Dependencias faltantes.');
    console.log('\n📦 Para instalar:');
    console.log('npm install --save-dev lighthouse chrome-launcher');
    console.log('\n🔧 Luego ejecuta:');
    console.log('node performance-audit.js');
    return false;
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  if (checkDependencies()) {
    runAudit();
  }
}

module.exports = { runAudit, extractMetrics };