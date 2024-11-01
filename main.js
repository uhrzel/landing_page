var toggle_btn;
var wrapper;
var hamburger_menu;
var links;

function declare() {
  toggle_btn = document.querySelector('.toggle-btn');
  wrapper = document.querySelector('.wrapper');
  hamburger_menu = document.querySelector('.hamburger');
  links = document.querySelectorAll('.links a'); // Select all sidebar links
}

declare();

const main = document.querySelector('main');
let dark = false;

function toggleAnimation() {
  // Clone the wrapper
  dark = !dark;
  let clone = wrapper.cloneNode(true);
  if (dark) {
    clone.classList.remove('light');
    clone.classList.add('dark');
  } else {
    clone.classList.remove('dark');
    clone.classList.add('light');
  }

  clone.classList.add('copy');
  main.appendChild(clone);

  clone.addEventListener('animationend', () => {
    wrapper.remove();
    clone.classList.remove('copy');
    // Reset Variables
    declare();
    events();
  });
}

/*==================== Toggle Event ====================*/
function events() {
  toggle_btn.addEventListener('click', toggleAnimation);
  hamburger_menu.addEventListener('click', () => {
    wrapper.classList.toggle('active');
  });

  // Close sidebar when any link is clicked
  links.forEach((link) => {
    link.addEventListener('click', () => {
      wrapper.classList.remove('active');
    });
  });
}

events();
