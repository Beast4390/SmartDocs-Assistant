/*==================================================
    SmartDocs Assistant
    dashboard.js
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
        Sidebar Toggle
    =========================================*/

    const sidebar = document.getElementById("sidebar");
    const mainContent = document.querySelector(".main-content");
    const toggleBtn = document.getElementById("sidebarToggle");

    if (toggleBtn) {

        toggleBtn.addEventListener("click", () => {

            sidebar.classList.toggle("collapsed");

            if (mainContent) {

                mainContent.classList.toggle("expanded");

            }

        });

    }

    /*=========================================
        Mobile Sidebar
    =========================================*/

    const mobileToggle = document.getElementById("mobileMenu");

    if (mobileToggle && sidebar) {

        mobileToggle.addEventListener("click", () => {

            sidebar.classList.toggle("show");

        });

    }

    /*=========================================
        Active Sidebar Menu
    =========================================*/

    const menuLinks = document.querySelectorAll(".sidebar-menu a");

    menuLinks.forEach(link => {

        link.addEventListener("click", () => {

            menuLinks.forEach(item => {

                item.parentElement.classList.remove("active");

            });

            link.parentElement.classList.add("active");

        });

    });

    /*=========================================
        Dashboard Counter Animation
    =========================================*/

    const counters = document.querySelectorAll(".counter");

    const animateCounter = (counter) => {

        const target = parseInt(counter.dataset.target);

        let value = 0;

        const increment = Math.max(1, Math.ceil(target / 80));

        const update = () => {

            value += increment;

            if (value >= target) {

                counter.textContent = target.toLocaleString();

            } else {

                counter.textContent = value.toLocaleString();

                requestAnimationFrame(update);

            }

        };

        update();

    };

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                animateCounter(entry.target);

                observer.unobserve(entry.target);

            }

        });

    });

    counters.forEach(counter => {

        observer.observe(counter);

    });

    /*=========================================
        Card Hover
    =========================================*/

    document.querySelectorAll(".stats-card").forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-6px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "translateY(0)";

        });

    });

    /*=========================================
        Search Filter
    =========================================*/

    const searchInput = document.getElementById("dashboardSearch");

    if (searchInput) {

        searchInput.addEventListener("keyup", function () {

            const value = this.value.toLowerCase();

            document.querySelectorAll(".search-item").forEach(item => {

                item.style.display = item.innerText.toLowerCase().includes(value)
                    ? ""
                    : "none";

            });

        });

    }

    /*=========================================
        Progress Animation
    =========================================*/

    document.querySelectorAll(".progress-bar").forEach(bar => {

        const width = bar.style.width;

        bar.style.width = "0";

        setTimeout(() => {

            bar.style.transition = "width 1.2s ease";

            bar.style.width = width;

        }, 200);

    });

    /*=========================================
        Notification Badge
    =========================================*/

    const notification = document.getElementById("notificationCount");

    if (notification) {

        let count = parseInt(notification.innerText) || 0;

        notification.innerText = count;

    }

    /*=========================================
        Theme Toggle
    =========================================*/

    const themeBtn = document.getElementById("themeToggle");

    if (themeBtn) {

        if (localStorage.getItem("theme") === "dark") {

            document.body.classList.add("dark-mode");

        }

        themeBtn.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {

                localStorage.setItem("theme", "dark");

            } else {

                localStorage.setItem("theme", "light");

            }

        });

    }

    /*=========================================
        Logout Button
    =========================================*/

    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", () => {

            const confirmLogout = confirm("Are you sure you want to logout?");

            if (confirmLogout) {

                window.location.href = "index.html";

            }

        });

    }

    /*=========================================
        Dashboard Clock
    =========================================*/

    const clock = document.getElementById("liveClock");

    if (clock) {

        const updateClock = () => {

            const now = new Date();

            clock.innerText = now.toLocaleTimeString();

        };

        updateClock();

        setInterval(updateClock, 1000);

    }

    /*=========================================
        Welcome Toast
    =========================================*/

    const toast = document.getElementById("welcomeToast");

    if (toast) {

        setTimeout(() => {

            toast.classList.add("show");

        }, 600);

        setTimeout(() => {

            toast.classList.remove("show");

        }, 4500);

    }

    /*=========================================
        Smooth Scroll
    =========================================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

    /*=========================================
        Console Banner
    =========================================*/

    console.log("==================================");
    console.log(" SmartDocs Assistant Dashboard");
    console.log(" Offline Enterprise AI Platform");
    console.log(" Hackathon 2026");
    console.log("==================================");

});