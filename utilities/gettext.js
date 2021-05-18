import generateId from "./generateId.js";
import dayHandler from "./dayHandler.js";

export default function getText(data, selectedStatus, dateArray) { //data в аргумент

    const dataStrings = data.split("\n");
    //console.log(dataStrings.length);

    let year = dateArray[0];
    let month = dateArray[1]; // сделать инпут с датой, получить снаружи
    const result = [];

    dataStrings.forEach(str => {
        if (str !== "" && !str.includes("/n")) {
            const stringArray = str.split("|");
            const day = String(stringArray[1]).trim();
            const newDay = dayHandler(day);
            const date = year + '-' + month + '-'+ newDay;
            const event = String(stringArray[2]).trim();
            const status = selectedStatus;
            const id = generateId();
            if (!event.includes("--") && date !== "") {
                result.push({
                    date,
                    event,
                    status,
                    id,
                });
            }
        }
    });
    //console.log(result);
    return result;
}

