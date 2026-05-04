const fs = require('fs');
const glob = require('glob');

glob.sync('app/(admin)/**/*.tsx').forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/uploadPreset="ml_default"/g, 'signatureEndpoint="/api/cloudinary/sign"');
  fs.writeFileSync(f, content);
});
console.log('Replaced successfully');
