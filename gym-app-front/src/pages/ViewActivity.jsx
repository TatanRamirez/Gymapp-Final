import { useEffect, useState } from "react";
import { NavLink, useNavigate , useLocation } from "react-router-dom";

export function ViewActivity() {
    
    const location = useLocation();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
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


    return(
         <section className="vh-100">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black">
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-3 mx-1 mx-md-4 mt-2">
                                            Actividad
                                        </p>

                                        <form className="mx-1 mx-md-4">
                                            <div className="d-flex flex-row align-items-center mb-2">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label
                                                        className="form-label fw-bold"
                                                        htmlFor="formName"
                                                    >
                                                        Nombre actividad
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="formName"
                                                        className="form-control-plaintext"
                                                        readOnly
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
                                                        className="form-label fw-bold"
                                                        htmlFor="formDescription"
                                                    >
                                                        Descripcion actividad
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="formDescription"
                                                        className="form-control-plaintext"
                                                        readOnly
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
                                                        className="form-label fw-bold"
                                                        htmlFor="formTipology"
                                                    >
                                                        Tipologia
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="formTipology"
                                                        className="form-control-plaintext"
                                                        readOnly
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
                                                        className="form-label fw-bold"
                                                        htmlFor="formMuscleGroup"
                                                    >
                                                        Grupo muscular
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="formMuscleGroup"
                                                        className="form-control-plaintext"
                                                        readOnly
                                                        placeholder="Grupo muscular"
                                                        value={muscleGroup}
                                                        onChange={(e) => setMuscleGroup(e.target.value)}
                                                    />
                                                </div>
                                            </div>

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
                                            src={`http://localhost:3000/images/${location.state.image}`}
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