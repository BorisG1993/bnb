let currentLang = "en";

function loadContent() {
    const file = currentLang === "en" ? "content_en.json" : "content_he.json";

    fetch(file)
        .then(res => res.json())
        .then(data => renderContent(data))
        .catch(err => console.error("Error loading JSON:", err));
}

function renderContent(data) {
    document.getElementById("title").textContent = data.title;
    
    const imagesDiv = document.getElementById("images");
    imagesDiv.innerHTML = "";
    data.images.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        imagesDiv.appendChild(img);
    });

    document.getElementById("info").textContent = data.info;
    document.getElementById("gallery").textContent = data.gallery;
    document.getElementById("activities").textContent = data.activities;
    document.getElementById("summaryTitle").textContent = data.summary_title;
    document.getElementById("summary").textContent = data.summary;
    
    document.getElementById("contactTitle").textContent = data.contact_title;
    document.getElementById("contactAddress").textContent = data.contact.address;
    document.getElementById("contactPhone1").textContent = data.contact.phone1;
    document.getElementById("contactPhone2").textContent = data.contact.phone2;
    
    document.body.dir = currentLang === "he" ? "rtl" : "ltr";

}

function setLanguage(lang) {
    currentLang = lang;
    loadContent();
}

document.addEventListener("DOMContentLoaded", loadContent);



