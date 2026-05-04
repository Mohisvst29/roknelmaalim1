const fs = require('fs');
const path = require('path');

const directories = ['app', 'components', 'messages'];
const searchReplacePairs = [
  { search: /شركة النمو الماسي/g, replace: "شركة ركن المعالم للمقاولات" },
  { search: /النمو الماسي/g, replace: "ركن المعالم للمقاولات" },
  { search: /شركة هندسية رائدة في التصميم المعماري والمدني تقدم حلول مبتكرة لمشاريع البناء والتطوير مع التركيز على الجودة والاستدامة\./g, replace: "شركة هندسية رائدة في التصميم المعماري والمدني تقدم حلول مبتكرة لمشاريع البناء والتطوير مع التركيز على الجودة والاستدامة." },
  { search: /nmudiamond\.com/g, replace: "rukanalmaalim.com" },
  { search: /nmudiamond/g, replace: "rukanalmaalim" }
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (stat.isFile() && (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.json'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      for (const pair of searchReplacePairs) {
        if (content.match(pair.search)) {
          content = content.replace(pair.search, pair.replace);
          modified = true;
        }
      }
      
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

for (const dir of directories) {
  processDirectory(path.join(__dirname, dir));
}
console.log("Done replacing text in files.");
