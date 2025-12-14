import { activateImageOverlay } from "./utils.js";
let imgDir = `assets/images/photos/`;
let extensions = ["jpg", "jpeg", "png", "webp"];

async function loadImages() {
    const grid = document.getElementById("photoGrid");
    let index = 1;

    while (true) {
        let found = false;

        for (let ext of extensions) {
            const imgPath = `${imgDir}${index}.${ext}`;
            const res = await fetch(imgPath, {method: "HEAD" });

            if (res.ok) {
                found = true;

                const col = document.createElement("div");
                col.className = "col-6 col-md-4 col-lg-3 d-flex justify-content-center align-items-center";                

                const wrapper = document.createElement("div");
                wrapper.className = "photo-square";

                const img = document.createElement("img")
                img.src = imgPath;
                img.className = "img-fluid rounded shadow-sm";
                activateImageOverlay(img);
                wrapper.appendChild(img);
                col.appendChild(wrapper);
                grid.appendChild(col);
                break;
            }
            else {
                console.log(`format ${ext} not found`);
            }
        }
        if (!found) {
            console.log("end of dir");
            break;
        }
        index++;
    }
}

loadImages();

