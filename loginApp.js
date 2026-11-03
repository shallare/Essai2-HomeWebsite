/* loginApp.js - Login Page Script for ToMee with PHP/MySQL Backend */

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("form-login");
    const btnGoogle = document.getElementById("btn-google");
    const API_URL = "api";

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("login-email").value.trim();
            const password = document.getElementById("login-password").value;

            if (!email || !password) {
                alert("Veuillez remplir tous les champs.");
                return;
            }

            try {
                // Tentative de connexion via l'API PHP/MySQL
                const response = await fetch(`${API_URL}/login.php`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                if (response.ok) {
                    const userData = await response.json();
                    localStorage.setItem("tomee_logged_in", "true");
                    localStorage.setItem("tomee_user", JSON.stringify(userData));
                    
                    alert(`Bienvenue sur ToMee !\nConnexion réussie pour : ${userData.name}`);
                    const isAgency = userData.role === "agence";
                    window.location.href = isAgency ? "agencyDashboard.html" : "dashboard.html";
                    return;
                } else {
                    const errData = await response.json();
                    alert(`Erreur de connexion : ${errData.error || "Identifiants invalides."}`);
                    return;
                }
            } catch (err) {
                console.warn("⚠️ API hors ligne. Passage en mode de secours (localStorage)...");
                console.error(err);

                // Mode de secours dégradé (localStorage)
                localStorage.setItem("tomee_logged_in", "true");
                
                if (!localStorage.getItem("tomee_user")) {
                    const userPrefs = {
                        role: "particulier",
                        name: "Jean DOSSOU",
                        email: email,
                        phone: "+2290157596569",
                        currency: "XOF",
                        intent: "both",
                        city: "Cotonou",
                        budget: "50000"
                    };
                    localStorage.setItem("tomee_user", JSON.stringify(userPrefs));
                }

                const userData = JSON.parse(localStorage.getItem("tomee_user") || "{}");
                const isAgency = userData.role === "agence";

                alert(`Mode Secours (Hors-ligne) :\nConnexion réussie avec : ${email}`);
                window.location.href = isAgency ? "agencyDashboard.html" : "dashboard.html";
            }
        });
    }

    // Google social login mock
    if (btnGoogle) {
        btnGoogle.addEventListener("click", (e) => {
            e.preventDefault();
            alert("Connexion avec Google : cette fonctionnalité sera bientôt disponible.\nVeuillez utiliser votre e-mail pour le moment.");
        });
    }
});
