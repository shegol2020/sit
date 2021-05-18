export default function sortEventlist(field) {
    return (a, b) => a[field] > b[field] ? 1 : -1;
}