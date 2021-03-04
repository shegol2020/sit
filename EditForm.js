export default class EditForm {
    constructor(editContainer) {
        this.container = editContainer;
    }
    render(selectedItem){
        this.container.innerHTML = `<input type="text" placeholder="date" id="date-edit" value="${selectedItem.date}">
        <input type="text" placeholder="event" id="event-edit" value="${selectedItem.event}" style="width:100%">
        <div class="status-list"></div>
        <div class="edit-btns">
            <button class="add-item" disabled="true">Save</button>
            <button class="add-item" disabled="true">Cancel</button>
        </div>`;
    }
}