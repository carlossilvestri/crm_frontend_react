import React, { Fragment, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
/* COMPONENETES */
import Header from "./componentes/layout/Header";
import Navegacion from "./componentes/layout/Navegacion";
import Clientes from "./componentes/clientes/Clientes";
import Productos from "./componentes/productos/Productos";
import Pedidos from "./componentes/pedidos/Pedidos";
import NuevoCliente from "./componentes/clientes/NuevoCliente";
import EditarCliente from "./componentes/clientes/EditarCliente";
import NuevoProducto from "./componentes/productos/NuevoProducto";
import EditarProducto from "./componentes/productos/EditarProducto";
import NuevoPedido from "./componentes/pedidos/NuevoPedido";
import Login from "./componentes/auth/Login";
import { CRMContext, CRMProvider } from "./context/CRMContext";

function App(props) {
  //Utilizar context en el componente
  const [auth, guardarAuth] = useContext(CRMContext);
  return (
    <Router>
      <Fragment>
        <CRMProvider value={[auth, guardarAuth]}>
          <Header />
          <div className="grid contenedor contenido-principal">
            <Navegacion />
            <main className="caja-contenido col-9">
              <Switch>
                <Route exact path="/" component={Clientes} />
                <Route exact path="/clientes/nuevo" component={NuevoCliente} />
                <Route
                  exact
                  path="/clientes/editar/:id"
                  component={EditarCliente}
                />
                <Route exact path="/productos" component={Productos} />
                <Route
                  exact
                  path="/productos/nuevo"
                  component={NuevoProducto}
                />
                <Route
                  exact
                  path="/productos/editar/:id"
                  component={EditarProducto}
                />

                <Route exact path="/pedidos" component={Pedidos} />
                <Route
                  exact
                  path="/pedidos/nuevo/:id"
                  component={NuevoPedido}
                />
                <Route exact path="/iniciar-sesion" component={Login} />
              </Switch>
            </main>
          </div>
        </CRMProvider>
      </Fragment>
    </Router>
  );
}

export default App;
