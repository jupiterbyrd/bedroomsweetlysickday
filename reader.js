import { PageFlip } from "https://cdn.jsdelivr.net/npm/page-flip/+esm";

const pageFlip = new PageFlip(document.getElementById('book'), {
    width: 300, // required parameter - base page width
    height: 400, // required parameter - base page height
    size: "fixed",
    showCover: true,
});

pageFlip.loadFromHTML(document.querySelectorAll('.my-page'));