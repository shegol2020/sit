import dayjs from "dayjs";
import Render from "./src/Render.js";
import AddForm from "./src/AddForm.js";
import EditForm from "./src/EditForm.js";
import showContainer from "./utilities/showContainer.js";

localforage.config({
    driver: localforage.IndexedDB,
    name: 'myApp'
});

const addBtn = document.querySelector(".add-btn");
const addContainer = document.querySelector(".add-container");
const forageClearBtn = document.querySelector(".forage-clear");


const eventListContainer = document.querySelector(".event-list");
let eventList = [];
const editContainer = document.querySelector(".edit-container"); //скрывать до нажатия на edit
let selectedItem = {};
const editForm = new EditForm(editContainer);
const cancelBtn = document.querySelector("#cancel");
const saveBtn = document.querySelector("#save");
const addCancelBtn = document.querySelector(".add-cancel");


/* Add */
addBtn.onclick = () => {
    addForm.show();
};

addCancelBtn.onclick = () => {
    addForm.hide();

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

let render = new Render(eventListContainer);

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
    localforage.clear().then(function () {
        console.log('Database is now empty.');
    }).catch(function (err) {
        console.log(err);
    });
    eventListContainer.innerHTML = "";
};

/* клик на готовый список */
eventListContainer.onclick = (ev) => {
    const parent = ev.target.closest('.event-item');
    console.log(parent);
    const id = parent.dataset.id;
    selectedItem = eventList.find(item => item.id === id);
    //editBtn.disabled = false;
    switch (ev.target.className) {
        case "editItem":
            editForm.setFields(selectedItem);
            //editStatus.statusActive(selectedItem.status, 'nomusic');
            console.log("edit");
            showContainer(editContainer); //.classList.add("visible");
            break;
        case "removeItem":
            let index = eventList.indexOf(selectedItem);
            eventList.splice(index, 1);
            localforage.setItem('eventlist', eventList); //backup?
            parent.remove();
            //console.log(eventList);
            break;
    }
};


/* Edit */

/* Edit Cancel */
cancelBtn.onclick = () => {
    editForm.hide();
};

/* Edit Save */

saveBtn.onclick = () => {
    editForm.save();
    editForm.hide();
};