import React, { Fragment, useEffect, useState, useContext } from "react";
import clienteAxios from "../../config/axios";
import Cliente from "./Cliente";
import { Link, withRouter } from "react-router-dom";
import Spinner from "../layout/Spinner";
//importar el context
import { CRMContext } from "../../context/CRMContext";

const Clientes = (props) => {
  //Trabajar con el State. clientes = state, guardarClientes = funcion para guardar el state.
  const [clientes, guardarClientes] = useState([]);
  //utilizar valores del context
  const [auth] = useContext(CRMContext);

  //useEffect es similar a componentDidMount y willMount.
  useEffect(() => {
    if (auth.token !== "") {
      //Query a la api.
      const consultarApi = async () => {
        try {
          const clientesConsulta = await clienteAxios.get(
            "/clientes",
            {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            },
            []
          );
          //Colocar el resultado en el state.
          guardarClientes(clientesConsulta.data);
        } catch (error) {
          //Error con autorizacion
          if (error.response === 500) {
            props.history.push("/iniciar-sesion");
          }
        }
      };
      consultarApi();
    } else {
      props.history.push("/iniciar-sesion");
    }
  }, [clientes, auth.token, props.history]); //[] para que se ejecute una vez. [clientes] cuando la variable clientes cambie React va a estar atento y va a ejecutar la funcion que esta dentro del useEffect (consultarApi).

  //Si el state esta como false.
  if (!auth.auth) {
    props.history.push("/iniciar-sesion");
  }

  //Spinner de carga
  // if (!clientes.length) return <Spinner />;
  return (
    <Fragment>
      <h2>Clientes</h2>
      <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>
      {!clientes.length ? (
        <Spinner />
      ) : (
        <ul className="listado-clientes">
          {clientes.map((cliente) => (
            <Cliente cliente={cliente} key={cliente._id} />
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default withRouter(Clientes);
