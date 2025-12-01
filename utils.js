export class PageLoader {
    
    #defLang = "he";
    contenPathPrefix;
    mediaPath;

    constructor() {
        if (!this.getLanguage()) this.setLanguage(defLang);
    }
    
    loadContent(path, renderContent) {
        fetch(path)
            .then(res => res.json())
            .then(data => renderContent(data))
            .catch(err => console.error("Error loading JSON:", err));
    }

    readText(path, setText) {
        fetch(path)
            .then(res => res.text())
            .then(text => setText(text))
            .catch(err => console.error("Error loading text file:", err));
    }

    getLanguage() {
        return localStorage.getItem("lang");
    }

    setLanguage(lang) {
        localStorage.setItem("lang", lang);
    }

    getContentPath() {
        return `${this.contentPathPrefix}${this.getLanguage()}.json`;
    }
}


function createFrame(className, index, layout, images, text) {
    
    const frame = document.createElement("div");
    frame.className = className; 
    frame.id =  `${className}${index}`;
    
    const imagesDiv = document.createElement("div");
    imagesDiv.className = "frame-images";

    const textDiv = document.createElement("div");
    textDiv.className = "frame-text";
    textDiv.innerText = text;

    images.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        imageDiv.appendChild(img);
    });

    switch (layout) {
        case "left":
            frame.appendChild(imagesDiv);
            frame.appendChild(textDiv);
            break;

        case "right":
            frame.appendChild(textDiv);
            frame.appendChild(imagesDiv);
            break;

        case "text-only":
            frame.appendChild(textDiv);
            break;

        case "images-only":
            frame.appendChild(imagesDiv);
            break;

        default:
            console.warn(`Unknown layout "${layout}", using left`);
            frame.appendChild(imagesDiv);
            frame.appendChild(textDiv);
    }

    return frame;
}
