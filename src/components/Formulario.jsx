import { useEffect, useState } from "react";
import Error from "./error";

const Formulario = ({ paciente, setPaciente, pacientes, setPacientes }) => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [fecha, setFecha] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const { nombre, propietario, email, sintomas, fecha } = paciente;

    if (Object.keys(paciente).length > 0) {
      setNombre(nombre);
      setPropietario(propietario);
      setEmail(email);
      setFecha(fecha);
      setSintomas(sintomas);
    }
  }, [paciente]);

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return fecha + random;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(false);
    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      setError(true);
      return;
    }

    const objPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
    };

    if (paciente.id) {
      objPaciente.id = paciente.id;

      const pacientesActualizados = pacientes.map((pacienteState) =>
        pacienteState.id === paciente.id ? objPaciente : pacienteState
      );

      setPacientes(pacientesActualizados);
      setPaciente({});

    } else {
      objPaciente.id = generarId();
      setPacientes([...pacientes, objPaciente]);
    }

    setNombre("");
    setPropietario("");
    setEmail("");
    setFecha("");
    setSintomas("");
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade Paciente y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="shadow-md bg-white rounded-lg py-10 px-5"
      >
        {error && <Error mensaje="Todos los campos son obligatorios" />}
        <div className="mb-5">
          <label htmlFor="mascota" className="text-gray-700 uppercase">
            Nombre Mascota
          </label>
          <input
            id="mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="text"
            placeholder="Nombre de la Mascota"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="propietario" className="text-gray-700 uppercase">
            Nombre Propietario
          </label>
          <input
            id="propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="text"
            placeholder="Nombre de la Propietario"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="text-gray-700 uppercase">
            Email
          </label>
          <input
            id="email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="email"
            placeholder="Email Contacto Propietario"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="alta" className="text-gray-700 uppercase">
            Alta
          </label>
          <input
            id="alta"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="sintomas" className="text-gray-700 uppercase">
            Alta
          </label>
          <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los sintomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
          value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}
        ></input>
      </form>
    </div>
  );
};

export default Formulario;
