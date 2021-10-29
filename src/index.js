import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import * as registerServiceWorker from "./registerServiceWorker";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";

import "assets/scss/material-dashboard-pro-react.scss?v=1.10.0";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker.unregister();
