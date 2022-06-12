// Show Sidebar

const burger = document.getElementById("sidebarToggle");
const body = document.getElementById("body");

burger.addEventListener("click", (event) => {
  if (body.classList.contains("show-sidebar")) {
    closeSidebar();
  } else {
    showSidebar();
  }
});

// Making Mask

function showSidebar() {
  let mask = document.createElement("div");
  mask.classList.add("page__mask");
  mask.addEventListener("click", closeSidebar);
  body.appendChild(mask);

  body.classList.add("show-sidebar");
  body.classList.add("no-scroll");
}

function closeSidebar() {
  body.classList.remove("show-sidebar");
  body.classList.remove("no-scroll");
  document.querySelector(".page__mask").remove();
}

// Smooth Scroll

document.querySelectorAll('a[href*="#"]').forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    const href = this.getAttribute("href").substring(1);

    const scrollTarget = document.getElementById(href);

    const topOffset = 0;
    const elementPosition = scrollTarget.getBoundingClientRect().top;
    const offsetPosition = elementPosition - topOffset - 50;

    window.scrollBy({
      top: offsetPosition,
      behavior: "smooth",
    });
    closeSidebar();
  });
});

//rightbar lighting - rightbar item

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".rightBar__item").forEach((link) => {
          link.classList.toggle(
            "rightBar__item--active",

            link.getAttribute("href").replace("#", "") === entry.target.id
          );
        });
        document
          .querySelectorAll(".nav__link, .header__logo")
          .forEach((link) => {
            link.classList.toggle(
              "nav__link--active",

              link.getAttribute("href").replace("#", "") === entry.target.id
            );
          });
      }
    });
  },
  {
    threshold: 0.7,
  }
);

document
  .querySelectorAll(".newsfeed__item, .intro")
  .forEach((div) => observer.observe(div));
