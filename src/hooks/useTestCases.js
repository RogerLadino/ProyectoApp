import { useState } from 'react';

export const useTestCases = () => {
  const [pruebas, setPruebas] = useState([]);

  const agregarPrueba = () => {
    setPruebas((prev) => [
      ...prev,
      {
        nombreFuncion: '',
        entrada: [],
        salida: { tipo: 'string', valor: '' },
      },
    ]);
  };

  const eliminarPrueba = (index) => {
    setPruebas((prev) => prev.filter((_, i) => i !== index));
  };

  const actualizarPrueba = (index, newData) => {
    setPruebas((prev) =>
      prev.map((p, i) => (i === index ? { ...p, ...newData } : p))
    );
  };

  const agregarParametro = (index) => {
    setPruebas((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        entrada: [...updated[index].entrada, { tipo: 'string', valor: '' }],
      };
      return updated;
    });
  };

  const eliminarParametro = (pIndex, paramIndex) => {
    setPruebas((prev) => {
      const updated = [...prev];
      updated[pIndex] = {
        ...updated[pIndex],
        entrada: updated[pIndex].entrada.filter((_, i) => i !== paramIndex),
      };
      return updated;
    });
  };

  const actualizarParametro = (pIndex, paramIndex, key, value) => {
    setPruebas((prev) => {
      const updated = [...prev];
      updated[pIndex].entrada[paramIndex][key] = value;
      return updated;
    });
  };

  const actualizarSalida = (index, key, value) => {
    setPruebas((prev) => {
      const updated = [...prev];
      updated[index].salida[key] = value;
      return updated;
    });
  };

  const getParsedTestCases = (exerciseId = null) => {
    return pruebas.map((p) => {
      const parsedEntrada = p.entrada.map(({ tipo, valor }) => {
        switch (tipo) {
          case 'int':
            return Number.parseInt(valor, 10);
          case 'float':
            return Number.parseFloat(valor);
          case 'boolean':
            return valor === 'true' || valor === true;
          case 'string':
          default:
            return valor.toString();
        }
      });

      let parsedSalida;
      switch (p.salida.tipo) {
        case 'int':
          parsedSalida = [Number.parseInt(p.salida.valor, 10)];
          break;
        case 'float':
          parsedSalida = [Number.parseFloat(p.salida.valor)];
          break;
        case 'boolean':
          parsedSalida = [p.salida.valor === 'true' || p.salida.valor === true];
          break;
        case 'string':
        default:
          parsedSalida = [p.salida.valor.toString()];
          break;
      }

      const result = {
        functionName: p.nombreFuncion,
        inputData: JSON.stringify(parsedEntrada),
        expectedOutput: JSON.stringify(parsedSalida),
      };

      if (p.id) {
        result.id = p.id;
      }

      if (exerciseId !== null && exerciseId !== undefined) {
        result.exerciseId = exerciseId;
      }

      return result;
    });
  };

  const parseTestCases = (apiTestCases) => {
    return apiTestCases.map((tc) => {
      let entrada = [];
      let salida = { tipo: 'string', valor: '' };

      try {
        const inputs = JSON.parse(tc.inputData);
        entrada = inputs.map((val) => {
          if (typeof val === 'number' && Number.isInteger(val)) {
            return { tipo: 'int', valor: val.toString() };
          } else if (typeof val === 'number') {
            return { tipo: 'float', valor: val.toString() };
          } else if (typeof val === 'boolean') {
            return { tipo: 'boolean', valor: val.toString() };
          } else {
            return { tipo: 'string', valor: val.toString() };
          }
        });

        const outputs = JSON.parse(tc.expectedOutput);
        const val = outputs[0];
        if (typeof val === 'number' && Number.isInteger(val)) {
          salida = { tipo: 'int', valor: val.toString() };
        } else if (typeof val === 'number') {
          salida = { tipo: 'float', valor: val.toString() };
        } else if (typeof val === 'boolean') {
          salida = { tipo: 'boolean', valor: val.toString() };
        } else {
          salida = { tipo: 'string', valor: val.toString() };
        }
      } catch (error) {
        console.error('Error parsing test case:', error, tc);
      }

      return {
        id: tc.id,
        exerciseId: tc.exerciseId,
        nombreFuncion: tc.functionName,
        entrada,
        salida,
      };
    });
  };

  return {
    pruebas,
    setPruebas,
    agregarPrueba,
    eliminarPrueba,
    actualizarPrueba,
    agregarParametro,
    eliminarParametro,
    actualizarParametro,
    actualizarSalida,
    getParsedTestCases,
    parseTestCases,
  };
};
