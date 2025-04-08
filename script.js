import { initDarkMode } from "./src/darkmode.js";
import { initAnimations } from "./src/animations.js";
import { initNavigation } from "./src/navigation.js";

document.addEventListener("DOMContentLoaded", function () {
	// Initialize all modules
	initDarkMode();
	initNavigation();
	initAnimations();
});
