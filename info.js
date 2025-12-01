import { PageLoader, createFrame } from "./utils.js";
pageLoader.contentPathPrefix = "content/info_content_";
pageLoader.mediaPath = "content/info_images.json";

function loadPage() {
    pageLoader.loadContent(pageLoader.getContentPath(), renderContent);
    pageLoader.loadContent(pageLoader.mediaPath, renderImages);
}

function renderContent(data) {

}

function renderImages(data) {

}

function changeLanguage(newLang) {
    pageLoader.setLanguage(newLang);
    pageLoader.loadContent(pageLoader.getContentPath(), renderContent);
}

window.changeLanguage = changeLanguage;

document.addEventListener("DOMContentLoaded", loadPage);





