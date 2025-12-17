$(document).ready(function () {
  // Sticky Header
  $(window).scroll(function () {
    if ($(window).scrollTop() >= 330) {
      $(".header").addClass("active");
    } else {
      $(".header").removeClass("active");
    }
  });

  $(".typewrite").each(function () {
    let $el = $(this);
    let words = JSON.parse($el.attr("data-type"));
    let period = parseInt($el.attr("data-period")) || 2000;

    let txt = "";
    let index = 0;
    let isDeleting = false;

    function type() {
      let fullTxt = words[index];

      if (isDeleting) {
        txt = fullTxt.substring(0, txt.length - 1);
      } else {
        txt = fullTxt.substring(0, txt.length + 1);
      }

      $el.html('<span class="wrap">' + txt + "</span>");

      let speed = isDeleting ? 80 : 150;

      if (!isDeleting && txt === fullTxt) {
        speed = period;
        isDeleting = true;
      }

      if (isDeleting && txt === "") {
        isDeleting = false;
        index = (index + 1) % words.length;
        speed = 400;
      }

      setTimeout(type, speed);
    }

    type();
  });

  $("<style>")
    .html(".typewrite > .wrap{ border-right:2px solid #6f809b }")
    .appendTo("body");
});

const menuItems = [
  { name: "Dashboard", icon: "bi bi-columns-gap", route: "main" },
  { name: "Orders", icon: "bi bi-box-seam", route: "orders" },
  { name: "Wishlist", icon: "bi bi-heart", route: "wishlist" },
  { name: "Addresses", icon: "bi bi-geo-alt", route: "addresses" },
  { name: "Personal Info", icon: "bi bi-person-fill", route: "personal-info" },
];

let activeItem = "Dashboard";

const menu = document.getElementById("sidebarMenu");

function renderMenu() {
  menu.innerHTML = "";

  menuItems.forEach((item) => {
    const link = document.createElement("a");
    link.innerHTML = `<i class="${item.icon}"></i> ${item.name}`;
    link.className = item.name === activeItem ? "active" : "";

    link.addEventListener("click", () => {
      activeItem = item.name;
      renderMenu();
    });
    menu.appendChild(link);
  });
}
renderMenu();

// Select elements
const tabs = document.querySelectorAll(".tab_btn");
const allContent = document.querySelectorAll(".content");
const line = document.querySelector(".line");

// Tab button click event
tabs.forEach((tab, index) => {
  tab.addEventListener("click", (e) => {
    // Remove active class from all tabs
    tabs.forEach((btn) => btn.classList.remove("active"));

    // Add active class to clicked tab
    tab.classList.add("active");

    // Move line under active tab
    line.style.width = e.target.offsetWidth + "px";
    line.style.left = e.target.offsetLeft + "px";

    // Hide all contents
    allContent.forEach((content) => {
      content.style.display = "none";
    });

    // Show selected content by index
    allContent[index].style.display = "block";
  });
});

// Set default line position on load
window.addEventListener("load", () => {
  const activeTab = document.querySelector(".tab_btn.active");
  line.style.width = activeTab.offsetWidth + "px";
  line.style.left = activeTab.offsetLeft + "px";
});


