const inputFile = document.getElementById("inputFile");
const addbtn = document.getElementById("addPhoto");
const memeImage = document.querySelector("meme__image");
const memes = document.querySelector(".memes");
const downloadBtn = document.getElementById("downloads");
const save = document.getElementById("refresh");
const memeWrapper = document.querySelector(".meme__wrapper");
const cropControllerWrapper = document.querySelector(
  ".crop-controller-wrapper"
);
const headerMenu = document.querySelector(".header__menu");
const sideMenu = document.getElementById("sideMenu");
const MenuIcon = document.querySelector(".menuBar__icon");
const closeIcon = document.querySelector(".close-btn");
const warning = document.querySelector(".warning");
const share = document.getElementById("share");
const socialShare = document.getElementById("socialShare");
const bgBlack = document.querySelector(".bg__black");
const textArea = document.getElementById("lower");
const memeSide = document.querySelectorAll(".memeFrame__side h5");
const memeHeader = document.querySelectorAll(".memeFrame__header");
const memeSidebg = document.querySelectorAll(".memeFrame__side");
const lower = document.getElementById("lower");
const black1 = document.getElementById("black1");
const black2 = document.getElementById("black2");
const blink = document.querySelector(".blinking-cursor");

var showBlink = true;

function sticky() {
  headerMenu.classList.toggle("sticky-header", scrollY > 42);
}

// sidemenu
MenuIcon.onclick = () => {
  sideMenu.classList.toggle("openMenu");
};

closeIcon.onclick = () => {
  sideMenu.classList.toggle("openMenu");
};

share.onclick = () => {
  socialShare.classList.toggle("show-share");
};

window.addEventListener("scroll", sticky);

downloadBtn.disabled = true;

addbtn.onclick = () => {
  inputFile.click();
};

inputFile.onchange = (e) => {
  var target = e.target;
  var files = target.files;
  const extName = files[0].name.split(".").pop().toLowerCase();
  if (extName === "jpg" || extName === "png" || extName === "jpeg") {
    if (FileReader && files && files.length) {
      var fr = new FileReader();
      fr.onload = () => {
        memes.innerHTML = `<img src=${fr.result} id="meme__image" alt="">`;

        // const img = new Image();
        // img.onload = function () {
        //   var width = this.width;
        //   var height = this.height;
        //   const imgElm = document.querySelector(".meme__image");
        //   if (width < height) {
        //     imgElm.classList.add("potrait");
        //   } else {
        //     imgElm.classList.remove("potrait");
        //   }
        //   console.log(imgElm);
        // };
        // img.src = fr.result;

        const img = new Image();

        img.onload = function () {
          cropControllerWrapper.classList.remove("hidden");
          croppingImage();
        };
        img.src = fr.result;
      };
      fr.readAsDataURL(files[0]);
      downloadBtn.disabled = false;
    }
  } else {
    alert("Only image is allowed !!");
  }
};

const scrollToWrapper = () => {
  $("html, body").animate(
    {
      scrollTop: $(".slogan").offset().top,
    },
    1
  );
};

downloadBtn.onclick = (e) => {
  e.preventDefault();
  // document.querySelector(".meme__image").classList.add("landscape");
  // memeHeader.forEach((header) => {
  //   header.classList.add("light-gray-bg");
  // });

  // memeSidebg.forEach((elem) => {
  //   elem.classList.add("light-gray-bg");
  // });
  // black1.classList.add("hide-black");
  // black2.classList.add("show-black");

  var scaleBy = 2;
  var w = 2000;
  var h = 2000;
  var div = document.querySelector(".meme__wrapper");
  var tempCanvas = document.createElement("canvas");
  tempCanvas.width = w * scaleBy;
  tempCanvas.height = h * scaleBy;
  tempCanvas.style.width = w + "px";
  tempCanvas.style.height = h + "px";
  var context = tempCanvas.getContext("2d");
  context.scale(scaleBy, scaleBy);
  context.imageSmoothingEnabled = false;

  scrollToWrapper();
  html2canvas(div, {
    allowTaint: false,
    useCORS: true,
    canvas: tempCanvas,
    onrendered: function (canvas) {
      // var myImage = canvas.toDataURL("image/png");
      // window.saveAs(myImage, "meme.png");
      // canvas.toBlob(function (blob) {
      //   window.saveAs(blob, "myIMG.png");
      // });
      theCanvas = canvas;
      canvas = trimCanvas(canvas);
      // Canvas2Image.saveAsPNG(canvas);
      const url = canvas.toDataURL("image/png");
      let a = document.createElement("a");
      a.setAttribute("download", "meme.png");
      a.setAttribute("target", "__blank");
      a.href = url;
      a.click();
      // window.saveAs(myImage, "meme.png");
      // document.body.appendChild(canvas);
      // canvas.toBlob(function (blob) {
      // window.saveAs(blob, "blackology.png");
      // saveAs(blob, "blackology.png");
      // download(blob, "blackology.png", "image/png");
      // });
      // $(body).append(canvas);
    },
  });

  // setTimeout(() => {
  //   memeSidebg.forEach((elem) => {
  //     elem.classList.remove("light-gray-bg");
  //   });

  //   memeHeader.forEach((header) => {
  //     header.classList.remove("light-gray-bg");
  //   });

  //   black1.classList.remove("hide-black");
  //   black2.classList.remove("show-black");
  // }, 100);
};

// meme slider
$(".slider__wrapper").slick({
  infinite: true,
  autoplay: true,
  autoplaySpeed: 1300,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: $(".prev-btn"),
  nextArrow: $(".next-btn"),
  responsive: [
    {
      breakpoint: 1321,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 1300,
      },
    },
    {
      breakpoint: 1070,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 1300,
      },
    },
    {
      breakpoint: 804,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 1300,
      },
    },
  ],
});

// social share
$("#socialShare").jsSocials({
  showLabel: false,
  showCount: false,

  shares: [
    {
      share: "facebook",
      logo: "/assets/images/facebook.png",
    },
    {
      share: "twitter",
      logo:
        "data:image/png;base64,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",
    },
  ],
});

function croppingImage() {
  var picture = $("#meme__image");

  // Make sure the image is completely loaded before calling the plugin
  picture.one("load", function () {
    // Initialize plugin (with custom event)
    picture.guillotine({ eventOnChange: "guillotinechange" });

    // Display inital data
    var data = picture.guillotine("getData");
    for (var key in data) {
      $("#" + key).html(data[key]);
    }

    // Bind button actions
    $("#rotate-left").click(function (e) {
      e.preventDefault();
      picture.guillotine("rotateLeft");
    });
    $("#rotate-right").click(function (e) {
      e.preventDefault();
      picture.guillotine("rotateRight");
    });
    $("#fit-image").click(function (e) {
      e.preventDefault();
      picture.guillotine("fit");
    });
    $("#zoom-in").click(function (e) {
      e.preventDefault();
      picture.guillotine("zoomIn");
    });
    $("#zoom-out").click(function (e) {
      e.preventDefault();
      picture.guillotine("zoomOut");
    });

    // Update data on change
    picture.on("guillotinechange", function (ev, data, action) {
      data.scale = parseFloat(data.scale.toFixed(4));
      for (var k in data) {
        $("#" + k).html(data[k]);
      }
    });
  });

  // Make sure the 'load' event is triggered at least once (for cached images)
  if (picture.prop("complete")) picture.trigger("load");
}

// // interact js
// interact(".meme__image")
//   .resizable({
//     // resize from all edges and corners
//     edges: { left: true, right: true, bottom: true, top: true },

//     listeners: {
//       move(event) {
//         var target = event.target;
//         var x = parseFloat(target.getAttribute("data-x")) || 0;
//         var y = parseFloat(target.getAttribute("data-y")) || 0;

//         // update the element's style
//         target.style.width = event.rect.width + "px";
//         target.style.height = event.rect.height + "px";

//         // translate when resizing from top or left edges
//         x += event.deltaRect.left;
//         y += event.deltaRect.top;

//         target.style.webkitTransform = target.style.transform =
//           "translate(" + x + "px," + y + "px)";

//         target.setAttribute("data-x", x);
//         target.setAttribute("data-y", y);
//         target.textContent =
//           Math.round(event.rect.width) +
//           "\u00D7" +
//           Math.round(event.rect.height);
//       },
//     },
//     modifiers: [
//       // keep the edges inside the parent
//       interact.modifiers.restrictEdges({
//         outer: "parent",
//       }),

//       // minimum size
//       interact.modifiers.restrictSize({
//         min: { width: 100, height: 50 },
//       }),
//     ],

//     inertia: true,
//   })
//   .draggable({
//     listeners: { move: window.dragMoveListener },
//     inertia: true,
//     modifiers: [
//       interact.modifiers.restrictRect({
//         restriction: "parent",
//         endOnly: true,
//       }),
//     ],
//   });

// function dragMoveListener(event) {
//   var target = event.target;
//   // keep the dragged position in the data-x/data-y attributes
//   var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
//   var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

//   // translate the element
//   target.style.webkitTransform = target.style.transform =
//     "translate(" + x + "px, " + y + "px)";

//   // update the posiion attributes
//   target.setAttribute("data-x", x);
//   target.setAttribute("data-y", y);
// }

// MIT http://rem.mit-license.org
function trimCanvas(c) {
  var ctx = c.getContext("2d"),
    copy = document.createElement("canvas").getContext("2d"),
    pixels = ctx.getImageData(0, 0, c.width, c.height),
    l = pixels.data.length,
    i,
    bound = {
      top: null,
      left: null,
      right: null,
      bottom: null,
    },
    x,
    y;

  // Iterate over every pixel to find the highest
  // and where it ends on every axis ()
  for (i = 0; i < l; i += 4) {
    if (pixels.data[i + 3] !== 0) {
      x = (i / 4) % c.width;
      y = ~~(i / 4 / c.width);

      if (bound.top === null) {
        bound.top = y;
      }

      if (bound.left === null) {
        bound.left = x;
      } else if (x < bound.left) {
        bound.left = x;
      }

      if (bound.right === null) {
        bound.right = x;
      } else if (bound.right < x) {
        bound.right = x;
      }

      if (bound.bottom === null) {
        bound.bottom = y;
      } else if (bound.bottom < y) {
        bound.bottom = y;
      }
    }
  }

  // Calculate the height and width of the content
  var trimHeight = bound.bottom - bound.top,
    trimWidth = bound.right - bound.left,
    trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);

  copy.canvas.width = trimWidth;
  copy.canvas.height = trimHeight;
  copy.putImageData(trimmed, 0, 0);

  // Return trimmed canvas
  return copy.canvas;
}
