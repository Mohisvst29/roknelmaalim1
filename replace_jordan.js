const fs = require('fs');
const path = require('path');

const directories = ['app', 'components', 'messages'];

// We need to replace all variations of Jordan / الأردن
const searchReplacePairs = [
  { search: /في الأردن/g, replace: "في المدينة المنورة" },
  { search: /الأردن/g, replace: "المدينة المنورة" },
  { search: /والأردن/g, replace: "" }, // in case of "بالسعودية والأردن"
  { search: /السعودية، المدينة المنورة، المدينة المنورة/g, replace: "السعودية، المدينة المنورة" },
  { search: /السعودية و، المدينة المنورة/g, replace: "السعودية والمدينة المنورة" },
  { search: /Jordan/g, replace: "Al Madinah" },
  { search: /Saudi Arabia and Al Madinah/g, replace: "Saudi Arabia, Al Madinah" },
  { search: /السعودية، المدينة المنورة/g, replace: "المملكة العربية السعودية، المدينة المنورة" },
  { search: /السعودية و/g, replace: "السعودية" },
  { search: /بالسعودية و/g, replace: "بالسعودية" },
  { search: /في السعودية والمدينة المنورة/g, replace: "في السعودية وتحديداً بالمدينة المنورة" },
  // Handle some specific phrases found in previous views
  { search: /سنة التأسيس بالمدينة المنورة/g, replace: "سنة التأسيس بالمدينة المنورة" },
  { search: /مشاريع السعودية/g, replace: "مشاريعنا في المملكة" }
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
      // Hardcode replace "بالسعودية " where it became trailing
      content = content.replace(/بالسعودية \s/g, 'بالسعودية ');
      content = content.replace(/السعودية \s/g, 'السعودية ');
      
      // Specifically fix some texts manually to ensure good Arabic grammar
      content = content.replace(/في السعودية  /g, 'في السعودية ');
      content = content.replace(/في السعودية وتحديداً بالمدينة المنورة/g, 'في المملكة العربية السعودية، المدينة المنورة');
      content = content.replace(/في المملكة العربية السعودية، المدينة المنورة، المدينة المنورة/g, 'في المملكة العربية السعودية، المدينة المنورة');
      
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

// Special fixes for ar.json and en.json for locations and contact:
try {
  let arJsonPath = path.join(__dirname, 'messages', 'ar.json');
  let arData = fs.readFileSync(arJsonPath, 'utf8');
  arData = arData.replace(/في السعودية \./g, 'في السعودية.');
  arData = arData.replace(/المقر الرئيسي في المدينة المنورة، منذ عام 2012\\nفرع المملكة العربية السعودية، منذ عام 2023/g, 'المقر الرئيسي في المملكة العربية السعودية - المدينة المنورة');
  arData = arData.replace(/في المملكة العربية السعودية، المدينة المنورة/g, 'في السعودية (المدينة المنورة)');
  fs.writeFileSync(arJsonPath, arData, 'utf8');

  let enJsonPath = path.join(__dirname, 'messages', 'en.json');
  let enData = fs.readFileSync(enJsonPath, 'utf8');
  enData = enData.replace(/Head office in Al Madinah, since 2012\\nSaudi Arabia branch, since 2023/g, 'Head Office: Saudi Arabia, Al Madinah Al Munawwarah');
  fs.writeFileSync(enJsonPath, enData, 'utf8');
  
} catch(e) {
  console.log("Error specifically fixing json: ", e.message);
}

console.log("Done replacing Jordan text in files.");
