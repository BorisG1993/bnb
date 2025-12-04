import { PageLoader, makeFrame } from "./utils.js";
const pageLoader = new PageLoader();
pageLoader.contentPathPrefix = "content/info_content_";
pageLoader.mediaPath = "content/info_images.json";
let frameClassName = "infoFrame";

function loadPage() {
    pageLoader.loadContent(pageLoader.getContentPath(), createFrames);
}

function changeLanguage(newLang) {
    pageLoader.setLanguage(newLang);
    pageLoader.loadContent(pageLoader.getContentPath(), renderContent);
}

async function createFrames() {
    const response = await fetch(pageLoader.getContentPath());
    const topics = await response.json();

    const directions = ["left", "right"];

    for (let i = 0; i < topics.length; i++) {
        const topic = topics[i];
        const direction = directions[i % directions.length];

        topic.class = "info-frame";
        topic.direction = direction

        document.body.appendChild(makeFrame(frameClassName, topic));
    }
}

window.changeLanguage = changeLanguage;

document.addEventListener("DOMContentLoaded", loadPage);





