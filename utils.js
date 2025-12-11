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

        setDir();
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

export class FrameCreator {
    #pageLoader;
    #className;

    constructor(pageLoader, className) {
        this.#pageLoader = pageLoader;
        this.#className = className;

        this.createFrames = this.createFrames.bind(this);
    }

    #makeFrame(topic) {

        const frame = document.createElement("div");
        frame.classList.add("general-frame", topic.class, topic.direction);

        if (topic.title) {
            const titleDiv = document.createElement("div");
            titleDiv.classList.add ("frame-title", "dir-sensitive");
            titleDiv.innerText = topic.title;
            frame.appendChild(titleDiv);
        }

        if (topic.images) {
            const imagesDiv = document.createElement("div");
            imagesDiv.className = "frame-images";

            topic.images.forEach(src => {
                const img = document.createElement("img");
                img.src = src;
                imagesDiv.appendChild(img);
            });

            frame.appendChild(imagesDiv);
        }

        if (topic.text_path) {
            const textDiv = document.createElement("div");
            textDiv.classList.add("frame-text", "dir-sensitive");
            getTextPromise(topic.text_path).then(text => {
                textDiv.innerText  = text;
            });
            frame.appendChild(textDiv);
        }

        if (topic.links) {
            const linksDiv = document.createElement("div");
            linksDiv.className = "frame-links";

            topic.links.forEach(linkData => {
                const link = document.createElement("a");
                link.href = linkData.href;
                link.textContent.className = "dir-sensitive";   
                link.textContent = linkData.name;
                link.target = "_blank";
                linksDiv.appendChild(link);
            });

            frame.appendChild(linksDiv);
        }

        return frame;
    }

    async createFrames() {
        const response = await fetch(this.#pageLoader.getContentPath());
        const topics = await response.json();

        const directions = ["left", "right"];
        for (let i = 0; i < topics.length; i++) {
            const topic = topics[i];
            const direction = directions[i % directions.length];

            topic.class = this.#className;
            topic.direction = direction

            document.body.appendChild(this.#makeFrame(topic));
        }

        setDir();
    }

    updateLanguage(data) {
        const frames = document.body.querySelectorAll(".general-frame");
        for (let i = 0; i < data.length; i++) {
            const frame = frames[i]
            if (!frame) continue;

            const titleDiv = frame.querySelector(".frame-title");
            if (titleDiv) {
                titleDiv.innerText = data[i].title;
            }
        
            const textDiv = frame.querySelector(".frame-text");
            if (textDiv) {
                getTextPromise(data[i].text_path).then(text => {
                    textDiv.innerText  = text;
                });
            }

            const linksDiv = frame.querySelector(".frame-links");
            if (linksDiv) {
                const links = linksDiv.children;
                for (let l = 0; l < links.length; l++) {
                    links[l].textContent = data[i].links[l].name;
                }
            }
        }

        setDir();
    }

}
 
async function getTextPromise(path) { return fetch(path)
        .then(res => res.text())
        .catch(err => console.error("Error loading text file:", err));
}

const setDir = () => 
    document.querySelectorAll('.dir-sensitive')
            .forEach(el => el.dir = (localStorage.getItem("lang") === 'he' ? 'rtl' : 'ltr'));
