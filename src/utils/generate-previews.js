const fs = require('fs');
const sharp = require('sharp');

const rootDir = '../assets/images/projects';
const dirs = fs.readdirSync(rootDir);
dirs.forEach(dir => {
  const imageNames = fs.readdirSync(`${rootDir}/${dir}`);
  imageNames.forEach(imageName => {
    const name = imageName.slice(0, -4);
    const ext = imageName.slice(-3);
    sharp(`${rootDir}/${dir}/${imageName}`)
    .resize(640, 480)
    .toFile(`${rootDir}/${dir}/${name}-preview.${ext}`, (err, info) => { console.log(err); });
  });
});
