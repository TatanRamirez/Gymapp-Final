import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

export function HomePage() {
  const history = useNavigate();
  const [datosCards, setDatosCards] = useState("");
  const [search, setSearch] = useState("");
  const [typology, setTypology] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  let tarjetas = null;

  useEffect(() => {
    let token = localStorage.getItem("token");
    let role = localStorage.getItem("role") === "client" ? false : true ;
    console.log(role)
    setIsAdmin(role)
    
    if (!token) {
      history("/");
    } else {
      getActivities()
    }
  }, []);

  const getActivities = async () => {
    try {
      let url = "http://localhost:3000/activities";

      if(typology) url = `${url}?typology=${typology}`

      if(muscleGroup ) {
        if(!typology && !search) {
          url = `${url}?muscle_group=${muscleGroup}`
        } else {
          url = `${url}&muscle_group=${muscleGroup}`
        }
      }

      if(search) {
        if(!typology && !muscleGroup) {
          url = `${url}?search=${search}`
        } else {
          url = `${url}&search=${search}`
        }
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      // Verificar la respuesta del servidor y realizar el inicio de sesión si es exitoso
      if (response.status === 200) {
        let { data } = response.data;
        setDatosCards(data);
      } else {
        // Manejar errores de inicio de sesión
        console.error("Inicio de sesión fallido");
      }
    } catch (error) {
      // Manejar errores de red u otros errores
      console.error("Error de inicio de sesión:", error);
    }
  };

  const likedActivities = async (activityId) => {
    console.log(activityId)
    try {
      const response = await axios.post(`http://localhost:3000/activities/${activityId}/like`,{}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      // Verificar la respuesta del servidor y realizar el inicio de sesión si es exitoso
      if (response.status === 200) {
        getActivities()
      } else {
        console.error("error al dar like a la publicacion");
      }
    } catch (error) {
      // Manejar errores de red u otros errores
      console.error("Error de inicio de sesión:", error);
    }

  }

  const deleteActivities = async(activityId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/activity/${activityId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      // Verificar la respuesta del servidor y realizar el inicio de sesión si es exitoso
      if (response.status === 200) {
        getActivities()
      } else {
        console.error("error al dar like a la publicacion");
      }
    } catch (error) {
      // Manejar errores de red u otros errores
      console.error("Error de inicio de sesión:", error);
    }
  }

  const handleFilterActivities = (e) => {
    e.preventDefault();
    getActivities()
    
  }

  const closeSesion = async() => {
    localStorage.clear();
    history("/");
  }

  if (datosCards) {

    tarjetas = datosCards.map((tarjeta, indice) => (
      <div className="col-3 mt-3" key={indice}>
        <div className="card tamano-card">
          <img src={`http://localhost:3000/images/${tarjeta.image}`} className="card-img-top" alt="..." />
          <div className="card-body">
            <div className="row">
              <div className="col-9">
                <p className="card-title h5">{tarjeta.activity_name}</p>
                <small className="text-muted">Total me gusta {tarjeta.total_likes}</small>
              </div>
              <div className="col text-center" style={{ cursor: "pointer" }} onClick={() => likedActivities(tarjeta.id)}>
                <i className={tarjeta.liked ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'} ></i>
              </div>
            </div>

            <p className="card-text parrafo-limitado">{tarjeta.description}</p>
            <div className="d-grid gap-2">
          
              <NavLink to="/view-activity" state={tarjeta} className="btn btn-primary btn-sm w-100 ">
                Ver rutina de ejercicio
              </NavLink>

            </div>
            { isAdmin ?
            
              <div className="row pt-2">
                <div className="col">
                  
                  <NavLink to="/create-activity" state={tarjeta} className="btn btn-info btn-sm w-100 ">
                      Editar
                  </NavLink>
          
                </div>
                <div className="col">
                  <button className="btn btn-danger btn-sm w-100" type="button" onClick={()=> deleteActivities(tarjeta.id)}>Eliminar</button>
                </div>
              </div>
            
            :null}
          </div>
        </div>
      </div>
    ));

  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="#">
            <span className="fw-bold text-danger">GYMAPP</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" ></ul>
            <span className="navbar-text">
              <div
                className="collapse navbar-collapse"
                id="navbarNavDarkDropdown"
              >
                <ul className="navbar-nav mt-2" style={{ cursor: "pointer" }}>
                  <li className="nav-item dropdown">
                    <span
                      data-bs-toggle="dropdown"
                      data-bs-target="#navbarText"
                      aria-controls="navbarText"
                      aria-expanded="false"
                    >
                      <span className="navbar-toggler-icon"></span>
                    </span>
                    <ul className="dropdown-menu dropdown-menu-end ">
                      <li>
                        <a className="dropdown-item" href="#">
                          Perfil
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#" onClick={()=> closeSesion()}>
                         Cerrar sesion
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </span>
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card pt-3 mt-5">
              <div className="card-body mx-auto">
                <form className="row g-5" onSubmit={handleFilterActivities}>
                  <div className="col-auto">
                    <input
                      type="search"
                      value={search}
                      onChange={(e)=> setSearch(e.target.value)}
                      className="form-control"
                      id="search"
                      placeholder="Buscar ..."
                    />
                  </div>
                  <div className="col-auto">
                    <input
                      type="text"
                      value={typology}
                      onChange={(e) => setTypology(e.target.value)}
                      className="form-control"
                      id="tipology"
                      placeholder="Topoligia"
                    />
                  </div>
                  <div className="col-auto">
                    <input
                      type="text"
                      value={muscleGroup}
                      onChange={(e) => setMuscleGroup(e.target.value)}
                      className="form-control"
                      id="muscleGroup"
                      placeholder="Grupo Muscular"
                    />
                  </div>
                  <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-3" >
                      Filtrar
                    </button>
                  </div>
                  { isAdmin ?
                    <div className="col-auto" >
                      <button type="button" className="btn btn-primary mb-3" onClick={()=> history("/create-activity") }>
                        Crear actividad
                      </button>
                    </div>
                  : null
                  }
                  
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5 mx-5">{tarjetas || null}</div>
      </div>
    </>
  );
}
