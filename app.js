document.addEventListener("DOMContentLoaded", () => {
    const bgOverlay = document.querySelector(".bg-overlay");
    const boxes = document.querySelectorAll(".box");
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const exploreArrow = document.getElementById("exploreArrow");

    // List of background images (local files + 20 distinct house image links from Unsplash)
    const bgImages = [
        "img (1).jpg",
        "img (2).jpg",
        "img (3).jpg",
        "img (4).jpg",
        "img (5).jpg",
        "img (6).jpg",
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1527030280862-64139fbe04ca?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1618219944342-824e40a13285?auto=format&fit=crop&w=1200&q=80"
    ];

    let currentBgIndex = 0;
    let slideshowInterval = null;
    let isHoveringBox = false;

    // Preload images to prevent lag during transition
    bgImages.forEach(imgSrc => {
        const img = new Image();
        img.src = imgSrc;
    });

    // Function to change background image
    function setBackground(imageSrc) {
        if (bgOverlay) {
            bgOverlay.style.backgroundImage = `url('${imageSrc}')`;
        }
    }

    // Auto slideshow function
    function startSlideshow() {
        slideshowInterval = setInterval(() => {
            if (!isHoveringBox) {
                currentBgIndex = (currentBgIndex + 1) % bgImages.length;
                setBackground(bgImages[currentBgIndex]);
            }
        }, 6000); // changes every 6 seconds
    }

    function stopSlideshow() {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
        }
    }

    // Box hover events: switch background instantly and pause slideshow
    boxes.forEach(box => {
        box.addEventListener("mouseenter", () => {
            isHoveringBox = true;
            const targetBg = box.getAttribute("data-bg");
            if (targetBg) {
                setBackground(targetBg);
                // Sync current index so slideshow resumes from this image
                const index = bgImages.indexOf(targetBg);
                if (index !== -1) {
                    currentBgIndex = index;
                }
            }
        });

        box.addEventListener("mouseleave", () => {
            isHoveringBox = false;
        });
    });

    // Start slideshow on load
    startSlideshow();

    // Interaction 1: Search box alert mockup (PC & Mobile)
    if (searchBtn && searchInput) {
        searchBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                alert(`Recherche de biens pour : "${query}"...\nCette version est une démonstration de ToMee.`);
            } else {
                alert("Veuillez saisir un mot-clé (ville, quartier...) pour lancer la recherche.");
            }
        });

        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                searchBtn.click();
            }
        });
    }

    // Mobile Search Bar Toggle & Search
    const mobileSearchTrigger = document.getElementById("mobileSearchTrigger");
    const mobileSearchClose = document.getElementById("mobileSearchClose");
    const mobileSearchSubmit = document.getElementById("mobileSearchSubmit");
    const mobileSearchInput = document.getElementById("mobileSearchInput");
    const rightNav = document.querySelector(".right");

    if (mobileSearchTrigger && mobileSearchClose && rightNav) {
        mobileSearchTrigger.addEventListener("click", (e) => {
            e.preventDefault();
            rightNav.classList.add("search-active");
            if (mobileSearchInput) {
                mobileSearchInput.focus();
            }
        });

        mobileSearchClose.addEventListener("click", (e) => {
            e.preventDefault();
            rightNav.classList.remove("search-active");
            if (mobileSearchInput) {
                mobileSearchInput.value = "";
            }
        });
    }

    if (mobileSearchSubmit && mobileSearchInput) {
        mobileSearchSubmit.addEventListener("click", (e) => {
            e.preventDefault();
            const query = mobileSearchInput.value.trim();
            if (query) {
                alert(`Recherche de biens pour : "${query}"...\nCette version est une démonstration de ToMee.`);
            } else {
                alert("Veuillez saisir un mot-clé (ville, quartier...) pour lancer la recherche.");
            }
        });

        mobileSearchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                mobileSearchSubmit.click();
            }
        });
    }

    // Interaction 2: Explore arrow dynamic rotation and response
    if (exploreArrow) {
        exploreArrow.addEventListener("click", () => {
            // Rotate background to next image
            currentBgIndex = (currentBgIndex + 1) % bgImages.length;
            setBackground(bgImages[currentBgIndex]);
            
            // Add a visual flash/spin effect to arrow
            exploreArrow.style.transform = "rotate(320deg) scale(1.2)";
            setTimeout(() => {
                exploreArrow.style.transform = "";
            }, 500);
        });
    }

});
