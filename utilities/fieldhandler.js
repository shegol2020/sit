export default function fieldHandler(value, key) { //меняет значения checkList и заполняет объект gotObj
    if (value) {
        checkList[key] = true;
    } else {
        checkList[key] = false;
    }
    gotObj[key] = value;
    checkDisabledBtn();
}



