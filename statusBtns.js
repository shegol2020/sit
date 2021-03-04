import makeBtnActive from "./makeBtnActive.js";

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
    render() {
        this.statusList.forEach(btn => { // button render
            // btn — { label: 'no music', class_style: 'nomusic' }
            this.statusContainer.insertAdjacentHTML('afterbegin', `<button class="status-item" data-style="${btn.class_style}">${btn.label}</button>`);//в функцию
        });
    }
}