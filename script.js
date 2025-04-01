import { translations } from "./translations.js";

document.addEventListener("DOMContentLoaded", function () {
	// Dark Mode Toggle
	const body = document.body;
	const darkModeToggle = document.getElementById("dark-mode-toggle");
	darkModeToggle.className = "dark-mode-toggle";

	// Check for saved theme preference or prefer-color-scheme
	const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
	const savedTheme = localStorage.getItem("theme");

	// Apply saved theme or system preference
	if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
		body.classList.add("dark-mode");
		darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
	}

	// Toggle dark mode
	darkModeToggle.addEventListener("click", function () {
		body.classList.toggle("dark-mode");

		// Update button icon
		if (body.classList.contains("dark-mode")) {
			darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
			localStorage.setItem("theme", "dark");
		} else {
			darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
			localStorage.setItem("theme", "light");
		}
	});

	// Language Toggle
	const languageToggle = document.getElementById("language-toggle");
	if (languageToggle) {
		// Check for saved language preference
		const savedLanguage = localStorage.getItem("language") || "en";

		// Set initial language
		document.documentElement.setAttribute("lang", savedLanguage);
		updateLanguageToggleText(savedLanguage);
		applyTranslations(savedLanguage);

		// Language change event
		languageToggle.addEventListener("click", function () {
			const currentLang = document.documentElement.getAttribute("lang");
			const newLang = currentLang === "en" ? "es" : "en";

			document.documentElement.setAttribute("lang", newLang);
			localStorage.setItem("language", newLang);
			updateLanguageToggleText(newLang);
			applyTranslations(newLang);

			// Clear and restart animation
			if (window.clearAllTimeouts) {
				window.clearAllTimeouts();
			}
			setupTypingEffect();
		});
	}

	// Portfolio filtering
	const filterBtns = document.querySelectorAll(".filter-btn");
	const portfolioItems = document.querySelectorAll(".portfolio-item");

	filterBtns.forEach((btn) => {
		btn.addEventListener("click", function () {
			// Remove active class from all buttons
			filterBtns.forEach((btn) => btn.classList.remove("active"));

			// Add active class to clicked button
			this.classList.add("active");

			const filterValue = this.getAttribute("data-filter");

			portfolioItems.forEach((item) => {
				if (
					filterValue === "all" ||
					item.getAttribute("data-category") === filterValue
				) {
					item.style.display = "block";
				} else {
					item.style.display = "none";
				}
			});
		});
	});

	// Smooth scrolling for navigation links
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();

			const targetId = this.getAttribute("href");
			const targetElement = document.querySelector(targetId);

			if (targetElement) {
				window.scrollTo({
					top: targetElement.offsetTop - 70,
					behavior: "smooth",
				});
			}
		});
	});

	setupTypingEffect();
});

// Header scroll animation
function headerScrollAnimation() {
	const header = document.querySelector("header");
	const scrollThreshold = 100;

	window.addEventListener("scroll", () => {
		if (window.scrollY > scrollThreshold) {
			header.classList.add("header-scrolled");
		} else {
			header.classList.remove("header-scrolled");
		}
	});
}

headerScrollAnimation();

// Typing animation
function setupTypingEffect() {
	window.clearAllTimeouts = function () {
		if (window.animationTimeouts) {
			window.animationTimeouts.forEach((id) => clearTimeout(id));
			window.animationTimeouts = [];
		}
	};

	window.clearAllTimeouts();

	const nameElement = document.querySelector(".intro-name .highlight");
	if (!nameElement) return;

	const originalName = nameElement.textContent;

	// Remove any previous containers
	document
		.querySelectorAll(".typing-name-container")
		.forEach((el) => el.remove());

	// Create typing container
	const typingContainer = document.createElement("span");
	typingContainer.className = "typing-name-container highlight";
	nameElement.parentNode.insertBefore(typingContainer, nameElement);

	// Hide original element
	nameElement.style.display = "none";

	// Track timeouts to clear them later if needed
	window.animationTimeouts = [];

	function addTimeout(callback, delay) {
		const id = setTimeout(callback, delay);
		window.animationTimeouts.push(id);
		return id;
	}

	function typeCharacter(index) {
		if (index <= originalName.length) {
			typingContainer.textContent = originalName.substring(0, index);
			addTimeout(() => typeCharacter(index + 1), 100);
		} else {
			addTimeout(() => eraseCharacter(originalName.length), 2000);
		}
	}

	function eraseCharacter(index) {
		if (index > 0) {
			typingContainer.textContent = originalName.substring(0, index - 1);
			addTimeout(() => eraseCharacter(index - 1), 50);
		} else {
			// Keep container empty between animation cycles
			typingContainer.textContent = "";

			// Wait before starting next animation cycle
			addTimeout(() => {
				typeCharacter(0);
			}, 1000);
		}
	}

	// Start the animation
	addTimeout(() => typeCharacter(0), 1000);
}

// Timeline animation
function animateTimeline() {
	const timelineItems = document.querySelectorAll(".timeline-item");

	timelineItems.forEach((item, index) => {
		item.style.animationDelay = `${index * 0.3}s`;
		item.classList.add("animate-timeline");
	});
}

// Run when timeline section is visible
const timelineObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			animateTimeline();
			timelineObserver.unobserve(entry.target);
		}
	});
});

const timelineSection = document.querySelector(".education-section");
if (timelineSection) timelineObserver.observe(timelineSection);

// Function to apply translations
function applyTranslations(lang) {
	document.querySelectorAll("[data-i18n]").forEach((element) => {
		const key = element.getAttribute("data-i18n");
		if (translations[lang] && translations[lang][key]) {
			element.textContent = translations[lang][key];
		}
	});
}

// Function to update button text
function updateLanguageToggleText(lang) {
	const languageToggle = document.getElementById("language-toggle");
	if (languageToggle) {
		languageToggle.textContent = lang === "en" ? "ES" : "EN";
	}
}
