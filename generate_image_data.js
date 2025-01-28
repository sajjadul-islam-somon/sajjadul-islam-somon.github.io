const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');
const outputFile = path.join(__dirname, 'image_data.json');

const categories = ['logos', 'cards', 'landscapes', 'portraits', 'others'];

const imageData = {};

// Iterate over the categories
categories.forEach((category) => {
    const categoryPath = path.join(imagesDir, category);
    if (fs.existsSync(categoryPath) && fs.lstatSync(categoryPath).isDirectory()) {
        imageData[category] = fs.readdirSync(categoryPath).filter(file => {
            return /\.(png|jpe?g|gif)$/i.test(file); // Only image files
        });
    }
});

// Write the image data to a JSON file
fs.writeFileSync(outputFile, JSON.stringify(imageData, null, 2), 'utf8');

console.log('Image data has been generated in image_data.json');
