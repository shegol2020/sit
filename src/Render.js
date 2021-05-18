import dayjs from "dayjs";

export default class Render {
    constructor(eventListContainer) {
        this.eventListContainer = eventListContainer;
    }

    renderItem(item) {
        this.eventListContainer.insertAdjacentHTML('beforeend', `<tr class="event-item ${item.status}" data-id="${item.id}">${this.getColumns(item)}</tr>`);
    }

    renderEventList(eventList) {
        this.eventListContainer.innerHTML = "";
        if (eventList.length !== 0) {
            eventList.forEach(li => { //event render
                //li — {date: "", event: "",status: "" (класс для подкраски)}
                this.renderItem(li);
            });
        } else {
            this.eventListContainer.insertAdjacentHTML('beforeend', `<tr class="table-msg">Нет данных</tr>`);
        }
    }
    renderExportItem(item, exportTbody) {
        const reversedDate = dayjs(item.date).format('DD.MM.YYYY');
        exportTbody.insertAdjacentHTML('beforeend', `<tr><td>${reversedDate}</td><td>${item.event}</td></tr>`);
    }
    renderExportList(eventList, exportTbody) {
        exportTbody.innerHTML = "";
        eventList.forEach(li => { //event render
            //li — {date: "", event: "",status: "" (класс для подкраски)}
            this.renderExportItem(li, exportTbody);
        });
    }
    updateItem(itemContainer, item) {
        itemContainer.className = `event-item ${item.status}`;
        itemContainer.dataset.id = item.id;
        itemContainer.innerHTML = this.getColumns(item);
    }
    getColumns(item){
        return `<td>${item.date}</td><td>${item.event}</td><td>${item.status}</td><td><a href="#" class="editItem">edit</a><a href="#" class="removeItem">remove</a></td>`;
    }
}