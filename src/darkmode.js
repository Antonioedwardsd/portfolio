/**
 * Manages dark mode functionality
 */
export function initDarkMode() {
	const body = document.body;
	const darkModeToggle = document.getElementById("dark-mode-toggle");
	darkModeToggle.className = "dark-mode-toggle";

	const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
	const savedTheme = localStorage.getItem("theme");

	if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
		body.classList.add("dark-mode");
		darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
	}

	darkModeToggle.addEventListener("click", function () {
		body.classList.toggle("dark-mode");

		if (body.classList.contains("dark-mode")) {
			darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
			localStorage.setItem("theme", "dark");
		} else {
			darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
			localStorage.setItem("theme", "light");
		}
	});
}
