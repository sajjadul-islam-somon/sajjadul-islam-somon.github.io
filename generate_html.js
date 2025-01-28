async function generateGallery(category) {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = ""; // Clear existing content

    try {
        // Fetch image data from the JSON file
        const response = await fetch('image_data.json');
        const imageMap = await response.json();

        if (!imageMap[category] || imageMap[category].length === 0) {
            gallery.innerHTML = `<p>No images available for ${category}.</p>`;
            return;
        }

        imageMap[category].forEach((file) => {
            const imgElement = document.createElement("img");
            imgElement.src = `images/${category}/${file}`;
            imgElement.alt = `${category} image`;
            gallery.appendChild(imgElement);
        });
    } catch (error) {
        console.error('Failed to load image data:', error);
        gallery.innerHTML = `<p>Failed to load ${category} images.</p>`;
    }
}
