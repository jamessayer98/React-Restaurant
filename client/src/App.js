import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Routes from "./routes";
import configureStore from "./redux/configureStore";
import WrapperCustom from "./components/WrapperCustom";

const initialState = {};

const store = configureStore(initialState);

const App = () => {
  return (
    <Provider store={store}>
      <WrapperCustom>
        <Router>
          <Routes />
        </Router>
      </WrapperCustom>
    </Provider>
  );
}

export default App;
