# Sistema de Notificaciones y Manejo de Errores

## 📦 Componentes Creados

### 1. **NotificationContext.js**
Context que proporciona el estado y funciones para manejar notificaciones.

### 2. **NotificationBar.js**
Componente visual de la barra de notificación individual.

### 3. **NotificationContainer.js**
Contenedor que renderiza todas las notificaciones activas.

## 🚀 Cómo usar

### En cualquier componente:

```javascript
import { useNotification } from '../context/NotificationContext';

const MyComponent = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();

  const handleSuccess = () => {
    showSuccess('¡Operación exitosa!');
  };

  const handleError = () => {
    showError('Error al procesar la solicitud');
  };

  const handleWarning = () => {
    showWarning('Advertencia: Verifica los datos', 5000); // 5 segundos
  };

  const handleInfo = () => {
    showInfo('Información importante');
  };

  return (
    // Tu componente
  );
};
```

### En servicios de API:

```javascript
import { useNotification } from '../context/NotificationContext';

export const createExercise = async (data) => {
  const { showSuccess, showError } = useNotification();
  
  try {
    const response = await fetch('/api/exercises', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Error al crear ejercicio');
    }
    
    showSuccess('Ejercicio creado correctamente');
    return await response.json();
  } catch (error) {
    showError(error.message || 'Error desconocido');
    throw error;
  }
};
```

### En contextos (Exercise, Code, etc.):

```javascript
import { useNotification } from './NotificationContext';

export const ExerciseProvider = ({ children }) => {
  const { showSuccess, showError } = useNotification();

  const createNewExercise = async (data) => {
    try {
      const result = await api.createExercise(data);
      showSuccess('Ejercicio creado exitosamente');
      return result;
    } catch (error) {
      showError('No se pudo crear el ejercicio');
      throw error;
    }
  };

  // ... resto del provider
};
```

## 🎨 Tipos de Notificaciones

- **success** (verde): Operaciones exitosas
- **error** (rojo): Errores y fallos
- **warning** (amarillo): Advertencias
- **info** (azul): Información general

## ⚙️ Parámetros

```javascript
showNotification(message, type, duration)
// o usar los helpers:
showSuccess(message, duration) // default: 3000ms
showError(message, duration)
showWarning(message, duration)
showInfo(message, duration)
```

## ✨ Características

- ✅ Animaciones suaves de entrada/salida
- ✅ Múltiples notificaciones apiladas
- ✅ Cierre automático configurable
- ✅ Cierre manual con botón X
- ✅ 4 tipos de notificación con colores distintos
- ✅ Iconos descriptivos
- ✅ Responsive y accesible
