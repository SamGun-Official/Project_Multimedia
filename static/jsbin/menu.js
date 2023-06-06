let currentPage = 1;
let loadedPage = true;

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

function setCurrentPage(isNewPush = true) {
	let menuCards = document.querySelectorAll(".menu-card");
	let currentURL = new URL(location.protocol + "//" + location.host + location.pathname + location.search);
	let queryString = new URLSearchParams(currentURL.search);
	let newStack = false;
	if (queryString.has("page")) {
		currentPage = parseInt(queryString.get("page"));
		if (currentPage * 9 - 9 >= menuCards.length) {
			currentPage = 1;
			newStack = true;
		}
		currentURL.searchParams.set("page", currentPage);
	} else {
		newStack = true;
		currentURL.searchParams.append("page", currentPage);
	}
	if (loadedPage) {
		loadedPage = false;
		newStack = true;
	}
	if (isNewPush) {
		let currentState = {};
		currentState["page"] = currentPage;
		if (newStack) {
			window.history.replaceState(currentState, "", currentURL.toString());
		} else {
			window.history.pushState(currentState, "", currentURL.toString());
		}
	}

	for (let i = 0; i < menuCards.length; i++) {
		menuCards[i].style.display = "none";
	}
	for (let i = (currentPage - 1) * 9; i < currentPage * 9; i++) {
		if (i + 1 <= menuCards.length) {
			menuCards[i].style.display = "block";
		}
	}
}

function setPageFilter(isNewPush = true) {
	let menuCards = document.querySelectorAll(".menu-card");
	let currentURL = new URL(location.protocol + "//" + location.host + location.pathname + location.search);
	let queryString = new URLSearchParams(currentURL.search);
	let newStack = false;
	let filterKeyword = "";
	if (queryString.has("filter")) {
		filterKeyword = queryString.get("filter");
		if (filterKeyword !== "Jajan Pasar" && filterKeyword !== "Kopi" && filterKeyword !== "Teh") {
			filterKeyword = "All";
			newStack = true;
		} else {
			document.getElementById("menu_filter").value = filterKeyword;
		}
		currentURL.searchParams.set("filter", filterKeyword);
	} else {
		newStack = true;
		filterKeyword = "All";
		currentURL.searchParams.append("filter", filterKeyword);
	}
	if (loadedPage) {
		loadedPage = false;
		newStack = true;
	}
	if (isNewPush) {
		let currentState = {};
		currentState["filter"] = filterKeyword;
		if (newStack) {
			window.history.replaceState(currentState, "", currentURL.toString());
		} else {
			window.history.pushState(currentState, "", currentURL.toString());
		}
	}

	let allCounter = 0;
	for (let i = 0; i < menuCards.length; i++) {
		if (menuCards[i].getAttribute("data-type") === filterKeyword || (filterKeyword === "All" && allCounter < 9)) {
			menuCards[i].style.display = "block";
			allCounter += 1;
		} else {
			menuCards[i].style.display = "none";
		}
	}
}

function replacePageNumber() {
	let currentURL = new URL(location.protocol + "//" + location.host + location.pathname);
	currentURL.searchParams.append("page", currentPage);

	let currentState = {};
	currentState["page"] = currentPage;
	window.history.replaceState(currentState, "", currentURL.toString());

	setCurrentPage(false);
}

window.addEventListener("DOMContentLoaded", (event) => {
	menuDrawerActions();

	let currentURL = new URL(location.protocol + "//" + location.host + location.pathname + location.search);
	let queryString = new URLSearchParams(currentURL.search);
	if (queryString.has("filter") && queryString.keys().next().value === "filter") {
		setPageFilter();
	} else {
		setCurrentPage();
	}

	document.getElementById("menu_filter").addEventListener("change", function () {
		currentPage = 1;

		let filterKeyword = document.getElementById("menu_filter").value;
		let currentURL = new URL(location.protocol + "//" + location.host + location.pathname);
		currentURL.searchParams.append("filter", filterKeyword);

		let currentState = {};
		currentState["filter"] = filterKeyword;
		window.history.replaceState(currentState, "", currentURL.toString());

		setPageFilter(false);
	});
});

$(document).ready(function () {
	$("#previous").click(function (e) {
		e.preventDefault();
		if (currentPage > 1) {
			currentPage -= 1;
			replacePageNumber();
		}
	});
	$("#page_1").click(function (e) {
		e.preventDefault();
		currentPage = 1;
		replacePageNumber();
	});
	$("#page_2").click(function (e) {
		e.preventDefault();
		currentPage = 2;
		replacePageNumber();
	});
	$("#page_3").click(function (e) {
		e.preventDefault();
		currentPage = 3;
		replacePageNumber();
	});
	$("#page_4").click(function (e) {
		e.preventDefault();
		currentPage = 4;
		replacePageNumber();
	});
	$("#next").click(function (e) {
		e.preventDefault();
		if (currentPage < 4) {
			currentPage += 1;
			replacePageNumber();
		}
	});
});
