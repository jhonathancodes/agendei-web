import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar.jsx";
import { Link } from "react-router-dom";
import api from "../../constants/api.js";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    loadDoctors();
  }, []);

  async function loadDoctors() {
    try {
      const response = await api.get("/doctors");
      if (response.data) {
        setDoctors(response.data);
      }
    } catch (error) {
      alert("Erro ao carregar médicos. Tente novamente mais tarde.");
    }
  }

  function handleMaisOpcoes() {
    setShowMessage(true);
  }

  function handleCloseMessage() {
    setShowMessage(false);
  }

  return (
    <div className="container-fluid mt-page">
      <Navbar />
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h1 className="d-inline">Setores</h1>
          <Link to="/doctors/add" className="btn btn-outline-primary ms-5 mb-2">
            Novo Setor
          </Link>
        </div>
      </div>
      <div className="row mt-4">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div key={doctor.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{doctor.name}</h5>
                  <p className="card-text">{doctor.specialization}</p>
                  <button className="btn btn-secondary" onClick={handleMaisOpcoes}>
                    Mais Opções
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Carregando médicos...</p>
        )}
      </div>
      {showMessage && (
        <div className="modal" style={{ display: 'block', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', width: '400px', height: '200px' }}>
          <button className="btn btn-danger" style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={handleCloseMessage}>Fechar</button>
          <p style={{ textAlign: 'center', marginTop: '50px' }}>Para remover o setor do site, comunique algum Administrador da sua unidade..</p>
        </div>
      )}
    </div>
  );
};

export default Doctors;
