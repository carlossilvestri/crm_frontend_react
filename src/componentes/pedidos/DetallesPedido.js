import React, { Fragment, useContext } from "react";
import { CRMContext } from "../../context/CRMContext";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { withRouter } from "react-router-dom";

const DetallesPedido = ({ pedido, history }) => {
  const { cliente } = pedido;
  //utilizar valores del context
  const [auth] = useContext(CRMContext);
  const eliminarPedido = (idPedido) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Un pedido eliminado no se puede recuperar.",
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
              .delete(`/pedidos/${idPedido}`, {
                headers: {
                  Authorization: `Bearer ${auth.token}`,
                },
              })
              .then((res) => {
                Swal.fire("¡Eliminado!", res.data.mensaje, "success");
                history.push("/");
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
      <li className="pedido">
        <div className="info-pedido">
          <p className="id">ID: {pedido._id}</p>
          <p className="nombre">
            {cliente.nombre} {cliente.apellido}
          </p>

          <div className="articulos-pedido">
            <p className="productos">Artículos Pedido: </p>
            <ul>
              {pedido.pedido.map((articulos) => (
                <li key={pedido._id + articulos._id}>
                  <p>{articulos.producto.nombre}</p>
                  <p>$ {articulos.producto.precio}</p>
                  <p>Cantidad: {articulos.cantidad}</p>
                </li>
              ))}
            </ul>
          </div>
          <p className="total">Total: {pedido.total}</p>
        </div>
        <div className="acciones">
          <button
            type="button"
            className="btn btn-rojo btn-eliminar"
            onClick={() => eliminarPedido(pedido._id)}
          >
            <i className="fas fa-times"></i>
            Eliminar Pedido
          </button>
        </div>
      </li>
    </Fragment>
  );
};

export default withRouter(DetallesPedido);
