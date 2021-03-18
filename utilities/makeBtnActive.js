export default function makeBtnActive(container, ev) {
    const currActiveBtn = container.querySelector(".active");
    if (currActiveBtn) {
        currActiveBtn.classList.remove("active");
    }
    ev.target.classList.add("active");
}