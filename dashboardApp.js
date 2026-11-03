/* dashboardApp.js - ToMee Dashboard Controller */

document.addEventListener("DOMContentLoaded", () => {

    /* ===== USER PREFERENCES FROM LOCALSTORAGE ===== */
    let storedUser = null;
    try {
        storedUser = JSON.parse(localStorage.getItem("tomee_user"));
    } catch(e) {
        console.error("Erreur de lecture de localStorage", e);
    }

    let userBudget = "Moins de 70 000";
    if (storedUser && storedUser.budget) {
        if (storedUser.budget === "30000") userBudget = "Moins de 30 000";
        else if (storedUser.budget === "50000") userBudget = "Moins de 50 000";
        else if (storedUser.budget === "70000") userBudget = "Moins de 70 000";
        else if (storedUser.budget === "100000") userBudget = "Moins de 100 000";
        else if (storedUser.budget === "plus") userBudget = "Plus de 100 000";
    }

    let userCurrency = "XOF (FCFA)";
    if (storedUser && storedUser.currency) {
        if (storedUser.currency === "XOF") userCurrency = "XOF (FCFA)";
        else if (storedUser.currency === "XAF") userCurrency = "XAF (FCFA)";
        else if (storedUser.currency === "USD") userCurrency = "USD ($)";
        else if (storedUser.currency === "EUR") userCurrency = "EUR (Euro)";
        else if (storedUser.currency === "NGN") userCurrency = "NGN (Naira)";
        else if (storedUser.currency === "GHS") userCurrency = "GHS (Cedis)";
    }

    const MOCK_USER = {
        name: storedUser ? (storedUser.name || storedUser.agencyName || "Jean DOSSOU") : "Jean DOSSOU",
        email: storedUser ? (storedUser.email || "jeandossou@gmail.com") : "jeandossou@gmail.com",
        phone: storedUser ? (storedUser.phone || "+2290157596569") : "+2290157596569",
        role: storedUser ? (storedUser.role === "agence" ? "Agence" : "Particulier") : "Particulier",
        city: storedUser ? (storedUser.city || "Cotonou") : "Cotonou",
        currency: userCurrency,
        budget: userBudget
    };

    const AGENCIES = [
        { 
            code: "AI", 
            name: "Abomey Immo",
            followers: "12.4k",
            likes: "45.2k",
            bio: "Leader de l'immobilier moderne, nous vous accompagnons dans la recherche et l'acquisition de vos appartements de séjours, villas de luxe et parcelles en vente.",
            location: "Cotonou, Fidjrossè (Bénin)",
            hours: "08:00 - 18:30",
            years: 4
        },
        { 
            code: "CP", 
            name: "Cotonou Properties",
            followers: "8.1k",
            likes: "29.7k",
            bio: "Spécialistes de la location immobilière résidentielle et commerciale dans le grand Cotonou. Des logements de qualité vérifiés par nos experts.",
            location: "Cotonou, Cadjèhoun",
            hours: "08:30 - 18:00",
            years: 3
        },
        { 
            code: "RB", 
            name: "Résidence Bénin",
            followers: "6.3k",
            likes: "18.1k",
            bio: "Résidences meublées de haut standing pour séjours de courte et longue durée. Confort, sécurité et services hôteliers inclus.",
            location: "Abomey-Calavi, Zopah",
            hours: "24h/24, 7j/7",
            years: 2
        },
        { 
            code: "SL", 
            name: "SafariLand",
            followers: "15.0k",
            likes: "61.3k",
            bio: "Achat et vente de terrains viabilisés, lotissements et parcelles dans tout le Bénin. Transactions sécurisées et certifiées.",
            location: "Porto-Novo, Centre",
            hours: "08:00 - 17:30",
            years: 6
        },
        { 
            code: "GH", 
            name: "Ghana Homes",
            followers: "22.5k",
            likes: "88.9k",
            bio: "Your premier real estate partner in Accra. Luxury villas, beach houses, and serviced lands for local and diaspora clients.",
            location: "Accra, Osu (Ghana)",
            hours: "09:00 - 18:00",
            years: 5
        }
    ];

    const PROPERTY_TYPES = [
        "Séjour meublé", "Location", "Villa", "Maison à acheter", "Parcelle"
    ];

    const LOCATIONS = [
        "Cotonou, Fidjrossè", "Cotonou, Akpakpa", "Porto-Novo, Centre",
        "Abomey-Calavi, Zopah", "Parakou, Centre", "Lomé, Bè", "Accra, Osu",
        "Cotonou, Ganhi", "Bohicon, Lissèzoun", "Cotonou, Cadjèhoun",
        "Porto-Novo, Djegan", "Cotonou, Agla", "Cotonou, Houéyiho",
        "Abomey-Calavi, Tankpè", "Cotonou, Gbégamey", "Cotonou, Zogbo",
        "Cotonou, Sainte Rita", "Porto-Novo, Tokpota", "Ouidah, Centre",
        "Cotonou, Aidjèdo"
    ];

    const HOUSE_IMAGES = [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600",
        "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600",
        "https://images.unsplash.com/photo-1600566753086-00f18e6f5c67?w=600",
        "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=600",
        "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600",
        "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600",
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600",
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600",
        "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?w=600",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600",
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600",
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600",
        "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=600"
    ];

    const PROPERTY_NAMES = [
        "Résidence Le Palmier", "Villa Océane", "Appartement Soleil",
        "Maison Flamboyant", "Studio Cocotier", "Duplex Hibiscus",
        "Villa Harmonie", "Résidence Émeraude", "Maison Baobab",
        "Appartement Horizon", "Villa Prestige", "Studio Perle",
        "Duplex Azur", "Maison Sérénité", "Villa Tropicale",
        "Résidence Diamant", "Maison du Lac", "Appartement Zenith",
        "Villa Paradis", "Maison Élégance"
    ];

    // Video loops for properties
    const MOCK_VIDEOS = [
        "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-41589-large.mp4",
        "https://assets.mixkit.co/videos/preview/mixkit-bright-and-modern-kitchen-in-an-apartment-41583-large.mp4",
        "https://assets.mixkit.co/videos/preview/mixkit-decorating-a-bedroom-41577-large.mp4"
    ];

    // Generate 20 mock properties, customizing at least 6 to match user city and budget
    let properties = [];

    function loadProperties() {
        const defaultProps = HOUSE_IMAGES.map((img, i) => {
            let location = LOCATIONS[i];
            let price = (Math.floor(Math.random() * 18) + 2) * 5000; // 10,000 to 100,000
            
            if (i < 6 && MOCK_USER.city) {
                // Force user's preferred city
                const sector = ["Centre", "Fidjrossè", "Akpakpa", "Cadjèhoun", "Agla", "Zogbo"][i];
                location = `${MOCK_USER.city}, ${sector}`;
                
                // Adjust price to fit budget constraint
                if (MOCK_USER.budget.includes("30 000")) {
                    price = (Math.floor(Math.random() * 4) + 2) * 5000; // 10k - 30k
                } else if (MOCK_USER.budget.includes("50 000")) {
                    price = (Math.floor(Math.random() * 8) + 2) * 5000; // 10k - 50k
                } else if (MOCK_USER.budget.includes("70 000")) {
                    price = (Math.floor(Math.random() * 12) + 2) * 5000; // 10k - 70k
                } else if (MOCK_USER.budget.includes("100 000")) {
                    price = (Math.floor(Math.random() * 16) + 2) * 5000; // 10k - 100k
                }
            }
            
            // Multi-media array (several photos & video) for each property
            const mediaList = [
                img,
                HOUSE_IMAGES[(i + 1) % HOUSE_IMAGES.length],
                HOUSE_IMAGES[(i + 2) % HOUSE_IMAGES.length]
            ];
            // Insert video loop for interest
            if (i % 2 === 0) {
                mediaList.push(MOCK_VIDEOS[(i / 2) % MOCK_VIDEOS.length]);
            }
            
            return {
                id: i + 1,
                title: PROPERTY_NAMES[i],
                image: img,
                location: location,
                agency: AGENCIES[i % AGENCIES.length],
                type: PROPERTY_TYPES[i % PROPERTY_TYPES.length],
                price: price,
                likes: Math.floor(Math.random() * 120),
                comments: 2, // Starts with 2 mock comments
                liked: false,
                favorited: false,
                media: mediaList,
                beds: (i % 3) + 2,
                area: ((i % 4) + 3) * 30,
                commentsList: [
                    { user: "Koffi S.", text: "Superbe opportunité ! Le quartier est très calme.", date: "Il y a 2h" },
                    { user: "Amina T.", text: "Est-il possible de faire une visite ce week-end ?", date: "Il y a 5h" }
                ],
                description: "Magnifique logement moderne avec accès facile, disposant de finitions haut de gamme et d'un confort optimal pour votre quotidien."
            };
        });

        let agencyPubs = [];
        try {
            agencyPubs = JSON.parse(localStorage.getItem('tomee_agency_publications') || '[]');
        } catch (e) {
            agencyPubs = [];
        }

        const formattedAgencyPubs = agencyPubs.map(pub => {
            const mediaList = pub.images && pub.images.length > 0 ? pub.images : [
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600"
            ];

            return {
                id: 'agency_' + pub.id,
                title: pub.title,
                image: mediaList[0],
                location: pub.location,
                agency: {
                    code: 'AI',
                    name: 'Abomey Immo',
                    followers: '12.4k',
                    likes: '45.2k',
                    location: 'Cotonou, Fidjrossè (Bénin)'
                },
                type: pub.category === 'Séjour' ? 'Séjour meublé' : (pub.category === 'Achat' ? 'Maison à acheter' : pub.category),
                price: pub.price,
                likes: Math.floor(Math.random() * 20) + 5,
                comments: 0,
                liked: false,
                favorited: false,
                media: mediaList,
                beds: pub.beds,
                area: pub.area,
                commentsList: [],
                description: pub.description
            };
        });

        properties = [...formattedAgencyPubs, ...defaultProps.filter(p => !agencyPubs.some(ap => ap.title.trim().toLowerCase() === p.title.trim().toLowerCase()))];
    }

    loadProperties();

    // Asynchronous DB fetch from MySQL backend
    async function fetchPropertiesFromAPI() {
        try {
            const response = await fetch("http://localhost:5000/api/publications");
            if (response.ok) {
                const apiPubs = await response.json();
                if (apiPubs.length > 0) {
                    properties = apiPubs.map(pub => {
                        const mediaList = pub.images && pub.images.length > 0 ? pub.images : [
                            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600"
                        ];
                        return {
                            id: pub.id,
                            title: pub.title,
                            image: mediaList[0],
                            location: pub.location,
                            agency: {
                                code: 'AG_' + pub.user_id,
                                name: pub.anonymous ? 'Agence Anonyme' : pub.agencyName,
                                followers: '12.4k',
                                likes: '45.2k',
                                location: pub.location,
                                phone: pub.agencyPhone,
                                whatsapp: pub.agencyWhatsapp,
                                instagram: pub.agencyInstagram,
                                tiktok: pub.agencyTiktok,
                                anonymous: pub.anonymous
                            },
                            type: pub.category === 'Séjour' ? 'Séjour meublé' : (pub.category === 'Achat' ? 'Maison à acheter' : pub.category),
                            price: parseFloat(pub.price),
                            likes: Math.floor(Math.random() * 120),
                            comments: 2,
                            liked: false,
                            favorited: false,
                            media: mediaList,
                            beds: pub.beds,
                            area: pub.area,
                            commentsList: [
                                { user: "Koffi S.", text: "Superbe opportunité ! Le quartier est très calme.", date: "Il y a 2h" },
                                { user: "Amina T.", text: "Est-il possible de faire une visite ce week-end ?", date: "Il y a 5h" }
                            ],
                            description: pub.description,
                            score: pub.score,
                            anonymous: pub.anonymous
                        };
                    });
                    console.log("Données MySQL chargées. Rafraîchissement de l'affichage.");
                    featured = properties[0];
                    refreshPriceDisplays();
                }
            }
        } catch (e) {
            console.warn("⚠️ API de base de données MySQL hors ligne. Utilisation du mode localStorage dégradé.");
        }
    }
    fetchPropertiesFromAPI();

    /* ===== DOM REFERENCES ===== */
    const filterBtns = document.querySelectorAll(".filter-type-btn");
    const filterZone = document.getElementById("filterZone");
    const filterBudget = document.getElementById("filterBudget");
    const sections = document.querySelectorAll(".dashboard-section");
    const menuItems = document.querySelectorAll(".menu-item");
    const dockContainer = document.getElementById("dockContainer");
    const dockSensorBar = document.getElementById("dockSensorBar");
    const dockTrigger = document.getElementById("dockTrigger");
    const circularMenu = document.getElementById("circularMenu");
    const notifStack = document.getElementById("notifStack");
    const notifDismiss = document.getElementById("notifDismissAll");
    const toggleDark = document.getElementById("toggleDarkMode");
    const toggleNotifBtn = document.getElementById("toggleNotifBtn");
    const notifLogList = document.getElementById("notifLogList");
    const favGrid = document.getElementById("favoritesGrid");
    const favCount = document.getElementById("favCount");
    const btnCompareFavorites = document.getElementById("btnCompareFavorites");
    const favoritesComparisonOverlay = document.getElementById("favoritesComparisonOverlay");
    const profileNameEl = document.getElementById("profileName");
    const profileRoleEl = document.getElementById("profileRole");
    const profileEmailEl = document.getElementById("profileEmail");
    const profilePhoneEl = document.getElementById("profilePhone");
    const profileCityEl = document.getElementById("profileCity");
    const profileAvatarCircle = document.getElementById("profileAvatarCircle");
    const profilePhotoInput = document.getElementById("profilePhotoInput");
    const uploadPhotoBtn = document.getElementById("uploadPhotoBtn");
    const settingsName = document.getElementById("settingsName");
    const settingsEmail = document.getElementById("settingsEmail");
    const settingsPhone = document.getElementById("settingsPhone");
    const settingsCity = document.getElementById("settingsCity");
    const settingsCurrency = document.getElementById("settingsCurrency");
    const settingsBudget = document.getElementById("settingsBudget");
    const saveSettingsBtn = document.getElementById("saveSettings");
    const chatInput = document.getElementById("chatInput");
    const chatSendBtn = document.getElementById("chatSendBtn");
    const chatMessages = document.getElementById("chatMessages");
    const contactCards = document.querySelectorAll(".contact-card");
    const chatContainer = document.querySelector(".chat-container");
    const chatMobileBackBtn = document.getElementById("chatMobileBackBtn");

    /* ===== FULLSCREEN MEDIA EXPAND MODAL REFERENCES ===== */
    const mediaExpandModal = document.getElementById("mediaExpandModal");
    const mediaModalClose = document.getElementById("mediaModalClose");
    const mediaModalPrev = document.getElementById("mediaModalPrev");
    const mediaModalNext = document.getElementById("mediaModalNext");
    const mediaModalViewer = document.getElementById("mediaModalViewer");
    const mediaModalTitle = document.getElementById("mediaModalTitle");
    const mediaModalLocation = document.getElementById("mediaModalLocation");
    const mediaModalDots = document.getElementById("mediaModalDots");

    /* ===== MOBILE SEARCH AND FILTERS TOGGLE REFERENCES ===== */
    const dashboardNavbar = document.getElementById("dashboardNavbar");
    const mobileSearchBtn = document.getElementById("mobileSearchBtn");
    const dashboardSearchClose = document.getElementById("dashboardSearchClose");

    /* ===== STATE ===== */
    let activeFilter = "Tous";
    let menuOpen = false;
    let currentSection = "home";

    function getCurrencyCode(currencyLabel = MOCK_USER.currency) {
        if (!currencyLabel) return "XOF";
        if (currencyLabel.includes("XOF")) return "XOF";
        if (currencyLabel.includes("XAF")) return "XAF";
        if (currencyLabel.includes("USD")) return "USD";
        if (currencyLabel.includes("EUR")) return "EUR";
        if (currencyLabel.includes("NGN")) return "NGN";
        if (currencyLabel.includes("GHS")) return "GHS";
        return "XOF";
    }

    function formatPrice(value) {
        const currencyCode = getCurrencyCode();
        const rates = { XOF: 1, XAF: 1, USD: 1 / 600, EUR: 1 / 650, NGN: 2.5, GHS: 0.016 };
        const symbols = { XOF: "FCFA", XAF: "FCFA", USD: "$", EUR: "€", NGN: "₦", GHS: "GH₵" };
        const rate = rates[currencyCode] || 1;
        const amount = value * rate;
        const maxFractionDigits = currencyCode === "USD" || currencyCode === "EUR" || currencyCode === "NGN" || currencyCode === "GHS" ? 2 : 0;
        const formatted = amount.toLocaleString("fr-FR", { maximumFractionDigits: maxFractionDigits, minimumFractionDigits: 0 });
        return `${formatted} ${symbols[currencyCode]}`;
    }

    function applyProfilePhoto(photoData) {
        if (!profileAvatarCircle) return;
        if (photoData) {
            profileAvatarCircle.innerHTML = `<img src="${photoData}" alt="Photo de profil">`;
            profileAvatarCircle.classList.add("has-photo");
        } else {
            profileAvatarCircle.innerHTML = '<i class="ri-user-line"></i>';
            profileAvatarCircle.classList.remove("has-photo");
        }
    }

    function loadProfilePhoto() {
        try {
            const storedPhoto = localStorage.getItem("tomee_profile_photo");
            if (storedPhoto) {
                applyProfilePhoto(storedPhoto);
            }
        } catch (e) {
            console.warn("Impossible de charger la photo de profil", e);
        }
    }

    function refreshPriceDisplays() {
        updateCoverFlow();
        renderFavorites();
        if (typeof activeAgencyProfile !== "undefined" && activeAgencyProfile) {
            const activeAgFilter = document.querySelector(".agency-filter-btn.active")?.dataset.agFilter || "Tous";
            renderAgencyProperties(activeAgencyProfile, activeAgFilter);
        }
    }
    let featured = properties[0];
    let favorites = [];
    let activeIndex = 0;
    let swipeOffset = 0; // px offset during drag
    let isDragging = false;
    let currentModalMedia = [];
    let currentModalMediaIndex = 0;
    let ignoreDockClick = false;

    function onUserSearchAction() {
        const homeSec = document.getElementById("section-home");
        if (homeSec && homeSec.classList.contains("search-mode-active")) {
            homeSec.classList.add("has-search-results");
        }
    }

    function restorePropertyState() {
        try {
            const stored = JSON.parse(localStorage.getItem("tomee_property_state") || "{}");
            properties.forEach(prop => {
                const saved = stored[prop.id];
                if (!saved) return;
                prop.liked = Boolean(saved.liked);
                prop.favorited = Boolean(saved.favorited);
                prop.likes = Math.max(prop.likes, Number(saved.likes) || 0);
            });
        } catch (e) {
            console.warn("Impossible de restaurer l’état des propriétés", e);
        }
    }

    function persistPropertyState() {
        const snapshot = {};
        properties.forEach(prop => {
            snapshot[prop.id] = {
                liked: prop.liked,
                favorited: prop.favorited,
                likes: prop.likes
            };
        });
        localStorage.setItem("tomee_property_state", JSON.stringify(snapshot));
    }

    function getActiveProperty() {
        const list = getFilteredProperties();
        if (!list.length) return null;
        return list[Math.max(0, Math.min(activeIndex, list.length - 1))];
    }

    /* ===== FILTER & RETRIEVE ===== */
    function getFilteredProperties() {
        let list = [...properties];
        
        // Filter by property type
        if (activeFilter !== "Tous") {
            list = list.filter(p => p.type === activeFilter);
        }
        
        // Filter by location/zone
        const zone = filterZone.value;
        if (zone) {
            list = list.filter(p => p.location.toLowerCase().includes(zone.toLowerCase()));
        }
        
        // Filter by budget
        const budget = filterBudget.value;
        if (budget) {
            const max = parseInt(budget);
            list = list.filter(p => p.price <= max);
        }
        
        return list;
    }

    /* ===== FILTER EVENTS ===== */
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeFilter = btn.dataset.filter;
            activeIndex = 0;
            onUserSearchAction();
            updateCoverFlow();
        });
    });

    filterZone.addEventListener("change", () => {
        activeIndex = 0;
        onUserSearchAction();
        updateCoverFlow();
    });

    filterBudget.addEventListener("change", () => {
        activeIndex = 0;
        onUserSearchAction();
        updateCoverFlow();
    });

    /* ===== 3D COVER FLOW CAROUSEL RENDERER ===== */
    let _cachedList = [];
    let _cardsBuilt = false;

    /** Rebuild DOM cards only when the property list changes */
    function renderCoverFlowCards() {
        const list = getFilteredProperties();
        const track = document.getElementById("coverflowTrack");
        const pagination = document.getElementById("carouselPagination");

        _cachedList = list;
        track.innerHTML = "";

        if (list.length === 0) {
            track.innerHTML = `<div style="text-align:center;color:#888;padding:4rem;font-size:1.4rem;">Aucune maison ne correspond à votre filtre.<br>Modifiez vos critères de zone ou budget.</div>`;
            pagination.innerHTML = "";
            document.getElementById("agencyName").textContent = "-";
            document.getElementById("agencyMeta").textContent = "Aucune annonce";
            document.getElementById("agencyAvatar").textContent = "";
            _cardsBuilt = false;
            return;
        }

        if (activeIndex >= list.length) activeIndex = list.length - 1;
        if (activeIndex < 0) activeIndex = 0;

        list.forEach((prop, idx) => {
            const card = document.createElement("div");
            card.className = "coverflow-card";
            card.dataset.index = idx;

            card.innerHTML = `
                <div class="card-top-bar">
                    <div class="card-avatar">${prop.agency.code}</div>
                    <span class="card-expand-btn"><i class="ri-fullscreen-line"></i> Étendre</span>
                </div>
                <div class="card-img-wrap">
                    <img class="card-img" src="${prop.image}" alt="${prop.title}" draggable="false">
                </div>
                <div class="card-info-wrap">
                    <div class="card-title-row">
                        <span class="card-date">${prop.type}</span>
                        <h4 class="card-title">${prop.title}</h4>
                    </div>
                    <div class="card-desc-box">${prop.description}</div>
                    <div class="card-bottom-row">
                        <div class="card-specs">
                            <span><i class="ri-hotel-bed-line"></i> ${prop.beds} Ch.</span>
                            <span><i class="ri-layout-grid-line"></i> ${prop.area}m²</span>
                        </div>
                        <span class="card-price">${formatPrice(prop.price)}</span>
                    </div>
                </div>
            `;

            card.addEventListener("click", () => {
                if (idx !== activeIndex && !isDragging) {
                    activeIndex = idx;
                    updateCoverFlowStyles();
                    syncCoverFlowUI();
                }
            });

            const expandBtn = card.querySelector(".card-expand-btn");
            const handleExpand = (e) => {
                e.preventDefault();
                e.stopPropagation();
                openMediaModal(prop);
            };
            expandBtn.addEventListener("click", handleExpand);
            expandBtn.addEventListener("touchstart", handleExpand, { passive: false });

            const avatarBtn = card.querySelector(".card-avatar");
            const handleAvatar = (e) => {
                e.preventDefault();
                e.stopPropagation();
                openAgencyProfile(prop.agency.name);
            };
            avatarBtn.addEventListener("click", handleAvatar);
            avatarBtn.addEventListener("touchstart", handleAvatar, { passive: false });

            track.appendChild(card);
        });

        _cardsBuilt = true;

        // Build pagination dots
        pagination.innerHTML = "";
        list.forEach((_, idx) => {
            const dot = document.createElement("div");
            dot.className = "carousel-dot";
            dot.addEventListener("click", () => {
                activeIndex = idx;
                updateCoverFlowStyles();
                syncCoverFlowUI();
            });
            pagination.appendChild(dot);
        });
    }

    /** Update only CSS transforms/positions — never recreates DOM */
    function updateCoverFlowStyles(dragOffsetPx) {
        const list = _cachedList;
        const track = document.getElementById("coverflowTrack");
        if (!_cardsBuilt || list.length === 0) return;

        if (activeIndex >= list.length) activeIndex = list.length - 1;
        if (activeIndex < 0) activeIndex = 0;

        const activeProp = list[activeIndex];
        featured = activeProp;

        document.body.style.setProperty('--bg-image', `url(${activeProp.image})`);

        const isMobile = window.innerWidth <= 480;
        const isTablet = window.innerWidth <= 991 && window.innerWidth > 480;
        const cardWidth = isMobile ? 290 : 410;
        const progress = dragOffsetPx ? (dragOffsetPx / cardWidth) : 0;
        const virtualCenter = activeIndex - progress;

        const gapOffset = isMobile ? 80 : (isTablet ? 110 : 150);
        const sideOffset = isMobile ? 12 : 25;
        const zOffset = isMobile ? -170 : -140;
        const angle = isMobile ? 38 : 35;

        const cards = track.querySelectorAll(".coverflow-card");
        cards.forEach((card) => {
            const idx = parseInt(card.dataset.index);
            const diff = idx - virtualCenter;
            const absDiff = Math.abs(diff);

            // Hide far-away cards
            if (absDiff > 3) {
                card.style.display = "none";
                return;
            }
            card.style.display = "";

            card.classList.toggle("active-card", idx === activeIndex);

            let translateX = 0, rotateY = 0, scale = 1, opacity = 1;
            const zIndexVal = Math.round(10 - absDiff);

            if (absDiff <= 1) {
                const t = absDiff;
                const sign = diff < 0 ? -1 : 1;
                translateX = sign * (t * (gapOffset + sideOffset));
                rotateY = -sign * t * angle;
                scale = 1 - t * 0.18;
                opacity = 1 - t * 0.3;
            } else {
                const sign = diff < 0 ? -1 : 1;
                translateX = sign * ((gapOffset + sideOffset) + (absDiff - 1) * gapOffset);
                rotateY = -sign * angle;
                scale = 0.82;
                opacity = Math.max(0.1, 0.7 - (absDiff - 1) * 0.25);
            }

            const transformStr = `translate3d(${translateX}px, 0, ${absDiff * zOffset}px) rotateY(${rotateY}deg) scale(${scale})`;

            if (isDragging) {
                card.style.transition = "none";
            } else {
                card.style.transition = "transform 0.65s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.65s ease, filter 0.65s ease";
            }

            card.style.transform = transformStr;
            card.style.zIndex = zIndexVal;
            card.style.opacity = opacity;
            card.style.filter = absDiff > 0.1 ? `blur(${Math.min(3, absDiff * 1.5)}px)` : "none";
        });
    }

    /** Sync under-card pill, action buttons, pagination dots */
    function syncCoverFlowUI() {
        const list = _cachedList;
        if (list.length === 0) return;
        const activeProp = list[activeIndex];

        document.getElementById("agencyName").textContent = activeProp.agency.name;
        document.getElementById("agencyMeta").textContent = `Agence Agrée • ${activeProp.location}`;
        document.getElementById("agencyAvatar").textContent = activeProp.agency.code;

        const likeBtn = document.getElementById("carouselLikeBtn");
        const favBtn = document.getElementById("carouselFavBtn");
        likeBtn.classList.toggle("active-like", activeProp.liked);
        favBtn.classList.toggle("active-fav", activeProp.favorited);

        const icon = likeBtn.querySelector("i");
        if (icon) {
            icon.className = activeProp.liked ? "ri-heart-fill" : "ri-heart-line";
        }

        const favIcon = favBtn.querySelector("i");
        if (favIcon) {
            favIcon.className = activeProp.favorited ? "ri-bookmark-fill" : "ri-bookmark-line";
        }

        // Update pagination dot active states
        const pagination = document.getElementById("carouselPagination");
        const dots = pagination.querySelectorAll(".carousel-dot");
        dots.forEach((dot, idx) => {
            dot.classList.toggle("active", idx === activeIndex);
        });
    }

    /** Backward-compatible wrapper: rebuilds cards + styles */
    function updateCoverFlow(dragOffsetPx) {
        if (!_cardsBuilt || !dragOffsetPx) {
            renderCoverFlowCards();
        }
        updateCoverFlowStyles(dragOffsetPx);
        if (!isDragging) {
            syncCoverFlowUI();
        }
    }



    restorePropertyState();
    renderFavorites();

    // Render Coverflow initially
    updateCoverFlow();

    /* ===== SMOOTH GALLERY-LIKE SWIPE GESTURES ===== */
    const trackEl = document.getElementById("coverflowTrack");
    let dragStartX = 0;
    let dragCurrentX = 0;
    let hasSwiped = false;
    let dragAnimFrame = null;

    function onDragStart(x) {
        isDragging = true;
        hasSwiped = false;
        dragStartX = x;
        dragCurrentX = x;
        swipeOffset = 0;
        if (dragAnimFrame) cancelAnimationFrame(dragAnimFrame);
    }

    function onDragMove(x) {
        if (!isDragging) return;
        dragCurrentX = x;
        swipeOffset = dragCurrentX - dragStartX;
        
        // Dampen offset at edges
        const list = getFilteredProperties();
        if ((activeIndex === 0 && swipeOffset > 0) || (activeIndex === list.length - 1 && swipeOffset < 0)) {
            swipeOffset *= 0.3; // Rubber-band effect at edges
        }
        
        // Use rAF for smooth rendering
        if (dragAnimFrame) cancelAnimationFrame(dragAnimFrame);
        dragAnimFrame = requestAnimationFrame(() => {
            updateCoverFlow(swipeOffset);
        });
    }

    function onDragEnd() {
        if (!isDragging) return;
        isDragging = false;
        
        const list = getFilteredProperties();
        const threshold = 60; // px needed to change card
        
        if (Math.abs(swipeOffset) > threshold) {
            hasSwiped = true;
            if (swipeOffset > 0) {
                // Dragged Right -> Previous Card
                activeIndex = Math.max(0, activeIndex - 1);
            } else {
                // Dragged Left -> Next Card
                activeIndex = Math.min(list.length - 1, activeIndex + 1);
            }
        }
        
        swipeOffset = 0;
        updateCoverFlow(); // Snap with transition
        
        // Block click event if swiped
        if (hasSwiped) {
            setTimeout(() => { hasSwiped = false; }, 50);
        }
    }

    // Mouse events
    trackEl.addEventListener("mousedown", (e) => {
        if (e.target.closest(".card-expand-btn") || e.target.closest(".card-avatar")) {
            return; // Allow clicks on buttons
        }
        e.preventDefault();
        onDragStart(e.clientX);
    });

    window.addEventListener("mousemove", (e) => {
        onDragMove(e.clientX);
    });

    window.addEventListener("mouseup", () => {
        onDragEnd();
    });

    // Touch events
    trackEl.addEventListener("touchstart", (e) => {
        if (e.target.closest(".card-expand-btn") || e.target.closest(".card-avatar")) {
            return; // Allow touches on buttons
        }
        onDragStart(e.touches[0].clientX);
    }, { passive: true });

    trackEl.addEventListener("touchmove", (e) => {
        onDragMove(e.touches[0].clientX);
    }, { passive: true });

    trackEl.addEventListener("touchend", () => {
        onDragEnd();
    });

    /* ===== CAROUSEL CONTROLS ===== */
    document.getElementById("prevCardBtn").addEventListener("click", () => {
        activeIndex = Math.max(0, activeIndex - 1);
        updateCoverFlowStyles();
        syncCoverFlowUI();
    });

    document.getElementById("nextCardBtn").addEventListener("click", () => {
        const list = getFilteredProperties();
        activeIndex = Math.min(list.length - 1, activeIndex + 1);
        updateCoverFlowStyles();
        syncCoverFlowUI();
    });

    // Under-card agency details click -> Agency Profile
    const agencyClickEvent = () => {
        const list = getFilteredProperties();
        if (list.length === 0) return;
        const prop = list[activeIndex];
        openAgencyProfile(prop.agency.name);
    };

    document.getElementById("agencyAvatar").addEventListener("click", agencyClickEvent);
    document.getElementById("agencyName").addEventListener("click", agencyClickEvent);

    // Floating pill buttons
    document.getElementById("carouselLikeBtn").addEventListener("click", () => {
        const prop = getActiveProperty();
        if (!prop) return;
        prop.liked = !prop.liked;
        prop.likes = Math.max(0, prop.likes + (prop.liked ? 1 : -1));
        persistPropertyState();
        updateCoverFlow();
        pushNotification(prop.liked ? `Vous avez aimé "${prop.title}"` : `Votre like sur "${prop.title}" a été retiré`, "ri-heart-fill");
    });

    document.getElementById("carouselFavBtn").addEventListener("click", () => {
        const prop = getActiveProperty();
        if (!prop) return;
        prop.favorited = !prop.favorited;
        if (prop.favorited) {
            favorites = favorites.filter(f => f.id !== prop.id);
            favorites.unshift(prop);
            pushNotification(`"${prop.title}" enregistré dans vos favoris`, "ri-bookmark-fill");
        } else {
            favorites = favorites.filter(f => f.id !== prop.id);
            pushNotification(`"${prop.title}" retiré de vos favoris`, "ri-bookmark-line");
        }
        persistPropertyState();
        updateCoverFlow();
        renderFavorites();
    });

    // Chat transition button (side actions bar)
    document.getElementById("carouselChatBtn").addEventListener("click", () => {
        const prop = getActiveProperty();
        if (!prop) return;

        switchSection("messages");
        menuItems.forEach(m => {
            m.classList.toggle("active", m.dataset.section === "messages");
        });

        const allContactCards = document.querySelectorAll(".contact-card");
        let targetCard = null;
        allContactCards.forEach(card => {
            if (card.dataset.contact === prop.agency.name) {
                targetCard = card;
            }
        });

        if (targetCard) {
            targetCard.click();
            const initialMessage = `Bonjour, je suis très intéressé par « ${prop.title} » situé à ${prop.location}. Pouvez-vous me donner plus de détails ?`;
            chatInput.value = initialMessage;
            chatInput.focus();
            sendMessage(initialMessage);
        }
    });

    /* ===== FAVORITES RENDER UPDATE ===== */
    function renderFavorites() {
        favorites = properties.filter(p => p.favorited);
        favCount.textContent = favorites.length;
        favGrid.innerHTML = "";
        
        if (btnCompareFavorites) {
            btnCompareFavorites.style.display = favorites.length >= 2 ? "flex" : "none";
        }
        // Force close overlay if favorites drops below 2
        if (favorites.length < 2 && favoritesComparisonOverlay) {
            favoritesComparisonOverlay.style.display = "none";
            favGrid.style.display = "grid";
        }

        if (favorites.length === 0) {
            favGrid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:#999;padding:3rem;">Aucun favori pour le moment. Aimez des maisons dans le carousel pour les retrouver ici.</p>`;
            return;
        }
        favorites.forEach(prop => {
            const card = document.createElement("div");
            card.className = "property-card";
            card.innerHTML = `
                <img class="property-card-img" src="${prop.image}" alt="${prop.title}">
                <div class="property-card-body">
                    <h4 class="property-card-title">${prop.title}</h4>
                    <p class="property-card-location"><i class="ri-map-pin-line"></i> ${prop.location}</p>
                    <div class="property-card-footer">
                        <span class="property-card-price">${formatPrice(prop.price)}</span>
                        <span class="stat-item fav-stat" data-id="${prop.id}">
                            <i class="ri-bookmark-fill"></i> Retirer
                        </span>
                    </div>
                </div>
            `;
            card.querySelector(".fav-stat").addEventListener("click", () => {
                prop.favorited = false;
                updateCoverFlow();
                renderFavorites();
            });
            favGrid.appendChild(card);
        });
    }

    if (btnCompareFavorites) {
        btnCompareFavorites.addEventListener("click", () => {
            if (favoritesComparisonOverlay.style.display === "none") {
                favoritesComparisonOverlay.style.display = "block";
                favGrid.style.display = "none";
                renderComparison();
            } else {
                favoritesComparisonOverlay.style.display = "none";
                favGrid.style.display = "grid";
            }
        });
    }

    function renderComparison() {
        const user = JSON.parse(localStorage.getItem("tomee_user") || "{}");
        const parrainagesCount = parseInt(localStorage.getItem("tomee_parrainages_count") || "0");
        
        favoritesComparisonOverlay.innerHTML = "";
        
        if (parrainagesCount < 2) {
            const progressPercent = (parrainagesCount / 2) * 100;
            favoritesComparisonOverlay.innerHTML = `
                <div class="compare-lock-panel">
                    <div class="lock-icon"><i class="ri-lock-2-line"></i></div>
                    <h3>Fonctionnalité Verrouillée</h3>
                    <p>La comparaison dynamique de biens est réservée aux utilisateurs actifs.</p>
                    <p class="lock-condition">Parrainez 2 amis pour débloquer cette fonctionnalité !</p>
                    <div class="progress-box">
                        <span id="parrainageProgressLabel" style="font-size:1.25rem; font-weight:600;">${parrainagesCount} / 2 ami(e)s parrainé(e)s</span>
                        <div class="progress-bar-bg" style="width:100%; height:8px; background:rgba(0,0,0,0.08); border-radius:99px; overflow:hidden; margin-top:0.4rem;">
                            <div class="progress-bar-fill" style="width: ${progressPercent}%; height:100%; background:linear-gradient(135deg, #5df8ab, #35c77a); border-radius:99px;"></div>
                        </div>
                    </div>
                    <button class="btn-unlock-parrainage" id="btnUnlockParrainage" style="margin-top:1rem;">
                        <i class="ri-share-line"></i> Partager mon lien de parrainage
                    </button>
                    <button class="btn-close-comparison" id="btnCloseComparison" style="background: rgba(0,0,0,0.05); color: var(--text-primary); margin-top: 1rem; border: 1px solid rgba(0,0,0,0.1);">
                        Retour aux favoris
                    </button>
                </div>
            `;
            
            document.getElementById("btnUnlockParrainage").addEventListener("click", async () => {
                const refCode = user.ref_code || "KOFFI_123";
                const shareLink = `${window.location.origin}/register.html?ref=${refCode}`;
                navigator.clipboard.writeText(shareLink);
                
                alert(`Lien de parrainage copié dans le presse-papiers !\nPartagez-le avec vos amis pour débloquer le comparateur.`);
                
                const newCount = parrainagesCount + 1;
                localStorage.setItem("tomee_parrainages_count", newCount.toString());
                
                if (user.id) {
                    try {
                        await fetch(`http://localhost:5000/api/users/${user.id}/parrainages/simulate`, { method: "POST" });
                    } catch (e) {}
                }
                
                renderComparison();
            });
            
            document.getElementById("btnCloseComparison").addEventListener("click", () => {
                favoritesComparisonOverlay.style.display = "none";
                favGrid.style.display = "grid";
            });
        } else {
            const rowsHTML = favorites.map(prop => `
                <tr>
                    <td><img class="comparison-table-img" src="${prop.image}" alt="${prop.title}"></td>
                    <td><strong>${prop.title}</strong></td>
                    <td><span style="color: #35c77a; font-weight: 700;">${formatPrice(prop.price)}</span></td>
                    <td><i class="ri-map-pin-line"></i> ${prop.location}</td>
                    <td>${prop.beds} ch.</td>
                    <td>${prop.area} m²</td>
                    <td><span style="background: rgba(93, 248, 171, 0.2); color: #0b2216; padding: 0.2rem 0.6rem; border-radius: 0.6rem; font-size: 1.1rem; font-weight: 600;">${prop.type}</span></td>
                </tr>
            `).join('');
            
            favoritesComparisonOverlay.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="ri-arrow-left-right-line"></i> Comparaison de vos favoris</h3>
                    <button class="btn-close-comparison" id="btnCloseComparison">Retour aux favoris</button>
                </div>
                <div class="comparison-table-wrapper">
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Propriété</th>
                                <th>Prix</th>
                                <th>Localisation</th>
                                <th>Chambres</th>
                                <th>Surface</th>
                                <th>Catégorie</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rowsHTML}
                        </tbody>
                    </table>
                </div>
            `;
            
            document.getElementById("btnCloseComparison").addEventListener("click", () => {
                favoritesComparisonOverlay.style.display = "none";
                favGrid.style.display = "grid";
            });
        }
    }

    /* ===== CIRCULAR DOCK MENU ===== */
    function positionMobileMenu() {
        if (window.innerWidth > 768) {
            // Reset inline styles for desktop
            circularMenu.style.top = "";
            circularMenu.style.bottom = "";
            circularMenu.style.left = "";
            circularMenu.style.right = "";
            circularMenu.style.transform = "";
            return;
        }
        
        const rect = dockContainer.getBoundingClientRect();
        
        // Vertical placement: open down if bubble is in the top 280px of viewport, else open up
        if (rect.top < 280) {
            circularMenu.style.top = "7rem";
            circularMenu.style.bottom = "auto";
        } else {
            circularMenu.style.bottom = "7rem";
            circularMenu.style.top = "auto";
        }
        
        // Horizontal placement: prevent menu from going off-screen (keep it fully visible)
        const menuWidth = 170; // Matches CSS width
        const leftSpace = rect.left + rect.width / 2;
        const rightSpace = window.innerWidth - leftSpace;
        
        if (leftSpace < menuWidth / 2 + 15) {
            // Too close to left screen boundary, align left edge
            circularMenu.style.left = "0";
            circularMenu.style.right = "auto";
            circularMenu.style.transform = "none";
        } else if (rightSpace < menuWidth / 2 + 15) {
            // Too close to right screen boundary, align right edge
            circularMenu.style.right = "0";
            circularMenu.style.left = "auto";
            circularMenu.style.transform = "none";
        } else {
            // Center horizontally relative to bubble
            circularMenu.style.left = "50%";
            circularMenu.style.right = "auto";
            circularMenu.style.transform = "translateX(-50%)";
        }
    }

    dockTrigger.addEventListener("click", (e) => {
        e.stopPropagation();
        if (ignoreDockClick) {
            ignoreDockClick = false;
            return;
        }
        menuOpen = !menuOpen;
        circularMenu.classList.toggle("active", menuOpen);
        
        if (menuOpen) {
            positionMobileMenu();
        } else {
            // Reset styles when closing
            circularMenu.style.top = "";
            circularMenu.style.bottom = "";
            circularMenu.style.left = "";
            circularMenu.style.right = "";
            circularMenu.style.transform = "";
        }
        
        dockTrigger.querySelector("i").className = menuOpen ? "ri-close-line" : "ri-apps-line";
    });

    menuItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.stopPropagation();
            const target = item.dataset.section;
            switchSection(target);
            menuItems.forEach(m => m.classList.remove("active"));
            item.classList.add("active");
            
            menuOpen = false;
            circularMenu.classList.remove("active");
            dockTrigger.querySelector("i").className = "ri-apps-line";
            
            // Reset styles
            circularMenu.style.top = "";
            circularMenu.style.bottom = "";
            circularMenu.style.left = "";
            circularMenu.style.right = "";
            circularMenu.style.transform = "";
        });
    });

    /* ===== MOBILE/TABLET DRAGGABLE FLOATING BUBBLE DOCK ===== */
    let isDockDragging = false;
    let dockStartX = 0;
    let dockStartY = 0;
    let dockInitialLeft = 0;
    let dockInitialTop = 0;
    let dockDraggedDist = 0;

    // Touch Event Listeners (passive: false to allow e.preventDefault() for page scrolling suppression)
    dockContainer.addEventListener("touchstart", (e) => {
        if (window.innerWidth > 768) return; // Only draggable on mobile/tablet viewport sizes
        if (e.target.closest(".menu-item")) return; // Don't drag when selecting menu items

        isDockDragging = true;
        dockDraggedDist = 0;
        
        // Record touch and initial position
        dockStartX = e.touches[0].clientX;
        dockStartY = e.touches[0].clientY;
        
        const rect = dockContainer.getBoundingClientRect();
        dockInitialLeft = rect.left;
        dockInitialTop = rect.top;
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
        if (!isDockDragging) return;
        
        // Prevent default scrolling behavior when dragging the bubble
        if (e.cancelable) {
            e.preventDefault();
        }
        
        const dx = e.touches[0].clientX - dockStartX;
        const dy = e.touches[0].clientY - dockStartY;
        
        let newLeft = dockInitialLeft + dx;
        let newTop = dockInitialTop + dy;
        
        const rect = dockContainer.getBoundingClientRect();
        const minX = 10;
        const maxX = window.innerWidth - rect.width - 10;
        const minY = 10;
        const maxY = window.innerHeight - rect.height - 10;
        
        newLeft = Math.max(minX, Math.min(newLeft, maxX));
        newTop = Math.max(minY, Math.min(newTop, maxY));
        
        dockContainer.style.left = `${newLeft}px`;
        dockContainer.style.top = `${newTop}px`;
        dockContainer.style.bottom = "auto";
        dockContainer.style.right = "auto";
        dockContainer.style.position = "fixed";
        
        if (menuOpen) {
            positionMobileMenu();
        }
        
        dockDraggedDist = Math.sqrt(dx*dx + dy*dy);
    }, { passive: false });

    window.addEventListener("touchend", () => {
        if (!isDockDragging) return;
        isDockDragging = false;
        
        if (dockDraggedDist > 8) {
            ignoreDockClick = true;
            setTimeout(() => { ignoreDockClick = false; }, 100);
        }
    });

    // Mouse Event Listeners (for desktop mobile emulator testing)
    dockContainer.addEventListener("mousedown", (e) => {
        if (window.innerWidth > 768) return; // Only draggable on mobile/tablet viewport sizes
        if (e.target.closest(".menu-item")) return;
        if (e.button !== 0) return; // Left click only
        
        isDockDragging = true;
        dockDraggedDist = 0;
        
        dockStartX = e.clientX;
        dockStartY = e.clientY;
        
        const rect = dockContainer.getBoundingClientRect();
        dockInitialLeft = rect.left;
        dockInitialTop = rect.top;
        
        e.preventDefault(); // Prevent text selection/drag ghosting
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDockDragging) return;
        
        const dx = e.clientX - dockStartX;
        const dy = e.clientY - dockStartY;
        
        let newLeft = dockInitialLeft + dx;
        let newTop = dockInitialTop + dy;
        
        const rect = dockContainer.getBoundingClientRect();
        const minX = 10;
        const maxX = window.innerWidth - rect.width - 10;
        const minY = 10;
        const maxY = window.innerHeight - rect.height - 10;
        
        newLeft = Math.max(minX, Math.min(newLeft, maxX));
        newTop = Math.max(minY, Math.min(newTop, maxY));
        
        dockContainer.style.left = `${newLeft}px`;
        dockContainer.style.top = `${newTop}px`;
        dockContainer.style.bottom = "auto";
        dockContainer.style.right = "auto";
        dockContainer.style.position = "fixed";
        
        if (menuOpen) {
            positionMobileMenu();
        }
        
        dockDraggedDist = Math.sqrt(dx*dx + dy*dy);
    });

    window.addEventListener("mouseup", () => {
        if (!isDockDragging) return;
        isDockDragging = false;
        
        if (dockDraggedDist > 8) {
            ignoreDockClick = true;
            setTimeout(() => { ignoreDockClick = false; }, 100);
        }
    });

    function switchSection(name) {
        currentSection = name;
        sections.forEach(s => {
            const isActive = s.id === `section-${name}`;
            s.classList.toggle("active-section", isActive);
            s.hidden = !isActive;
        });
        if (name === "profile") {
            renderFollowedAgencies();
        } else if (name === "home") {
            loadProperties();
            updateCoverFlow();
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    /* ===== NOTIFICATIONS ===== */
    const notifications = [
        { text: "Abomey Immo a publié 3 nouvelles propriétés", icon: "ri-home-heart-line", time: "Il y a 5 min" },
        { text: "Votre message à Cotonou Properties a été lu", icon: "ri-chat-check-line", time: "Il y a 20 min" },
        { text: "Bienvenue sur ToMee ! Explorez les propriétés", icon: "ri-star-smile-line", time: "À l'instant" }
    ];

    function renderNotifStack() {
        const body = notifStack.querySelector(".stack-body");
        body.innerHTML = "";
        notifications.forEach(n => {
            const card = document.createElement("div");
            card.className = "notif-card";
            card.innerHTML = `
                <i class="${n.icon}"></i>
                <div class="notif-card-text">
                    <p>${n.text}</p>
                    <span>${n.time}</span>
                </div>
            `;
            body.appendChild(card);
        });
    }

    renderNotifStack();

    function pushNotification(text, icon = "ri-notification-line") {
        const notif = { text, icon, time: "À l'instant" };
        notifications.unshift(notif);
        renderNotifStack();
        notifStack.classList.remove("hidden");
        renderNotifLog();
        setTimeout(() => notifStack.classList.add("hidden"), 5000);
    }

    notifDismiss.addEventListener("click", () => {
        notifStack.classList.add("hidden");
    });

    if (toggleNotifBtn) {
        toggleNotifBtn.addEventListener("click", () => {
            notifStack.classList.toggle("hidden");
        });
    }

    function renderNotifLog() {
        notifLogList.innerHTML = "";
        notifications.forEach(n => {
            const item = document.createElement("div");
            item.className = "notif-log-item";
            item.innerHTML = `
                <span class="notif-log-icon"><i class="${n.icon}"></i></span>
                <div class="notif-log-text">
                    <p>${n.text}</p>
                    <span>${n.time}</span>
                </div>
            `;
            notifLogList.appendChild(item);
        });
    }

    renderNotifLog();

    /* ===== DARK MODE ===== */
    toggleDark.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const icon = toggleDark.querySelector("i");
        if (document.body.classList.contains("dark-mode")) {
            icon.className = "ri-sun-line";
            localStorage.setItem("tomee_dark_mode", "true");
        } else {
            icon.className = "ri-moon-line";
            localStorage.setItem("tomee_dark_mode", "false");
        }
    });

    // Restore dark mode preference
    if (localStorage.getItem("tomee_dark_mode") === "true") {
        document.body.classList.add("dark-mode");
        toggleDark.querySelector("i").className = "ri-sun-line";
    }

    /* ===== PROFILE ===== */
    profileNameEl.textContent = MOCK_USER.name;
    profileRoleEl.textContent = MOCK_USER.role;
    profileEmailEl.innerHTML = `<i class="ri-mail-line"></i> ${MOCK_USER.email}`;
    profilePhoneEl.innerHTML = `<i class="ri-phone-line"></i> ${MOCK_USER.phone}`;
    profileCityEl.innerHTML = `<i class="ri-map-pin-line"></i> ${MOCK_USER.city}`;
    loadProfilePhoto();

    settingsName.value = MOCK_USER.name;
    settingsEmail.value = MOCK_USER.email;
    settingsPhone.value = MOCK_USER.phone;
    settingsCity.value = MOCK_USER.city;
    settingsCurrency.value = MOCK_USER.currency;
    settingsBudget.value = MOCK_USER.budget;

    saveSettingsBtn.addEventListener("click", () => {
        MOCK_USER.name = settingsName.value;
        MOCK_USER.email = settingsEmail.value;
        MOCK_USER.phone = settingsPhone.value;
        MOCK_USER.city = settingsCity.value;
        MOCK_USER.currency = settingsCurrency.value;
        MOCK_USER.budget = settingsBudget.value;

        // Save back to localStorage
        const updatedPrefs = {
            role: MOCK_USER.role === "Agence" ? "agence" : "particulier",
            name: MOCK_USER.name,
            email: MOCK_USER.email,
            phone: MOCK_USER.phone,
            city: MOCK_USER.city,
            currency: MOCK_USER.currency.includes("XOF") ? "XOF" : 
                      MOCK_USER.currency.includes("XAF") ? "XAF" :
                      MOCK_USER.currency.includes("USD") ? "USD" :
                      MOCK_USER.currency.includes("EUR") ? "EUR" :
                      MOCK_USER.currency.includes("NGN") ? "NGN" : "GHS",
            budget: MOCK_USER.budget.includes("30 000") ? "30000" :
                    MOCK_USER.budget.includes("50 000") ? "50000" :
                    MOCK_USER.budget.includes("70 000") ? "70000" :
                    MOCK_USER.budget.includes("100 000") ? "100000" : "plus"
        };
        localStorage.setItem("tomee_user", JSON.stringify(updatedPrefs));

        profileNameEl.textContent = MOCK_USER.name;
        profileEmailEl.innerHTML = `<i class="ri-mail-line"></i> ${MOCK_USER.email}`;
        profilePhoneEl.innerHTML = `<i class="ri-phone-line"></i> ${MOCK_USER.phone}`;
        profileCityEl.innerHTML = `<i class="ri-map-pin-line"></i> ${MOCK_USER.city}`;
        refreshPriceDisplays();

        pushNotification("Paramètres mis à jour avec succès !", "ri-checkbox-circle-line");
    });

    uploadPhotoBtn?.addEventListener("click", () => profilePhotoInput?.click());
    profilePhotoInput?.addEventListener("change", (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const photoData = reader.result;
            localStorage.setItem("tomee_profile_photo", photoData);
            applyProfilePhoto(photoData);
            pushNotification("Photo de profil mise à jour", "ri-camera-line");
        };
        reader.readAsDataURL(file);
    });

    // ToMee Story (NGL Style) link generation
    const btnGenerateViralLink = document.getElementById("btnGenerateViralLink");
    btnGenerateViralLink?.addEventListener("click", () => {
        const usernameFormatted = MOCK_USER.name.toLowerCase().replace(/[^a-z0-9]/g, "_");
        const mockLink = `${window.location.origin}/share/vote_${usernameFormatted}_favorites`;
        
        navigator.clipboard.writeText(mockLink).then(() => {
            pushNotification("Lien Story copié ! Partage-le sur Instagram/WhatsApp 🚀", "ri-links-line");
        }).catch(err => {
            console.error("Erreur de copie : ", err);
            alert(`Voici ton lien à copier : ${mockLink}`);
        });
    });

    /* ===== CHAT ===== */
    const chatData = {
        "Abomey Immo": [
            { from: "them", text: "Bonjour ! Nous avons de nouvelles villas à Cotonou.", time: "10:30" },
            { from: "me", text: "Super, je suis intéressé. Quel est le prix ?", time: "10:32" },
            { from: "them", text: "À partir de 65 000 FCFA/mois. Voulez-vous visiter ?", time: "10:35" }
        ],
        "Cotonou Properties": [
            { from: "them", text: "Merci pour votre intérêt pour notre appartement meublé.", time: "09:15" },
            { from: "me", text: "Il est encore disponible ?", time: "09:20" }
        ],
        "Résidence Bénin": [
            { from: "them", text: "Bonjour ! Notre nouvelle résidence est prête.", time: "Hier" }
        ]
    };

    let activeChat = "Abomey Immo";

    function renderChat() {
        chatMessages.innerHTML = "";
        const msgs = chatData[activeChat] || [];
        msgs.forEach(m => {
            const bubble = document.createElement("div");
            bubble.className = `msg-bubble ${m.from === "me" ? "outgoing" : "incoming"}`;
            bubble.innerHTML = `${m.text}<span class="msg-time">${m.time}</span>`;
            chatMessages.appendChild(bubble);
        });
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        const header = document.querySelector(".chat-header");
        header.querySelector("h4").textContent = activeChat;
        header.querySelector("p").textContent = "En ligne";
    }

    function openMobileConversation() {
        if (window.innerWidth <= 768 && chatContainer) {
            chatContainer.classList.add("mobile-chat-open");
        }
    }

    function ensureChatInputVisible() {
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                chatInput?.scrollIntoView({ block: "end", behavior: "smooth" });
                window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
            }, 220);
        }
    }

    contactCards.forEach(card => {
        card.addEventListener("click", () => {
            contactCards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");
            activeChat = card.dataset.contact;
            renderChat();
            openMobileConversation();
            setTimeout(() => {
                chatInput.focus();
                ensureChatInputVisible();
            }, 80);
        });
    });

    if (chatMobileBackBtn) {
        chatMobileBackBtn.addEventListener("click", () => {
            if (chatContainer) {
                chatContainer.classList.remove("mobile-chat-open");
            }
        });
    }

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768 && chatContainer) {
            chatContainer.classList.remove("mobile-chat-open");
        }
    });

    function sendMessage(textOverride) {
        const text = (textOverride || chatInput.value).trim();
        if (!text) return;
        if (!chatData[activeChat]) chatData[activeChat] = [];
        const now = new Date();
        chatData[activeChat].push({
            from: "me",
            text,
            time: `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`
        });
        chatInput.value = "";
        renderChat();
        ensureChatInputVisible();
    }

    chatSendBtn.addEventListener("click", () => sendMessage());
    chatInput.addEventListener("focus", ensureChatInputVisible);
    chatInput.addEventListener("click", ensureChatInputVisible);
    chatInput.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    });

    renderChat();

    /* ===== SEARCH BAR ===== */
    const searchInput = document.getElementById("dashboardSearch");
    const searchBtn = document.getElementById("dashboardSearchBtn");

    searchBtn.addEventListener("click", performSearch);
    searchInput.addEventListener("keydown", e => { if (e.key === "Enter") performSearch(); });

    function performSearch() {
        const q = searchInput.value.trim().toLowerCase();
        
        // Custom search filters properties
        let results = [];
        if (!q) {
            results = properties;
        } else {
            results = properties.filter(p =>
                p.title.toLowerCase().includes(q) ||
                p.location.toLowerCase().includes(q) ||
                p.type.toLowerCase().includes(q) ||
                p.agency.name.toLowerCase().includes(q)
            );
        }

        onUserSearchAction();

        // Navigate to home section to display search results
        switchSection("home");
        menuItems.forEach(m => {
            m.classList.toggle("active", m.dataset.section === "home");
        });
        
        activeIndex = 0; // Reset search card view index
        updateCoverFlow(); // Render Cover Flow with search results
    }

    // Logout button handler
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("tomee_logged_in");
        });
    }

    /* ===== INITIAL NOTIFICATIONS SHOW ===== */
    setTimeout(() => {
        notifStack.classList.remove("hidden");
        setTimeout(() => notifStack.classList.add("hidden"), 6000);
    }, 2000);

    /* ===== CLOSE MENU ON OUTSIDE CLICK ===== */
    document.addEventListener("click", (e) => {
        if (menuOpen && !circularMenu.contains(e.target) && !dockTrigger.contains(e.target)) {
            menuOpen = false;
            circularMenu.classList.remove("active");
            dockTrigger.querySelector("i").className = "ri-apps-line";
        }
    });

    /* ===== KEYBOARD NAVIGATION & MODAL COMMANDS ===== */
    document.addEventListener("keydown", (e) => {
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
        
        // If media modal is visible, intercept keyboard arrow controls
        if (mediaExpandModal && !mediaExpandModal.classList.contains("hidden")) {
            if (e.key === "ArrowLeft") {
                e.preventDefault();
                mediaModalPrev.click();
            } else if (e.key === "ArrowRight") {
                e.preventDefault();
                mediaModalNext.click();
            } else if (e.key === "Escape") {
                e.preventDefault();
                closeMediaModal();
            }
            return;
        }

        if (currentSection !== "home") return;
        
        const list = getFilteredProperties();
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            activeIndex = Math.max(0, activeIndex - 1);
            updateCoverFlowStyles();
            syncCoverFlowUI();
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            activeIndex = Math.min(list.length - 1, activeIndex + 1);
            updateCoverFlowStyles();
            syncCoverFlowUI();
        }
    });

    /* ===== FULLSCREEN MEDIA EXPAND MODAL LOGIC ===== */
    let _currentModalProp = null;

    function openMediaModal(prop) {
        _currentModalProp = prop;
        currentModalMedia = prop.media || [prop.image];
        currentModalMediaIndex = 0;
        
        mediaModalTitle.textContent = prop.title;
        mediaModalLocation.innerHTML = `<i class="ri-map-pin-line"></i> ${prop.location}`;

        // Populate right-pane details
        const typeEl = document.getElementById("mediaModalType");
        const priceEl = document.getElementById("mediaModalPrice");
        const bedsEl = document.getElementById("mediaModalSpecsBeds");
        const areaEl = document.getElementById("mediaModalSpecsArea");
        const descEl = document.getElementById("mediaModalDesc");
        const countEl = document.getElementById("mediaModalCommentsCount");

        if (typeEl) typeEl.textContent = prop.type.toUpperCase();
        if (priceEl) priceEl.textContent = formatPrice(prop.price);
        if (bedsEl) bedsEl.textContent = prop.beds + " Ch.";
        if (areaEl) areaEl.textContent = prop.area + "m²";
        if (descEl) descEl.textContent = prop.description;
        if (countEl) countEl.textContent = (prop.commentsList || []).length;

        renderModalComments(prop);

        mediaExpandModal.classList.remove("hidden");
        renderMediaModalDots();
        updateMediaModalViewer();
    }

    function renderModalComments(prop) {
        const listEl = document.getElementById("mediaModalCommentsList");
        const countEl = document.getElementById("mediaModalCommentsCount");
        if (!listEl) return;
        listEl.innerHTML = "";
        const comments = prop.commentsList || [];
        if (countEl) countEl.textContent = comments.length;

        if (comments.length === 0) {
            listEl.innerHTML = `<p style="color:rgba(255,255,255,0.4);font-size:1.25rem;text-align:center;padding:2rem 0;">Aucun commentaire pour le moment.</p>`;
            return;
        }

        comments.forEach(c => {
            const item = document.createElement("div");
            item.className = "modal-comment-item";
            item.innerHTML = `
                <div class="modal-comment-avatar">${c.user.charAt(0)}</div>
                <div class="modal-comment-body">
                    <div class="modal-comment-head">
                        <strong>${c.user}</strong>
                        <span>${c.date}</span>
                    </div>
                    <p>${c.text}</p>
                </div>
            `;
            listEl.appendChild(item);
        });
        listEl.scrollTop = listEl.scrollHeight;
    }

    // Comment send button
    const modalCommentInput = document.getElementById("mediaModalCommentInput");
    const modalCommentSendBtn = document.getElementById("mediaModalCommentSendBtn");

    function sendModalComment() {
        if (!_currentModalProp || !modalCommentInput) return;
        const text = modalCommentInput.value.trim();
        if (!text) return;
        if (!_currentModalProp.commentsList) _currentModalProp.commentsList = [];
        _currentModalProp.commentsList.push({
            user: MOCK_USER.name,
            text: text,
            date: "À l'instant"
        });
        modalCommentInput.value = "";
        renderModalComments(_currentModalProp);
    }

    if (modalCommentSendBtn) {
        modalCommentSendBtn.addEventListener("click", sendModalComment);
    }
    if (modalCommentInput) {
        modalCommentInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") sendModalComment();
        });
    }

    function updateMediaModalViewer() {
        if (!mediaModalViewer) return;
        mediaModalViewer.innerHTML = "";
        const item = currentModalMedia[currentModalMediaIndex];
        if (!item) return;
        
        const isVideo = item.toLowerCase().endsWith(".mp4") || item.includes("video") || item.includes("mixkit.co/videos");
        
        if (isVideo) {
            const video = document.createElement("video");
            video.src = item;
            video.autoplay = true;
            video.controls = true;
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            mediaModalViewer.appendChild(video);
        } else {
            const img = document.createElement("img");
            img.src = item;
            img.alt = "Property media photo";
            img.draggable = false;
            mediaModalViewer.appendChild(img);
        }
        
        // Sync active dot
        const dots = mediaModalDots.querySelectorAll(".media-modal-dot");
        dots.forEach((dot, idx) => {
            dot.classList.toggle("active", idx === currentModalMediaIndex);
        });
    }

    function renderMediaModalDots() {
        if (!mediaModalDots) return;
        mediaModalDots.innerHTML = "";
        currentModalMedia.forEach((_, idx) => {
            const dot = document.createElement("div");
            dot.className = `media-modal-dot ${idx === currentModalMediaIndex ? 'active' : ''}`;
            dot.addEventListener("click", () => {
                currentModalMediaIndex = idx;
                updateMediaModalViewer();
            });
            mediaModalDots.appendChild(dot);
        });
    }

    if (mediaModalPrev) {
        mediaModalPrev.addEventListener("click", () => {
            if (currentModalMedia.length === 0) return;
            currentModalMediaIndex = (currentModalMediaIndex - 1 + currentModalMedia.length) % currentModalMedia.length;
            updateMediaModalViewer();
        });
    }

    if (mediaModalNext) {
        mediaModalNext.addEventListener("click", () => {
            if (currentModalMedia.length === 0) return;
            currentModalMediaIndex = (currentModalMediaIndex + 1) % currentModalMedia.length;
            updateMediaModalViewer();
        });
    }

    if (mediaModalClose) {
        mediaModalClose.addEventListener("click", closeMediaModal);
    }
    
    function closeMediaModal() {
        _currentModalProp = null;
        if (mediaExpandModal) {
            mediaExpandModal.classList.add("hidden");
        }
        if (mediaModalViewer) {
            mediaModalViewer.innerHTML = "";
        }
    }

    /* ===== SEARCH UI DYNAMICS (DESKTOP CLOSE BUTTON & MOBILE OVERLAY) ===== */
    function updateSearchUI() {
        const searchIn = document.getElementById("dashboardSearch");
        if (!searchIn || !dashboardSearchClose) return;

        const isMobile = window.innerWidth <= 480;
        if (isMobile) {
            dashboardSearchClose.style.display = ""; // CSS takes care of showing on mobile search-active
        } else {
            // On desktop, show close icon only when query is not empty
            if (searchIn.value.trim().length > 0) {
                dashboardSearchClose.style.setProperty("display", "flex", "important");
            } else {
                dashboardSearchClose.style.setProperty("display", "none", "important");
            }
        }
    }

    if (searchInput) {
        searchInput.addEventListener("input", updateSearchUI);
    }
    window.addEventListener("resize", () => {
        updateSearchUI();
        if (menuOpen) positionMobileMenu();
    });
    updateSearchUI(); // Initial run

    /* ===== MOBILE SEARCH AND FILTERS TOGGLE ===== */
    if (mobileSearchBtn) {
        mobileSearchBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (dashboardNavbar) {
                dashboardNavbar.classList.toggle("search-active");
                const isSearchActive = dashboardNavbar.classList.contains("search-active");
                
                const homeSec = document.getElementById("section-home");
                if (homeSec) {
                    if (isSearchActive) {
                        homeSec.classList.add("filter-active");
                        homeSec.classList.add("search-mode-active");
                        homeSec.classList.remove("has-search-results");
                        
                        const searchIn = document.getElementById("dashboardSearch");
                        if (searchIn) {
                            searchIn.focus();
                            updateSearchUI();
                        }
                    } else {
                        homeSec.classList.remove("filter-active");
                        homeSec.classList.remove("search-mode-active");
                        homeSec.classList.remove("has-search-results");
                    }
                }
            }
        });
    }

    if (dashboardSearchClose) {
        dashboardSearchClose.addEventListener("click", (e) => {
            e.stopPropagation();
            if (dashboardNavbar) {
                dashboardNavbar.classList.remove("search-active");
            }
            const homeSec = document.getElementById("section-home");
            if (homeSec) {
                homeSec.classList.remove("filter-active");
                homeSec.classList.remove("search-mode-active");
                homeSec.classList.remove("has-search-results");
            }
            
            // Clear search query
            const searchIn = document.getElementById("dashboardSearch");
            if (searchIn) {
                searchIn.value = "";
                updateSearchUI();
                performSearch(); // Refresh lists
            }
        });
    }

    /* ===== AGENCY PROFILE SYSTEM ===== */
    let prevSection = "home";
    const agencyProfileStateKey = "tomee_agency_profile_state";
    let agencyProfileState = {};
    let activeAgencyProfile = null;

    function loadAgencyProfileState() {
        try {
            agencyProfileState = JSON.parse(localStorage.getItem(agencyProfileStateKey) || "{}");
        } catch (e) {
            agencyProfileState = {};
        }
    }

    function saveAgencyProfileState() {
        localStorage.setItem(agencyProfileStateKey, JSON.stringify(agencyProfileState));
    }

    function renderFollowedAgencies() {
        loadAgencyProfileState();
        const grid = document.getElementById("followedAgenciesGrid");
        if (!grid) return;

        // Get list of followed agency names
        const followedNames = Object.keys(agencyProfileState).filter(name => agencyProfileState[name] && agencyProfileState[name].followed);

        if (followedNames.length === 0) {
            grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 3rem; opacity: 0.5; font-size: 1.4rem;">
                <i class="ri-user-unfollow-line" style="font-size: 3rem; display: block; margin-bottom: 1rem;"></i>
                Vous ne suivez aucune agence pour le moment.
            </div>`;
            return;
        }

        grid.innerHTML = "";
        followedNames.forEach(name => {
            const agency = AGENCIES.find(a => a.name === name);
            if (!agency) return;

            const card = document.createElement("div");
            card.className = "followed-agency-card";
            card.innerHTML = `
                <div class="followed-agency-logo" title="Voir le profil de ${agency.name}">${agency.code}</div>
                <div class="followed-agency-info">
                    <span class="followed-agency-name" title="Voir le profil">${agency.name}</span>
                    <span class="followed-agency-location"><i class="ri-map-pin-2-line"></i> ${agency.location}</span>
                </div>
                <div class="followed-agency-actions">
                    <button class="followed-agency-btn view-btn" title="Voir le profil"><i class="ri-eye-line"></i></button>
                    <button class="followed-agency-btn unfollow-btn" title="Se désabonner"><i class="ri-user-unfollow-line"></i></button>
                </div>
            `;

            // Navigate to agency profile on logo or name click
            const logoEl = card.querySelector(".followed-agency-logo");
            const nameEl = card.querySelector(".followed-agency-name");
            const viewBtn = card.querySelector(".view-btn");
            const unfollowBtn = card.querySelector(".unfollow-btn");

            const goToProfile = () => openAgencyProfile(agency.name);
            logoEl.addEventListener("click", goToProfile);
            nameEl.addEventListener("click", goToProfile);
            viewBtn.addEventListener("click", goToProfile);

            unfollowBtn.addEventListener("click", () => {
                // Unfollow and refresh the grid
                const state = agencyProfileState[agency.name] || { followed: false, blocked: false, reported: false };
                state.followed = false;
                agencyProfileState[agency.name] = state;
                saveAgencyProfileState();
                pushNotification(`Vous ne suivez plus ${agency.name}`, "ri-user-unfollow-line");
                renderFollowedAgencies();
            });

            grid.appendChild(card);
        });
    }

    function updateAgencyProfileActions() {
        const followBtn = document.getElementById("agProfFollowBtn");
        const blockBtn = document.getElementById("agProfBlockBtn");
        const reportBtn = document.getElementById("agProfReportBtn");
        const messageBtn = document.getElementById("agProfMessageBtn");
        const noticeEl = document.getElementById("agProfNotice");
        if (!activeAgencyProfile || !followBtn || !blockBtn || !reportBtn) return;

        const state = agencyProfileState[activeAgencyProfile] || { followed: false, blocked: false, reported: false };

        followBtn.classList.toggle("active", state.followed);
        followBtn.innerHTML = `<i class="${state.followed ? "ri-user-follow-fill" : "ri-user-add-line"}"></i> ${state.followed ? "Abonné" : "Suivre"}`;

        blockBtn.classList.toggle("active", state.blocked);
        blockBtn.innerHTML = `<i class="${state.blocked ? "ri-forbid-fill" : "ri-forbid-line"}"></i> ${state.blocked ? "Débloquer" : "Bloquer"}`;

        reportBtn.classList.toggle("active", state.reported);
        reportBtn.innerHTML = `<i class="${state.reported ? "ri-error-warning-fill" : "ri-error-warning-line"}"></i> ${state.reported ? "Signalé" : "Signaler"}`;

        if (messageBtn) {
            messageBtn.innerHTML = '<i class="ri-chat-3-line"></i> Écrire';
        }

        if (noticeEl) {
            if (state.blocked) {
                noticeEl.innerHTML = '<i class="ri-forbid-line"></i> Cette agence est bloquée. Vous ne verrez plus ses annonces.';
                noticeEl.classList.add("active");
            } else if (state.reported) {
                noticeEl.innerHTML = '<i class="ri-error-warning-line"></i> Votre signalement a bien été pris en compte.';
                noticeEl.classList.add("active");
            } else {
                noticeEl.innerHTML = "";
                noticeEl.classList.remove("active");
            }
        }
    }

    function toggleAgencyAction(action) {
        if (!activeAgencyProfile) return;
        const state = agencyProfileState[activeAgencyProfile] || { followed: false, blocked: false, reported: false };

        if (action === "follow") {
            state.followed = !state.followed;
            pushNotification(state.followed ? `Vous suivez désormais ${activeAgencyProfile}` : `Vous ne suivez plus ${activeAgencyProfile}`, "ri-user-follow-line");
        } else if (action === "block") {
            state.blocked = !state.blocked;
            pushNotification(state.blocked ? `${activeAgencyProfile} a été bloquée` : `${activeAgencyProfile} a été débloquée`, "ri-forbid-line");
        } else if (action === "report") {
            state.reported = !state.reported;
            pushNotification(state.reported ? `Votre signalement pour ${activeAgencyProfile} a été enregistré` : `Votre signalement pour ${activeAgencyProfile} a été retiré`, "ri-error-warning-line");
        }

        agencyProfileState[activeAgencyProfile] = state;
        saveAgencyProfileState();
        updateAgencyProfileActions();
    }

    function openAgencyProfile(agencyName) {
        const agency = AGENCIES.find(a => a.name === agencyName);
        if (!agency) return;

        loadAgencyProfileState();
        activeAgencyProfile = agency.name;
        prevSection = currentSection;

        // Populate elements
        document.getElementById("agProfLogo").textContent = agency.code;
        document.getElementById("agProfName").textContent = agency.name;
        document.getElementById("agProfFollowers").textContent = agency.followers;
        document.getElementById("agProfLikes").textContent = agency.likes;
        document.getElementById("agProfBio").textContent = agency.bio;
        document.getElementById("agProfLocation").textContent = agency.location;
        document.getElementById("agProfHours").textContent = agency.hours;
        document.getElementById("agProfYears").textContent = `${agency.years} ans sur la plateforme`;

        updateAgencyProfileActions();

        // Render agency's publications
        renderAgencyProperties(agency.name, "Tous");

        // Set up filters inside the profile view
        const agFilters = document.querySelectorAll(".agency-filter-btn");
        agFilters.forEach(btn => {
            btn.classList.toggle("active", btn.dataset.agFilter === "Tous");
            btn.onclick = () => {
                agFilters.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                renderAgencyProperties(agency.name, btn.dataset.agFilter);
            };
        });

        switchSection("agency-profile");
    }

    function renderAgencyProperties(agencyName, filterType) {
        const grid = document.getElementById("agencyPropertiesGrid");
        const pubsCountEl = document.getElementById("agProfPubsCount");

        let list = properties.filter(p => p.agency.name === agencyName);

        // Keep total count updated
        if (pubsCountEl) pubsCountEl.textContent = list.length;

        // Filter by selected type if applicable
        if (filterType && filterType !== "Tous") {
            list = list.filter(p => p.type === filterType);
        }

        grid.innerHTML = "";

        if (list.length === 0) {
            grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:#888;padding:3rem;font-size:1.3rem;">Aucune publication dans cette catégorie.</p>`;
            return;
        }

        list.forEach(prop => {
            const card = document.createElement("div");
            card.className = "property-card";
            card.style.cursor = "pointer";
            card.innerHTML = `
                <img class="property-card-img" src="${prop.image}" alt="${prop.title}">
                <div class="property-card-body">
                    <h4 class="property-card-title">${prop.title}</h4>
                    <p class="property-card-location"><i class="ri-map-pin-line"></i> ${prop.location}</p>
                    <div class="property-card-footer">
                        <span class="property-card-price">${formatPrice(prop.price)}</span>
                        <span class="stat-item" style="color:#777;font-size:1.2rem;">
                            <i class="ri-heart-fill" style="color:#ff6b6b"></i> ${prop.likes}
                        </span>
                    </div>
                </div>
            `;
            const handleCardClick = (e) => {
                e.preventDefault();
                openMediaModal(prop);
            };
            card.addEventListener("click", handleCardClick);
            card.addEventListener("touchstart", handleCardClick, { passive: false });
            grid.appendChild(card);
        });
    }

    document.getElementById("agProfFollowBtn")?.addEventListener("click", () => toggleAgencyAction("follow"));
    document.getElementById("agProfBlockBtn")?.addEventListener("click", () => toggleAgencyAction("block"));
    document.getElementById("agProfReportBtn")?.addEventListener("click", () => toggleAgencyAction("report"));
    document.getElementById("agProfMessageBtn")?.addEventListener("click", () => {
        if (!activeAgencyProfile) return;
        switchSection("messages");
        menuItems.forEach(m => {
            m.classList.toggle("active", m.dataset.section === "messages");
        });

        const allContactCards = document.querySelectorAll(".contact-card");
        let targetCard = null;
        allContactCards.forEach(card => {
            if (card.dataset.contact === activeAgencyProfile) {
                targetCard = card;
            }
        });

        if (targetCard) {
            targetCard.click();
            chatInput.value = `Bonjour, je souhaite obtenir plus de détails sur vos annonces.`;
            chatInput.focus();
        }
    });

    const agProfileBackBtn = document.getElementById("agencyProfileBack");
    if (agProfileBackBtn) {
        agProfileBackBtn.addEventListener("click", () => {
            switchSection(prevSection);
        });
    }

});
