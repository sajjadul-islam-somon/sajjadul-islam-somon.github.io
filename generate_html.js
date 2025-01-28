// Dynamically generates image gallery based on folder structure.
async function generateGallery(category) {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = ""; // Clear existing images

    const response = await fetch(`images/${category}/`);
    if (!response.ok) {
        gallery.innerHTML = `<p>Failed to load ${category} images.</p>`;
        return;
    }

    const imageList = await response.json(); // Assumes directory listings are enabled
    imageList.forEach((image) => {
        const imgElement = document.createElement("img");
        imgElement.src = `images/${category}/${image}`;
        imgElement.alt = category;
        gallery.appendChild(imgElement);
    });
}
