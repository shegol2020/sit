import generateId from "./utilities/generateId.js";

const result = [];


export default function getText(data, selectedStatus) { //data в аргумент

    const dataStrings = data.split("\n");
    //console.log(dataStrings.length);

    dataStrings.forEach(str => {
        if (str !== "") {
            const stringArray = str.split("|");
            const date = String(stringArray[1]).trim();
            const event = String(stringArray[2]).trim();
            const status = selectedStatus;
            const id = generateId();
            if (!date.includes("-") && date !== "") {
                result.push({
                    date,
                    event,
                    status,
                    id
                });
            }
        }
    });
    return result;
}
