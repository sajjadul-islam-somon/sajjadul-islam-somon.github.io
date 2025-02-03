document.querySelectorAll("nav button").forEach((button) => {
    button.addEventListener("click", () => {
        document.querySelectorAll("nav button").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const category = button.getAttribute("data-category");
        generateGallery(category);
    });
});

// Load all images at first glance
generateGallery("all");
