function Appointment(props) {
    // Concatena a data e hora para formar uma string de data válida
    const dateTimeString = `${props.booking_date}T${props.booking_hour}:00`;

    // Cria um objeto Date a partir da string de data e hora
    const dt = new Date(dateTimeString);

    // Usa o método `toLocaleString` para formatar a data
    const formattedDate = dt.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <tr>
            <td>{props.user}</td>
            <td>{props.doctor}</td>
            <td>{props.service}</td>
            <td>{formattedDate}</td>
            <td className="text-end">
                <button onClick={() => props.clickDelete(props.id_appointment)} className="btn btn-sm btn-danger">
                    <i className="bi bi-trash"></i> Excluir
                </button>
            </td>
        </tr>
    );
}

export default Appointment;
