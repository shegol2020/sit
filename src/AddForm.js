import StatusBtn from "./StatusBtns.js";
import ValidationForm from "./ValidationForm.js";
import ToggleTabs from "./ToogleTabs.js";
import clearFields from "../utilities/clearFields.js";
import generateId from "../utilities/generateId.js";
import getText from "../utilities/gettext.js";


export default class AddForm {
    constructor(addContainer, addSingHandler, addPlurHandler) {
        this.container = addContainer;
        const statusListContainer = document.querySelector(".singular-tab .status-list"); // singleTab
        const secondStatusListContainer = document.querySelector(".second-status-list"); // pluralTab
        const tabContainer = document.querySelector(".tab-container");
        const buttonsContainer = document.querySelector(".buttons");
        const addItemBtn = document.querySelector(".add-item"); // OK button singleTab
        const addListBtn = document.querySelector(".add-list"); // Ok2 pluralTab


        let gotObj = {
            date: "",
            event: "",
            status: "",
            id: ""
        };
        /* обработка верхних кнопок */
        const singPlurBtns = new ToggleTabs(buttonsContainer, tabContainer);
        singPlurBtns.showTab("plural-tab");

        /* обработка клика по статусу на вкладке Одно */
        const validationFormSing = new ValidationForm(addItemBtn, { date: false, event: false, status: false }); // singleTab

        const singleStatusHandler = (ev) => { // singleTab
            validationFormSing.checkListFieldOn("status");
            gotObj.status = ev.target.dataset.style;
        };

        let selectedStatus = "nomusic"; // статус по умолчанию  // pluralTab

        /* обработка клика по статусу на вкладке несколько */
        const pluralStatusHandler = (ev) => {   // pluralTab
            selectedStatus = ev.target.dataset.style;
        };

        const singleStatus = new StatusBtn(statusListContainer, singleStatusHandler); // singleTab
        const pluralStatus = new StatusBtn(secondStatusListContainer, pluralStatusHandler); // pluralTab
        pluralStatus.render(); // pluralTab
        singleStatus.render(); // singleTab

        const gotDate = document.querySelector(".singular-tab #date"); // singleTab
        const gotEvent = document.querySelector(".singular-tab #event"); // singleTab
        /* обработка Date */
        gotDate.onchange = (ev) => { // singleTab
            const value = ev.target.value;
            if (value) {
                validationFormSing.checkListFieldOn("date");
                gotObj.date = value;
            } else {
                validationFormSing.checkListFieldOff("date");
            }
        };

        /* обработка event */
        gotEvent.onkeyup = (ev) => { // singleTab
            const value = ev.target.value;
            if (value) {
                validationFormSing.checkListFieldOn("event");
                gotObj.event = value;
            } else {
                validationFormSing.checkListFieldOff("event");
            }
        };

        /* обработка клика OK, объект gotObj → в массив, event → в div */
        addItemBtn.onclick = () => { // singleTab
            clearFields([gotDate, gotEvent]);
            gotObj.id = generateId();
            addSingHandler(gotObj);
        };


        /* OK2 */
        addListBtn.onclick = () => { // pluralTab
            const data = document.querySelector("textarea").value;
            let addedEventList = getText(data, selectedStatus);
            addPlurHandler(addedEventList);
        };
    }
    hide(){
        this.container.classList.remove("visible");
    }
    show(){
        this.container.classList.add("visible");
    }
}