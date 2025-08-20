const lyricSpans = document.querySelectorAll(
  "#layout #lyrics #lyric-container span"
);
const audio = document.getElementById("demoAudio");

function highlightLyric() {
  const currentTime = audio.currentTime;

  let activeSpan = null;
  for (let i = 0; i < lyricSpans.length; i++) {
    const startTime = parseFloat(lyricSpans[i].dataset.time);

    const nextTime =
      i < lyricSpans.length - 1
        ? parseFloat(lyricSpans[i + 1].dataset.time)
        : audio.duration;

    if (currentTime >= startTime && currentTime < nextTime) {
      activeSpan = lyricSpans[i];
      break;
    }
  }

  lyricSpans.forEach((span) => span.classList.remove("active"));
  if (activeSpan) {
    activeSpan.classList.add("active");
    if (document.getElementById("extendoride").classList.contains("active")) {
      extendRiiide();
    }
    // scroll into view:
    //activeSpan.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function extendRiiide() {
  const ride = document.getElementById("extendoride");
  let is = "i";
  for (let i = 1; i < 5; i++) {
    is += "i";
    ride.innerHTML = "but I'm getting dizzy off this r" + is + "de";
    ride.style.display = "none";
    ride.style.display = "inline";
    await sleep(250);
  }
  ride = document.getElementById("extendoride");
  ride.innerHTML = "ride";
}
// Bind to audio timeupdate
audio.addEventListener("timeupdate", highlightLyric);

// Clicking a lyric jumps to that timestamp
lyricSpans.forEach((span) => {
  span.addEventListener("click", () => {
    audio.currentTime = parseFloat(span.dataset.time);
    audio.play();
  });
});

document.querySelectorAll("#demo .song-ref").forEach((ref) => {
  ref.addEventListener("click", () => {
    const time = parseFloat(ref.dataset.time);

    // Open the lyric section
    openMagazine("lyrics");

    // Wait for lyrics content to load before seeking
    setTimeout(() => {
      audio.addEventListener(
        "loadedmetadata",
        () => {
          audio.currentTime = time;
          audio.play();
        },
        { once: true }
      );
    }, 10); // adjust delay to match your open() animation/content load time
  });
});
