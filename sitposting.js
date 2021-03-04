import getText from "./gettext.js"
import Render from "./render.js";
import makeBtnActive from "./makeBtnActive.js";
import ValidationForm from "./validationForm.js";
import StatusBtn from "./statusBtns.js";
import generateId from "./generateId.js";
import clearFields from "./clearFields.js";
import EditForm from "./EditForm.js";

localforage.config({
    driver: localforage.IndexedDB,
    name: 'myApp'
});

//const addBtn = document.querySelector(".add-btn");
//const addContainer = document.querySelector(".add-container");
const tabContainer = document.querySelector(".tab-container");

const gotDate = document.querySelector(".singular-tab #date");
const gotEvent = document.querySelector(".singular-tab #event");
const statusListContainer = document.querySelector(".singular-tab .status-list");
const secondStatusListContainer = document.querySelector(".second-status-list");

let gotObj = {
    date: "",
    event: "",
    status: "",
    id: ""
};

const buttonsContainer = document.querySelector(".buttons");
const forageClearBtn = document.querySelector(".forage-clear");
const addItemBtn = document.querySelector(".add-item"); // OK button
const validationFormSing = new ValidationForm(addItemBtn, { date: false, event: false, status: false });
const addListBtn = document.querySelector(".add-list"); // Ok2
const eventListContainer = document.querySelector(".event-list");
let eventList = [];
const editBtn = document.querySelector(".edit-btn");
const editContainer = document.querySelector(".edit-container");
let selectedItem = {};
const editForm = new EditForm(editContainer);



/* обработка клика по статусу на вкладке Одно */
const singleStatusHandler = (ev) => {
    validationFormSing.checkListFieldOn("status");
    gotObj.status = ev.target.dataset.style;
};

let selectedStatus = "nomusic"; // статус по умолчанию

/* обработка клика по статусу на вкладке несколько */
const pluralStatusHandler = (ev) => {
    selectedStatus = ev.target.dataset.style;
};

const singleStatus = new StatusBtn(statusListContainer, singleStatusHandler);
const pluralStatus = new StatusBtn(secondStatusListContainer, pluralStatusHandler);
pluralStatus.render(); //не поняла, можно ли его куда-то переместить как singleStatus.render
singleStatus.render();

/* Add btn */
// let addContainerOn = false;
//
// addBtn.onclick = () => {
//     if (!addContainerOn) {
//         addContainer.classList.add("show");
//         addContainerOn = true;
//     } else {
//         addContainer.classList.remove("show");
//     }
// };

/* обработка верхних кнопок */
buttonsContainer.onclick = (ev) => {
    const tab = ev.target.dataset.tab;
    const tabActiveDiv = tabContainer.querySelector(".show");
    tabActiveDiv.classList.remove("show");
    const tabDiv = tabContainer.querySelector(`.${tab}`);
    tabDiv.classList.add("show");
    makeBtnActive(buttonsContainer, ev);
};


/* обработка Date */
gotDate.onchange = (ev) => {
    const value = ev.target.value;
    if (value) {
        validationFormSing.checkListFieldOn("date");
        gotObj.date = value;
    } else {
        validationFormSing.checkListFieldOff("date");
    }
};

/* обработка event */
gotEvent.onkeyup = (ev) => {
    const value = ev.target.value;
    if (value) {
        validationFormSing.checkListFieldOn("event");
        gotObj.event = value;
    } else {
        validationFormSing.checkListFieldOff("event");
    }
};


/* обработка клика OK, объект gotObj → в массив, event → в div */
addItemBtn.onclick = () => {
    clearFields([gotDate, gotEvent]);
    gotObj.id = generateId();
    eventList.push(gotObj);
    console.log(eventList);
    localforage.setItem('eventlist', eventList);
    render.renderItem(gotObj);
};


/* OK2 */
addListBtn.onclick = () => {
    const data = document.querySelector("textarea").value;
    let addedEventList = getText(data, selectedStatus);
    eventList.push(...addedEventList);
    localforage.setItem('eventlist', eventList);
    render.renderEventList(addedEventList);
};

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
    const id = parent.dataset.id;
    selectedItem = eventList.find(item => item.id === id);
    editBtn.disabled = false;
};

/* Edit */
editBtn.onclick = () => {
    editForm.render(selectedItem);
    console.log(selectedItem);
};