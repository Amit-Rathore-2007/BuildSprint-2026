let threeDotBtn = document.querySelector(".three-line");
let openMore = document.querySelector("#open-more")
let links = document.querySelectorAll("#open-more-cont .links a")

for (i of links) {
    i.addEventListener("click", e => {
        if(!openMore.classList.contains("dis-none"))
            openMore.classList.add("dis-none");
    })
}

document.addEventListener("click", e => {
    if (
        !openMore.contains(e.target) &&
        !threeDotBtn.contains(e.target)
    ) {
        openMore.classList.add("dis-none");
    }
});

threeDotBtn.addEventListener("click", e => {
    e.stopPropagation();
    openMore.classList.toggle("dis-none");
});