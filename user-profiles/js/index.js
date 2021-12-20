let enterUserInformation = document.querySelector(".enter-user-information");
let searchFilter = document.querySelector(".search-filter");
let uploadIcon = document.querySelector(".upload-icon");
let uploadBtn = document.querySelector(".upload-btn");
let formUser = document.querySelector(".form-users");
let enterBtn = document.querySelector(".enter-btn");
let messagePicSelected = document.querySelector(".upload-image .top-part span");
let inputName = document.querySelector(".input-name");
let inputSurname = document.querySelector(".input-surname");
let inputSalary = document.querySelector(".input-salary");
let popup = document.querySelector(".popup");
let bigImage = document.querySelector(".popup .inner .slider-image img");
let close = document.querySelector(".popup .inner .close");
let labelName = document.querySelector(".label-name");
let searchText = document.querySelector(".input-search");
let minSalary = document.querySelector(".input-min-salary");
let maxSalary = document.querySelector(".input-max-salary");
let searchBtn = document.querySelector(".search-enter-btn");
let profilePics = "./assets/image/anonymous.png";
let profilePicsName = "pic selected";

enterUserInformation.style.transition = "2s";
searchFilter.style.transition = "2s";

setTimeout(() => {
    enterUserInformation.style.transform = "translateX(0)";
    searchFilter.style.transform = "translateX(0)";
    enterUserInformation.style.opacity = "1";
    searchFilter.style.opacity = "1";
}, 200);
//choose for add profile picture
uploadIcon.addEventListener("click", () => {
    uploadBtn.click();
})
//search by name, surname and filter salary
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (isNaN(minSalary.value)) {
        minSalary.style.borderColor = "red";
    }
    else minSalary.style.borderColor = "#ced4da";
    if (isNaN(maxSalary.value)) {
        maxSalary.style.borderColor = "red";
    }
    else maxSalary.style.borderColor = "#ced4da";
    if (minSalary.style.borderColor === "red" ||
        maxSalary.style.borderColor === "red") {
        minSalary.value = "";
        maxSalary.value = "";
    }
    resetSearch();
    //search by name and surname
    document.querySelectorAll(".img-parent").forEach(element => {
        if (!(element.children[1].innerText.includes(searchText.value) || element.children[3].innerText.includes(searchText.value))) {
            element.style.transition = ".5s";
            element.style.transform = "scale(0)";
            setTimeout(() => {
                element.style.transform = "scale(1)";
                element.style.display = "none";
            }, 500);
        }
    });
    //filter by salary
    document.querySelectorAll(".salary-info").forEach(element => {
        if (parseInt(minSalary.value) > parseInt(element.innerText.substring(8)) || parseInt(maxSalary.value) < parseInt(element.innerText.substring(8))) {
            element.parentNode.style.transition = ".5s";
            element.parentNode.style.transform = "scale(0)";
            setTimeout(() => {
                element.parentNode.style.transform = "scale(1)";
                element.parentNode.style.display = "none";
            }, 500);
        }
    });
})
//upload all information about user
enterBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (inputName.value === "") {
        inputName.style.borderColor = "red";
    }
    else inputName.style.borderColor = "#ced4da";
    if (inputSurname.value === "") {
        inputSurname.style.borderColor = "red";
    }
    else inputSurname.style.borderColor = "#ced4da";
    if (inputSalary.value === "") {
        inputSalary.style.borderColor = "red";
    }
    else inputSalary.style.borderColor = "#ced4da";

    if (inputName.style.borderColor === "red" ||
        inputSurname.style.borderColor === "red" ||
        inputSalary.style.borderColor === "red")
        return;

    let imgParentTag = document.createElement("div");
    let img = document.createElement("img");
    let nameInfo = document.createElement("span");
    let inputNameInfo = document.createElement("input");
    let surnameInfo = document.createElement("span");
    let inputSurnameInfo = document.createElement("input");
    let salaryInfo = document.createElement("span");
    let inputSalaryInfo = document.createElement("input");
    let changeProfileImage = document.createElement("i");
    let changeProfileImageNone = document.createElement("input");
    let removeProfile = document.createElement("span");
    changeProfileImageNone.setAttribute("type", "file");
    changeProfileImageNone.style.display = "none";

    inputNameInfo.style.display = "none";
    inputSurnameInfo.style.display = "none";
    inputSalaryInfo.style.display = "none";
    inputNameInfo.style.backgroundColor = "#ced4da";
    inputSurnameInfo.style.backgroundColor = "#ced4da";
    inputSalaryInfo.style.backgroundColor = "#ced4da";
    inputSalaryInfo.style.width = "200px";
    nameInfo.innerText = "Name: " + inputName.value;
    surnameInfo.innerText = "Surname: " + inputSurname.value;

    if (isNaN(inputSalary.value))
        salaryInfo.innerText = "Salary: 0";
    else
        salaryInfo.innerText = "Salary: " + inputSalary.value;
    img.classList.add("img-profile");
    imgParentTag.classList.add("img-parent");
    nameInfo.classList.add("name-info", "input-info");
    surnameInfo.classList.add("surname-info", "input-info");
    salaryInfo.classList.add("salary-info");
    changeProfileImage.classList.add("fas", "fa-sync-alt", "change-profil-image-style");
    removeProfile.classList.add("remove-profile");
    removeProfile.innerText = "x";
    img.setAttribute("src", profilePics);
    profilePicsName = "pic selected";
    messagePicSelected.innerText = "choose profile image";
    profilePics = "./assets/image/anonymous.png";
    imgParentTag.appendChild(img);
    imgParentTag.appendChild(nameInfo);
    imgParentTag.appendChild(inputNameInfo);
    imgParentTag.appendChild(surnameInfo);
    imgParentTag.appendChild(inputSurnameInfo);
    imgParentTag.appendChild(salaryInfo);
    imgParentTag.appendChild(inputSalaryInfo);
    imgParentTag.appendChild(changeProfileImage);
    imgParentTag.appendChild(changeProfileImageNone);
    imgParentTag.appendChild(removeProfile);
    formUser.appendChild(imgParentTag);

    imgParentTag.style.opacity = "0";
    setTimeout(() => {
        imgParentTag.style.transition = "1s";
        imgParentTag.style.opacity = "1";
    }, 200);

    removeProfile.addEventListener("click", function () {
        removeProfile.parentElement.style.transition = ".5s";
        removeProfile.parentElement.style.transform = "scale(0)";
        removeProfile.parentElement.style.opacity = "0";
        setInterval(() => {
            removeProfile.parentNode.remove();
        }, 500);
    })

    changeProfileImage.addEventListener("click", function (e) {
        changeProfileImageNone.click();
        changeProfileImageNone.addEventListener("change", function (e) {
            const { files } = e.target;

            for (const file of files) {
                let fileReader = new FileReader();
                fileReader.onloadend = function (e) {
                    let profilePics = e.target.result;
                    changeProfileImage.parentElement.children[0].setAttribute("src", profilePics);
                };
                fileReader.readAsDataURL(file);
            }
        })
    })
    nameInfo.addEventListener("click", function () {
        nameInfo.style.display = "none";
        inputNameInfo.style.display = "block";
    })
    surnameInfo.addEventListener("click", function () {
        surnameInfo.style.display = "none";
        inputSurnameInfo.style.display = "block";
    })
    salaryInfo.addEventListener("click", function () {
        salaryInfo.style.display = "none";
        inputSalaryInfo.style.display = "block";
    })

    inputNameInfo.addEventListener("blur", () => {
        nameInfo.innerText = "Name: " + inputNameInfo.value;
        inputNameInfo.style.display = "none";
        nameInfo.style.display = "block";
    })
    inputSurnameInfo.addEventListener("blur", () => {
        surnameInfo.innerText = "Surname: " + inputSurnameInfo.value;
        inputSurnameInfo.style.display = "none";
        surnameInfo.style.display = "block";
    })
    inputSalaryInfo.addEventListener("blur", () => {
        if (!isNaN(inputSalaryInfo.value)) {
            salaryInfo.innerText = "Salary: " + inputSalaryInfo.value;
            inputSalaryInfo.style.display = "none";
            salaryInfo.style.display = "block";
        }
        else {
            salaryInfo.innerText = "Salary: 0";
            inputSalaryInfo.style.display = "none";
            salaryInfo.style.display = "block";
        }
    })

    img.addEventListener("click", function (e) {
        e.preventDefault();
        openPopup(this);
    })

    inputName.value = "";
    inputSurname.value = "";
    inputSalary.value = "";
})
//keys action for popup
document.addEventListener("keydown", (e) => {
    curElement = document.querySelector(".show-image");
    switch (e.code) {
        case "ArrowRight":
            changeNext(curElement);
            break;
        case "ArrowLeft":
            changePrev(curElement);
            break;
        case "Escape":
            closePopup();
            break;
        default:
            break;
    }
})
//close popup with X
close.addEventListener("click", () => {
    closePopup();
})
//Close popup with side click
popup.addEventListener("click", (e) => {
    if (e.target.classList.contains("popup")) {
        closePopup();
    }
})
//close popup function
function closePopup() {
    popup.style.display = "none";
}
//open popup function
function openPopup(item) {
    let imgSrc = item.getAttribute("src");
    bigImage.setAttribute("src", imgSrc);
    popup.style.display = "flex";
}
//reset all users after search
function resetSearch() {
    document.querySelectorAll(".name-info").forEach(element => {
        element.parentElement.style.display = "flex";
        setTimeout(() => {
            element.parentElement.style.transition = ".5s";
        }, 500);
    });
    document.querySelectorAll(".surname-info").forEach(element => {
        element.parentElement.style.display = "flex";
        setTimeout(() => {
            element.parentElement.style.transition = ".5s";
        }, 500);
    });
}
//copy base64 to variable: 'profilpics'
uploadBtn.addEventListener("change", function (e) {
    const { files } = e.target;

    for (const file of files) {
        let fileReader = new FileReader();
        fileReader.onloadend = function (e) {
            const { result } = e.target;
            profilePics = result;
            profilePicsName = file.name;
            messagePicSelected.innerText = profilePicsName + " selected";
        };
        fileReader.readAsDataURL(file);
    }
})

