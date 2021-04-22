import StatusBtn from "./StatusBtns.js";

export default class EditForm {
    constructor(editContainer) {
        console.log(editContainer);
        const editStatusListContainer = editContainer.querySelector(".edit-status-list");
        this.dateField = editContainer.querySelector("#date-edit");
        this.eventField = editContainer.querySelector("#event-edit");
        this.container = editContainer;
        this.date = ""; //для чего?
        this.event = "";
        this.status = "";
        const editStatusHandler = (ev) => {
            this.status = ev.target.dataset.style;
        };
        this.editStatus = new StatusBtn(editStatusListContainer, editStatusHandler);
    }
    setFields(selectedItem){
        this.dateField.value = selectedItem.date;
        this.editStatus.render(selectedItem.status);
        this.status = selectedItem.status;
        this.eventField.textContent = selectedItem.event;
    }
    save(){
        console.log(this.status, this.dateField.value, this.eventField.textContent);
    }
    hide(){
        this.container.classList.remove("visible");
    }
    show(){
        this.container.classList.add("visible");
    }
}