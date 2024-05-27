

document.addEventListener("submit",  async(e) => {
 
  e.preventDefault();

  
  let nombre = document.getElementById('name').value
  let email = document.getElementById('message').value
  let mensaje = document.getElementById('email').value
  let telefono = document.getElementById('phone').value
   

  await handlerSubmit(nombre,email,mensaje,telefono)



 
  
});



async function handlerSubmit(nombre,email,mensaje,telefono) {

 console.log(nombre,email,mensaje)

 
  
  

  const body = {
    "nombre": nombre,
    "email": email,
    "mensaje":mensaje,
    "telefono":telefono
  };
  const res = await fetch("https://backend-yachtcharts.vercel.app/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();

  if (res.ok) {
    alert("Mensaje enviado correctamente");
    console.log(data);
  } else {
    window.alert("Something is wrong!");
  } 
}





