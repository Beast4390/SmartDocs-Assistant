/*==================================================
    SmartDocs Assistant
    chat.js
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
        Elements
    =========================================*/

    const chatMessages = document.getElementById("chatMessages");
    const chatInput = document.getElementById("chatInput");
    const sendButton = document.getElementById("sendButton");
    const voiceButton = document.getElementById("voiceButton");
    const suggestionButtons = document.querySelectorAll(".suggestion-chip");

    /*=========================================
        Send Message
    =========================================*/

    function sendMessage() {

        if (!chatInput || !chatMessages) return;

        const message = chatInput.value.trim();

        if (message === "") return;

        addUserMessage(message);

        chatInput.value = "";

        showTypingIndicator();

        setTimeout(() => {

            removeTypingIndicator();

            generateDemoResponse(message);

        }, 1800);

    }

    /*=========================================
        Add User Message
    =========================================*/

    function addUserMessage(message) {

        const currentTime = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

        const html = `
            <div class="message user">

                <div class="bubble user">

                    ${message}

                    <div class="message-time">
                        ${currentTime}
                    </div>

                </div>

                <div class="avatar user">
                    <i class="bi bi-person-fill"></i>
                </div>

            </div>
        `;

        chatMessages.insertAdjacentHTML("beforeend", html);

        scrollBottom();

    }

    /*=========================================
        Demo AI Response
    =========================================*/

    function generateDemoResponse(question) {

        const responses = [

            "Based on the uploaded documents, I found relevant information that answers your question.",

            "The document summary indicates several important insights related to your query.",

            "After searching across multiple documents, I found matching sections with supporting evidence.",

            "SmartDocs Assistant analyzed the available documents and generated the following response."

        ];

        const answer =
            responses[Math.floor(Math.random() * responses.length)];

        const currentTime = new Date().toLocaleTimeString([], {

            hour: "2-digit",
            minute: "2-digit"

        });

        const html = `
            <div class="message ai">

                <div class="avatar ai">
                    <i class="bi bi-robot"></i>
                </div>

                <div class="bubble ai">

                    <strong>Question:</strong><br>
                    ${question}

                    <hr>

                    ${answer}

                    <div class="citation">
                        📄 Source: Document 1 (Page 5)
                    </div>

                    <div class="message-time">
                        ${currentTime}
                    </div>

                </div>

            </div>
        `;

        chatMessages.insertAdjacentHTML("beforeend", html);

        scrollBottom();

    }

    /*=========================================
        Typing Indicator
    =========================================*/

    function showTypingIndicator() {

        const html = `
            <div class="message ai" id="typingIndicator">

                <div class="avatar ai">
                    <i class="bi bi-robot"></i>
                </div>

                <div class="bubble ai">

                    <div class="typing">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                </div>

            </div>
        `;

        chatMessages.insertAdjacentHTML("beforeend", html);

        scrollBottom();

    }

    function removeTypingIndicator() {

        const typing = document.getElementById("typingIndicator");

        if (typing) {

            typing.remove();

        }

    }

    /*=========================================
        Scroll
    =========================================*/

    function scrollBottom() {

        chatMessages.scrollTop = chatMessages.scrollHeight;

    }

    /*=========================================
        Send Button
    =========================================*/

    if (sendButton) {

        sendButton.addEventListener("click", sendMessage);

    }

    /*=========================================
        Enter Key
    =========================================*/

    if (chatInput) {

        chatInput.addEventListener("keypress", function (e) {

            if (e.key === "Enter") {

                e.preventDefault();

                sendMessage();

            }

        });

    }

    /*=========================================
        Suggested Questions
    =========================================*/

    suggestionButtons.forEach(button => {

        button.addEventListener("click", () => {

            if (chatInput) {

                chatInput.value = button.innerText;

                sendMessage();

            }

        });

    });

    /*=========================================
        Voice Input (Browser API)
    =========================================*/

    if ("webkitSpeechRecognition" in window && voiceButton) {

        const recognition = new webkitSpeechRecognition();

        recognition.lang = "en-IN";

        recognition.continuous = false;

        recognition.interimResults = false;

        voiceButton.addEventListener("click", () => {

            recognition.start();

            voiceButton.classList.add("btn-danger");

        });

        recognition.onresult = function (event) {

            const transcript = event.results[0][0].transcript;

            chatInput.value = transcript;

            voiceButton.classList.remove("btn-danger");

        };

        recognition.onerror = function () {

            voiceButton.classList.remove("btn-danger");

        };

        recognition.onend = function () {

            voiceButton.classList.remove("btn-danger");

        };

    }

    /*=========================================
        Clear Chat
    =========================================*/

    const clearChat = document.getElementById("clearChat");

    if (clearChat) {

        clearChat.addEventListener("click", () => {

            if (confirm("Clear entire conversation?")) {

                chatMessages.innerHTML = "";

            }

        });

    }

    /*=========================================
        Export Chat (Demo)
    =========================================*/

    const exportChat = document.getElementById("exportChat");

    if (exportChat) {

        exportChat.addEventListener("click", () => {

            alert("Chat export will be connected to the backend.");

        });

    }

    /*=========================================
        Welcome Message
    =========================================*/

    setTimeout(() => {

        if (chatMessages.children.length === 0) {

            generateDemoResponse(
                "Welcome to SmartDocs Assistant"
            );

        }

    }, 600);

    /*=========================================
        Console
    =========================================*/

    console.log("🤖 SmartDocs Chat Module Loaded");

});