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
  // Toggle the dark mode
  dark = !dark;

  // Clone the wrapper to animate the theme change
  let clone = wrapper.cloneNode(true);
  clone.classList.toggle('dark', dark);
  clone.classList.toggle('light', !dark);
  clone.classList.add('copy');

  main.appendChild(clone);

  clone.addEventListener('animationend', () => {
    wrapper.remove();
    clone.classList.remove('copy');
    declare();
    events();
    addSweetAlertListeners(); // Re-apply SweetAlert event listeners after theme change
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

// Function to handle opening SweetAlert
function openSweetAlert(title, content, image) {
  Swal.fire({
    title: title,
    html: `
      <img src="${image}" alt="${title}" class="w-full h-80 object-cover rounded mb-4">
      <p>${content}</p>
    `,
    icon: 'info',
    confirmButtonText: 'Close',
    customClass: {
      title: 'text-xl font-semibold',
      content: 'text-base',
    },
  });
}

// Add event listeners to all "Read More" links
function addSweetAlertListeners() {
  document.querySelectorAll('.read-more').forEach((link) => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const title = this.getAttribute('data-title');
      const content = this.getAttribute('data-content');
      const image = this.getAttribute('data-image');
      openSweetAlert(title, content, image);
    });
  });
}

emailjs.init('kQRMRWdS6C2RhpquX');

document
  .getElementById('contact-form')
  .addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Send email using EmailJS
    emailjs
      .send('service_nbs8wg4', 'template_8esh196', {
        from_name: name,
        from_email: email,
        message: message,
      })
      .then(
        function (response) {
          // Show SweetAlert success message
          Swal.fire({
            icon: 'success',
            title: 'Message sent!',
            text: 'Your message was sent successfully.',
            confirmButtonText: 'OK',
          });

          // Reset the form
          document.getElementById('contact-form').reset();
        },
        function (error) {
          // Show SweetAlert error message
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to send message. Please try again.',
          });

          console.error('EmailJS error:', error);
        },
      );
  });

events();
addSweetAlertListeners(); // Initial call to apply SweetAlert listeners
