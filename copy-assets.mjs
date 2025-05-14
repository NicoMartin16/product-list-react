import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para copiar directorio
function copyDir(src, dest) {
  // Crear el directorio de destino si no existe
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  // Leer todos los archivos en el directorio de origen
  const files = fs.readdirSync(src);
  
  // Iterar sobre archivos
  for (const file of files) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    // Comprobar si es un directorio
    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      // Recursivamente copiar subdirectorios
      copyDir(srcPath, destPath);
    } else {
      // Copiar archivo
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copiado: ${destPath}`);
    }
  }
}

// Copiar directorio assets a public/assets
const srcDir = path.resolve(__dirname, 'src/assets');
const destDir = path.resolve(__dirname, 'public/assets');

console.log(`Copiando de ${srcDir} a ${destDir}`);
copyDir(srcDir, destDir);

console.log('Copia completa. Los assets ahora están disponibles en /public/assets');
