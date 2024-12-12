document.addEventListener('DOMContentLoaded', function() {

    const email={
        email: '',
        asunto: '',
        mensaje: ''
    }

    //Seleccionar los elementos del formulario

    const inputEmail= document.querySelector('#email');
    const inputAsunto= document.querySelector('#asunto');
    const inputMensaje= document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');


    //asignar eventos

    inputEmail.addEventListener('input', validar);

    inputAsunto.addEventListener('input', validar);

    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);
    
    btnReset.addEventListener('click', resetFormulario);
        

    
    

    function validar(e){
        if(e.target.value.trim()===""){
            mostarAlerta(`El campo ${e.target.name} es obligatorio`, e.target.parentElement);
            email[e.target.name]='';
            comprobarEmail();
            return;
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)){;
        mostarAlerta(`El campo ${e.target.name} no es válido`, e.target.parentElement);
        email[e.target.name]='';
        comprobarEmail();
        return;
        }

        limpiarAlerta(e.target.parentElement);

        //asignar los valores al objeto

        email[e.target.name]=e.target.value.trim().toLowerCase();

        //comprobar el objeto de email

        comprobarEmail();


    }


    function mostarAlerta(mensaje, referencia){
        //Comprobar si ya existe una alerta
       limpiarAlerta(referencia);

        //Generar un mensaje de error
        const error=document.createElement('p');
        error.textContent=mensaje;
        error.classList.add('bg-red-600' , 'text-white', 'p-3', 'my-5', 'text-center', 'error');


        //inyectar el mensaje en el html
        referencia.appendChild(error);

    }


    function limpiarAlerta(referencia){
     //Comprobar si ya existe una alerta
        const alerta=referencia.querySelector('.bg-red-600')
        if(alerta){
            alerta.remove();
        
        }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail(){
        if(Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return
        } else{
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
        }
        
    }

    function enviarEmail(e){
        e.preventDefault();
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.add('hidden');
            spinner.classList.remove('flex');
            resetFormulario();

            const alertaExito=document.createElement('p');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'mt-5', 'uppercase', 'font-bold');
            alertaExito.textContent='El email se ha enviado correctamente';
            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();

            }, 3000);
        });
    }

    function resetFormulario(){
        formulario.reset();
        email.email='';
        email.asunto='';
        email.mensaje='';
        formulario.reset();
        comprobarEmail();
    }



});







    