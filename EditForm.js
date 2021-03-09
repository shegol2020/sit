import StatusBtn from "./statusBtns.js";

export default class EditForm {
    constructor(editContainer) {
        this.container = editContainer;
    }
    render(selectedItem){
        this.container.innerHTML = `
        <div><input type="text" placeholder="date" id="date-edit" value="${selectedItem.date}"></div>
        <div><textarea type="text" placeholder="event" id="event-edit">${selectedItem.event}</textarea></div>
       `;
    }
}