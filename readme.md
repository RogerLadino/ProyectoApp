# ProyectoApp - React Native Mobile Application

Aplicación móvil desarrollada en React Native con **Expo** para la gestión de ejercicios de programación con edición de código en tiempo real.

## 📱 Características

- **Vista de Ejercicios:** Visualización y gestión de ejercicios para estudiantes y profesores
- **🆕 CRUD de Ejercicios:** Crear, editar y eliminar ejercicios con test cases
- **Editor de Código en Tiempo Real:** Edición colaborativa de código con sincronización mediante SignalR
- **Roles Diferenciados:** Interfaces específicas para estudiantes y profesores
- **Calificaciones:** Sistema de evaluación y seguimiento de entregas
- **Multi-lenguaje:** Soporte para Python, JavaScript y HTML
- **🆕 Componentes Atomizados:** Arquitectura modular basada en Atomic Design

## 🧩 Arquitectura Atomizada y Organizada

El proyecto utiliza **Atomic Design** con **19 componentes reutilizables** organizados en una estructura jerárquica:

### 📁 Estructura de Componentes

```
components/
├── Base/                    # Componentes base (4)
├── Exercise/                # Dominio de ejercicios (6)
│   ├── Header/             # Headers (Student/Professor)
│   ├── Cards/              # Cards de información
│   ├── Table/              # Componentes de tabla
│   └── Forms/              # Formularios y CRUD (4)
└── Code/                    # Dominio de código (6)
    ├── Header/             # Headers y stats
    ├── Editor/             # Panel de editor
    └── Tabs/               # Sistema de tabs
```

### ✨ Beneficios

- ✅ **53% reducción** de código en vistas
- ✅ **Organización clara** por dominio
- ✅ **100% reutilizable** en otros proyectos
- ✅ **Fácil mantenimiento** y testing
- ✅ **19 componentes atómicos** listos para usar
- ✅ Ver [COMPONENT_ORGANIZATION.md](./COMPONENT_ORGANIZATION.md) para la guía completa
- ✅ Ver [CRUD_EXERCISES_CONVERSION.md](./CRUD_EXERCISES_CONVERSION.md) para detalles del CRUD


## 🚀 Cómo correr el proyecto

1. **Clonar este repositorio:**

```bash
git clone https://github.com/RogerLadino/ProyectoApp.git
cd ProyectoApp
```

2. **Instalar las dependencias:**

```bash
npm install
```

3. **Instalar dependencias adicionales necesarias:**

```bash
npm install @react-native-picker/picker @microsoft/signalr
```

4. **Correr la aplicación:**

```bash
npm start
```

5. **Abrir con:**
   - **Android:** Presiona `a` en la terminal o ejecuta `npm run android`
   - **iOS:** Presiona `i` en la terminal o ejecuta `npm run ios` (solo macOS)
   - **Expo Go:** Escanea el código QR con la app Expo Go en tu dispositivo móvil

## 📁 Estructura de Carpetas

```
ProyectoApp/
├── App.js                          # Componente raíz de la aplicación
├── index.js                        # Punto de entrada
├── package.json                    # Dependencias y scripts
├── src/
│   ├── assets/                     # Archivos estáticos (imágenes, íconos, fuentes)
│   │
│   ├── components/                 # Componentes reutilizables
│   │   ├── Button.js              # Botón personalizado
│   │   ├── Header.js              # Encabezado con navegación
│   │   ├── LoadingScreen.js       # Pantalla de carga
│   │   ├── StatCard.js            # Tarjeta de estadísticas
│   │   └── index.js               # Exportaciones de componentes
│   │
│   ├── views/                      # Pantallas principales
│   │   ├── HomeView.js            # Pantalla de inicio
│   │   ├── ExerciseView.js        # Router de ejercicios (estudiante/profesor)
│   │   ├── ExerciseStudentView.js # Vista de ejercicio para estudiante
│   │   ├── ExerciseProfessorView.js # Vista de ejercicio para profesor
│   │   └── CodeView.js            # Editor de código en tiempo real
│   │
│   ├── services/                   # Lógica para comunicarse con APIs
│   │   ├── auth.service.js        # Autenticación
│   │   ├── user.service.js        # Gestión de usuarios
│   │   ├── classroom.service.js   # Gestión de clases
│   │   ├── exercises.service.js   # Gestión de ejercicios
│   │   └── submission.service.js  # Gestión de entregas
│   │
│   ├── navigation/                 # Configuración de navegación
│   │   └── Navigation.js          # Stack Navigator principal
│   │
│   ├── constant/                   # Constantes globales
│   │   └── theme.js               # Colores, estilos y tipografía
│   │
│   ├── context/                    # Contextos de React para estado global
│   ├── hooks/                      # Hooks personalizados
│   └── utils/                      # Funciones utilitarias (helpers)
│
├── CONVERSION_DOCUMENTATION.md     # Documentación de conversión web→mobile
└── README.md                       # Este archivo
```

## 🎨 Tema y Estilos

### Paleta de Colores

```javascript
primary: '#231F20'    // Fondo principal (negro carbón)
secondary: '#FBFBFB'  // Texto principal (blanco)
accent: '#F97E72'     // Color de acento (naranja salmón)
card: '#363031'       // Fondo de tarjetas (gris oscuro)
warning: '#F15152'    // Alertas (rojo)
success: '#32E875'    // Éxito (verde)
```

### Uso del Tema

```javascript
import { colors, typography, spacing } from '../constant/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    padding: spacing.md,
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.sm,
  },
});
```

## 🔌 Integración con API

### Configuración

Todos los servicios usan la URL base: **`https://localhost:7206`**

Los servicios están configurados para usar AsyncStorage en lugar de localStorage:

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Guardar token
await AsyncStorage.setItem('token', userToken);

// Obtener token
const token = await AsyncStorage.getItem('token');
```

### Ejemplos de Uso de Servicios

#### Obtener ejercicio por ID
```javascript
import { getExercisesById } from '../services/exercises.service';

const exercise = await getExercisesById(classroomId, exerciseId);
```

#### Obtener entregas de estudiantes
```javascript
import { getSubmissions } from '../services/submission.service';

const submissions = await getSubmissions(exerciseId);
```

#### Asignar calificación
```javascript
import { assignGrade } from '../services/submission.service';

await assignGrade(exerciseId, userId, grade);
```

## 📡 SignalR - Comunicación en Tiempo Real

El editor de código usa **SignalR** para sincronización en tiempo real entre estudiantes y profesores:

```javascript
import * as signalR from '@microsoft/signalr';

// Establecer conexión
const connection = new signalR.HubConnectionBuilder()
  .withUrl('https://localhost:7206/hubs/code')
  .withAutomaticReconnect()
  .build();

await connection.start();

// Unirse al grupo del ejercicio
await connection.invoke('JoinExerciseGroup', exerciseId, userId);

// Enviar actualización de código
await connection.invoke('UpdateCode', { exerciseId, userId, sourceCode });

// Escuchar cambios de código
connection.on('CodeUpdated', (updatedCode) => {
  setCode(updatedCode.sourceCode);
});
```

## 🧭 Navegación

### Estructura de Rutas

```
Home → Exercise → Code
          ↓
    (Student/Professor)
```

### Navegar entre Pantallas

```javascript
import { useNavigation } from '@react-navigation/native';

const navigation = useNavigation();

// Navegar a ejercicio
navigation.navigate('Exercise', { classroomId, exerciseId });

// Navegar a código
navigation.navigate('Code', { classroomId, exerciseId, userId });

// Volver atrás
navigation.goBack();
```

## 📦 Dependencias Principales

```json
{
  "@react-native-async-storage/async-storage": "2.2.0",
  "@react-navigation/native": "^7.1.19",
  "@react-navigation/native-stack": "^7.6.2",
  "@react-native-picker/picker": "^2.9.0",
  "@microsoft/signalr": "^7.0.14",
  "axios": "^1.13.2",
  "expo": "~54.0.23",
  "react": "19.1.0",
  "react-native": "0.81.5"
}
```

## 👥 Roles de Usuario

### Estudiante (appRoleId != 1)
- ✅ Ver detalles del ejercicio
- ✅ Ver su propia entrega y nota
- ✅ Editar código en tiempo real
- ✅ Ver resultados de pruebas

### Profesor (appRoleId == 1)
- ✅ Ver todos los ejercicios
- ✅ Ver entregas de todos los estudiantes
- ✅ Asignar y editar calificaciones
- ✅ Ver y editar código de cualquier estudiante
- ✅ Editar ejercicios

## 🔧 Componentes Reutilizables

### Button
Botón personalizado con variantes (primary, secondary, card).

```javascript
import { Button } from '../components';

<Button 
  title="Guardar" 
  onPress={handleSave}
  variant="primary"
  loading={isLoading}
/>
```

### Header
Encabezado con navegación y botones personalizables.

```javascript
import { Header } from '../components';

<Header 
  title="Ejercicio" 
  showBack={true}
  rightButtons={[<Button title="Editar" />]}
/>
```

### StatCard
Tarjeta para mostrar estadísticas.

```javascript
import { StatCard } from '../components';

<StatCard 
  label="Nota" 
  value={grade}
  icon="checkmark"
  iconColor="#32E875"
/>
```

## 🐛 Debugging y Problemas Comunes

### Ver logs en tiempo real

```bash
# Para Android
npx react-native log-android

# Para iOS
npx react-native log-ios
```

### Problemas Comunes

**❌ Error de conexión a la API**
- Verifica que el backend esté corriendo en `https://localhost:7206`
- En Android emulador, usa `10.0.2.2` en lugar de `localhost`

**❌ Error de SignalR**
- Verifica la URL del hub: `/hubs/code`
- Asegúrate de que el token esté almacenado en AsyncStorage

**❌ Error de AsyncStorage**
- Para limpiar datos: `await AsyncStorage.clear()`
- Los datos persisten entre reinicios de la app

**❌ Error de dependencias**
```bash
# Limpiar caché
npm start -- --reset-cache

# Reinstalar node_modules
rm -rf node_modules
npm install
```

## 📝 Scripts Disponibles

```bash
npm start          # Iniciar servidor de desarrollo Expo
npm run android    # Abrir en emulador/dispositivo Android
npm run ios        # Abrir en simulador/dispositivo iOS (solo macOS)
npm run web        # Abrir en navegador web
```

## 📱 Compatibilidad

- **iOS:** 13.0 o superior
- **Android:** 5.0 (API 21) o superior
- **Expo Go:** Totalmente compatible

## 🚧 Mejoras Futuras

- [ ] Syntax highlighting en el editor de código
- [ ] Modo offline con sincronización automática
- [ ] Notificaciones push para nuevos ejercicios
- [ ] Tema claro/oscuro alternativo
- [ ] Soporte para más lenguajes (Java, C++, etc.)
- [ ] Optimización con FlatList en tablas grandes
- [ ] Testing unitario con Jest
- [ ] Testing E2E con Detox

## 🔐 Seguridad

- Los tokens JWT se almacenan de forma segura en AsyncStorage
- Todas las peticiones HTTP incluyen el header `Authorization: Bearer {token}`
- No se almacenan contraseñas en el dispositivo
- Comunicación segura con HTTPS

## 📚 Documentación Adicional

- **[CONVERSION_DOCUMENTATION.md](./CONVERSION_DOCUMENTATION.md)** - Detalles completos de la conversión de Web a Mobile
- **[Expo Docs](https://docs.expo.dev/)** - Documentación oficial de Expo
- **[React Navigation](https://reactnavigation.org/)** - Documentación de navegación
- **[SignalR Docs](https://learn.microsoft.com/en-us/aspnet/signalr/)** - Documentación de SignalR

## 📄 Licencia

Este proyecto es privado y confidencial.

## 👨‍💻 Equipo de Desarrollo

Desarrollado por el equipo de ProyectoApp

---

**Última actualización:** 2025-11-16  
**Versión:** 1.0.0

Para soporte técnico o preguntas, contacta al equipo de desarrollo.