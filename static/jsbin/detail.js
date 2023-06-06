function setBannerHeight() {
	let bannerElement = document.getElementById("showcase"),
		bannerWidth = bannerElement.offsetWidth;

	bannerElement.style.minHeight = `${bannerWidth}px`;
	bannerElement.style.maxHeight = `${bannerWidth}px`;
}

window.addEventListener("DOMContentLoaded", (event) => {
	setBannerHeight();
});

window.addEventListener(
	"resize",
	function (event) {
		setBannerHeight();
	},
	true
);
