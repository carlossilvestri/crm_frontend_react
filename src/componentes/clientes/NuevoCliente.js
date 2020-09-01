import React, { Fragment, useState, useContext } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom"; //Sirve para redireccionar High order component.
import { CRMContext } from "../../context/CRMContext";
const NuevoCliente = ({ history }) => {
  //utilizar valores del context
  const [auth] = useContext(CRMContext);
  //cliente = state, guardarCliente = funcion para guardar el state.
  const [cliente, guardarCliente] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    telefono: "",
  });
  //leer los datos del formulario.
  const actualizarState = (e) => {
    //Almacenar lo que el usuario escribe en el state.
    guardarCliente({
      //Obtener una copia del state actual.
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };
  //Validar formulario.
  const validarCliente = () => {
    //Destructuring
    const { nombre, apellido, email, empresa, telefono } = cliente;
    //Revisar que las propiedades del objeto tengan contenido.
    let valido =
      !nombre.length ||
      !apellido.length ||
      !email.length ||
      !empresa.length ||
      !telefono.length;
    //return true o false.
    return valido;
  };
  //verificar si el usuario ha iniciado sesion o no
  if (!auth.auth && localStorage.getItem("token") === auth.token) {
    history.push("/iniciar-sesion");
  }
  //if (!auth.auth) return history.push("/iniciar-sesion");

  //Agrega un cliente nuevo.
  const agregarCliente = (e) => {
    e.preventDefault();
    //Enviar peticion a axios.
    clienteAxios.post("/clientes", cliente).then((res) => {
      //Validar si hay errores de mongo.
      if (res.data.code === 11000) {
        Swal.fire({
          icon: "error",
          title: "¡Hubo un error!",
          text: "Correo ya usado, usa otro correo.",
        });
      } else {
        console.log(res.data);
        Swal.fire("Good job!", res.data.mensaje, "success");
      }
      //Redireccionar.
      history.push("/");
    });
  };

  return (
    <Fragment>
      <h2>Nuevo Cliente</h2>
      <form onSubmit={agregarCliente}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            onChange={actualizarState}
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input
            onChange={actualizarState}
            type="text"
            placeholder="Apellido Cliente"
            name="apellido"
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input
            onChange={actualizarState}
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            onChange={actualizarState}
            type="email"
            placeholder="Email Cliente"
            name="email"
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            onChange={actualizarState}
            type="tel"
            placeholder="Teléfono Cliente"
            name="telefono"
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Cliente"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </Fragment>
  );
};
//High Order Component (HCP) es una funcion que toma un componente y retorna un nuevo componente.
export default withRouter(NuevoCliente);
