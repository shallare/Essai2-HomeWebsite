document.addEventListener("DOMContentLoaded", () => {
    // 1. Climate Thermostat Controls
    const tempValEl = document.getElementById("temp-val");
    const tempUpBtn = document.getElementById("temp-up");
    const tempDownBtn = document.getElementById("temp-down");

    if (tempValEl && tempUpBtn && tempDownBtn) {
        let currentTemp = parseInt(tempValEl.textContent, 10) || 21;

        tempUpBtn.addEventListener("click", () => {
            if (currentTemp < 32) {
                currentTemp++;
                tempValEl.textContent = currentTemp;
            }
        });

        tempDownBtn.addEventListener("click", () => {
            if (currentTemp > 15) {
                currentTemp--;
                tempValEl.textContent = currentTemp;
            }
        });
    }

    // 2. Light Switches Interaction
    const lightToggles = [
        { id: "light-living", name: "Living Room Light" },
        { id: "light-kitchen", name: "Kitchen Area Light" },
        { id: "light-bedroom", name: "Master Bedroom Light" },
        { id: "light-yard", name: "Front Yard Light" }
    ];

    lightToggles.forEach(toggle => {
        const toggleEl = document.getElementById(toggle.id);
        if (toggleEl) {
            toggleEl.addEventListener("change", (e) => {
                const status = e.target.checked ? "ON" : "OFF";
                console.log(`${toggle.name} is now ${status}.`);
                
                // Add a subtle effect: slightly change energy graph today height if light changes
                const activeBar = document.querySelector(".chart-bar.active");
                if (activeBar) {
                    let currentHeight = parseFloat(activeBar.style.height) || 55;
                    if (e.target.checked) {
                        currentHeight = Math.min(currentHeight + 2, 90);
                    } else {
                        currentHeight = Math.max(currentHeight - 2, 20);
                    }
                    activeBar.style.height = `${currentHeight}%`;
                }
            });
        }
    });

    // 3. Security Arm/Disarm Control
    const securityBox = document.getElementById("security-status-box");
    const securityIcon = document.getElementById("security-icon");
    const securityText = document.getElementById("security-text");
    const securityToggleBtn = document.getElementById("btn-security-toggle");

    if (securityBox && securityIcon && securityText && securityToggleBtn) {
        let isSecured = true;

        securityToggleBtn.addEventListener("click", () => {
            isSecured = !isSecured;

            if (isSecured) {
                // Change UI to Secured State
                securityBox.className = "security-status secured";
                securityIcon.className = "bx bx-lock-alt";
                securityText.textContent = "SYSTEM SECURED";
                
                securityToggleBtn.className = "btn-security secured";
                securityToggleBtn.textContent = "DISARM SYSTEM";
                
                // Alert notification
                console.log("Smart Security System: ARMED");
            } else {
                // Change UI to Disarmed/Alarm State
                securityBox.className = "security-status alarm";
                securityIcon.className = "bx bx-lock-open-alt";
                securityText.textContent = "SYSTEM DISARMED";
                
                securityToggleBtn.className = "btn-security alarm";
                securityToggleBtn.textContent = "ARM SYSTEM";
                
                // Alert notification
                console.log("Smart Security System: DISARMED");
            }
        });
    }

    // 4. Energy Chart Bar Hover effect logs
    const chartBars = document.querySelectorAll(".chart-bar");
    chartBars.forEach(bar => {
        bar.addEventListener("mouseenter", () => {
            const title = bar.getAttribute("title");
            if (title) {
                // Subtly log power reading
                console.log(`Power usage detail: ${title}`);
            }
        });
    });
});
