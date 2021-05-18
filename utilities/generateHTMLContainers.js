import addContainer from "../HTMLContainers/addContainer.html"
import editContainer from "../HTMLContainers/editContainer.html"
import exportContainer from "../HTMLContainers/exportContainer.html"
import tableContainer from "../HTMLContainers/tableContainer.html"
import typeContainer from "../HTMLContainers/typeContainer.html"



export default function generateHTMLContainers() {
    document.body.insertAdjacentHTML('beforeend', addContainer);
    document.body.insertAdjacentHTML('beforeend', editContainer);
    document.body.insertAdjacentHTML('beforeend', exportContainer);
    document.body.insertAdjacentHTML('beforeend', tableContainer);
    document.body.insertAdjacentHTML('beforeend', typeContainer);


}