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

function toggleAnimation() {
 
  wrapper.classList.toggle('dark');
  wrapper.classList.toggle('light');
}

/*==================== Toggle Event ====================*/
function events() {
  toggle_btn.addEventListener('click', toggleAnimation);
  hamburger_menu.addEventListener('click', () => {
    wrapper.classList.toggle('active');
  });


  links.forEach((link) => {
    link.addEventListener('click', () => {
      wrapper.classList.remove('active');
    });
  });
}


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
    event.preventDefault(); 

  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

  
    emailjs
      .send('service_nbs8wg4', 'template_8esh196', {
        from_name: name,
        from_email: email,
        message: message,
      })
      .then(
        function (response) {
          console.log('Success:', response); 
          Swal.fire({
            icon: 'success',
            title: 'Message sent!',
            text: 'Your message was sent successfully.',
            confirmButtonText: 'OK',
          });
          document.getElementById('contact-form').reset();
        },
        function (error) {
          console.error('Failed to send message:', error); 
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to send message. Please try again.',
          });
        },
      );
  });

events();
addSweetAlertListeners(); 
