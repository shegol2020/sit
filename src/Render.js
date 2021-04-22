export default class Render {
    constructor(eventListContainer) {
        this.eventListContainer = eventListContainer;
    }

    renderItem(item) {
        this.eventListContainer.insertAdjacentHTML('afterbegin', `<div class="event-item ${item.status}" data-id="${item.id}"><span>${item.date} | </span><span>${item.event}  | </span><span>${item.status}</span><a href="#" class="editItem">edit</a><a href="#" class="removeItem">remove</a></div>`);
    }

    renderEventList(eventList) {
        eventList.forEach(li => { //event render
            //li — {date: "", event: "",status: "" (класс для подкраски)}
            this.renderItem(li);
        });
    }

}