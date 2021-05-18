import localforage from "localforage";
import Render from "./src/Render.js";
import AddForm from "./src/AddForm.js";
import EditForm from "./src/EditForm.js";
import showContainer from "./utilities/showContainer.js";
import StatusBtn from "./src/StatusBtns";
import generateHTMLContainers from "./utilities/generateHTMLContainers.js";

generateHTMLContainers();

localforage.config({
    driver: localforage.IndexedDB,
    name: 'myApp'
});

const addBtn = document.querySelector(".add-btn");
const addContainer = document.querySelector(".add-container");
const forageClearBtn = document.querySelector(".forage-clear");

const eventListContainer = document.querySelector(".event-list");
const tableContainer = document.querySelector(".container");

let eventList = [];
const editContainer = document.querySelector(".edit-container");
let selectedItem = {};

const handlerEditSave = (editedFields) => {
    let index = eventList.findIndex(item => item.id === editedFields.id);
    eventList[index] = editedFields;
    console.log(eventList);
    localforage.setItem('eventlist', eventList);
};

let render = new Render(eventListContainer);

const editForm = new EditForm(editContainer, handlerEditSave, render.updateItem);


/* Клик по типу */
const typeContainer = document.querySelector(".type-container");
const filterHandler = (ev, status) => {
    let filteredEventList = eventList.filter(el => el.status === status);
    render.renderEventList(filteredEventList);
};

const typeContainerStatus = new StatusBtn(typeContainer, filterHandler); // singleTab


/* add */

addBtn.onclick = () => {
    addForm.show();
};


/* OK */

const addSingHandler = (gotObj) => {
    eventList.push(gotObj);
    console.log(eventList);
    localforage.setItem('eventlist', eventList);
    render.renderItem(gotObj);
    //hide
};


/* OK2 */

const addPlurHandler = (addedEventList) => {
    eventList.push(...addedEventList);
    localforage.setItem('eventlist', eventList);
    render.renderEventList(addedEventList);
};

const addForm = new AddForm(addContainer, addSingHandler, addPlurHandler);


/* Рендер результатов */

localforage.getItem('eventlist').then(function (value) {
    if (value!==null) {
        eventList = value;
        render.renderEventList(eventList);
    }
}).catch(function (err) {
    console.log(eventList);
});


/* Forage Clear */

forageClearBtn.onclick = () => {
    if (confirm("Are you sure?")) {
        localforage.clear().then(function () {
            console.log('Database is now empty.');
        }).catch(function (err) {
            console.log(err);
        });
        eventListContainer.innerHTML = "";
    }
};

/* клик на готовый список */
let timerId = null;
let buffer = "";

const columns = {
    'col-date': document.querySelector(".col-date"),
    'col-event': document.querySelector(".col-event"),
    'col-status': document.querySelector(".col-status")
};

tableContainer.onclick = (ev) => {
    const parent = ev.target.closest('.event-item');
    if(parent) {
        const id = parent.dataset.id;
        selectedItem = eventList.find(item => item.id === id);
        //editBtn.disabled = false;
        switch (ev.target.className) {
            case 'editItem':
                editForm.setFields(selectedItem, parent);
                console.log("edit");
                showContainer(editContainer);
                break;
            case 'removeItem':
                const removeItem = () => {
                    let index = eventList.indexOf(selectedItem);
                    eventList.splice(index, 1);
                    localforage.setItem('eventlist', eventList);
                    parent.remove();
                };
                buffer = parent.innerHTML;
                parent.innerHTML = '<div class="cancelRemove">cancel</div>';
                timerId = setTimeout(() => removeItem(), 3000);
                break;
            case 'cancelRemove':
                clearTimeout(timerId);
                parent.innerHTML = buffer;
                break;
        }
    } else {
        const key = ev.target.dataset.col;
        columns[`col-${key}`].classList.toggle("select");
        if (key === "status") {
            showContainer(typeContainer);
            typeContainerStatus.render();
        }
        console.dir(columns[`col-${key}`]);
    }
};

/* Export */
const exportBtn = document.querySelector(".export");
const exportContainer = document.querySelector(".export-container");
const exportTbody = document.querySelector(".export-tbody")
//const exportRender = new Render(exportContainer);

exportBtn.onclick = () => {
    exportContainer.classList.toggle("visible");
    render.renderExportList(eventList, exportTbody);
};

