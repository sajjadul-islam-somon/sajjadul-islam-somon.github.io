async function generateGallery(category) {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = ""; // Clear previous images

    try {
        const response = await fetch("image_data.json");
        const imageMap = await response.json();

        let imagesToShow = [];

        // Show a mix of images from all categories for the "ALL" section
        if (category === "all") {
            Object.keys(imageMap).forEach(cat => {
                imagesToShow.push(...imageMap[cat].slice(0, 3).map(image => ({
                    ...image,
                    category: cat // Add category info for correct path
                })));
            });
        } else {
            imagesToShow = imageMap[category] ? imageMap[category].map(image => ({
                ...image,
                category: category
            })) : [];
        }

        if (imagesToShow.length === 0) {
            gallery.innerHTML = `<p>No images available for ${category}.</p>`;
            return;
        }

        imagesToShow.forEach(({ file, title, category }) => {
            const container = document.createElement("div");
            container.classList.add("image-container");

            const imgElement = document.createElement("img");
            imgElement.src = `images/${category}/${file}`; // Ensure correct category path
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
