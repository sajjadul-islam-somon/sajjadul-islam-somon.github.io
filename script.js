document.addEventListener("DOMContentLoaded", () => {
    const categoryCards = document.querySelectorAll(".category-card");

    // Add click event to each category card
    categoryCards.forEach(card => {
        card.addEventListener("click", () => {
            const category = card.querySelector(".category-title").textContent.toLowerCase();
            generateGallery(category);
        });
    });
});

async function generateGallery(category) {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = ""; // Clear previous images

    try {
        const response = await fetch("image_data.json");
        const imageMap = await response.json();

        const imagesToShow = imageMap[category] || [];

        if (imagesToShow.length === 0) {
            gallery.innerHTML = `<p>No images available for ${category}.</p>`;
            return;
        }

        imagesToShow.forEach(({ file, title }) => {
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