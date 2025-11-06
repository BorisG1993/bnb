import { PageLoader, FrameCreator } from "./utils.js";
let frameClassName = "activities-frame";
const activitiesImagesPath = "assets/images/activities/activities_images.json";
const activitiesLinksPath = "assets/links/activities/activities_links.json";

const pageLoader = new PageLoader();
pageLoader.contentPathPrefix = "content/activities_content_";

const frameCreator = new FrameCreator(pageLoader, frameClassName, activitiesImagesPath, activitiesLinksPath);

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





            
