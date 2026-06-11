import { useEffect, useState } from "react";
import "./TablaExpedientes.css";
import servicioex from "../../services/servicio";

function TablaExpedientes() {
  const [expedientes, setExpedientes] = useState([]);
  const [expedienteAbierto, setExpedienteAbierto] = useState(null);


const [mostrarSistemas, setMostrarSistemas] =
  useState(false);
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
    if (
      exp.ultimomovimiento ===
      "SUBSEC. DE SISTEMAS DE INFORMACION"
    )
      return 0;

    if (
      exp.ultimomovimiento ===
      "ARCHIVO (INTERFILE S.A.)"
    )
      return 2;

    return 1;
  };

  const prioridadA = prioridad(a);
  const prioridadB = prioridad(b);

  // Primero agrupamos por prioridad
  if (prioridadA !== prioridadB) {
    return prioridadA - prioridadB;
  }

  // Dentro del grupo ordenamos por fecha_sistema
  const fechaA = a.fecha_sistema
    ? new Date(a.fecha_sistema).getTime()
    : 0;

  const fechaB = b.fecha_sistema
    ? new Date(b.fecha_sistema).getTime()
    : 0;

  return fechaB - fechaA; // más reciente primero
});
const expedientesSistemas = expedientes.filter(
  (exp) =>
    exp.ultimomovimiento ===
    "SUBSEC. DE SISTEMAS DE INFORMACION"
);


  return (
    <div className="tabla-container">
      <h2>Listado de Expedientes</h2>
<div
  style={{
    background: "#fff3cd",
    border: "1px solid #ffe69c",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px",
  }}
>
  <h3 style={{ margin: 0 }}>
    Cantidad de expedientes en Sistemas:{" "}
    {expedientesSistemas.length}
  </h3>

  <button
    onClick={() =>
      setMostrarSistemas(!mostrarSistemas)
    }
    style={{
      marginTop: "10px",
      padding: "8px 12px",
      cursor: "pointer",
    }}
  >
    {mostrarSistemas
      ? "Ocultar expedientes"
      : "Ver cuáles"}
  </button>

  {mostrarSistemas && (
    <div
      style={{
        marginTop: "15px",
        maxHeight: "300px",
        overflowY: "auto",
      }}
    >
      {expedientesSistemas.map((exp) => (
        <div
          key={exp.id}
          style={{
            borderBottom: "1px solid #ddd",
            padding: "10px 0",
          }}
        >
          <div>
            <strong>Iniciador:</strong>{" "}
            {exp.iniciador}
          </div>

          <div>
            <strong>Extracto:</strong>{" "}
            {exp.extracto}
          </div>

          <div>
            <strong>Expediente:</strong>{" "}
            {exp.anio}-{exp.letra}-{exp.numero}
          </div>

          <div>
            <strong>Días:</strong>{" "}
            {exp.dias || 0}
          </div>
        </div>
      ))}
    </div>
  )}

  <div
  style={{
    background: "#eef6ff",
    border: "1px solid #cfe2ff",
    color: "#0c5460",
    padding: "10px 15px",
    borderRadius: "8px",
    marginBottom: "15px",
    fontSize: "14px",
  }}
>
  <strong>Nota:</strong> Los expedientes se encuentran ordenados
  priorizando aquellos cuyo último movimiento está en
  <strong> SUBSEC. DE SISTEMAS DE INFORMACIÓN</strong>. Dentro de cada
  grupo, se muestran primero los que poseen el movimiento más reciente
  según la fecha registrada en el sistema.
</div>
</div>
      <table className="tabla-expedientes">
        <thead>
          <tr>
            <th>Iniciador</th>
              <th>Extracto</th>
            <th>Año</th>
            <th>Letra</th>
            <th>Número</th>
            <th>Lugar</th>
   <th>Dias </th>
    <th>Dias sistema </th>
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
  <td>{exp.extracto}</td>
                <td>{exp.anio}</td>
                <td>{exp.letra}</td>
                <td>{exp.numero}</td>
                <td>{exp.ultimomovimiento}</td>
                    <td>{exp.dias}</td>
                 <td>
  {(() => {
    const ultimoMov =
      exp.movimientos?.[exp.movimientos.length - 1];

    if (!ultimoMov) return 0;

    return ultimoMov.fecha_sistema ==
      "2026-06-08 10:32:00"
      ? `${ultimoMov.dias_sistema} (o más)`
            : ultimoMov.dias_sistema;
  })()}
</td>

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
                                 <th>dias (dias sistema nuestro)</th>
                                 <th>fecha act sistema nuestro</th>
                          </tr>
                        </thead>

                        <tbody>
                          {exp.movimientos?.length > 0 ? (
                            exp.movimientos.map((mov) => (
                              <tr key={mov.id}>
                                <td>{mov.origen}</td>
                                <td>{mov.destino}</td>
                           <td>{mov.fecha}</td>
                                 <td>{mov.dias} ({mov.dias_sistema})</td>
                                <td>
  {mov.fecha_sistema
    ? new Date(mov.fecha_sistema).toLocaleString(
        "es-AR",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      )
    : "-"}
</td>
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