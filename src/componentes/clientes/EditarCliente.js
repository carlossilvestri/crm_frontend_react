import React, { Fragment, useState, useEffect, useContext } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom"; //Sirve para redireccionar High order component.
import { CRMContext } from "../../context/CRMContext";

const EditarCliente = (props) => {
  //Obtener el id de la url
  const { id } = props.match.params;
  //utilizar valores del context
  const [auth] = useContext(CRMContext);
  //cliente = state, guardarCliente = funcion para guardar el state.
  const [cliente, datosCliente] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    telefono: "",
  });

  useEffect(() => {
    if (auth.token !== "") {
      try {
        //Query a la api
        const consultarApi = async () => {
          const clienteConsulta = await clienteAxios.get(`/clientes/${id}`, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          //colocar en el state
          datosCliente(clienteConsulta.data);
        };
        consultarApi();
      } catch (error) {
        //Error con autorizacion
        if (error.response === 500) {
          props.history.push("/iniciar-sesion");
        }
      }
    } else {
      props.history.push("/iniciar-sesion");
    }
  }, [id, auth.token, props.history]); // eslint-disable-next-line

  //leer los datos del formulario.
  const actualizarState = (e) => {
    //Almacenar lo que el usuario escribe en el state.
    datosCliente({
      //Obtener una copia del state actual.
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };
  //Envia una petiicion por axios para actualizar el cliente.
  const actualizarCliente = (e) => {
    e.preventDefault();
    if (auth.token !== "") {
      try {
        //Enviar peticion por axios.
        clienteAxios
          .put(`/clientes/${cliente._id}`, cliente, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          })
          .then((res) => {
            //Validar si hay errores de mongo.
            if (res.data.code === 11000) {
              Swal.fire({
                icon: "error",
                title: "¡Hubo un error!",
                text: "Correo ya usado, usa otro correo.",
              });
            } else {
              console.log(res.data);
              Swal.fire("Correcto", "Se actualizó correctamente", "success");
            }
            props.history.push("/");
          });
      } catch (error) {
        //Error con autorizacion
        if (error.response === 500) {
          props.history.push("/iniciar-sesion");
        }
      }
    } else {
      props.history.push("/iniciar-sesion");
    }
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

  return (
    <Fragment>
      <h2>Editar Cliente</h2>
      <form onSubmit={actualizarCliente}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            onChange={actualizarState}
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            value={cliente.nombre}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input
            onChange={actualizarState}
            type="text"
            placeholder="Apellido Cliente"
            name="apellido"
            value={cliente.apellido}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input
            onChange={actualizarState}
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
            value={cliente.empresa}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            onChange={actualizarState}
            type="email"
            placeholder="Email Cliente"
            name="email"
            value={cliente.email}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            onChange={actualizarState}
            type="tel"
            placeholder="Teléfono Cliente"
            name="telefono"
            value={cliente.telefono}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Editar Cliente"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </Fragment>
  );
};
//High Order Component (HCP) es una funcion que toma un componente y retorna un nuevo componente.
export default withRouter(EditarCliente);
