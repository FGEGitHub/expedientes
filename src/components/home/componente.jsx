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
const expedientesOrdenados = [...expedientes].sort((a, b) => {
  const prioridad = (exp) => {
    if (exp.ultimomovimiento === "SUBSEC. DE SISTEMAS DE INFORMACION") return 0;
    if (exp.ultimomovimiento === "ARCHIVO (INTERFILE S.A.)") return 2;
    return 1;
  };

  return prioridad(a) - prioridad(b);
});
  return (
    <div className="tabla-container">
      <h2>Listado de Expedientes</h2>

      <table className="tabla-expedientes">
        <thead>
          <tr>
            <th>Iniciador</th>
            <th>Año</th>
            <th>Letra</th>
            <th>Número</th>
            <th>Lugar</th>
   <th>Dias </th>
     <th></th>
          </tr>

        </thead>

        <tbody>
          {expedientesOrdenados.map((exp) => (
            <>
   <tr
  key={exp.id}
  onClick={() => toggleExpediente(exp.id)}
  style={{
    cursor: "pointer",

    backgroundColor:
      exp.ultimomovimiento === "SUBSEC. DE SISTEMAS DE INFORMACION"
        ? "#ffdddd"
        : exp.ultimomovimiento === "ARCHIVO (INTERFILE S.A.)"
        ? "#dbeafe"
        : "",

    color:
      exp.iniciador === "SUBSEC. DE SISTEMAS DE INFORMACION"
        ? "#2563eb"
        : exp.ultimomovimiento === "SUBSEC. DE SISTEMAS DE INFORMACION"
        ? "#b00000"
        : exp.ultimomovimiento === "ARCHIVO (INTERFILE S.A.)"
        ? "#1d4ed8"
        : "",

    fontWeight:
      exp.iniciador === "SUBSEC. DE SISTEMAS DE INFORMACION" ||
      exp.ultimomovimiento === "SUBSEC. DE SISTEMAS DE INFORMACION" ||
      exp.ultimomovimiento === "ARCHIVO (INTERFILE S.A.)"
        ? "bold"
        : "normal"
  }}
>
             
             
              <td
  style={{
    color:
      exp.iniciador === "SUBSECRETARIA DE SISTEMAS DE INFORMACION" ||
      exp.iniciador === "SUBSEC. DE SISTEMAS DE INFORMACION"
        ? "#2563eb"
        : "inherit",
    fontWeight:
      exp.iniciador === "SUBSECRETARIA DE SISTEMAS DE INFORMACION" ||
      exp.iniciador === "SUBSEC. DE SISTEMAS DE INFORMACION"
        ? "bold"
        : "normal",
  }}
>
  {exp.iniciador}
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
                                 <td
  style={{
    textAlign: "center",
    fontSize: "18px",
    width: "40px",
    fontWeight: "bold"
  }}
>
  {expedienteAbierto === exp.id ? "▼" : "▶"}
</td>
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