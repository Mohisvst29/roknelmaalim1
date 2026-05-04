const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  content = content.replace(/DGR النمو الماسي/g, "DGR النمو الماسي");
  content = content.replace(/DGR/g, "DGR");
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    if (file === 'node_modules' || file === '.next' || file === '.git' || file === '.gitkeep') {
      continue;
    }

    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js') || fullPath.endsWith('.jsx') || fullPath.endsWith('.json') || fullPath.endsWith('.md')) {
      replaceInFile(fullPath);
    }
  }
}

processDirectory(__dirname);
console.log('Done.');
