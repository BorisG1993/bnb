import { PageLoader } from "./utils.js";
const pageLoader = new PageLoader();
pageLoader.contentPathPrefix = "content/main_page_content_";
pageLoader.mediaPath = "content/main_page_images.json";

function loadPage() {
    pageLoader.loadContent(pageLoader.getContentPath(), renderContent);
    pageLoader.loadContent(pageLoader.mediaPath, renderImages);
}

function renderContent(data) {
    document.getElementById("title").textContent = data.title;
    document.getElementById("info").textContent = data.info;
    document.getElementById("activities").textContent = data.activities;
    document.getElementById("photos").textContent = data.photos;
    document.getElementById("summaryTitle").textContent = data.summary_title;
    
    pageLoader.readText(data.summary_text_link, (text) => {
        document.getElementById("summary").textContent = text;
    });

    document.getElementById("contactTitle").textContent = data.contact_title;
    document.getElementById("contactAddress").textContent = data.contact.address;
    document.getElementById("contactPhone1").textContent = data.contact.phone1;
    document.getElementById("contactPhone2").textContent = data.contact.phone2;

    document.querySelectorAll('.dir_sensitive')
        .forEach(el => el.dir = (localStorage.getItem("currentLanguage") === 'he' ? 'rtl' : 'ltr'));
}

function renderImages(data) {
    const imagesDiv = document.getElementById("images");
    imagesDiv.innerHTML = "";
    data.images.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        imagesDiv.appendChild(img);
    });
}

function changeLanguage(newLang) {
    if (pageLoader.getLanguage() === newLang) return;
    pageLoader.setLanguage(newLang);
    pageLoader.loadContent(pageLoader.getContentPath(), renderContent);
}

function goTo(page) {
    window.location.href = `${page}.html`;
}

window.changeLanguage = changeLanguage;
window.goTo = goTo;

document.addEventListener("DOMContentLoaded", loadPage);



