window.addEventListener("DOMContentLoaded", (event) => {
	const sectionElement = document.getElementById("section_1");
	const zoomLevel = window.innerWidth / window.outerWidth;
	const viewportHeight = window.innerHeight / zoomLevel;
	sectionElement.style.minHeight = `${viewportHeight}px`;
});
