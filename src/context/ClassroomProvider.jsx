import React, { useState, useEffect, createContext, useCallback } from "react";
import * as classroomService from "../services/classroom.service";
import { Alert } from "react-native";

export const ClassroomContext = createContext();

export default function ClassroomProvider({ children }) {
  const [classrooms, setClassrooms] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [currentClassroomId, setCurrentClassroomId] = useState(null);
  const [currentClassroom, setCurrentClassroom] = useState(null);

  /** 🔔 Manejo de alertas */
  const removeAlert = useCallback((alertId) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
  }, []);

  const pushAlert = useCallback((category, message, autoClose = 4000) => {
    const id = Date.now().toString();
    const alertType = category === "success" ? "Éxito" : "Error";
    
    setAlerts((prev) => [...prev, { id, category, message }]);
    
    Alert.alert(alertType, message);
    
    if (autoClose) {
      setTimeout(() => removeAlert(id), autoClose);
    }
  }, [removeAlert]);

  /** 🌐 Carga inicial de aulas desde el backend */
  const fetchClassrooms = async () => {
    try {
      const data = await classroomService.getMyClassrooms();
      setClassrooms(data);
    } catch (err) {
      console.error('Error al cargar clases:', err);
      const errorMessage = err.response?.data?.message 
        || err.response?.data?.detail 
        || err.message 
        || "Error cargando aulas.";
      pushAlert("danger", errorMessage);
    }
  };

  /** ➕ Unirse a una clase mediante código */
  const joinClassroom = async (code) => {
    try {
      const aula = await classroomService.joinClassroom(code);
      await fetchClassrooms();
      pushAlert("success", "Te uniste a la clase correctamente.");
      return aula;
    } catch (err) {
      console.error('Error al unirse a la clase:', err);
      const errorMessage = err.response?.data?.message 
        || err.response?.data?.detail 
        || err.message 
        || "No se pudo unir a la clase.";
      pushAlert("danger", errorMessage);
      throw err;
    }
  };

  /** ➕ Añadir aula manual/local (sin API) */
  const addClassroom = (newClassroom) => {
    setClassrooms((prev) => [...prev, newClassroom]);
  };

  /** ✏️ Actualizar aula manual/local (sin API) */
  const updateClassroom = (id, updatedData) => {
    setClassrooms((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedData } : c))
    );
  };

  /** 🎯 Establecer el aula actual */
  const selectClassroom = (classroom) => {
    const id = classroom.id || classroom.idAula;
    setCurrentClassroomId(id);
    setCurrentClassroom(classroom);
  };

  return (
    <ClassroomContext.Provider
      value={{
        classrooms,
        alerts,
        currentClassroomId,
        currentClassroom,
        pushAlert,
        fetchClassrooms,
        joinClassroom,
        addClassroom,
        updateClassroom,
        selectClassroom,
      }}
    >
      {children}
    </ClassroomContext.Provider>
  );
}