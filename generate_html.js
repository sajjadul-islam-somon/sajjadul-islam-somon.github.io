async function generateGallery(category) {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = ""; // Clear existing gallery content

    try {
        // Fetch the JSON file
        const response = await fetch("image_data.json");
        const imageMap = await response.json();

        // Check if category exists
        if (!imageMap[category] || imageMap[category].length === 0) {
            gallery.innerHTML = `<p>No images available for ${category}.</p>`;
            return;
        }

        // Add images and titles to the gallery
        imageMap[category].forEach(({ file, title }) => {
            // Create container for image and title
            const container = document.createElement("div");
            container.classList.add("image-container");

            // Create image element
            const imgElement = document.createElement("img");
            imgElement.src = `images/${category}/${file}`;
            imgElement.alt = title;
            container.appendChild(imgElement);

            // Create title element
            const titleElement = document.createElement("p");
            titleElement.classList.add("image-title");
            titleElement.textContent = title;
            container.appendChild(titleElement);

            gallery.appendChild(container);
        });
    } catch (error) {
        console.error("Failed to load images:", error);
        gallery.innerHTML = `<p>Failed to load ${category} images.</p>`;
    }
}
