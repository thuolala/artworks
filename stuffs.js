function rickRoll() {
  const rickRollUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  window.open(rickRollUrl, "_blank");

  openLOLModal();
}

function playAudio(audioID) {
  let audio = document.getElementById(audioID);
  audio.play();
}

$(document).ready(function () {
  $(".fence").on("mouseenter", ".square", function () {
    let audio = $("#audio1")[0];
    audio.currentTime = 0; // Restart sound if already playing
    audio.play();
  });

  $(".card").click(function () {
    playAudio("audio2");
  });
});

// LOL Modal
function openLOLModal() {
  $("#lolModal").modal("show"); // Show modal

  // Close modal events
  $("#closeBtn, .close").click(function () {
      $("#lolModal").modal("hide");
  });

  $(document).on("click", function (event) {
      if ($(event.target).hasClass("modal")) {
          $("#lolModal").modal("hide");
      }
  });
}