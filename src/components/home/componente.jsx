import { useEffect, useState } from "react";
import "./TablaExpedientes.css";
import servicioex from "../../services/servicio";

function TablaExpedientes() {
  const [expedientes, setExpedientes] = useState([]);
  const [expedienteAbierto, setExpedienteAbierto] = useState(null);

  useEffect(() => {
    cargarExpedientes();
  }, []);

  const cargarExpedientes = async () => {
    try {
      const respuesta = await servicioex.traerexpedientes();
      setExpedientes(respuesta);
    } catch (error) {
      console.error("Error al obtener expedientes:", error);
    }
  };

  const toggleExpediente = (id) => {
    setExpedienteAbierto(expedienteAbierto === id ? null : id);
  };

  return (
    <div className="tabla-container">
      <h2>Listado de Expedientes</h2>

      <table className="tabla-expedientes">
        <thead>
          <tr>
            <th></th>
            <th>Año</th>
            <th>Letra</th>
            <th>Número</th>
            <th>Lugar</th>
   <th>Dias </th>
          </tr>
        </thead>

        <tbody>
          {expedientes.map((exp) => (
            <>
              <tr
                key={exp.id}
                className="fila-expediente"
                onClick={() => toggleExpediente(exp.id)}
                style={{ cursor: "pointer" }}
              >
                <td>
                  {expedienteAbierto === exp.id ? "▼" : "▶"}
                </td>
                <td>{exp.anio}</td>
                <td>{exp.letra}</td>
                <td>{exp.numero}</td>
                <td>{exp.ultimomovimiento}</td>
                    <td>{exp.dias}</td>
                
              </tr>

              {expedienteAbierto === exp.id && (
                <tr>
                  <td colSpan={5}>
                    <div className="contenedor-movimientos">
                      <table className="tabla-movimientos">
                        <thead>
                          <tr>
                            <th>Origen</th>
                            <th>Destino</th>
                            <th>Fecha</th>
                                 <th>dias</th>
                          </tr>
                        </thead>

                        <tbody>
                          {exp.movimientos?.length > 0 ? (
                            exp.movimientos.map((mov) => (
                              <tr key={mov.id}>
                                <td>{mov.origen}</td>
                                <td>{mov.destino}</td>
                           <td>{mov.fecha}</td>
                                 <td>{mov.dias}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={3}>
                                Sin movimientos registrados
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaExpedientes;