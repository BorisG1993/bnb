export class PageLoader {
    
    #defLang;
    contenPathPrefix;
    mediaPath;

    constructor(defLang = "he") {
        this.#defLang = defLang;
        if (!this.getLanguage()) this.setLanguage(this.#defLang);
        this.#defLang = defLang;
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
    #imagesPath;
    #linksPath;

    constructor(pageLoader, className, imagesPath = undefined, linksPath = undefined) {
        this.#pageLoader = pageLoader;
        this.#className = className;
        this.#imagesPath = imagesPath;
        this.#linksPath = linksPath;
        
        this.createFrames = this.createFrames.bind(this);
    }

    #makeFrame(topic, topic_images, links) {
        
        const frame = document.createElement("div");
        frame.classList.add("general-frame", topic.class, topic.direction);
        const id = Object.keys(topic)[0];
        const topic_content = topic[id];
        frame.id = id;

        const titleDiv = document.createElement("div");
        titleDiv.classList.add ("frame-title", "dir-sensitive");
        titleDiv.innerText = topic_content.title;
        frame.appendChild(titleDiv);

        if (topic_images != undefined) {
            const imagesDiv = document.createElement("div");
            imagesDiv.className = "frame-images";
            
            topic_images.images.forEach(src => {

                const img = document.createElement("img");
                img.src = src;
                activateImageOverlay(img);
                if (topic_images.large) img.classList.add("large");
                imagesDiv.appendChild(img);
            });

            frame.appendChild(imagesDiv);
        }

        if (topic_content.text_path) {
            const textDiv = document.createElement("div");
            textDiv.classList.add("frame-text", "dir-sensitive");
            getTextPromise(topic_content.text_path).then(text => {
                textDiv.innerText  = text;
            });
            frame.appendChild(textDiv);
        }

        if (links != undefined) {
            const linksDiv = document.createElement("div");
            linksDiv.className = "frame-links";
                
            topic_content.links.forEach(link => {
                const a = document.createElement("a");
                const link_id = Object.keys(link)[0];
                a.href = links[link_id];
                a.className = "dir-sensitive";  
                a.id = link_id;
                a.textContent = link[link_id];
                a.target = "_blank";
                linksDiv.appendChild(a);
            });

            frame.appendChild(linksDiv);
        }

        return frame;
    }

    async createFrames() {
        let response = await fetch(this.#pageLoader.getContentPath());
        const topics = await response.json();

        let images;
        let links;
        
        if (this.#imagesPath != undefined) {
            response = await fetch(this.#imagesPath);
            images = await response.json();
        }
        
        if (this.#linksPath != undefined) {
            response = await fetch(this.#linksPath);
            links = await response.json();
        }

        const directions = ["left", "right"];

        for (let i = 0; i < topics.length; i++) {
            const topic = topics[i];
            const topic_key = Object.keys(topic)[0];
            const topic_images = images[topic_key];
            const direction = directions[i % directions.length];

            topic[topic_key].class = this.#className;
            topic[topic_key].direction = direction;
            
            document.body.appendChild(this.#makeFrame(topic, 
                                                      topic_images === undefined ?
                                                      undefined : topic_images, 
                                                      links === undefined ? 
                                                      undefined : links));
        }

        setDir();
    }

    updateLanguage(data) {

        data.forEach(topic => {
            
            const id = Object.keys(topic)[0];
            const frame = document.getElementById(id);
                
            const titleDiv = frame.querySelector(".frame-title");
            if (titleDiv) {
                titleDiv.innerText = topic[id].title;
            }
        
            const textDiv = frame.querySelector(".frame-text");
            if (textDiv) {
                getTextPromise(topic[id].text_path).then(text => {
                    textDiv.innerText  = text;
                });
            }

            const linksDiv = frame.querySelector(".frame-links");
            if (linksDiv) {
                for (const link of linksDiv.children) {
                    const obj = topic[id].links.find(l => l.hasOwnProperty(link.id));
                    link.textContent =obj[link.id];
                }
            }
        });

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




export function activateImageOverlay(img) {

    document.getElementById("overlay").addEventListener("click", (e) => {
        if (e.target.id === "overlay") {
            e.target.classList.remove("show");
        }
    });

  img.addEventListener("click", () => {
        const overlay = document.getElementById("overlay");
        const overlayImg = document.getElementById("overlay-img");
        overlayImg.src = img.src;
        overlay.classList.add("show");
    });
}

