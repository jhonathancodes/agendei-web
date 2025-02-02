import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../constants/api.js"; // Importando a instância do Axios
import Navbar from "../../components/navbar/navbar.jsx";

function DoctorsAdd() {
  const navigate = useNavigate();
  const [name, setName] = useState(""); // Nome do Setor
  const [specialization, setSpecialization] = useState(""); // Serviços (não é necessário na tabela doctors)
  const [icon, setIcon] = useState(""); // Ícone do Setor

  // Função para salvar o setor (doctor) no banco de dados
  async function saveDoctor() {
    // Payload para salvar na tabela 'doctors' com name e icon
    const jsonDoctor = {
      name: name,
      icon: icon,
    };

    try {
      const responseDoctor = await api.post("/doctors", jsonDoctor);
      // Chama a rota de inserir na tabela 'doctors'

      if (responseDoctor.data) {
        const doctorId = responseDoctor.data.id_doctor;
        // Obtemos o ID do médico criado

        // Agora, vamos inserir o serviço
        const jsonService = {
          description: specialization,
        };
        const responseService = await api.post("/services", jsonService);
        // Chama a rota de inserir na tabela 'services'

        if (responseService.data) {
          const serviceId = responseService.data.id_service;
          // Obtemos o ID do serviço criado

          // Após inserir os dados do médico e do serviço, vamos associá-los.
          const jsonDoctorService = {
            id_doctor: doctorId,
            id_service: serviceId,
          };
          // Associe o médico ao serviço
          await api.post("/doctors/services", jsonDoctorService);

          // Se tudo der certo, redireciona para a lista de médicos
          navigate("/doctors");
        }
      }
    } catch (error) {
      alert("Erro ao salvar o setor.");
    }
  }

  // Função de cancelar (voltar para a lista de médicos)
  function handleCancel() {
    navigate("/doctors"); // Redireciona para a lista de médicos
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
              // Atualiza o estado do nome
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
              // Atualiza o estado da especialização
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
              // Atualiza o estado do ícone
            />
          </div>
          <div className="col-12 mt-4">
            <div className="d-flex justify-content-between">
              <button
                onClick={saveDoctor}
                // Chama a função de salvar
                className="btn btn-primary"
                type="button"
              >
                Salvar Dados
              </button>
              <button
                onClick={handleCancel}
                // Chama a função de cancelar
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
