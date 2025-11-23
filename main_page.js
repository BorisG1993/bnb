let currentLang = "he"

let eng_content = "content/main_page_content_en.json";
let heb_content = "content/main_page_content_he.json";

function loadAll() {
    loadContent();
    loadImages();
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

function renderContent(data) {
    document.getElementById("title").textContent = data.title;
    
    document.getElementById("info").textContent = data.info;
    document.getElementById("activities").textContent = data.activities;
    document.getElementById("summaryTitle").textContent = data.summary_title;
    document.getElementById("summary").textContent = data.summary;
    
    document.getElementById("contactTitle").textContent = data.contact_title;
    document.getElementById("contactAddress").textContent = data.contact.address;
    document.getElementById("contactPhone1").textContent = data.contact.phone1;
    document.getElementById("contactPhone2").textContent = data.contact.phone2;
    
    document.querySelectorAll('.dir_sensitive')
        .forEach(el => el.dir = (currentLang === 'he' ? 'rtl' : 'ltr'));

}


function loadContent(){
    const file_content = currentLang === "en" ? eng_content : heb_content;

    fetch(file_content)
        .then(res => res.json())
        .then(data => renderContent(data))
        .catch(err => console.error("Error loading JSON:", err));
}

function loadImages(){
    const file_images = "content/main_page_images.json";

    fetch(file_images)
        .then(res => res.json())
        .then(data => renderImages(data))
        .catch(err => console.error("Error loading JSON:", err));
}

function setLanguage(lang) {
    if (currentLang === lang) return;
    currentLang = lang;
    loadContent(currentLang);
}

function goTO(page) {
    window.location.href = `${page}.html?lang=${currentLang}`;
}

document.addEventListener("DOMContentLoaded", loadAll);



