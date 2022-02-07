
// variables

let contact_submitBtn = document.getElementById('contact_submitBtn');
const message =  document.getElementById('message');
const name =  document.getElementById('name');
const email =  document.getElementById('email');
const formResult = document.getElementById('formResult');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const contactForm = document.getElementById('contactForm');

// events listeners 
eventlisteners();
function eventlisteners() {
  document.addEventListener('DOMContentLoaded', webInit);

  // campos del formulario
  email.addEventListener('blur', FormValidation);
  message.addEventListener('blur', FormValidation);
  sendName.addEventListener('blur', FormValidation);

  contact_submitBtn.addEventListener('submit', sendForm);
}

// funciones 
function webInit() {
  // botonSubmit_contact.disabled = true;
  btnSubmit_contact.classList.add('contact-btn-disabled');
}

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

    showError(`Todos los campos son obligatorios`);
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
      showError('Este correo no es válido');
    }
  }

    if(er.test(email.value) && message.value !== '' && sendName !== '') {
    // botonSubmit_contact.disabled = false;
    btnSubmit_contact.classList.remove('contact-btn-disabled');
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
  
} 

// resetear formulario 
function resetForm() {
  contactForm.reset();

  webInit();
}