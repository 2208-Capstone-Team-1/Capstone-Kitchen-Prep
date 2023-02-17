import App from "./components/App";
import store from "./store";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const container = document.querySelector("#root")!;
//exclamation point at the end guarantees that the above line will always be defined
const root = createRoot(container);
root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
);
