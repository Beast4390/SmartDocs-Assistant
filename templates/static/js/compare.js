/*==================================================
    SmartDocs Assistant
    compare.js
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
        Elements
    =========================================*/

    const fileInput1 = document.getElementById("fileInput1");
    const fileInput2 = document.getElementById("fileInput2");

    const uploadBox1 = document.getElementById("uploadBox1");
    const uploadBox2 = document.getElementById("uploadBox2");

    const preview1 = document.getElementById("preview1");
    const preview2 = document.getElementById("preview2");

    const compareButton = document.getElementById("compareButton");
    const resultSection = document.getElementById("compareResult");

    const similarityValue = document.getElementById("similarityValue");
    const summaryText = document.getElementById("summaryText");

    /*=========================================
        Upload Box Click
    =========================================*/

    if (uploadBox1 && fileInput1) {
        uploadBox1.addEventListener("click", () => fileInput1.click());
    }

    if (uploadBox2 && fileInput2) {
        uploadBox2.addEventListener("click", () => fileInput2.click());
    }

    /*=========================================
        File Selection
    =========================================*/

    fileInput1?.addEventListener("change", () => {
        showPreview(fileInput1.files[0], preview1);
    });

    fileInput2?.addEventListener("change", () => {
        showPreview(fileInput2.files[0], preview2);
    });

    /*=========================================
        Preview Function
    =========================================*/

    function showPreview(file, container) {

        if (!file || !container) return;

        container.innerHTML = `
            <div class="file-preview">
                <div class="d-flex align-items-center">

                    <i class="bi bi-file-earmark-text-fill file-icon"></i>

                    <div>
                        <h6 class="mb-1">${file.name}</h6>
                        <small>${formatSize(file.size)}</small>
                    </div>

                </div>
            </div>
        `;
    }

    /*=========================================
        Compare Documents (Demo)
    =========================================*/

    compareButton?.addEventListener("click", () => {

        if (!fileInput1.files.length || !fileInput2.files.length) {

            alert("Please select two documents first.");

            return;

        }

        compareButton.disabled = true;

        compareButton.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2"></span>
            Comparing...
        `;

        setTimeout(() => {

            compareButton.disabled = false;

            compareButton.innerHTML =
                '<i class="bi bi-arrow-left-right"></i> Compare Documents';

            showResult();

        }, 2500);

    });

    /*=========================================
        Demo Result
    =========================================*/

    function showResult() {

        if (resultSection) {

            resultSection.style.display = "block";

            resultSection.scrollIntoView({
                behavior: "smooth"
            });

        }

        const similarity = Math.floor(Math.random() * 21) + 80;

        if (similarityValue) {
            similarityValue.textContent = similarity + "%";
        }

        if (summaryText) {

            summaryText.textContent =
                "The selected documents are highly similar. Most sections match, with only a few differences in wording, dates, and numerical values. This is a simulated frontend result for the hackathon demo.";

        }

        animateSimilarity(similarity);

        showToast("Comparison completed successfully.");

    }

    /*=========================================
        Similarity Animation
    =========================================*/

    function animateSimilarity(target) {

        if (!similarityValue) return;

        let current = 0;

        const timer = setInterval(() => {

            current++;

            similarityValue.textContent = current + "%";

            if (current >= target) {

                clearInterval(timer);

            }

        }, 15);

    }

    /*=========================================
        Export Buttons
    =========================================*/

    document.querySelectorAll(".export-btn").forEach(button => {

        button.addEventListener("click", () => {

            const format = button.dataset.format || "PDF";

            showToast(`Demo: Exporting comparison as ${format}`);

        });

    });

    /*=========================================
        Reset
    =========================================*/

    document.getElementById("resetCompare")?.addEventListener("click", () => {

        fileInput1.value = "";
        fileInput2.value = "";

        if (preview1) preview1.innerHTML = "";
        if (preview2) preview2.innerHTML = "";

        if (resultSection) resultSection.style.display = "none";

        showToast("Comparison reset.");

    });

    /*=========================================
        Toast
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

        }, 3000);

    }

    /*=========================================
        Format File Size
    =========================================*/

    function formatSize(bytes) {

        if (bytes < 1024) return bytes + " B";

        if (bytes < 1024 * 1024)
            return (bytes / 1024).toFixed(2) + " KB";

        return (bytes / (1024 * 1024)).toFixed(2) + " MB";

    }

    /*=========================================
        Console
    =========================================*/

    console.log("🔍 SmartDocs Compare Module Loaded");

});