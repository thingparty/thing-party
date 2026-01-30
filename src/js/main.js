document.addEventListener("DOMContentLoaded", function () {
  var lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  var lightboxImg = lightbox.querySelector(".lightbox-content");
  var paintings = document.querySelectorAll(".gallery-grid .painting");

  paintings.forEach(function (painting) {
    painting.addEventListener("click", function () {
      var img = painting.querySelector("img");
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
      } else {
        // For placeholder divs, create a colored canvas
        var canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 800;
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = painting.style.backgroundColor || "#888";
        ctx.fillRect(0, 0, 800, 800);
        lightboxImg.src = canvas.toDataURL();
        lightboxImg.alt = painting.textContent.trim();
      }
      lightbox.classList.add("active");
    });
  });

  lightbox.addEventListener("click", function () {
    lightbox.classList.remove("active");
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      lightbox.classList.remove("active");
    }
  });
});
