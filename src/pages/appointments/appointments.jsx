import "./appointments.css";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar.jsx";
import { data, Link, useNavigate } from "react-router-dom";
import { doctors } from "../../constants/data.js";
import Appointment from "../../components/appointments/appointment.jsx";
import api from "../../constants/api.js";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

function Appointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [doctorsList, setDoctorsList] = useState(doctors);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedHour, setSelectedHour] = useState("");

  useEffect(() => {
    LoadAppointments();
  }, []);

  async function LoadAppointments() {
    console.log("Carregando agendamentos...");
    try {
      const response = await api.get("/admin/appointments", {
        params: {
          dt_start: startDate,
          dt_end: endDate,
          name: selectedDoctor,
          booking_hour: selectedHour,
        },
      });
      if (response.data) {
        setAppointments(response.data);
      }
    } catch (error) {
      if (error.response?.data.error) {
        alert(error.response?.data.error);
      } else {
        alert("Erro ao carregar os agendamentos. Tente novamente mais tarde.");
      }
    }
  }

  function ClickDelete(id_appointment) {
    confirmAlert({
      title: "Exclusão",
      message: "Confirma exclusão desse agendamento?",
      buttons: [
        {
          label: "Sim",
          onClick: () => DeleteAppointment(id_appointment),
        },
        {
          label: "Não",
          onClick: () => {},
        },
      ],
    });
  }

  async function DeleteAppointment(id) {
    try {
      const resposnse = await api.delete("/appointments/" + id)

      if (resposnse.data) {
        LoadAppointments();
      }
    } catch (error) {
      if (error.response?.data.error) {
        if (error.response.status == 401)
          return navigate("/")

        alert(error.response?.data.error);
      }
      else
        alert("Erro ao excluir dados")
    }
  }

  return (
    <div className="container-fluid mt-page">
      <Navbar />
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h1 className="d-inline">Agendamentos</h1>
          <Link to="/appointments/add" className="btn btn-outline-primary ms-5 mb-2">
            Novo Agendamento
          </Link>
        </div>
        <div className="d-flex justify-content-end">
          <input
            id="startDate"
            className="form-control"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span className="m-2">Até</span>
          <input
            id="endDate"
            className="form-control"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <div className="form-control ms-3 me-3">
            <select
              name="doctor"
              id="doctor"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              <option value="">Todos os setores</option>
              {doctorsList.map((doc) => (
                <option value={doc.name} key={doc.id_doctor}>
                  {doc.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control ms-3 me-3">
            <select
              name="hour"
              id="hour"
              value={selectedHour}
              onChange={(e) => setSelectedHour(e.target.value)}
            >
              <option value="">Todos os horários</option>
              <option value="08:00">08:00</option>
              <option value="08:30">08:30</option>
              <option value="09:00">09:00</option>
              <option value="09:30">09:30</option>
              <option value="10:00">10:00</option>
              <option value="10:30">10:30</option>
              <option value="11:00">11:00</option>
              <option value="11:30">11:30</option>
              <option value="12:00">12:00</option>
              <option value="12:30">12:30</option>
              <option value="13:00">13:00</option>
              <option value="13:30">13:30</option>
              <option value="14:00">14:00</option>
              <option value="14:30">14:30</option>
              <option value="15:00">15:00</option>
              <option value="15:30">15:30</option>
              <option value="16:00">16:00</option>
              <option value="16:30">16:30</option>
              <option value="17:00">17:00</option>
              <option value="17:30">17:30</option>
              <option value="18:00">18:00</option>
              <option value="18:30">18:30</option>
              <option value="19:00">19:00</option>
              <option value="19:30">19:30</option>
            </select>
          </div>
        </div>
        <button onClick={LoadAppointments} className="btn btn-primary" type="button">
          Filtrar
        </button>
      </div>
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Cliente</th>
              <th scope="col">Setor</th>
              <th scope="col">Serviço</th>
              <th scope="col">Data/Hora</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((ap) => (
              <Appointment
                key={ap.id_appointment}
                id_appointment={ap.id_appointment}
                user={ap.user}
                doctor={ap.doctor}
                service={ap.service}
                booking_date={ap.booking_date}
                booking_hour={ap.booking_hour}
                clickDelete={ClickDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Appointments;
