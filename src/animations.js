export function initAnimations() {
	setupTypingEffect();
	animateSections();
	initPortfolioParallax();
	headerScrollAnimation();
	initTimelineAnimation();
}

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

function animateSections() {
	const sections = document.querySelectorAll("section");

	const sectionObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("section-visible");
					sectionObserver.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.2 }
	);

	sections.forEach((section) => {
		section.classList.add("section-animate");
		sectionObserver.observe(section);
	});
}

export function setupTypingEffect() {
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

	document
		.querySelectorAll(".typing-name-container")
		.forEach((el) => el.remove());

	const typingContainer = document.createElement("span");
	typingContainer.className = "typing-name-container highlight";
	nameElement.parentNode.insertBefore(typingContainer, nameElement);

	nameElement.style.display = "none";

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
			typingContainer.textContent = "";

			addTimeout(() => {
				typeCharacter(0);
			}, 1000);
		}
	}

	addTimeout(() => typeCharacter(0), 1000);
}

function initTimelineAnimation() {
	const timelineSection = document.querySelector(".education-section");
	if (timelineSection) {
		const timelineObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					animateTimeline();
					timelineObserver.unobserve(entry.target);
				}
			});
		});
		timelineObserver.observe(timelineSection);
	}
}

function animateTimeline() {
	const timelineItems = document.querySelectorAll(".timeline-item");

	timelineItems.forEach((item, index) => {
		item.style.animationDelay = `${index * 0.3}s`;
		item.classList.add("animate-timeline");
	});
}

function initPortfolioParallax() {
	const portfolioSection = document.querySelector(".portfolio-section");

	if (!portfolioSection) return;

	const bgElements = `
        <div class="portfolio-bg-element circle-1"></div>
        <div class="portfolio-bg-element circle-2"></div>
        <div class="portfolio-bg-element circle-3"></div>
        <div class="portfolio-bg-element square"></div>
    `;

	portfolioSection.insertAdjacentHTML("afterbegin", bgElements);

	window.addEventListener("scroll", () => {
		const elements = portfolioSection.querySelectorAll(".portfolio-bg-element");
		const scrollPosition = window.scrollY;
		const sectionTop = portfolioSection.offsetTop;
		const scrollRelative = scrollPosition - sectionTop;

		if (
			scrollPosition >= sectionTop - window.innerHeight &&
			scrollPosition <= sectionTop + portfolioSection.offsetHeight
		) {
			elements.forEach((el, index) => {
				const speed = (index + 1) * 0.05;
				el.style.transform = `translateY(${scrollRelative * speed}px)`;
			});
		}
	});
}
