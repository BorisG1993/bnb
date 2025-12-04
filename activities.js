import { PageLoader, FrameCreator } from "./utils.js";
let frameClassName = "activities-frame";

const pageLoader = new PageLoader();
pageLoader.contentPathPrefix = "content/activities_content_";

const frameCreator = new FrameCreator(pageLoader, frameClassName);


function loadPage() {
    pageLoader.loadContent(pageLoader.getContentPath(), frameCreator.createFrames);
}

function changeLanguage(newLang) {
    pageLoader.setLanguage(newLang);
    pageLoader.loadContent(pageLoader.getContentPath(), renderContent);
}

function renderContent(data) {
    frameCreator.updateLanguage(data);
}


window.changeLanguage = changeLanguage;

document.addEventListener("DOMContentLoaded", loadPage);





