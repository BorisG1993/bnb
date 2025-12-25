import { PageLoader, FrameCreator } from "./utils.js";
const frameClassName = "info-frame";
const infoImagesPath = "assets/images/info/info_images.json";
const infoLinksPath = "assets/links/info/info_links.json";

const pageLoader = new PageLoader();
pageLoader.contentPathPrefix = "content/info_content_";

const frameCreator = new FrameCreator(pageLoader, frameClassName, infoImagesPath, infoLinksPath);

function loadPage() {
    pageLoader.loadContent(pageLoader.getContentPath(), frameCreator.createFrames);
}

function changeLanguage(newLang) {
    if (pageLoader.getLanguage() === newLang) return;
    pageLoader.setLanguage(newLang);
    pageLoader.loadContent(pageLoader.getContentPath(), renderContent);
}

function renderContent(data) {
    frameCreator.updateLanguage(data);
}


window.changeLanguage = changeLanguage;

document.addEventListener("DOMContentLoaded", loadPage);





