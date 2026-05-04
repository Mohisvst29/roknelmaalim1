const fs = require('fs');
const path = require('path');

const directory = './';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  content = content.replace(/النمو الماسي/g, "النمو الماسي");
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walkSync(currentDirPath, callback) {
  fs.readdirSync(currentDirPath).forEach(function (name) {
    const filePath = path.join(currentDirPath, name);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      if (filePath.endsWith('.ts') || filePath.endsWith('.tsx') || filePath.endsWith('.json') || filePath.endsWith('.js') || filePath.endsWith('.txt')) {
        callback(filePath);
      }
    } else if (stat.isDirectory() && name !== 'node_modules' && name !== '.next' && name !== '.git') {
      walkSync(filePath, callback);
    }
  });
}

walkSync(directory, replaceInFile);
console.log("Done");
