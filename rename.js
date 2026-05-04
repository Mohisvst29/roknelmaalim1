const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  content = content.replace(/صالح الأزهري/g, "DGR النمو الماسي");
  content = content.replace(/صالح الازهري/g, "DGR النمو الماسي");
  content = content.replace(/المدينة المنورة/g, "الرياض");
  content = content.replace(/بالمدينة المنورة/g, "بالرياض");
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function traverse(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverse(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  }
}

traverse(path.join(__dirname, 'components'));
traverse(path.join(__dirname, 'app'));
