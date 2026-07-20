/*==================================================
    SmartDocs Assistant
    reports.js
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
        Report Cards
    =========================================*/

    const reportCards = document.querySelectorAll(".report-card");

    reportCards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-6px)";
            card.style.transition = "0.3s";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "translateY(0)";

        });

    });

    /*=========================================
        Report Search
    =========================================*/

    const searchInput = document.getElementById("reportSearch");

    if (searchInput) {

        searchInput.addEventListener("keyup", function () {

            const value = this.value.toLowerCase();

            document.querySelectorAll(".report-item").forEach(item => {

                item.style.display = item.innerText
                    .toLowerCase()
                    .includes(value)
                    ? ""
                    : "none";

            });

        });

    }

    /*=========================================
        Counter Animation
    =========================================*/

    document.querySelectorAll(".counter").forEach(counter => {

        const target = Number(counter.dataset.target);

        let count = 0;

        const speed = Math.max(1, target / 80);

        function updateCounter() {

            count += speed;

            if (count < target) {

                counter.innerText = Math.floor(count);

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText = target.toLocaleString();

            }

        }

        updateCounter();

    });

    /*=========================================
        Export Buttons
    =========================================*/

    document.querySelectorAll(".export-btn").forEach(button => {

        button.addEventListener("click", function () {

            const format = this.dataset.format || "PDF";

            showToast(`Demo: Exporting report as ${format}...`);

        });

    });

    /*=========================================
        Preview Report
    =========================================*/

    document.querySelectorAll(".preview-btn").forEach(button => {

        button.addEventListener("click", () => {

            alert(
                "Preview functionality will be connected to the backend."
            );

        });

    });

    /*=========================================
        Download Report
    =========================================*/

    document.querySelectorAll(".download-btn").forEach(button => {

        button.addEventListener("click", () => {

            showToast("Demo: Report download started.");

        });

    });

    /*=========================================
        Delete Report
    =========================================*/

    document.querySelectorAll(".delete-btn").forEach(button => {

        button.addEventListener("click", function () {

            if (confirm("Delete this report?")) {

                this.closest(".report-item")?.remove();

                showToast("Report deleted.");

            }

        });

    });

    /*=========================================
        Generate Report
    =========================================*/

    const generateButton = document.getElementById("generateReport");

    if (generateButton) {

        generateButton.addEventListener("click", () => {

            generateButton.disabled = true;

            generateButton.innerHTML = `
                <span class="spinner-border spinner-border-sm"></span>
                Generating...
            `;

            setTimeout(() => {

                generateButton.disabled = false;

                generateButton.innerHTML =
                    '<i class="bi bi-file-earmark-text"></i> Generate Report';

                showToast("Executive report generated successfully.");

            }, 2500);

        });

    }

    /*=========================================
        Progress Animation
    =========================================*/

    document.querySelectorAll(".progress-bar").forEach(bar => {

        const width = bar.style.width;

        bar.style.width = "0";

        setTimeout(() => {

            bar.style.transition = "width 1s ease";

            bar.style.width = width;

        }, 300);

    });

    /*=========================================
        Filter Reports
    =========================================*/

    const reportFilter = document.getElementById("reportFilter");

    if (reportFilter) {

        reportFilter.addEventListener("change", function () {

            const filter = this.value.toLowerCase();

            document.querySelectorAll(".report-item").forEach(item => {

                if (filter === "all") {

                    item.style.display = "";

                } else {

                    const type =
                        item.dataset.type?.toLowerCase() || "";

                    item.style.display =
                        type === filter ? "" : "none";

                }

            });

        });

    }

    /*=========================================
        Toast Notification
    =========================================*/

    function showToast(message) {

        const toast = document.createElement("div");

        toast.className =
            "toast align-items-center text-bg-primary border-0 show position-fixed bottom-0 end-0 m-4";

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

        }, 3500);

    }

    /*=========================================
        Console Banner
    =========================================*/

    console.log("📑 SmartDocs Reports Module Loaded");

});