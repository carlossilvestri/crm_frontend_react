import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext";

const Navegacion = () => {
  //Usar el context con el token de inicio de sesion
  const [auth] = useContext(CRMContext);
  if (!auth.auth) return null;
  return (
    <Fragment>
      <aside className="sidebar col-3">
        <h2>Administración</h2>

        <nav className="navegacion">
          <Link to={"/"} className="clientes">
            Clientes
          </Link>
          <Link to={"/productos"} className="productos">
            Productos
          </Link>
          <Link to={"/pedidos"} className="pedidos">
            Pedidos
          </Link>
        </nav>
      </aside>
    </Fragment>
  );
};

export default Navegacion;
