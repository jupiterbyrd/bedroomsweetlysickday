import "https://cdn.jsdelivr.net/npm/@google/model-viewer/+esm";

document.addEventListener("DOMContentLoaded", () => {
  const masonry = document.querySelector(".masonry");

  // Recalculate layout after images and iframes load
  const relayout = () => {
    masonry.style.columnGap = masonry.style.columnGap; // triggers repaint
  };

  // For images
  masonry.querySelectorAll("img").forEach((img) => {
    img.addEventListener("load", relayout);
  });

  // For iframes (like Pinterest boards)
  masonry.querySelectorAll("iframe").forEach((frame) => {
    frame.addEventListener("load", relayout);
  });
});
