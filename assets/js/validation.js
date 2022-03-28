
// variables

const contactForm = document.getElementById('contactForm');
const name1 =  document.getElementById('name');
const email =  document.getElementById('email');
const message =  document.getElementById('message');
let contact_submitBtn = document.getElementById('contact_submitBtn');
const formResult = document.getElementById('formResult');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// events listeners 
eventlisteners();
function eventlisteners() {

  // campos del formulario
  email.addEventListener('blur', FormValidation);
  message.addEventListener('blur', FormValidation);
  name1.addEventListener('blur', FormValidation);

  contactForm.addEventListener('submit', sendForm);
}

// // funciones 
// function webInit() {
//   // contact_submitBtn.disabled = true;
//   contact_submitBtn.classList.add('contact-btn-disabled');
// }

// valida el formulario 
function FormValidation(e) {
  e.preventDefault();

  if(e.target.value.length > 0) {

    // Elimar errores 
    const error = document.querySelector('p.error');
   
    if(error) {
      error.remove();
    }
    e.target.classList.remove('input-error');
    e.target.classList.add('input-valido');
  } else {
    e.target.classList.remove('input-valido');
    e.target.classList.add('input-error');

    showError(`Every field is required`);
  }

  if(e.target.type === 'email') {
    if(er.test(e.target.value)) {
      const error = document.querySelector('p.error');
      
      if(error) {
        error.remove();
      }
  
      e.target.classList.remove('input-error');
      e.target.classList.add('input-valido');
      
    } else {
      e.target.classList.remove('input-valido');
      e.target.classList.add('input-error');
      showError('This email is not valid');
    }
  }

    if(email.value && message.value && name1 !== '') {
    // botonSubmit_contact.disabled = false;
    contact_submitBtn.classList.remove('button--contact_submitBtn');
  }
}

function showError(message) {
  const errorMessage = document.createElement('p');
  errorMessage.textContent = message;
  errorMessage.classList.add('mensajes-de-error', 'error');
  const errors = document.querySelectorAll('.error');

  if(errors.length === 0) {
    formResult.appendChild(errorMessage);
  } 
}

// enviar email 

function sendForm(e) {
e.preventDefault();

// mostrar spinner

const spinner = document.getElementById('spinner');
spinner.style.display = 'block';
  
   // despues de 3 seg. ocultar el spiner 
  setTimeout(() => {
    spinner.style.display = 'none';

    // se envio correctamente

    const paragraph = document.createElement('p');
    paragraph.textContent = 'Thank you for your message';
    paragraph.classList.add('enviado-correctamente');

    // contactForm.insertBefore(paragraph, contact_submitBtn);
    contactForm.appendChild(paragraph)

    setTimeout(() => {
      paragraph.remove();
    },5000);

    resetForm();

  }, 3000 );
} 

// resetear formulario 
function resetForm() {
  document.getElementById('contactForm').reset();
  contact_submitBtn.classList.add('button--contact_submitBtn');
}



export { 
  message, 
  name1, 
  email,
  contactForm, 
  formResult, 
  contact_submitBtn,
  er,
  eventlisteners,
  FormValidation,
  showError,
  sendForm,
  resetForm
}