import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import "./styles/global.css"
import "./styles/variables.css"
import "@fontsource/lato";

function App() {
  return (
    <div>
      <Register />
      <Login />
    </div>
  );
}

export default App;
