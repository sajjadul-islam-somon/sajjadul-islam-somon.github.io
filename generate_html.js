async function generateGallery(category) {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = ""; // Clear previous images

    try {
        const response = await fetch("image_data.json");
        const imageMap = await response.json();

        // If "all" is selected, show a mix of images from all categories
        let allImages = [];
        if (category === "all") {
            Object.keys(imageMap).forEach(cat => {
                allImages.push(...imageMap[cat].slice(0, 3)); // Pick first 3 images from each category
            });
        }

        const selectedImages = category === "all" ? allImages : imageMap[category] || [];

        if (selectedImages.length === 0) {
            gallery.innerHTML = `<p>No images available for ${category}.</p>`;
            return;
        }

        selectedImages.forEach(({ file, title }) => {
            const container = document.createElement("div");
            container.classList.add("image-container");

            const imgElement = document.createElement("img");
            imgElement.src = `images/${category}/${file}`;
            imgElement.alt = title;
            container.appendChild(imgElement);

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
