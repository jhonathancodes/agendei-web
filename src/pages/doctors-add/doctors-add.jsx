import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../constants/api.js"; 
import Navbar from "../../components/navbar/navbar.jsx";

function DoctorsAdd() {
  const navigate = useNavigate();
  const [name, setName] = useState(""); 
  const [specialization, setSpecialization] = useState(""); 
  const [icon, setIcon] = useState(""); 

  
  async function saveDoctor() {
   
    const jsonDoctor = {
      name: name,
      icon: icon,
    };

    try {
      const responseDoctor = await api.post("/doctors", jsonDoctor);
   

      if (responseDoctor.data) {
        const doctorId = responseDoctor.data.id_doctor;
       
        const jsonService = {
          description: specialization,
        };
        const responseService = await api.post("/services", jsonService);
        

        if (responseService.data) {
          const serviceId = responseService.data.id_service;
          
          const jsonDoctorService = {
            id_doctor: doctorId,
            id_service: serviceId,
          };
        
          await api.post("/doctors/services", jsonDoctorService);

         
          navigate("/doctors");
        }
      }
    } catch (error) {
      alert("Erro ao salvar o setor.");
    }
  }


  function handleCancel() {
    navigate("/doctors"); 
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid mt-page">
        <div className="row col-lg-4 offset-lg-4">
          <div className="col-12 mt-2">
            <h2>Adicionar Novo Setor</h2>
          </div>
          <div className="col-12 mt-4">
            <label htmlFor="name" className="form-label">
              Nome do Setor
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              
            />
          </div>
          <div className="col-12 mt-4">
            <label htmlFor="specialization" className="form-label">
              Serviços
            </label>
            <input
              type="text"
              id="specialization"
              className="form-control"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            
            />
          </div>
          <div className="col-12 mt-4">
            <label htmlFor="icon" className="form-label">
              Ícone
            </label>
            <input
              type="text"
              id="icon"
              className="form-control"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
            
            />
          </div>
          <div className="col-12 mt-4">
            <div className="d-flex justify-content-between">
              <button
                onClick={saveDoctor}
               
                className="btn btn-primary"
                type="button"
              >
                Salvar Dados
              </button>
              <button
                onClick={handleCancel}
            
                className="btn btn-outline-secondary"
                type="button"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorsAdd;
