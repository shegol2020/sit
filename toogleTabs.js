export default class toggleTabs {
    constructor(hideContainer, showContainer){
        this.hideContainer = hideContainer;
        this.showContainer = showContainer;
    }
    toggleTab() {
        if (this.showContainer.contains("hide")) {
            this.showContainer.classList.toggle("hide");
        }
        if (this.hideContainer.contains("show")) {
            this.hideContainer.classList.toggle("show");
        }
        // this.btn.onclick = () => {
        this.showContainer.classList.toggle("show");
        this.hideContainer.classList.toggle("hide");
    }
}