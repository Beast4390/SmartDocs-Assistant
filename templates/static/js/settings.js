/*==================================================
    SmartDocs Assistant
    settings.js
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
        Elements
    =========================================*/

    const settingsForm = document.getElementById("settingsForm");
    const themeSelect = document.getElementById("themeSelect");
    const languageSelect = document.getElementById("languageSelect");
    const saveButton = document.getElementById("saveSettings");
    const resetButton = document.getElementById("resetSettings");

    /*=========================================
        Load Saved Settings
    =========================================*/

    loadSettings();

    function loadSettings() {

        const theme = localStorage.getItem("theme");
        const language = localStorage.getItem("language");

        if (theme && themeSelect) {

            themeSelect.value = theme;

            applyTheme(theme);

        }

        if (language && languageSelect) {

            languageSelect.value = language;

        }

    }

    /*=========================================
        Theme Selection
    =========================================*/

    if (themeSelect) {

        themeSelect.addEventListener("change", function () {

            applyTheme(this.value);

        });

    }

    function applyTheme(theme) {

        document.body.classList.remove("dark-mode");

        if (theme === "dark") {

            document.body.classList.add("dark-mode");

        }

    }

    /*=========================================
        Save Settings
    =========================================*/

    if (saveButton) {

        saveButton.addEventListener("click", function (e) {

            e.preventDefault();

            if (themeSelect) {

                localStorage.setItem("theme", themeSelect.value);

            }

            if (languageSelect) {

                localStorage.setItem("language", languageSelect.value);

            }

            document.querySelectorAll(".form-check-input").forEach(toggle => {

                localStorage.setItem(toggle.id, toggle.checked);

            });

            showToast("Settings saved successfully.");

        });

    }

    /*=========================================
        Restore Toggle States
    =========================================*/

    document.querySelectorAll(".form-check-input").forEach(toggle => {

        const saved = localStorage.getItem(toggle.id);

        if (saved !== null) {

            toggle.checked = saved === "true";

        }

        toggle.addEventListener("change", () => {

            localStorage.setItem(toggle.id, toggle.checked);

        });

    });

    /*=========================================
        Reset Settings
    =========================================*/

    if (resetButton) {

        resetButton.addEventListener("click", () => {

            if (!confirm("Reset all settings to default?")) {

                return;

            }

            localStorage.removeItem("theme");
            localStorage.removeItem("language");

            document.querySelectorAll(".form-check-input").forEach(toggle => {

                localStorage.removeItem(toggle.id);

                toggle.checked = false;

            });

            if (themeSelect) {

                themeSelect.value = "light";

            }

            if (languageSelect) {

                languageSelect.value = "English";

            }

            document.body.classList.remove("dark-mode");

            showToast("Settings restored to default.");

        });

    }

    /*=========================================
        Theme Cards
    =========================================*/

    document.querySelectorAll(".theme-card").forEach(card => {

        card.addEventListener("click", () => {

            document.querySelectorAll(".theme-card").forEach(c => {

                c.classList.remove("active");

            });

            card.classList.add("active");

            const theme = card.dataset.theme;

            if (themeSelect) {

                themeSelect.value = theme;

            }

            applyTheme(theme);

        });

    });

    /*=========================================
        Password Visibility
    =========================================*/

    document.querySelectorAll(".toggle-password").forEach(button => {

        button.addEventListener("click", () => {

            const input = document.getElementById(button.dataset.target);

            if (!input) return;

            if (input.type === "password") {

                input.type = "text";

                button.innerHTML = '<i class="bi bi-eye-slash"></i>';

            } else {

                input.type = "password";

                button.innerHTML = '<i class="bi bi-eye"></i>';

            }

        });

    });

    /*=========================================
        Form Validation
    =========================================*/

    if (settingsForm) {

        settingsForm.addEventListener("submit", function (e) {

            e.preventDefault();

            showToast("Profile updated successfully.");

        });

    }

    /*=========================================
        Toast Notification
    =========================================*/

    function showToast(message) {

        const toast = document.createElement("div");

        toast.className =
            "toast align-items-center text-bg-success border-0 show position-fixed bottom-0 end-0 m-4";

        toast.innerHTML = `
            <div class="d-flex">

                <div class="toast-body">
                    ${message}
                </div>

                <button class="btn-close btn-close-white me-2 m-auto"></button>

            </div>
        `;

        document.body.appendChild(toast);

        toast.querySelector(".btn-close").onclick = () => toast.remove();

        setTimeout(() => {

            toast.remove();

        }, 3000);

    }

    /*=========================================
        Console
    =========================================*/

    console.log("⚙️ SmartDocs Settings Module Loaded");

});