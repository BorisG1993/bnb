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
