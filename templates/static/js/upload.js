/*==================================================
    SmartDocs Assistant
    upload.js
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
        Elements
    =========================================*/

    const uploadArea = document.getElementById("uploadArea");
    const fileInput = document.getElementById("fileInput");
    const fileList = document.getElementById("fileList");
    const uploadButton = document.getElementById("uploadButton");

    /*=========================================
        Click Upload Area
    =========================================*/

    if (uploadArea && fileInput) {

        uploadArea.addEventListener("click", () => {

            fileInput.click();

        });

    }

    /*=========================================
        Drag & Drop
    =========================================*/

    if (uploadArea) {

        ["dragenter", "dragover"].forEach(event => {

            uploadArea.addEventListener(event, (e) => {

                e.preventDefault();
                uploadArea.classList.add("dragover");

            });

        });

        ["dragleave", "drop"].forEach(event => {

            uploadArea.addEventListener(event, (e) => {

                e.preventDefault();
                uploadArea.classList.remove("dragover");

            });

        });

        uploadArea.addEventListener("drop", (e) => {

            const files = e.dataTransfer.files;
            displayFiles(files);

        });

    }

    /*=========================================
        File Input Change
    =========================================*/

    if (fileInput) {

        fileInput.addEventListener("change", () => {

            displayFiles(fileInput.files);

        });

    }

    /*=========================================
        Display Files
    =========================================*/

    function displayFiles(files) {

        if (!fileList) return;

        fileList.innerHTML = "";

        [...files].forEach(file => {

            const extension = file.name.split(".").pop().toLowerCase();

            if (!["pdf", "doc", "docx", "ppt", "pptx"].includes(extension)) {

                alert(`${file.name} is not a supported file.`);
                return;

            }

            const card = document.createElement("div");
            card.className = "upload-file";

            card.innerHTML = `
                <div class="file-left">
                    <i class="bi bi-file-earmark-text-fill"></i>

                    <div>
                        <div class="file-name">${file.name}</div>
                        <div class="file-size">
                            ${(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>

                        <div class="progress mt-2">
                            <div class="progress-bar"
                                 style="width:0%"></div>
                        </div>
                    </div>
                </div>

                <button class="btn btn-outline-danger btn-sm remove-file">
                    <i class="bi bi-trash"></i>
                </button>
            `;

            fileList.appendChild(card);

            simulateUpload(card);

        });

    }

    /*=========================================
        Simulated Upload
    =========================================*/

    function simulateUpload(card) {

        const progress = card.querySelector(".progress-bar");

        let width = 0;

        const interval = setInterval(() => {

            width += 5;

            progress.style.width = width + "%";

            if (width >= 100) {

                clearInterval(interval);

                progress.classList.add("bg-success");

            }

        }, 80);

    }

    /*=========================================
        Remove File
    =========================================*/

    document.addEventListener("click", (e) => {

        if (e.target.closest(".remove-file")) {

            e.target.closest(".upload-file").remove();

        }

    });

    /*=========================================
        Upload Button
    =========================================*/

    if (uploadButton) {

        uploadButton.addEventListener("click", () => {

            alert(
                "Demo Mode: Files are ready to be sent to the Flask backend."
            );

        });

    }

    /*=========================================
        Upload Statistics Animation
    =========================================*/

    document.querySelectorAll(".counter").forEach(counter => {

        const target = Number(counter.dataset.target);

        let count = 0;

        const speed = target / 80;

        function updateCounter() {

            count += speed;

            if (count < target) {

                counter.innerText = Math.floor(count);

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText = target;

            }

        }

        updateCounter();

    });

    /*=========================================
        Success Toast (Demo)
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

                <button class="btn-close btn-close-white me-2 m-auto"
                        data-bs-dismiss="toast">
                </button>
            </div>
        `;

        document.body.appendChild(toast);

        setTimeout(() => {

            toast.remove();

        }, 3000);

    }

    if (uploadButton) {

        uploadButton.addEventListener("click", () => {

            showToast("Documents are ready for AI processing.");

        });

    }

    /*=========================================
        Console Message
    =========================================*/

    console.log("📄 SmartDocs Upload Module Loaded");

});