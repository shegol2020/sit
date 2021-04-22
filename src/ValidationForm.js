/* Обработка ввода — кнопка доступна только при заполнении трёх полей*/

export default class ValidationForm {
    constructor(addItemBtn, checklist) {
        this.addItemBtn = addItemBtn;
        this.checkList = checklist;
        this.checkListLength = Object.keys(this.checkList).length; // длина checkList для checkDisabledBtn
    }
    checkDisabledBtn() { //разблокирует кнопку при трёх true
        let count = 0;
        for (let key in this.checkList) {
            if (this.checkList[key]) {
                count++;
            }
        }
        if (count === this.checkListLength) {
            this.addItemBtn.disabled = false;
        } else {
            this.addItemBtn.disabled = true;
        }
    }
    checkListFieldOn(key) {
        this.checkList[key] = true;
        this.checkDisabledBtn();
    }
    checkListFieldOff(key) {
        this.checkList[key] = false;
        this.checkDisabledBtn();
    }
}