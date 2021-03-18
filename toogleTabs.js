import makeBtnActive from "./utilities/makeBtnActive.js";

export default class ToggleTabs {
    constructor(btnsContainer, tabsContainer, tabHandlers){
        this.tabsContainer = tabsContainer;
        btnsContainer.onclick = (ev) => {
            const tab = ev.target.dataset.tab;
            console.log(tab);
            this.showTab(tab);
            makeBtnActive(btnsContainer, ev);
            if (tabHandlers && tab in tabHandlers) {
                tabHandlers[tab]();
            }
        };
    }
      hideTab() {
        const tabActiveDiv = this.tabsContainer.querySelector(".show");
        //debugger;
        if (tabActiveDiv && tabActiveDiv.parentNode.className === this.tabsContainer.className) tabActiveDiv.classList.remove("show");
    };
    showTab(tab) {
        // debugger;
        this.hideTab();
        const tabDiv = this.tabsContainer.querySelector(`.${tab}`);
        tabDiv.classList.add("show");
    }
}