#!/usr/bin/env node

/**
 * Script per ottimizzare i video dalla cartella docs/static/videoSrc/ alla cartella docs/static/video/
 * Riduce le dimensioni dei file mantenendo una buona qualità
 * 
 * Requisiti:
 * - FFmpeg installato e disponibile nel PATH
 * - Node.js
 * 
 * Uso:
 * node scripts/optimize-videos.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configurazione
const VIDEO_SRC_DIR = path.join(__dirname, '../static/videoSrc');
const VIDEO_OUT_DIR = path.join(__dirname, '../static/video');
const BACKUP_DIR = path.join(__dirname, '../static/videoSrc/backup');
const SUPPORTED_FORMATS = ['.mp4', '.mov', '.avi', '.mkv', '.webm'];

// Impostazioni di compressione
const COMPRESSION_SETTINGS = {
  // Qualità video (0-51, più basso = migliore qualità)
  crf: 28,
  // Preset di encoding (ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow)
  preset: 'medium',
  // Codec video
  codec: 'libx264',
  // Profilo H.264
  profile: 'high',
  // Livello H.264
  level: '4.0',
  // Pixel format
  pixelFormat: 'yuv420p',
  // Audio codec
  audioCodec: 'aac',
  // Bitrate audio (kbps)
  audioBitrate: '128k',
  // Scala video (opzionale, commentare per mantenere risoluzione originale)
  // scale: '1280:720',
};

/**
 * Verifica se FFmpeg è installato
 */
function checkFFmpeg() {
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    console.log('✅ FFmpeg trovato');
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
 * Crea le cartelle necessarie se non esistono
 */
function createDirectories() {
  // Crea cartella di backup
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    console.log(`📁 Creata cartella backup: ${BACKUP_DIR}`);
  }
  
  // Crea cartella di output
  if (!fs.existsSync(VIDEO_OUT_DIR)) {
    fs.mkdirSync(VIDEO_OUT_DIR, { recursive: true });
    console.log(`📁 Creata cartella output: ${VIDEO_OUT_DIR}`);
  }
}

/**
 * Ottiene informazioni su un video usando FFprobe
 */
function getVideoInfo(filePath) {
  try {
    const command = `ffprobe -v quiet -print_format json -show_format -show_streams "${filePath}"`;
    const output = execSync(command, { encoding: 'utf8' });
    return JSON.parse(output);
  } catch (error) {
    console.error(`❌ Errore nel leggere info video: ${filePath}`);
    return null;
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
 * Ottimizza un singolo video
 */
function optimizeVideo(inputPath, outputPath) {
  const inputInfo = getVideoInfo(inputPath);
  if (!inputInfo) return false;

  const videoStream = inputInfo.streams.find(s => s.codec_type === 'video');
  if (!videoStream) {
    console.error(`❌ Nessun stream video trovato in: ${inputPath}`);
    return false;
  }

  const originalSize = getFileSizeMB(inputPath);
  const originalResolution = `${videoStream.width}x${videoStream.height}`;
  
  console.log(`🎬 Ottimizzando: ${path.basename(inputPath)}`);
  console.log(`   Risoluzione originale: ${originalResolution}`);
  console.log(`   Dimensione originale: ${originalSize} MB`);

  // Costruisce il comando FFmpeg
  let command = `ffmpeg -i "${inputPath}" -c:v ${COMPRESSION_SETTINGS.codec}`;
  command += ` -crf ${COMPRESSION_SETTINGS.crf}`;
  command += ` -preset ${COMPRESSION_SETTINGS.preset}`;
  command += ` -profile:v ${COMPRESSION_SETTINGS.profile}`;
  command += ` -level ${COMPRESSION_SETTINGS.level}`;
  command += ` -pix_fmt ${COMPRESSION_SETTINGS.pixelFormat}`;
  command += ` -c:a ${COMPRESSION_SETTINGS.audioCodec}`;
  command += ` -b:a ${COMPRESSION_SETTINGS.audioBitrate}`;
  
  // Aggiunge scala se specificata
  if (COMPRESSION_SETTINGS.scale) {
    command += ` -vf scale=${COMPRESSION_SETTINGS.scale}`;
  }
  
  command += ` -movflags +faststart`; // Ottimizza per streaming web
  command += ` -y "${outputPath}"`; // Sovrascrive file esistente

  try {
    console.log('   ⏳ Compressione in corso...');
    execSync(command, { stdio: 'pipe' });
    
    const newSize = getFileSizeMB(outputPath);
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`   ✅ Completato!`);
    console.log(`   📊 Nuova dimensione: ${newSize} MB`);
    console.log(`   📉 Riduzione: ${reduction}%`);
    
    return true;
  } catch (error) {
    console.error(`   ❌ Errore durante la compressione: ${error.message}`);
    return false;
  }
}

/**
 * Trova tutti i file video nella cartella sorgente
 */
function findVideoFiles() {
  if (!fs.existsSync(VIDEO_SRC_DIR)) {
    console.error(`❌ Cartella video sorgente non trovata: ${VIDEO_SRC_DIR}`);
    return [];
  }

  const files = fs.readdirSync(VIDEO_SRC_DIR);
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return SUPPORTED_FORMATS.includes(ext);
  });
}

/**
 * Funzione principale
 */
function main() {
  console.log('🎥 Ottimizzatore Video per Docs');
  console.log('================================\n');

  // Verifica FFmpeg
  if (!checkFFmpeg()) {
    process.exit(1);
  }

  // Trova file video
  const videoFiles = findVideoFiles();
  if (videoFiles.length === 0) {
    console.log('📭 Nessun file video trovato nella cartella docs/static/videoSrc/');
    return;
  }

  console.log(`📁 Trovati ${videoFiles.length} file video:`);
  videoFiles.forEach(file => {
    const filePath = path.join(VIDEO_SRC_DIR, file);
    const size = getFileSizeMB(filePath);
    console.log(`   - ${file} (${size} MB)`);
  });
  console.log('');

  // Crea cartelle necessarie
  createDirectories();

  let processedCount = 0;
  let totalOriginalSize = 0;
  let totalNewSize = 0;

  // Processa ogni video
  for (const file of videoFiles) {
    const inputPath = path.join(VIDEO_SRC_DIR, file);
    const outputPath = path.join(VIDEO_OUT_DIR, file);
    const backupPath = path.join(BACKUP_DIR, file);

    try {
      // Backup del file originale
      fs.copyFileSync(inputPath, backupPath);
      console.log(`💾 Backup creato: ${path.basename(backupPath)}`);

      // Ottimizza il video
      const originalSize = parseFloat(getFileSizeMB(inputPath));
      totalOriginalSize += originalSize;

      if (optimizeVideo(inputPath, outputPath)) {
        const newSize = parseFloat(getFileSizeMB(outputPath));
        totalNewSize += newSize;
        processedCount++;
        console.log(`📤 File ottimizzato salvato in: ${path.basename(outputPath)}`);
      }
    } catch (error) {
      console.error(`❌ Errore nel processare ${file}: ${error.message}`);
    }

    console.log(''); // Linea vuota per separare i risultati
  }

  // Riepilogo finale
  console.log('📊 RIEPILOGO FINALE');
  console.log('==================');
  console.log(`✅ File processati con successo: ${processedCount}/${videoFiles.length}`);
  console.log(`📁 File di backup salvati in: ${BACKUP_DIR}`);
  
  if (processedCount > 0) {
    const totalReduction = ((totalOriginalSize - totalNewSize) / totalOriginalSize * 100).toFixed(1);
    console.log(`💾 Dimensione totale originale: ${totalOriginalSize.toFixed(2)} MB`);
    console.log(`💾 Dimensione totale ottimizzata: ${totalNewSize.toFixed(2)} MB`);
    console.log(`📉 Riduzione totale: ${totalReduction}%`);
    console.log(`💿 Spazio risparmiato: ${(totalOriginalSize - totalNewSize).toFixed(2)} MB`);
  }

  console.log('\n🎉 Ottimizzazione completata!');
}

// Esegue lo script
if (require.main === module) {
  main();
}

module.exports = { optimizeVideo, getVideoInfo, getFileSizeMB };
