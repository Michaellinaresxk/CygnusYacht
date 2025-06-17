// Elementos del DOM
const contactForm = document.getElementById('contactForm');
const spinner = document.getElementById('spinner');
const formResult = document.getElementById('formResult');
const submitBtn = document.getElementById('contact_submitBtn');

// Inicializar EmailJS
// Reemplaza 'TU_PUBLIC_KEY' con tu clave pública de EmailJS
(function () {
  emailjs.init("TU_PUBLIC_KEY");
})();

// Validación de email
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};

// Validación del formulario
const validateForm = (formData) => {
  const errors = [];

  if (!formData.name.trim()) {
    errors.push('Name is required');
  }

  if (!formData.email.trim()) {
    errors.push('Email is required');
  } else if (!validateEmail(formData.email)) {
    errors.push('Invalid email format');
  }

  if (!formData.message.trim()) {
    errors.push('Message is required');
  }

  return errors;
};

// Manejador del formulario
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Recoger datos del formulario
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };

  // Validar formulario
  const errors = validateForm(formData);
  if (errors.length > 0) {
    mostrarMensaje(errors.join(', '), 'error');
    return;
  }

  try {
    // Mostrar spinner y deshabilitar botón
    spinner.style.display = 'block';
    submitBtn.disabled = true;

    // Enviar email usando EmailJS
    // Reemplaza 'TU_SERVICE_ID' y 'TU_TEMPLATE_ID' con tus IDs de EmailJS
    const result = await emailjs.send(
      "TU_SERVICE_ID",
      "TU_TEMPLATE_ID",
      formData
    );

    if (result.status === 200) {
      mostrarMensaje('Message sent successfully!', 'success');
      contactForm.reset();
    }

  } catch (error) {
    console.error('Error:', error);
    mostrarMensaje('Error sending message. Please try again.', 'error');
  } finally {
    spinner.style.display = 'none';
    submitBtn.disabled = false;
  }
});

// Función para mostrar mensajes
function mostrarMensaje(mensaje, tipo) {
  formResult.innerHTML = '';
  const messageDiv = document.createElement('div');
  messageDiv.className = `alert alert-${tipo}`;
  messageDiv.textContent = mensaje;

  if (tipo === 'success') {
    messageDiv.style.cssText = `
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 0.25rem;
            text-align: center;
        `;
  } else {
    messageDiv.style.cssText = `
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 0.25rem;
            text-align: center;
        `;
  }

  formResult.appendChild(messageDiv);

  setTimeout(() => {
    messageDiv.remove();
  }, 5000);
}