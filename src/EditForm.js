import StatusBtn from "./StatusBtns.js";

export default class EditForm {
    constructor(editContainer, handlerEditSave, updateItem) {
        const cancelBtn = document.querySelector("#cancel");
        const saveBtn = document.querySelector("#save");
        const editStatusListContainer = editContainer.querySelector(".edit-status-list");
        this.dateField = editContainer.querySelector("#date-edit");
        this.eventField = editContainer.querySelector("#event-edit");
        this.container = editContainer;
        this.object = {
            date: "",
            event: "",
            status: "",
            id: ""
        };
        this.itemContainer = null;
        this.updateItem = updateItem;

        const editStatusHandler = (ev) => {
            this.object.status = ev;
        };
        this.editStatus = new StatusBtn(editStatusListContainer, editStatusHandler);
        this.handlerEditSave = handlerEditSave;

        /* Edit Cancel */
        cancelBtn.onclick = () => {
            this.hide();
        };

        /* Edit Save */
        saveBtn.onclick = () => {
            this.save();
            this.hide();
        };
    }
    setFields(selectedItem, itemContainer){
        this.dateField.value = selectedItem.date;
        this.editStatus.render(selectedItem.status);
        this.object.status = selectedItem.status;
        this.eventField.value = selectedItem.event;
        this.object.id = selectedItem.id;
        this.itemContainer = itemContainer;
    }
    save(){
        const editObj = {
            date: this.dateField.value,
            event: this.eventField.value,
            status: this.object.status,
            id: this.object.id
        };
        this.handlerEditSave(editObj);
        console.log(this.itemContainer);
        this.updateItem(this.itemContainer, editObj);
    }
    hide(){
        this.container.classList.remove("visible");
    }
    show(){
        this.container.classList.add("visible");
    }


}