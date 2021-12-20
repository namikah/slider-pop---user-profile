let imageGallery = document.querySelector("#image-gallery");
let currentImages = document.querySelectorAll(".img-a-source");
let imagesCards = document.querySelector(".images-cards");
let popup = document.querySelector(".popup");
let bigImage = document.querySelector(".popup .inner .slider-image img");
let closePopupImages = document.querySelector(".popup .inner .close");
let rightArrow = document.querySelector(".arrows .right-arrow i");
let leftArrow = document.querySelector(".arrows .left-arrow i")
let formLogin = document.querySelector("#form-sign-in");
let loginBtn = document.querySelector(".login-btn");
let username = document.querySelector(".user-name");
let uploadIcon = document.querySelector(".upload-icon");
let uploadBtn = document.querySelector(".upload-btn");
let autoSlideInterval;

//add click event for all images
currentImages.forEach(item => {
    addClickEventForUploadedImages(item);
});

//choose and upload image
uploadIcon.addEventListener("click", () => {
    uploadBtn.click();
})
//upload image onloadend
uploadBtn.addEventListener("change", function (e) {
    const { files } = e.target;

    for (const file of files) {
        let fileReader = new FileReader();
        fileReader.onloadend = function (e) {
            const { result } = e.target;
            createNewPictureBox(result);
        };
        fileReader.readAsDataURL(file);
    }
})
//create new picture box
function createNewPictureBox(result) {
    let aTag = document.createElement("a");
    let img = document.createElement("img");
    aTag.classList.add("img-a-source");
    aTag.setAttribute("alt", "image");
    aTag.setAttribute("href", result);
    img.setAttribute("src", result);
    aTag.appendChild(img);
    imagesCards.appendChild(aTag);
    addClickEventForUploadedImages(aTag);
}
//add click event for new uploaded pictures
function addClickEventForUploadedImages(item) {
    item.addEventListener("click", function (e) {
        e.preventDefault();
        openPopup(this);
        startAutoSlide();
    })
}
//open popup function
function openPopup(item) {
    resetClassList();
    item.classList.add("show-image");
    let imgSrc = item.getAttribute("href");
    bigImage.setAttribute("src", imgSrc);
    popup.style.display = "flex";
}
//close popup function
function closePopup() {
    popup.style.display = "none";
    stopAutoSlide();
}
//close popup with X
closePopupImages.addEventListener("click", () => {
    closePopup();
})
//Close popup with side click
popup.addEventListener("click", (e) => {
    if (e.target.classList.contains("popup")) {
        closePopup();
    }
})
//keys action for popup
document.addEventListener("keydown", (e) => {
    curElement = document.querySelector(".show-image");
    switch (e.code) {
        case "ArrowRight":
            stopAutoSlide();
            changeEffect(() => changeNext(curElement));
            break;
        case "ArrowLeft":
            stopAutoSlide();
            changeEffect(() => changePrev(curElement));
            break;
        case "Escape":
            closePopup();
            break;
        default:
            break;
    }
})
//right-arrow click for change image
rightArrow.addEventListener("click", (e) => {
    curElement = document.querySelector(".show-image");
    changeEffect(() => changeNext(curElement));
    stopAutoSlide();
})
//left-arrow click for change image
leftArrow.addEventListener("click", (e) => {
    curElement = document.querySelector(".show-image");
    changeEffect(() => changePrev(curElement));
    stopAutoSlide();
})
//change images next function
function changeNext(currentElement) {
    if (popup.style.display !== "flex") return
    if (currentElement.nextElementSibling !== null) {
        // currentElement.nextElementSibling.classList.add("show-image");
        nextImageSrc = currentElement.nextElementSibling;
        openPopup(nextImageSrc);
    }
    else {
        // currentElement.parentElement.children[0].classList.add("show-image");
        nextImageSrc = currentElement.parentElement.children[0];
        openPopup(nextImageSrc);
    }
}
//change images prev function
function changePrev(currentElement) {
    if (popup.style.display !== "flex") return
    let length = currentElement.parentElement.children.length;

    if (currentElement.previousElementSibling !== null) {
        // currentElement.previousElementSibling.classList.add("show-image");
        nextImageSrc = currentElement.previousElementSibling;
        openPopup(nextImageSrc);
    }
    else {
        // currentElement.parentElement.children[length - 1].classList.add("show-image");
        nextImageSrc = currentElement.parentElement.children[length - 1];
        openPopup(nextImageSrc);
    }
}
//for enter gallery page
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let welcomeText = document.createElement("h1");
    welcomeText.classList.add("user-style");

    if (username.value.length < 3) {
        window.alert("incorrect. Username at least 3 characters");
        username.value = "";
        return;
    }
    let counter = 0;
    Array.from(username.value).forEach(element => {
        if (!isValid(element)) {
            counter++;
        }
    });
    if (counter == 0) {
        welcomeText.innerText = "WELCOME, " + username.value.toUpperCase();
        imageGallery.insertBefore(welcomeText, imageGallery.firstChild);
        formLogin.style.opacity = "0";
        formLogin.style.transition = "1s";
        setTimeout(() => {
            formLogin.style.display = "none";
            imageGallery.style.display = "block";
            imageGallery.style.transition = "2s";
            imageGallery.style.opacity = "0";
            imageGallery.style.transform = "scale(0.0)";
            imageGallery.firstChild.style.color = "rgb(179 69 115)";

            setTimeout(() => {
                imageGallery.style.opacity = "1";
                imageGallery.style.transform = "scale(1)";
            }, 300);
        }, 800);
    } else {
        window.alert("incorrect. please valid username: not use ' ' ! @ # $ % & * () ? \\ / +");
        username.value = "";
        return;
    }
})
//reset all active image class
function resetClassList() {
    document.querySelectorAll(".show-image").forEach(item => {
        item.classList.remove("show-image");
    });
}
//start auto slide with interval
function startAutoSlide() {
    autoSlideInterval = setInterval(function () {
        bigImage.parentElement.style.backgroundColor = "black";
        bigImage.style.opacity = "0";
        bigImage.style.transition = "1.2s";
        setTimeout(() => {
            curElement = document.querySelector(".show-image");
            changeNext(curElement);
            bigImage.style.opacity = "1";
        }, 1000);
    }, 3000)
}
//stop auto slide with interval
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}
//for change slider slowly
function changeEffect(func) {
    bigImage.parentElement.style.backgroundColor = "black";
    bigImage.style.opacity = "0";
    bigImage.style.transition = ".5s";
    setTimeout(() => {
        bigImage.style.opacity = "1";
        func();
    }, 300);
}
//check all combination
function isValid(char) {
    if (char !== "*" &&
        char !== "/" &&
        char !== "/" &&
        char !== "\\" &&
        char !== "," &&
        char !== "+" &&
        char !== "@" &&
        char !== "!" &&
        char !== "#" &&
        char !== "$" &&
        char !== "%" &&
        char !== "&" &&
        char !== "?" &&
        char !== "(" &&
        char !== " " &&
        char !== ")")
        return true;
    return false;
}