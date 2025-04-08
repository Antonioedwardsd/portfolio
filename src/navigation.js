import { translations } from "./translations.js";
import { setupTypingEffect } from "./animations.js";

/**
 * Initializes all navigation functionality
 */
export function initNavigation() {
	initLanguageToggle();
	initPortfolioFilters();
	initSmoothScrolling();
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
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
}

// Portfolio filtering
function initPortfolioFilters() {
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
}

// Language Toggle
function initLanguageToggle() {
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
}

// Function to apply translations
export function applyTranslations(lang) {
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
		// Actualiza el código del idioma
		const langCode = languageToggle.querySelector(".language-code");
		if (langCode) {
			langCode.textContent = lang === "en" ? "ES" : "EN";
		}

		// Actualiza la bandera
		const flagIcon = document.getElementById("language-flag");
		if (flagIcon) {
			flagIcon.src =
				lang === "en"
					? "assets/icons/spain-flag.ico"
					: "assets/icons/uk-flag.ico";
			flagIcon.alt = lang === "en" ? "Español" : "English";
		}
	}
}
