import React, { Fragment, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { CRMContext } from "../../context/CRMContext";
const Cliente = ({ cliente, history }) => {
  const { _id, nombre, apellido, email, empresa, telefono } = cliente;
  const [auth] = useContext(CRMContext);
  //Eliminar cliente
  const eliminarCliente = (idCliente) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Un cliente eliminado no se puede recuperar.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.value) {
        if (auth.token !== "") {
          try {
            clienteAxios
              .delete(`/clientes/${idCliente}`, {
                headers: {
                  Authorization: `Bearer ${auth.token}`,
                },
              })
              .then((res) => {
                console.log(res);
                Swal.fire("¡Eliminado!", res.data.mensaje, "success");
              });
          } catch (error) {
            //Error con autorizacion
            if (error.response === 500) {
              history.push("/iniciar-sesion");
            }
          }
        } else {
          history.push("/iniciar-sesion");
        }
      }
    });
  };

  return (
    <Fragment>
      <li className="cliente">
        <div className="info-cliente">
          <p className="nombre">
            {nombre} {apellido}
          </p>
          <p className="empresa">{empresa}</p>
          <p>{email}</p>
          <p>{telefono}</p>
        </div>
        <div className="acciones">
          <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
            <i className="fas fa-pen-alt"></i>
            Editar Cliente
          </Link>
          <Link to={`/pedidos/nuevo/${_id}`} className="btn btn-amarillo">
            <i className="fas fa-plus"></i>
            Nuevo Pedido
          </Link>
          <button
            onClick={() => eliminarCliente(_id)}
            type="button"
            className="btn btn-rojo btn-eliminar"
          >
            <i className="fas fa-times"></i>
            Eliminar Cliente
          </button>
        </div>
      </li>
    </Fragment>
  );
};

export default withRouter(Cliente);
