// Adds event listeners to navigation buttons
document.querySelectorAll("nav button").forEach((button) => {
    button.addEventListener("click", () => {
        const category = button.getAttribute("data-category");
        generateGallery(category);
    });
});

// Default to show logos
generateGallery("logos");
