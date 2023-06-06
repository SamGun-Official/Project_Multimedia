function setBannerHeight(id) {
	let bannerElement = document.getElementById(id),
		aspectRatio = 1.7777777777777777777777777777778,
		bannerWidth = bannerElement.offsetWidth;
	if (window.innerWidth === 1920) {
		aspectRatio = bannerWidth / (window.innerHeight > 1080 ? 1080 : window.innerHeight);
	}
	if (window.innerWidth >= 1280) {
		bannerElement.style.minHeight = `${bannerWidth / aspectRatio}px`;
		bannerElement.style.maxHeight = `${bannerWidth / aspectRatio}px`;
	} else {
		bannerElement.style.minHeight = `${640}px`;
		bannerElement.style.maxHeight = `${640}px`;
	}
}

function menuDrawerActions() {
	const openDrawerBtn = document.getElementById("drawer_btn");
	openDrawerBtn.addEventListener("click", function (event) {
		event.preventDefault();

		const menuDrawer = document.getElementById("menu_drawer");
		menuDrawer.style.display = "flex";

		const bodyElement = document.getElementById("home");
		bodyElement.style.overflow = "hidden";
	});

	const closeDrawerBtn = document.getElementById("close_btn");
	closeDrawerBtn.addEventListener("click", function (event) {
		event.preventDefault();

		const menuDrawer = document.getElementById("menu_drawer");
		menuDrawer.removeAttribute("style");

		const bodyElement = document.getElementById("home");
		bodyElement.removeAttribute("style");
	});
}

window.addEventListener("DOMContentLoaded", (event) => {
	setBannerHeight("section_2");
	setBannerHeight("section_4");
	menuDrawerActions();
});

window.addEventListener(
	"resize",
	function (event) {
		setBannerHeight("section_2");
		setBannerHeight("section_4");
	},
	true
);
