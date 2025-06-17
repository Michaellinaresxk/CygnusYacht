// Seleccionar los elementos del DOM
const contactForm = document.getElementById('contactForm');
const name1 = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const contact_submitBtn = document.getElementById('contact_submitBtn');
const formResult = document.getElementById('formResult');
const spinner = document.getElementById('spinner');

// Expresión regular para validar email
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Evento cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
  iniciarApp();
  eventListeners();
});

function iniciarApp() {
  // Deshabilitar el botón de envío inicialmente
  contact_submitBtn.disabled = true;
  contact_submitBtn.classList.add('opacity-50');
  spinner.style.display = 'none';
}

function eventListeners() {
  // Eventos para validación en tiempo real
  name1.addEventListener('input', validarFormulario);
  email.addEventListener('input', validarFormulario);
  message.addEventListener('input', validarFormulario);

  // Evento de envío del formulario
  contactForm.addEventListener('submit', enviarEmail);
}

function validarFormulario(e) {
  const campo = e.target;
  const valor = campo.value.trim();

  // Remover clases previas
  campo.classList.remove('input-error', 'input-valido');

  // Validar campo vacío
  if (valor === '') {
    mostrarError(`${campo.id} field is required`, campo.parentElement);
    campo.classList.add('input-error');
    validarFormularioCompleto();
    return;
  }

  // Validación específica para email
  if (campo.type === 'email' && !er.test(valor)) {
    mostrarError('Invalid email address', campo.parentElement);
    campo.classList.add('input-error');
    validarFormularioCompleto();
    return;
  }

  // Campo válido
  limpiarError(campo.parentElement);
  campo.classList.add('input-valido');
  validarFormularioCompleto();
}

function validarFormularioCompleto() {
  const todosLosCamposValidos =
    name1.value.trim() !== '' &&
    er.test(email.value.trim()) &&
    message.value.trim() !== '';

  contact_submitBtn.disabled = !todosLosCamposValidos;
  contact_submitBtn.classList.toggle('opacity-50', !todosLosCamposValidos);
}

async function enviarEmail(e) {
  e.preventDefault();

  try {
    // Mostrar spinner y deshabilitar botón
    spinner.style.display = 'block';
    contact_submitBtn.disabled = true;

    const formData = new FormData(contactForm);

    const response = await fetch('email.php', {
      method: 'POST',
      body: formData
    });

    const resultado = await response.text();

    // Procesar respuesta
    if (resultado.includes('success')) {
      mostrarMensaje('Message sent successfully!', 'success');
      contactForm.reset();
      resetearEstilosFormulario();
    } else {
      throw new Error(resultado);
    }

  } catch (error) {
    console.error('Error:', error);
    mostrarMensaje('Error sending message. Please try again.', 'error');
  } finally {
    spinner.style.display = 'none';
    contact_submitBtn.disabled = false;
  }
}

function mostrarError(mensaje, elemento) {
  // Limpiar error previo
  limpiarError(elemento);

  // Crear y mostrar nuevo mensaje de error
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = mensaje;
  errorDiv.style.color = '#dc3545';
  errorDiv.style.fontSize = '0.875rem';
  errorDiv.style.marginTop = '0.25rem';

  elemento.appendChild(errorDiv);
}

function limpiarError(elemento) {
  const error = elemento.querySelector('.error-message');
  if (error) {
    error.remove();
  }
}

function mostrarMensaje(mensaje, tipo) {
  // Limpiar mensajes previos
  formResult.innerHTML = '';

  // Crear nuevo mensaje
  const messageDiv = document.createElement('div');
  messageDiv.className = `alert alert-${tipo}`;
  messageDiv.textContent = mensaje;

  // Estilos según el tipo de mensaje
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

  // Remover mensaje después de 5 segundos
  setTimeout(() => {
    messageDiv.remove();
  }, 5000);
}

function resetearEstilosFormulario() {
  // Remover todas las clases de validación
  name1.classList.remove('input-error', 'input-valido');
  email.classList.remove('input-error', 'input-valido');
  message.classList.remove('input-error', 'input-valido');

  // Limpiar mensajes de error
  document.querySelectorAll('.error-message').forEach(error => error.remove());

  // Reiniciar estado del botón
  contact_submitBtn.disabled = true;
  contact_submitBtn.classList.add('opacity-50');
}

// Estilos CSS
const styles = `
    .input-error {
        border-color: #dc3545 !important;
        background-color: #fff !important;
    }
    .input-valido {
        border-color: #28a745 !important;
        background-color: #fff !important;
    }
    .alert {
        transition: all 0.3s ease;
    }
    .spinner {
        display: none;
        width: 2rem;
        height: 2rem;
        margin: 1rem auto;
    }
`;

// Agregar estilos al documento
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Exportar funciones necesarias
export {
  message,
  name1,
  email,
  contactForm,
  formResult,
  contact_submitBtn,
  er,
  eventListeners,
  validarFormulario as FormValidation,
  mostrarError as showError,
  enviarEmail as sendForm,
  iniciarApp as resetForm
};