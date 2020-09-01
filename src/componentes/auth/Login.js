import React, { Fragment, useState, useContext } from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { withRouter } from "react-router-dom";
//Context
import { CRMContext } from "../../context/CRMContext";

const Login = (props) => {
  //Auth y token
  // eslint-disable-next-line
  const [auth, guardarAuth] = useContext(CRMContext);

  //State con los datos del formulario
  const [credenciales, guardarCredenciales] = useState({});
  //iniciar sesion en el servidor
  const iniciarSesion = async (e) => {
    e.preventDefault();
    //autenticar el usuario.
    try {
      const respuesta = await clienteAxios.post(
        "/iniciar-sesion",
        credenciales
      );
      //extraer el token y almacenarlo en localstorage
      const { token } = respuesta.data;
      localStorage.setItem("token", token);
      //Colocar el token en el state
      guardarAuth({
        token,
        auth: true,
      });

      //alerta
      Swal.fire("Login Correcto", "Has Iniciado Sesión", "success");
      //redireccionar
      props.history.push("/"); //los enviamos a clientes.
    } catch (error) {
      if (error.response) {
        Swal.fire("Hubo un error", error.response.data.mensaje, "error");
      } else {
        Swal.fire("Hubo un error", "Hubo un error.", "error");
      }
    }
  };
  //almacenar los que el usuario escribe en el state.
  const leerDatos = (e) => {
    guardarCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Fragment>
      <h2>Desde Login</h2>
      <div className="login">
        <h2>Iniciar Sesión</h2>
        <div className="contenedor-formulario">
          <form onSubmit={iniciarSesion}>
            <div className="campo">
              <label>Email</label>
              <input
                type="text"
                name="email"
                placeholder="Email para iniciar sesion"
                required
                onChange={leerDatos}
              />
            </div>
            <div className="campo">
              <label>Contraseña</label>
              <input
                type="password"
                name="password"
                placeholder="Contraseña para iniciar sesion"
                required
                onChange={leerDatos}
              />
            </div>
            <input
              type="submit"
              value="Iniciar Sesión"
              className="btn btn-verde btn-block"
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(Login);
