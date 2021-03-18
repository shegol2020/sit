import makeBtnActive from "./utilities/makeBtnActive.js";

export default class StatusBtn{
    constructor(statusContainer, statusHandler) {
        this.statusContainer = statusContainer;
        this.statusList = [ // список статусов
            {
                label: 'no music',
                class_style: 'nomusic'
            },
            {
                label: 'music',
                class_style: 'music'
            }
        ];
        this.statusContainer.onclick = (ev) => {
          statusHandler(ev);
          makeBtnActive(statusContainer, ev);
        };
    }
        render(currentStatus) {
        this.statusContainer.innerHTML = "";
        this.statusList.forEach(btn => { // button render
            // btn — { label: 'no music', class_style: 'nomusic' }
            this.statusContainer.insertAdjacentHTML('afterbegin', `<button class="status-item ${this.statusActive(currentStatus, btn.class_style)}" data-style="${btn.class_style}">${btn.label}</button>`);//в функцию
        });
    }
    statusActive(currentStatus, classStyle) {
        if (currentStatus === classStyle) {
            return "active";
        }
        //console.log(currentStatus, classStyle);
    }
}