window.addEventListener("load", () => {



    window.addEventListener("scroll", () => {
        let currentPosition = document.scrollTop;

        let sectiodn = document.querySelector("#projects");
        let navHeight = document.querySelector("nav").clientHeight;
        
        console.log(sectiodn.getBoundingClientRect().top, sectiodn.getBoundingClientRect().bottom , document.querySelector("nav").clientHeight, currentPosition)

        document.querySelectorAll("nav a").forEach(navItem => {

            let section = document.querySelector(navItem.getAttribute("href"));

            if (section.getBoundingClientRect().top > -40 && section.getBoundingClientRect().top < 210) {
                document.querySelectorAll("nav a").forEach(resetColourItem => {
                    resetColourItem.style.color = "#cacaca";
                });
                navItem.style.color = "white";
            }
        })
    })
});