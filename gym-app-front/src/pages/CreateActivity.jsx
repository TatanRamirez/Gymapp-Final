import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation  } from "react-router-dom";

export function CreateActivity( props ) {
    const history = useNavigate();
    const location = useLocation();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [typology, setTypology] = useState("");
    const [muscleGroup, setMuscleGroup] = useState("");

    useEffect(() => {
        if(location.state){
            setData()
        }
    }, [])

    

    const setData = async()=>{
        setName(location.state.activity_name),
        setDescription(location.state.description)
        setTypology(location.state.typology)
        setMuscleGroup(location.state.muscle_group)
    }


    const handleActivity = async(e)=> {
        e.preventDefault();
        let formData = new FormData();
        let response; 

        formData.append('name',name);   //append the values with key, value pair
        formData.append('description', description);
        
        formData.append('typology', typology);
        formData.append('muscleGroup', muscleGroup);
        if(image[0]){
            formData.append('image', image[0]);
        }
        
        
        try {
            
            if(location.state){
                response = await axios.put(`http://localhost:3000/activity/${location.state.id}` , 
                    formData,
                    {
                        headers: { 
                            'Authorization': `Bearer ${localStorage.getItem("token")}`,
                            'content-type': 'multipart/form-data' 
                        },
                    }
                );
            } else {
                              
                response = await axios.post("http://localhost:3000/activity", 
                formData,
                {
                    headers: { 
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        'content-type': 'multipart/form-data' 
                    },
                }
                );
            }
          // Verificar la respuesta del servidor y realizar el inicio de sesión si es exitoso
          if (response.status === 200) {
            history("/home");
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
                                            { location.state ? "Edicion " : "Registro "} de actividad
                                        </p>

                                        <form className="mx-1 mx-md-4" onSubmit={handleActivity}>
                                            <div className="d-flex flex-row align-items-center mb-2">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="formName"
                                                    >
                                                        Nombre actividad
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="formName"
                                                        className="form-control"
                                                        placeholder="Nombre de actividad"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-2">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="formDescription"
                                                    >
                                                        Descripcion actividad
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="formDescription"
                                                        className="form-control"
                                                        placeholder="Descripcion actividad"
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                           
                                            <div className="d-flex flex-row align-items-center mb-2">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="formTipology"
                                                    >
                                                        Tipologia
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="formTipology"
                                                        className="form-control"
                                                        placeholder="Tipologia"
                                                        value={typology}
                                                        onChange={(e) => setTypology(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-2">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="formMuscleGroup"
                                                    >
                                                        Grupo muscular
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="formMuscleGroup"
                                                        className="form-control"
                                                        placeholder="Grupo muscular"
                                                        value={muscleGroup}
                                                        onChange={(e) => setMuscleGroup(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-2">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="formImagen"
                                                    >
                                                        Imagen
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id="formImagen"
                                                        className="form-control"    
                                                        onChange={(e) => setImage(e.target.files)}
                                                    />
                                                </div>
                                            </div>
                                            {location.state ? 
                                                <div className="d-grid gap-2 mt-4">
                                                    <button className="btn btn-primary" type="submit">
                                                        Editar actividad
                                                    </button>
                                                </div>
                                            
                                            : 
                                                <div className="d-grid gap-2 mt-4">
                                                    <button className="btn btn-primary" type="submit">
                                                        Registrar
                                                    </button>
                                                </div>
                                            }
                                            
                                            <div className="d-grid gap-2 pt-3 text-center">
                                                <small>
                                                    <NavLink to="/home" className="text-secondary">
                                                        Volver al home
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