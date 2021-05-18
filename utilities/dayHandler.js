export default function dayHandler(day) {
    if (day.length===1 || day[1]===".") {
        return `0${day[0]}`
    }  else {
        return day[0]+day[1];
    }
}

// определять количество символов