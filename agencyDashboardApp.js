/* ═══════════════════════════════════════════════════════════════
   ToMee — Dashboard Agence · Application JavaScript
   Toutes les fonctionnalités du tableau de bord agence
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ─── Clés localStorage ─────────────────────────────────
    const AGENCY_DATA_KEY = 'tomee_agency_data';
    const AGENCY_PUBLICATIONS_KEY = 'tomee_agency_publications';
    const DARK_MODE_KEY = 'tomee_dark_mode';
    const API_URL = 'http://localhost:5000/api';

    // ─── Données par défaut de l'agence ────────────────────
    const DEFAULT_AGENCY = {
        name: 'Abomey Immo',
        code: 'AI',
        bio: "Leader de l'immobilier moderne, nous vous accompagnons dans la recherche et l'acquisition de vos appartements de séjours, villas de luxe et parcelles en vente.",
        location: 'Cotonou, Fidjrossè (Bénin)',
        hours: '08:00 - 18:30',
        years: 4,
        followers: '12.4k',
        likes: '45.2k',
        instagram: 'https://www.instagram.com/',
        tiktok: 'https://www.tiktok.com/',
        whatsapp: '22997000000',
        facebook: 'https://www.facebook.com/',
        phone: '+22997000000',
        profilePhoto: null
    };

    // ─── Publications par défaut (données de démonstration) ─
    const DEFAULT_PUBLICATIONS = [
        {
            id: 1,
            title: 'Résidence le Palmier',
            description: 'Magnifique résidence meublée avec vue sur mer. 3 chambres spacieuses, salon moderne, cuisine équipée.',
            location: 'Cotonou, Fidjrossè',
            category: 'Séjour',
            beds: 3,
            area: 120,
            price: 50000,
            currency: 'FCFA',
            images: ['img (1).jpg'],
            createdAt: '2026-06-15'
        },
        {
            id: 2,
            title: 'Villa Cocotier Luxe',
            description: 'Villa de luxe 5 chambres avec piscine privée et jardin tropical. Quartier résidentiel sécurisé.',
            location: 'Cotonou, Haie Vive',
            category: 'Villa',
            beds: 5,
            area: 350,
            price: 450000,
            currency: 'FCFA',
            images: ['img (2).jpg'],
            createdAt: '2026-06-20'
        },
        {
            id: 3,
            title: 'Studio Moderne Centre-Ville',
            description: 'Studio entièrement rénové au cœur de Cotonou. Idéal pour jeune professionnel.',
            location: 'Cotonou, Ganhi',
            category: 'Location',
            beds: 1,
            area: 35,
            price: 75000,
            currency: 'FCFA',
            images: ['img (3).jpg'],
            createdAt: '2026-06-22'
        },
        {
            id: 4,
            title: 'Parcelle Viabilisée 500m²',
            description: "Terrain viabilisé dans un lotissement sécurisé. Eau, électricité et voie d'accès bitumée.",
            location: 'Abomey-Calavi',
            category: 'Parcelle',
            beds: 0,
            area: 500,
            price: 8000000,
            currency: 'FCFA',
            images: ['img (4).jpg'],
            createdAt: '2026-06-25'
        },
        {
            id: 5,
            title: 'Appartement F3 Meublé',
            description: 'Bel appartement F3 entièrement meublé. Climatisation dans toutes les pièces, parking sécurisé.',
            location: 'Cotonou, Akpakpa',
            category: 'Séjour',
            beds: 2,
            area: 85,
            price: 45000,
            currency: 'FCFA',
            images: ['img (5).jpg'],
            createdAt: '2026-06-28'
        },
        {
            id: 6,
            title: 'Maison Familiale 4 Chambres',
            description: 'Maison familiale spacieuse à vendre. Cuisine américaine, garage double, terrasse avec vue.',
            location: 'Porto-Novo',
            category: 'Achat',
            beds: 4,
            area: 220,
            price: 35000000,
            currency: 'FCFA',
            images: ['img (6).jpg'],
            createdAt: '2026-07-01'
        }
    ];


    // ═══════════════════════════════════════════════════════════
    // RÉFÉRENCES DOM
    // ═══════════════════════════════════════════════════════════
    const body = document.body;
    const navAgencyName = document.getElementById('navAgencyName');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const logoutBtn = document.getElementById('logoutBtn');

    // Sections
    const sections = document.querySelectorAll('.dashboard-section');

    // Tableau de bord (Bento)
    const bentoGrid = document.getElementById('bentoGrid');

    // Publier
    const publishForm = document.getElementById('publishForm');
    const publishEditId = document.getElementById('publishEditId');
    const publishTitle = document.getElementById('publishTitle');
    const publishDescription = document.getElementById('publishDescription');
    const publishLocation = document.getElementById('publishLocation');
    const publishCategory = document.getElementById('publishCategory');
    const publishBeds = document.getElementById('publishBeds');
    const publishArea = document.getElementById('publishArea');
    const publishPrice = document.getElementById('publishPrice');
    const publishAnonymous = document.getElementById('publishAnonymous');
    const uploadZone = document.getElementById('uploadZone');
    const uploadInput = document.getElementById('uploadInput');
    const uploadPreviews = document.getElementById('uploadPreviews');
    const publishSubmitBtn = document.getElementById('publishSubmitBtn');

    // Publications
    const filterBar = document.getElementById('filterBar');
    const agPublicationsGrid = document.getElementById('agPublicationsGrid');

    // Aperçu
    const previewContainer = document.getElementById('previewContainer');

    // Paramètres
    const settingsForm = document.getElementById('settingsForm');
    const settingsPhotoCircle = document.getElementById('settingsPhotoCircle');
    const settingsPhotoInitials = document.getElementById('settingsPhotoInitials');
    const settingsPhotoImg = document.getElementById('settingsPhotoImg');
    const settingsPhotoOverlay = document.getElementById('settingsPhotoOverlay');
    const settingsPhotoInput = document.getElementById('settingsPhotoInput');

    // Dock
    const dockContainer = document.getElementById('dockContainer');
    const dockTrigger = document.getElementById('dockTrigger');
    const circularMenu = document.getElementById('circularMenu');
    const menuItems = document.querySelectorAll('.menu-item');

    // Toast
    const toastNotification = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');

    // État local pour les images uploadées dans le formulaire
    let uploadedImages = [];
    // Filtre de publication actif
    let activeFilter = 'Tous';


    // ═══════════════════════════════════════════════════════════
    // FONCTIONS CRUD — localStorage
    // ═══════════════════════════════════════════════════════════

    /** Charger les données de l'agence depuis localStorage */
    function loadAgencyData() {
        const stored = localStorage.getItem(AGENCY_DATA_KEY);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.warn('Erreur de parsing des données agence:', e);
            }
        }
        // Initialiser avec les données par défaut
        saveAgencyData(DEFAULT_AGENCY);
        return { ...DEFAULT_AGENCY };
    }

    /** Sauvegarder les données de l'agence */
    function saveAgencyData(data) {
        localStorage.setItem(AGENCY_DATA_KEY, JSON.stringify(data));
    }

    /** Charger les publications depuis localStorage */
    function loadPublications() {
        const stored = localStorage.getItem(AGENCY_PUBLICATIONS_KEY);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.warn('Erreur de parsing des publications:', e);
            }
        }
        // Initialiser avec les données par défaut
        savePublications(DEFAULT_PUBLICATIONS);
        return [...DEFAULT_PUBLICATIONS];
    }

    /** Sauvegarder les publications */
    function savePublications(publications) {
        localStorage.setItem(AGENCY_PUBLICATIONS_KEY, JSON.stringify(publications));
    }


    // ═══════════════════════════════════════════════════════════
    // FORMATAGE DES PRIX
    // ═══════════════════════════════════════════════════════════

    /** Formater un prix avec séparateurs d'espaces + devise */
    function formatPrice(value, currency = 'FCFA') {
        if (!value && value !== 0) return '0 ' + currency;
        return value.toLocaleString('fr-FR') + ' ' + currency;
    }


    // ═══════════════════════════════════════════════════════════
    // NAVIGATION — CHANGEMENT DE SECTION
    // ═══════════════════════════════════════════════════════════

    /** Basculer vers une section donnée */
    function switchSection(name) {
        // Masquer toutes les sections
        sections.forEach(s => s.classList.remove('active-section'));

        // Afficher la section ciblée
        const target = document.getElementById(name);
        if (target) {
            target.classList.add('active-section');
            // Scroll en haut de la section
            target.scrollTop = 0;
        }

        // Mettre à jour l'état actif du dock
        menuItems.forEach(item => {
            item.classList.toggle('active', item.dataset.section === name);
        });

        // Fermer le menu du dock
        closeDock();

        // Rendre le contenu de la section
        switch (name) {
            case 'section-ag-home':
                renderDashboardHome();
                break;
            case 'section-ag-publications':
                renderPublicationsGrid(activeFilter);
                break;
            case 'section-ag-preview':
                renderPreview();
                break;
            case 'section-ag-settings':
                renderSettings();
                break;
        }
    }


    // ═══════════════════════════════════════════════════════════
    // SECTION 1 — BENTO GRID (Tableau de bord)
    // ═══════════════════════════════════════════════════════════

    /** Rendre le bento grid avec stats et publications récentes */
    function renderDashboardHome() {
        const agency = loadAgencyData();
        const publications = loadPublications();

        // Calcul des statistiques
        const totalPubs = publications.length;
        const totalLikes = agency.likes || '0';
        const totalFollowers = agency.followers || '0';
        const monthlyViews = Math.floor(Math.random() * 5000) + 2000;

        // 4 dernières publications pour la section récente
        const recent = publications.slice(-4).reverse();

        // Construire les mini-cartes récentes
        const recentCards = recent.length > 0
            ? recent.map(pub => `
                <div class="recent-card" data-pub-id="${pub.id}">
                    <img class="recent-card-img"
                         src="${pub.images && pub.images[0] ? pub.images[0] : ''}"
                         alt="${pub.title}"
                         onerror="this.style.background='linear-gradient(135deg, #e0e7ff, #c7d2fe)'; this.style.minHeight='12rem';">
                    <div class="recent-card-overlay">
                        <span class="recent-card-badge">${pub.category}</span>
                        <h4 class="recent-card-title">${pub.title}</h4>
                        <span class="recent-card-price">${formatPrice(pub.price)}</span>
                    </div>
                </div>
            `).join('')
            : '<p class="recent-empty">Aucune publication récente</p>';

        // Construire le bento grid complet
        // Calcul du plan de parrainage agence
        const parrainagesCount = parseInt(localStorage.getItem('tomee_agency_parrainages') || '2');
        const parrainagesMax = 3;
        const parrainagesPercent = Math.min((parrainagesCount / parrainagesMax) * 100, 100);
        const planLabel = parrainagesCount >= parrainagesMax ? 'Premium Actif' : 'Gratuit';
        const planColor = parrainagesCount >= parrainagesMax ? '#5df8ab' : '#f59e0b';

        bentoGrid.innerHTML = `
            <!-- Carte héros de bienvenue -->
            <div class="bento-card bento-hero">
                <div class="bento-hero-content">
                    <h1 class="bento-hero-title">Bienvenue, ${agency.name} 👋</h1>
                    <p class="bento-hero-sub">${totalPubs} biens publiés · ${totalFollowers} abonnés</p>
                </div>
                <div class="bento-hero-glow"></div>
            </div>

            <!-- Stat: Publications -->
            <div class="bento-card bento-stat">
                <div class="bento-stat-icon green">
                    <i class="ri-article-line"></i>
                </div>
                <span class="bento-stat-value">${totalPubs}</span>
                <span class="bento-stat-label">Publications</span>
            </div>

            <!-- Stat: Abonnés -->
            <div class="bento-card bento-stat">
                <div class="bento-stat-icon blue">
                    <i class="ri-user-follow-line"></i>
                </div>
                <span class="bento-stat-value">${totalFollowers}</span>
                <span class="bento-stat-label">Abonnés</span>
            </div>

            <!-- Stat: Likes -->
            <div class="bento-card bento-stat">
                <div class="bento-stat-icon pink">
                    <i class="ri-heart-3-line"></i>
                </div>
                <span class="bento-stat-value">${totalLikes}</span>
                <span class="bento-stat-label">Likes</span>
            </div>

            <!-- Stat: Vues mensuelles -->
            <div class="bento-card bento-stat">
                <div class="bento-stat-icon orange">
                    <i class="ri-eye-line"></i>
                </div>
                <span class="bento-stat-value">${monthlyViews.toLocaleString('fr-FR')}</span>
                <span class="bento-stat-label">Vues / mois</span>
            </div>

            <!-- NOUVEAU: Carte Plan d'utilisation (comble l'espace vide) -->
            <div class="bento-card bento-plan">
                <div class="bento-plan-header">
                    <div class="bento-plan-badge" style="background: ${planColor}20; color: ${planColor}; border: 1px solid ${planColor}40;">
                        <i class="ri-vip-crown-line"></i> ${planLabel}
                    </div>
                </div>
                <h3 class="bento-plan-title">Plan d'utilisation</h3>
                <p class="bento-plan-desc">Parrainez 3 agences collègues pour une mise en avant gratuite de 15 jours.</p>
                <div class="bento-plan-progress">
                    <div class="bento-plan-progress-info">
                        <span>${parrainagesCount} / ${parrainagesMax} invités</span>
                        <span style="font-weight:700;">${Math.round(parrainagesPercent)}%</span>
                    </div>
                    <div class="bento-plan-progress-bar">
                        <div class="bento-plan-progress-fill" style="width: ${parrainagesPercent}%;"></div>
                    </div>
                </div>
                <button class="bento-plan-btn" id="btnPlanParrainage">
                    <i class="ri-share-forward-line"></i> Copier mon lien
                </button>
            </div>

            <!-- Carte publications récentes -->
            <div class="bento-card bento-recent">
                <div class="bento-recent-header">
                    <h2><i class="ri-fire-line"></i> Publications récentes</h2>
                    <button class="bento-recent-more" id="btnViewAllPubs">Tout voir <i class="ri-arrow-right-s-line"></i></button>
                </div>
                <div class="recent-scroll">
                    ${recentCards}
                </div>
            </div>
        `;

        // Lien "Tout voir" → aller aux publications
        const btnViewAll = document.getElementById('btnViewAllPubs');
        btnViewAll?.addEventListener('click', () => switchSection('section-ag-publications'));

        // Clic sur une carte récente → aller aux publications
        bentoGrid.querySelectorAll('.recent-card').forEach(card => {
            card.addEventListener('click', () => switchSection('section-ag-publications'));
        });

        // Bouton parrainage agence
        const btnPlan = document.getElementById('btnPlanParrainage');
        if (btnPlan) {
            btnPlan.addEventListener('click', () => {
                const user = JSON.parse(localStorage.getItem('tomee_user') || '{}');
                const refCode = user.ref_code || agency.code || 'ABOMEY_IMMO';
                const shareLink = `${window.location.origin}/register.html?ref=${refCode}&type=agence`;
                navigator.clipboard.writeText(shareLink);

                // Simuler un parrainage
                const current = parseInt(localStorage.getItem('tomee_agency_parrainages') || '2');
                localStorage.setItem('tomee_agency_parrainages', (current + 1).toString());

                showToast('Lien de parrainage copié ! Partagez-le avec vos collègues.');
                renderDashboardHome();
            });
        }
    }


    // ═══════════════════════════════════════════════════════════
    // SECTION 2 — FORMULAIRE DE PUBLICATION
    // ═══════════════════════════════════════════════════════════

    /** Gérer la soumission du formulaire de publication */
    async function handlePublishForm(e) {
        e.preventDefault();

        const title = publishTitle.value.trim();
        const description = publishDescription.value.trim();
        const location = publishLocation.value.trim();
        const category = publishCategory.value;
        const beds = parseInt(publishBeds.value) || 0;
        const area = parseInt(publishArea.value) || 0;
        const price = parseInt(publishPrice.value) || 0;
        const anonymous = publishAnonymous ? publishAnonymous.checked : false;
        const editId = publishEditId.value;

        // Validation
        if (!title || !description || !location || !category) {
            showToast('Veuillez remplir tous les champs obligatoires', true);
            return;
        }

        const user = JSON.parse(localStorage.getItem('tomee_user') || '{}');
        const publications = loadPublications();
        let success = false;

        const payload = {
            user_id: user.id || 2, // 2 is default agency id
            title,
            description,
            location,
            category,
            beds,
            area,
            price,
            images: uploadedImages.length > 0 ? uploadedImages : [],
            anonymous: anonymous ? 1 : 0
        };

        try {
            let response;
            if (editId) {
                response = await fetch(`${API_URL}/publications/${editId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            } else {
                response = await fetch(`${API_URL}/publications`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            }
            if (response.ok) {
                success = true;
                showToast(editId ? 'Bien mis à jour (MySQL Sync) !' : 'Bien publié avec succès (MySQL Sync) !');
            }
        } catch (err) {
            console.warn("⚠️ API hors ligne. Sauvegarde locale en cours...");
        }

        // Local updates anyway (hybrid sync)
        if (editId) {
            const idx = publications.findIndex(p => p.id === parseInt(editId) || p.id === editId);
            if (idx !== -1) {
                publications[idx] = {
                    ...publications[idx],
                    title,
                    description,
                    location,
                    category,
                    beds,
                    area,
                    price,
                    anonymous,
                    images: uploadedImages.length > 0 ? uploadedImages : publications[idx].images
                };
                if (!success) showToast('Modification sauvegardée localement.');
            }
            publishEditId.value = '';
            publishSubmitBtn.innerHTML = '<i class="ri-send-plane-fill"></i> Publier';
        } else {
            const newPub = {
                id: Date.now(),
                title,
                description,
                location,
                category,
                beds,
                area,
                price,
                currency: 'FCFA',
                anonymous,
                images: uploadedImages.length > 0 ? [...uploadedImages] : [],
                createdAt: new Date().toISOString().split('T')[0],
                score: 45
            };
            publications.push(newPub);
            if (!success) showToast('Publication enregistrée localement.');
        }

        savePublications(publications);

        // Reset form
        publishForm.reset();
        uploadedImages = [];
        uploadPreviews.innerHTML = '';

        // Switch back to list view
        switchSection('section-ag-publications');
    }

    /** Gérer l'upload d'images — drag & drop + clic */
    function handleImageUpload(files) {
        if (!files || files.length === 0) return;

        Array.from(files).forEach(file => {
            if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                const base64 = e.target.result;
                uploadedImages.push(base64);
                renderUploadPreviews();
            };
            reader.readAsDataURL(file);
        });
    }

    /** Afficher les miniatures des fichiers uploadés */
    function renderUploadPreviews() {
        uploadPreviews.innerHTML = uploadedImages.map((img, idx) => `
            <div class="upload-preview-item">
                <img src="${img}" alt="Aperçu ${idx + 1}">
                <button type="button" class="remove-preview" data-index="${idx}">
                    <i class="ri-close-line"></i>
                </button>
            </div>
        `).join('');

        // Supprimer une miniature
        uploadPreviews.querySelectorAll('.remove-preview').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.dataset.index);
                uploadedImages.splice(index, 1);
                renderUploadPreviews();
            });
        });
    }

    // Événements d'upload
    uploadZone.addEventListener('click', () => uploadInput.click());

    uploadInput.addEventListener('change', (e) => {
        handleImageUpload(e.target.files);
    });

    // Drag & drop
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('drag-over');
    });

    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('drag-over');
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('drag-over');
        handleImageUpload(e.dataTransfer.files);
    });

    // Soumission du formulaire
    publishForm.addEventListener('submit', handlePublishForm);


    // ═══════════════════════════════════════════════════════════
    // SECTION 3 — GRILLE MASONRY DE PUBLICATIONS
    // ═══════════════════════════════════════════════════════════

    /** Rendre la grille masonry de publications avec filtre optionnel */
    function renderPublicationsGrid(filter = 'Tous') {
        const publications = loadPublications();
        const filtered = filter === 'Tous'
            ? publications
            : publications.filter(p => p.category === filter);

        if (filtered.length === 0) {
            agPublicationsGrid.innerHTML = `
                <div class="publications-empty">
                    <i class="ri-inbox-line"></i>
                    <p>Aucune publication dans cette catégorie</p>
                </div>
            `;
            return;
        }

        // Trier par score (descending) pour calculer les badges
        const sortedByScore = [...filtered].sort((a, b) => (b.score || 0) - (a.score || 0));

        agPublicationsGrid.innerHTML = filtered.map(pub => {
            // Calculer le badge de score
            const rank = sortedByScore.findIndex(p => p.id === pub.id);
            let scoreBadge = '';
            let scoreClass = '';
            if (rank === 0) { scoreBadge = '🥇 Top 1'; scoreClass = 'score-gold'; }
            else if (rank <= 2) { scoreBadge = '🥈 Top 3'; scoreClass = 'score-silver'; }
            else if (rank <= 4) { scoreBadge = '🥉 Top 5'; scoreClass = 'score-bronze'; }

            const anonymousBadge = pub.anonymous ? '<span class="pub-card-badge-anon"><i class="ri-spy-line"></i> Anonyme</span>' : '';

            return `
            <div class="pub-card" data-id="${pub.id}">
                <div class="pub-card-image">
                    <img src="${pub.images && pub.images[0] ? pub.images[0] : ''}"
                         alt="${pub.title}"
                         onerror="this.parentElement.style.background='linear-gradient(135deg, #e0e7ff, #c7d2fe)'">
                    <span class="pub-card-badge">${pub.category}</span>
                    ${anonymousBadge}
                </div>
                <div class="pub-card-body">
                    <h3 class="pub-card-title">${pub.title}</h3>
                    <div class="pub-card-location">
                        <i class="ri-map-pin-line"></i> ${pub.location}
                    </div>
                    <div class="pub-card-meta">
                        ${pub.beds > 0 ? `<span><i class="ri-hotel-bed-line"></i> ${pub.beds}</span>` : ''}
                        ${pub.area > 0 ? `<span><i class="ri-ruler-line"></i> ${pub.area}m²</span>` : ''}
                    </div>
                    <div class="pub-card-price">${formatPrice(pub.price)}</div>
                    ${scoreBadge ? `
                    <div class="pub-card-score ${scoreClass}">
                        <span class="score-label">${scoreBadge}</span>
                        <span class="score-value">Score: ${pub.score || 45}</span>
                        <button class="btn-share-score" data-pub-id="${pub.id}" data-score-label="${scoreBadge}" data-score-val="${pub.score || 45}" title="Partager sur WhatsApp">
                            <i class="ri-share-line"></i>
                        </button>
                    </div>
                    ` : ''}
                    <div class="pub-card-actions">
                        <button class="btn-edit" data-edit-id="${pub.id}">
                            <i class="ri-pencil-line"></i> Modifier
                        </button>
                        <button class="btn-delete" data-delete-id="${pub.id}">
                            <i class="ri-delete-bin-line"></i>
                        </button>
                    </div>
                </div>
            </div>
        `}).join('');

        // Délégation d'événements pour modifier/supprimer/partager
        agPublicationsGrid.addEventListener('click', handlePublicationActions);

        // Boutons de partage virale du score
        agPublicationsGrid.querySelectorAll('.btn-share-score').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const pubId = btn.dataset.pubId;
                const scoreLabel = btn.dataset.scoreLabel;
                const scoreVal = btn.dataset.scoreVal;
                const pub = loadPublications().find(p => p.id == pubId);
                const agency = loadAgencyData();
                const refCode = agency.code || 'ABOMEY_IMMO';
                const message = `🏆 Mon bien "${pub ? pub.title : ''}" est ${scoreLabel} dans son quartier !\n🔥 Score de convoitise : ${scoreVal} points.\nPoste là où ton bien est mis en compétition !\n👉 ${window.location.origin}/register.html?ref=${refCode}`;
                navigator.clipboard.writeText(message);
                showToast('Message viral copié ! Collez-le dans WhatsApp ou Instagram.');
            });
        });
    }

    /** Gérer les actions modifier/supprimer sur les publications */
    function handlePublicationActions(e) {
        const editBtn = e.target.closest('[data-edit-id]');
        const deleteBtn = e.target.closest('[data-delete-id]');

        if (editBtn) {
            editPublication(parseInt(editBtn.dataset.editId));
        } else if (deleteBtn) {
            deletePublication(parseInt(deleteBtn.dataset.deleteId));
        }
    }

    /** Supprimer une publication */
    function deletePublication(id) {
        const publications = loadPublications();
        const updated = publications.filter(p => p.id !== id);
        savePublications(updated);
        renderPublicationsGrid(activeFilter);
        showToast('Publication supprimée');
    }

    /** Éditer une publication — pré-remplir le formulaire */
    function editPublication(id) {
        const publications = loadPublications();
        const pub = publications.find(p => p.id === id);
        if (!pub) return;

        // Pré-remplir le formulaire
        publishEditId.value = pub.id;
        publishTitle.value = pub.title;
        publishDescription.value = pub.description;
        publishLocation.value = pub.location;
        publishCategory.value = pub.category;
        publishBeds.value = pub.beds;
        publishArea.value = pub.area;
        publishPrice.value = pub.price;
        if (publishAnonymous) publishAnonymous.checked = pub.anonymous ? true : false;

        // Images existantes
        if (pub.images && pub.images.length > 0) {
            uploadedImages = [...pub.images];
            renderUploadPreviews();
        }

        // Changer le texte du bouton
        publishSubmitBtn.innerHTML = '<i class="ri-save-line"></i> Mettre à jour';

        // Aller à la section publier
        switchSection('section-ag-publish');
    }

    // Filtres — délégation d'événements
    filterBar.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        activeFilter = btn.dataset.filter;
        renderPublicationsGrid(activeFilter);
    });


    // ═══════════════════════════════════════════════════════════
    // SECTION 4 — APERÇU PROFIL
    // ═══════════════════════════════════════════════════════════

    /** Rendre l'aperçu du profil comme les utilisateurs le voient */
    function renderPreview() {
        const agency = loadAgencyData();
        const publications = loadPublications();

        // Déterminer le contenu du logo
        let logoContent;
        if (agency.profilePhoto) {
            logoContent = `<img src="${agency.profilePhoto}" alt="${agency.name}">`;
        } else {
            logoContent = agency.code || agency.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
        }

        // Grille de publications en aperçu (max 6)
        const previewPubs = publications.slice(0, 6);
        const pubsGrid = previewPubs.map(pub => `
            <img class="preview-pub-thumb"
                 src="${pub.images && pub.images[0] ? pub.images[0] : ''}"
                 alt="${pub.title}"
                 onerror="this.style.background='linear-gradient(135deg, #e0e7ff, #c7d2fe)'">
        `).join('');

        previewContainer.innerHTML = `
            <!-- En-tête du profil -->
            <div class="preview-header">
                <div class="preview-logo">
                    ${agency.profilePhoto ? `<img src="${agency.profilePhoto}" alt="${agency.name}">` : logoContent}
                </div>
                <div class="preview-name-row">
                    <h2 class="preview-name">${agency.name}</h2>
                    <i class="ri-verified-badge-fill preview-verified"></i>
                </div>
                <div class="preview-location-text">
                    <i class="ri-map-pin-line"></i> ${agency.location}
                </div>
            </div>

            <!-- Statistiques -->
            <div class="preview-stats">
                <div class="preview-stat">
                    <div class="preview-stat-number">${agency.followers}</div>
                    <div class="preview-stat-label">Abonnés</div>
                </div>
                <div class="preview-stat">
                    <div class="preview-stat-number">${agency.likes}</div>
                    <div class="preview-stat-label">Likes</div>
                </div>
                <div class="preview-stat">
                    <div class="preview-stat-number">${publications.length}</div>
                    <div class="preview-stat-label">Publications</div>
                </div>
            </div>

            <!-- Boutons d'action (désactivés en aperçu) -->
            <div class="preview-actions">
                <button class="preview-btn preview-btn-follow" disabled>
                    <i class="ri-user-add-line"></i> Suivre
                </button>
                <button class="preview-btn preview-btn-write" disabled>
                    <i class="ri-mail-line"></i> Écrire
                </button>
            </div>

            <!-- Icônes sociales -->
            <div class="preview-social">
                <span class="preview-social-icon"><i class="ri-instagram-line"></i></span>
                <span class="preview-social-icon"><i class="ri-tiktok-line"></i></span>
                <span class="preview-social-icon"><i class="ri-whatsapp-line"></i></span>
                <span class="preview-social-icon"><i class="ri-phone-line"></i></span>
            </div>

            <!-- À propos -->
            <div class="preview-about">
                <h3><i class="ri-information-line"></i> À propos</h3>
                <p>${agency.bio}</p>
            </div>

            <!-- Informations clés -->
            <div class="preview-info">
                <h3><i class="ri-key-2-line"></i> Informations clés</h3>
                <div class="preview-info-item">
                    <i class="ri-map-pin-2-line"></i>
                    <span>${agency.location}</span>
                </div>
                <div class="preview-info-item">
                    <i class="ri-time-line"></i>
                    <span>${agency.hours}</span>
                </div>
                <div class="preview-info-item">
                    <i class="ri-calendar-check-line"></i>
                    <span>${agency.years} ans d'expérience</span>
                </div>
                <div class="preview-info-item">
                    <i class="ri-phone-line"></i>
                    <span>${agency.phone}</span>
                </div>
            </div>

            <!-- Publications en aperçu -->
            <h3 class="preview-pubs-title"><i class="ri-gallery-line"></i> Publications</h3>
            <div class="preview-pubs-grid">
                ${pubsGrid || '<p style="color:var(--text-secondary);grid-column:1/-1;text-align:center;">Aucune publication</p>'}
            </div>
        `;
    }


    // ═══════════════════════════════════════════════════════════
    // SECTION 5 — PARAMÈTRES
    // ═══════════════════════════════════════════════════════════

    /** Pré-remplir le formulaire des paramètres */
    function renderSettings() {
        const agency = loadAgencyData();

        document.getElementById('settingsName').value = agency.name || '';
        document.getElementById('settingsBio').value = agency.bio || '';
        document.getElementById('settingsLocation').value = agency.location || '';
        document.getElementById('settingsHours').value = agency.hours || '';
        document.getElementById('settingsInstagram').value = agency.instagram || '';
        document.getElementById('settingsTiktok').value = agency.tiktok || '';
        document.getElementById('settingsWhatsapp').value = agency.whatsapp || '';
        document.getElementById('settingsFacebook').value = agency.facebook || '';
        document.getElementById('settingsPhone').value = agency.phone || '';

        // Photo de profil
        updateSettingsPhoto(agency);
    }

    /** Mettre à jour l'affichage de la photo dans les paramètres */
    function updateSettingsPhoto(agency) {
        if (agency.profilePhoto) {
            settingsPhotoImg.src = agency.profilePhoto;
            settingsPhotoImg.style.display = 'block';
            settingsPhotoInitials.style.display = 'none';
        } else {
            settingsPhotoImg.style.display = 'none';
            settingsPhotoInitials.style.display = 'flex';
            settingsPhotoInitials.textContent = agency.code || agency.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
        }
    }

    /** Gérer l'upload de la photo de profil */
    function handleProfilePhotoUpload(e) {
        const file = e.target.files[0];
        if (!file || !file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            const agency = loadAgencyData();
            agency.profilePhoto = ev.target.result;
            saveAgencyData(agency);
            updateSettingsPhoto(agency);
            showToast('Photo de profil mise à jour');
        };
        reader.readAsDataURL(file);
    }

    /** Sauvegarder les paramètres */
    function handleSettingsSave(e) {
        e.preventDefault();

        const agency = loadAgencyData();

        agency.name = document.getElementById('settingsName').value.trim() || agency.name;
        agency.bio = document.getElementById('settingsBio').value.trim();
        agency.location = document.getElementById('settingsLocation').value.trim();
        agency.hours = document.getElementById('settingsHours').value.trim();
        agency.instagram = document.getElementById('settingsInstagram').value.trim();
        agency.tiktok = document.getElementById('settingsTiktok').value.trim();
        agency.whatsapp = document.getElementById('settingsWhatsapp').value.trim();
        agency.facebook = document.getElementById('settingsFacebook').value.trim();
        agency.phone = document.getElementById('settingsPhone').value.trim();

        // Mettre à jour le code (initiales)
        agency.code = agency.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

        saveAgencyData(agency);

        // Mettre à jour le nom dans la navbar
        navAgencyName.textContent = agency.name;

        showToast('Paramètres enregistrés avec succès !');
    }

    // Événements paramètres
    settingsPhotoCircle.addEventListener('click', () => settingsPhotoInput.click());
    settingsPhotoInput.addEventListener('change', handleProfilePhotoUpload);
    settingsForm.addEventListener('submit', handleSettingsSave);


    // ═══════════════════════════════════════════════════════════
    // TOAST — NOTIFICATION
    // ═══════════════════════════════════════════════════════════

    /** Afficher une notification toast */
    function showToast(message, isError = false) {
        toastMessage.textContent = message;
        toastNotification.querySelector('i').className = isError ? 'ri-error-warning-line' : 'ri-check-line';

        if (isError) {
            toastNotification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            toastNotification.style.color = '#fff';
        } else {
            toastNotification.style.background = 'linear-gradient(135deg, var(--accent), #34d399)';
            toastNotification.style.color = '#0e1117';
        }

        toastNotification.classList.add('show');

        setTimeout(() => {
            toastNotification.classList.remove('show');
        }, 2800);
    }


    // ═══════════════════════════════════════════════════════════
    // MODE SOMBRE
    // ═══════════════════════════════════════════════════════════

    /** Initialiser le mode sombre depuis localStorage */
    function initDarkMode() {
        const isDark = localStorage.getItem(DARK_MODE_KEY) === 'true';
        if (isDark) {
            body.classList.add('dark-mode');
        }
    }

    /** Basculer le mode sombre */
    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem(DARK_MODE_KEY, isDark.toString());
    }

    darkModeToggle.addEventListener('click', toggleDarkMode);


    // ═══════════════════════════════════════════════════════════
    // DOCK — MENU FLOTTANT
    // ═══════════════════════════════════════════════════════════

    let isDockOpen = false;

    /** Ouvrir/fermer le dock */
    function openDock() {
        isDockOpen = true;
        circularMenu.classList.add('active');
        dockTrigger.classList.add('active');
        const icon = dockTrigger.querySelector('i');
        if (icon) icon.className = 'ri-close-line';
        if (isMobile()) positionMobileMenu();
    }

    function closeDock() {
        isDockOpen = false;
        circularMenu.classList.remove('active');
        dockTrigger.classList.remove('active');
        const icon = dockTrigger.querySelector('i');
        if (icon) icon.className = 'ri-apps-line';
        
        // Reset styles when closing
        circularMenu.style.top = "";
        circularMenu.style.bottom = "";
        circularMenu.style.left = "";
        circularMenu.style.right = "";
    }

    function toggleDock() {
        if (isDockOpen) {
            closeDock();
        } else {
            openDock();
        }
    }

    /** Vérifier si on est en mobile */
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Desktop: click to toggle (identique au dashboard particulier)
    dockTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDock();
    });

    dockContainer.addEventListener('mouseleave', () => {
        if (!isMobile()) {
            closeDock();
        }
    });

    // Clic sur un item du menu
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const section = item.dataset.section;
            if (section) {
                switchSection(section);
            }
        });
    });

    // Clic à l'extérieur → fermer
    document.addEventListener('click', (e) => {
        if (isDockOpen && !dockContainer.contains(e.target)) {
            closeDock();
        }
    });


    // ─── Dock mobile — Bulle flottante draggable ────────────

    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dockStartX = 0;
    let dockStartY = 0;
    let hasMoved = false;

    /** Positionner le menu mobile pour qu'il reste visible */
    function positionMobileMenu() {
        if (!isMobile()) return;

        const dockRect = dockContainer.getBoundingClientRect();
        const menuWidth = 220;
        const menuHeight = 320;
        const padding = 10;

        let left = dockRect.left - menuWidth - padding;
        let top = dockRect.top - menuHeight;

        // S'assurer que le menu reste dans l'écran
        if (left < padding) left = padding;
        if (left + menuWidth > window.innerWidth - padding) {
            left = window.innerWidth - menuWidth - padding;
        }
        if (top < padding) top = dockRect.bottom + padding;
        if (top + menuHeight > window.innerHeight - padding) {
            top = window.innerHeight - menuHeight - padding;
        }

        circularMenu.style.left = left + 'px';
        circularMenu.style.top = top + 'px';
        circularMenu.style.right = 'auto';
        circularMenu.style.bottom = 'auto';
    }

    /** Démarrer le glissement (touch) */
    function onDragStart(e) {
        if (!isMobile()) return;

        isDragging = true;
        hasMoved = false;
        dockContainer.classList.add('dragging');

        const touch = e.touches ? e.touches[0] : e;
        dragStartX = touch.clientX;
        dragStartY = touch.clientY;

        const rect = dockContainer.getBoundingClientRect();
        dockStartX = rect.left;
        dockStartY = rect.top;

        // Fermer le menu pendant le déplacement
        if (isDockOpen) closeDock();
    }

    /** Pendant le glissement */
    function onDragMove(e) {
        if (!isDragging) return;
        e.preventDefault();

        const touch = e.touches ? e.touches[0] : e;
        const dx = touch.clientX - dragStartX;
        const dy = touch.clientY - dragStartY;

        // Seuil pour distinguer un tap d'un drag
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            hasMoved = true;
        }

        let newX = dockStartX + dx;
        let newY = dockStartY + dy;

        // Limiter aux bords de l'écran
        const triggerSize = 50;
        const pad = 8;
        newX = Math.max(pad, Math.min(window.innerWidth - triggerSize - pad, newX));
        newY = Math.max(pad, Math.min(window.innerHeight - triggerSize - pad, newY));

        dockContainer.style.left = newX + 'px';
        dockContainer.style.top = newY + 'px';
        dockContainer.style.right = 'auto';
        dockContainer.style.bottom = 'auto';
    }

    /** Fin du glissement */
    function onDragEnd() {
        if (!isDragging) return;
        isDragging = false;
        dockContainer.classList.remove('dragging');

        // Si c'est juste un tap (pas de mouvement), toggle le menu
        if (!hasMoved) {
            toggleDock();
        }
    }

    // Événements tactiles
    dockTrigger.addEventListener('touchstart', onDragStart, { passive: true });
    document.addEventListener('touchmove', onDragMove, { passive: false });
    document.addEventListener('touchend', onDragEnd);

    // Événements souris (pour le dev)
    dockTrigger.addEventListener('mousedown', (e) => {
        if (!isMobile()) return;
        e.preventDefault();
        onDragStart(e);
    });
    document.addEventListener('mousemove', (e) => {
        if (!isMobile()) return;
        onDragMove(e);
    });
    document.addEventListener('mouseup', () => {
        if (!isMobile()) return;
        onDragEnd();
    });


    // ═══════════════════════════════════════════════════════════
    // DÉCONNEXION
    // ═══════════════════════════════════════════════════════════

    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
            showToast('Déconnexion…');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }
    });


    // ═══════════════════════════════════════════════════════════
    // INITIALISATION
    // ═══════════════════════════════════════════════════════════

    function init() {
        // Mode sombre
        initDarkMode();

        // Charger les données initiales
        const agency = loadAgencyData();
        navAgencyName.textContent = agency.name;

        // Rendre la section d'accueil
        renderDashboardHome();
    }

    // Lancer l'application
    init();

}); // Fin de DOMContentLoaded
