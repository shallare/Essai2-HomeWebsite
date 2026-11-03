/* registerApp.js - Registration Form Script for ToMee with PHP/MySQL Backend */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Role Toggle Tabs Logic
    const tabParticulier = document.getElementById("tab-particulier");
    const tabAgence = document.getElementById("tab-agence");
    const formParticulier = document.getElementById("form-particulier");
    const formAgence = document.getElementById("form-agence");
    const API_URL = "api";

    if (tabParticulier && tabAgence && formParticulier && formAgence) {
        tabParticulier.addEventListener("click", () => {
            tabParticulier.classList.add("active");
            tabAgence.classList.remove("active");
            formParticulier.classList.add("active");
            formAgence.classList.remove("active");
        });

        tabAgence.addEventListener("click", () => {
            tabAgence.classList.add("active");
            tabParticulier.classList.remove("active");
            formAgence.classList.add("active");
            formParticulier.classList.remove("active");
        });
    }

    // 2. Particulier Form Submission Handler
    if (formParticulier) {
        formParticulier.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("part-name").value.trim();
            const email = document.getElementById("part-email").value.trim();
            const phone = document.getElementById("part-phone").value.trim();
            const currency = document.getElementById("part-currency").value;
            const intent = document.getElementById("part-intent").value;
            const city = document.getElementById("part-city").value.trim();
            const budget = document.getElementById("part-budget").value;
            const password = document.getElementById("part-password").value;
            const confirmPassword = document.getElementById("part-confirm-password").value;
            const termsChecked = document.getElementById("part-terms").checked;

            if (password !== confirmPassword) {
                alert("Erreur: Les mots de passe ne correspondent pas.");
                return;
            }

            if (!termsChecked) {
                alert("Erreur: Veuillez accepter les conditions d'utilisation.");
                return;
            }

            const payload = {
                role: "particulier",
                name,
                email,
                phone,
                currency,
                intent,
                city: city || "Cotonou",
                budget: budget || "50000",
                password
            };

            try {
                // Inscription sur le backend PHP/MySQL
                const response = await fetch(`${API_URL}/register.php`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    const userData = await response.json();
                    localStorage.setItem("tomee_user", JSON.stringify(userData));
                    localStorage.setItem("tomee_logged_in", "true");

                    alert(`Félicitations ${name} !\nVotre compte Particulier ToMee a été créé avec succès.\nUn e-mail de confirmation a été envoyé.`);
                    window.location.href = "dashboard.html";
                    return;
                } else {
                    const errData = await response.json();
                    alert(`Erreur d'inscription : ${errData.error || "Une erreur est survenue."}`);
                    return;
                }
            } catch (err) {
                console.warn("⚠️ API hors ligne. Passage en mode de secours (localStorage)...");
                
                // Fallback LocalStorage
                const userPrefs = {
                    role: "particulier",
                    name: name,
                    email: email,
                    phone: phone,
                    currency: currency,
                    intent: intent,
                    city: city || "Cotonou",
                    budget: budget || "50000"
                };
                localStorage.setItem("tomee_user", JSON.stringify(userPrefs));
                localStorage.setItem("tomee_logged_in", "true");

                alert(`Mode Secours (Hors-ligne) :\nCompte particulier créé avec succès.`);
                window.location.href = "dashboard.html";
            }
        });
    }

    // 3. Agence Form Submission Handler
    if (formAgence) {
        formAgence.addEventListener("submit", async (e) => {
            e.preventDefault();

            const agencyName = document.getElementById("agency-name").value.trim();
            const managerName = document.getElementById("agency-manager").value.trim();
            const license = document.getElementById("agency-license").value.trim();
            const email = document.getElementById("agency-email").value.trim();
            const phone = document.getElementById("agency-phone").value.trim();
            const currency = document.getElementById("agency-currency").value;
            const city = document.getElementById("agency-city").value.trim();
            const website = document.getElementById("agency-website").value.trim();
            const password = document.getElementById("agency-password").value;
            const confirmPassword = document.getElementById("agency-confirm-password").value;
            const termsChecked = document.getElementById("agency-terms").checked;

            if (password !== confirmPassword) {
                alert("Erreur: Les mots de passe ne correspondent pas.");
                return;
            }

            if (!termsChecked) {
                alert("Erreur: Veuillez accepter la charte professionnelle.");
                return;
            }

            const payload = {
                role: "agence",
                name: agencyName,
                managerName,
                license,
                email,
                phone,
                currency,
                city: city || "Cotonou",
                website,
                password
            };

            try {
                // Inscription sur le backend PHP/MySQL
                const response = await fetch(`${API_URL}/register.php`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    const userData = await response.json();
                    localStorage.setItem("tomee_user", JSON.stringify(userData));
                    localStorage.setItem("tomee_logged_in", "true");

                    alert(`Félicitations !\nL'agence "${agencyName}" a été enregistrée avec succès.\nResponsable : ${managerName}`);
                    window.location.href = "agencyDashboard.html";
                    return;
                } else {
                    const errData = await response.json();
                    alert(`Erreur d'inscription : ${errData.error || "Une erreur est survenue."}`);
                    return;
                }
            } catch (err) {
                console.warn("⚠️ API hors ligne. Passage en mode de secours (localStorage)...");

                // Fallback LocalStorage
                const agencyPrefs = {
                    role: "agence",
                    agencyName: agencyName,
                    managerName: managerName,
                    license: license,
                    email: email,
                    phone: phone,
                    currency: currency,
                    city: city || "Cotonou",
                    website: website
                };
                localStorage.setItem("tomee_user", JSON.stringify(agencyPrefs));
                localStorage.setItem("tomee_logged_in", "true");

                alert(`Mode Secours (Hors-ligne) :\nL'agence "${agencyName}" a été enregistrée avec succès.`);
                window.location.href = "agencyDashboard.html";
            }
        });
    }
});
