import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/user", {
        name,
        email,
        password: password,
        role: "client",
      });
      // Verificar la respuesta del servidor y realizar el inicio de sesión si es exitoso
      if (response.status === 200) {
        history("/");
      } else {
        // Manejar errores de inicio de sesión
        console.error("Inicio de sesión fallido");
      }
    } catch (error) {
      // Manejar errores de red u otros errores
      console.error("Error de inicio de sesión:", error);
    }
  };
  return (
    <section className="vh-100">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-3 mx-1 mx-md-4 mt-2">
                      Registro
                    </p>

                    <form className="mx-1 mx-md-4" onSubmit={handleCreateUser}>
                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example1c"
                          >
                            Nombre
                          </label>
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            placeholder="Nombre de usuario"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            Correo electronico
                          </label>
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                            placeholder="prueba@prueba.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example4c"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                            placeholder="Ingrese su contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="d-grid gap-2 mt-4">
                        <button className="btn btn-primary" type="submit">
                          Registrar
                        </button>
                      </div>
                      <div className="d-grid gap-2 pt-3 text-center">
                        <small>
                          <NavLink to="/" className="text-secondary">
                            Volver al login
                          </NavLink>
                        </small>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://blog.totalpass.com.mx/wp-content/uploads/2022/10/Clientes-potenciales-de-un-gimnasio-que-buscan-y-quienes-son.jpg"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
