#!/usr/bin/env node

/**
 * Script per tagliare un video mantenendo solo una porzione specificata
 * 
 * Requisiti:
 * - FFmpeg installato e disponibile nel PATH
 * - Node.js
 *
 * Uso:
 * node scripts/trim-video.js <input-video> <start-seconds> <duration-seconds> [output-video]
 * 
 * Esempi:
 * node scripts/trim-video.js video.mp4 0 40                    # Primi 40 secondi
 * node scripts/trim-video.js video.mp4 10 30                   # Da 10s a 40s (30 secondi)
 * node scripts/trim-video.js video.mp4 0 40 output.mp4         # Specifica output
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Verifica se FFmpeg è installato
 */
function checkFFmpeg() {
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    console.error('❌ FFmpeg non trovato. Installa FFmpeg per continuare.');
    console.error('   macOS: brew install ffmpeg');
    console.error('   Ubuntu/Debian: sudo apt install ffmpeg');
    console.error('   Windows: https://ffmpeg.org/download.html');
    return false;
  }
}

/**
 * Calcola la dimensione del file in MB
 */
function getFileSizeMB(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / (1024 * 1024)).toFixed(2);
}

/**
 * Taglia un video
 */
function trimVideo(inputPath, startSeconds, durationSeconds, outputPath) {
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ File non trovato: ${inputPath}`);
    return false;
  }

  const originalSize = getFileSizeMB(inputPath);
  console.log(`🎬 Tagliando video: ${path.basename(inputPath)}`);
  console.log(`   Inizio: ${startSeconds}s`);
  console.log(`   Durata: ${durationSeconds}s`);
  console.log(`   Dimensione originale: ${originalSize} MB`);

  // Se l'output è lo stesso dell'input, usa un file temporaneo
  const isSameFile = path.resolve(inputPath) === path.resolve(outputPath);
  const tempPath = isSameFile 
    ? outputPath.replace(/\.[^/.]+$/, '_temp.mp4')
    : outputPath;

  // Costruisce il comando FFmpeg
  // -ss: tempo di inizio
  // -t: durata del taglio
  // -c copy: copia i codec senza ri-encodare (molto più veloce)
  // -avoid_negative_ts make_zero: evita problemi con timestamp negativi
  let command = `ffmpeg -ss ${startSeconds} -i "${inputPath}" -t ${durationSeconds}`;
  command += ` -c copy -avoid_negative_ts make_zero`;
  command += ` -y "${tempPath}"`; // Sovrascrive file esistente

  try {
    console.log('   ⏳ Taglio in corso...');
    execSync(command, { stdio: 'pipe' });
    
    // Se era lo stesso file, sostituisci l'originale con il temporaneo
    if (isSameFile) {
      fs.unlinkSync(inputPath);
      fs.renameSync(tempPath, outputPath);
    }
    
    const newSize = getFileSizeMB(outputPath);
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`   ✅ Completato!`);
    console.log(`   📊 Nuova dimensione: ${newSize} MB`);
    console.log(`   📉 Riduzione: ${reduction}%`);
    
    return true;
  } catch (error) {
    // Pulisci file temporaneo in caso di errore
    if (isSameFile && fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
    console.error(`   ❌ Errore durante il taglio: ${error.message}`);
    return false;
  }
}

/**
 * Funzione principale
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length < 3) {
    console.log('🎥 Taglia Video');
    console.log('===============\n');
    console.log('Uso: node scripts/trim-video.js <input-video> <start-seconds> <duration-seconds> [output-video]');
    console.log('');
    console.log('Esempi:');
    console.log('  node scripts/trim-video.js video.mp4 0 40                    # Primi 40 secondi');
    console.log('  node scripts/trim-video.js video.mp4 10 30                   # Da 10s a 40s (30 secondi)');
    console.log('  node scripts/trim-video.js video.mp4 0 40 output.mp4         # Specifica output');
    process.exit(1);
  }

  const inputPath = path.resolve(args[0]);
  const startSeconds = parseFloat(args[1]);
  const durationSeconds = parseFloat(args[2]);
  const outputPath = args[3] ? path.resolve(args[3]) : inputPath.replace(/\.[^/.]+$/, '_trimmed.mp4');

  // Validazione input
  if (isNaN(startSeconds) || startSeconds < 0) {
    console.error('❌ Errore: start-seconds deve essere un numero >= 0');
    process.exit(1);
  }

  if (isNaN(durationSeconds) || durationSeconds <= 0) {
    console.error('❌ Errore: duration-seconds deve essere un numero > 0');
    process.exit(1);
  }

  // Verifica FFmpeg
  if (!checkFFmpeg()) {
    process.exit(1);
  }

  // Taglia il video
  if (trimVideo(inputPath, startSeconds, durationSeconds, outputPath)) {
    console.log(`\n✅ Video tagliato salvato in: ${outputPath}`);
  } else {
    process.exit(1);
  }
}

// Esegue lo script
if (require.main === module) {
  main();
}

module.exports = { trimVideo };
