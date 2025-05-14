import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const files = fs.readdirSync(src);
  
  for (const file of files) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
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
