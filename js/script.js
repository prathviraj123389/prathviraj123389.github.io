
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Mobile navigation
if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("show");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("show");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });
}

// Homepage reveal elements
document.querySelectorAll(
    ".hero-content, .hero-image, .intro-strip-content div"
).forEach(element => {
    element.classList.add("reveal");
});

// Scroll reveal for all pages
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => observer.observe(element));
} else {
    revealElements.forEach(element => element.classList.add("visible"));
}

/* =========================================
   CONTACT FORM
========================================= */

/* =========================================
   WEB3FORMS CONTACT FORM
========================================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    const submitButton = document.getElementById("submitButton");
    const formStatus = document.getElementById("formStatus");

    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        formStatus.textContent = "";

        try {
            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: {
                        Accept: "application/json"
                    }
                }
            );

            const result = await response.json();

            if (response.ok && result.success) {
                formStatus.textContent =
                    "Message sent successfully! Thank you for contacting me.";

                formStatus.style.color = "green";
                contactForm.reset();
            } else {
                throw new Error(
                    result.message || "Message could not be sent."
                );
            }

        } catch (error) {
            formStatus.textContent =
                "Message not sent. Please try again later.";

            formStatus.style.color = "red";
            console.error("Web3Forms Error:", error);

        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Send Message →";
        }
    });
}
