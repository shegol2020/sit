export default function clearFields(fieldArray) {
    fieldArray.forEach(field => {
        field.value = "";
    });
}