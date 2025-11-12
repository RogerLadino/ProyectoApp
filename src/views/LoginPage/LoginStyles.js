import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Colores basados en el CSS original
const COLORS = {
    BACKGROUND: '#1f1a1a',
    PRIMARY: '#ff7e70', // Color principal (el círculo y los enlaces)
    TEXT: '#fff',
    INPUT_BG: '#2e2828',
    BUTTON_TEXT: '#1f1a1a',
    ERROR: '#dc3545',
    SUCCESS: '#28a745',
};

export const loginStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
    },
    // Contenedor principal que centra el contenido
    loginWrapper: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    // Contenedor del formulario (max-width para tablet/desktop)
    loginContainer: {
        width: '100%',
        maxWidth: 400, // Simulación de 'width: 60%' en pantallas más grandes
        padding: 30,
        borderRadius: 12,
        backgroundColor: COLORS.BACKGROUND, // Usamos el fondo principal
    },

    // Logo y Títulos
    logoLink: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    circle: {
        width: 30,
        height: 30,
        backgroundColor: COLORS.PRIMARY,
        borderRadius: 15,
        marginRight: 10,
    },
    logoText: {
        fontSize: 14,
        color: COLORS.TEXT,
        fontWeight: 'bold',
    },
    title: {
        marginBottom: 40,
        fontWeight: '300',
        fontSize: 35, // 2.2rem
        color: COLORS.TEXT,
        textAlign: 'center',
    },

    // Mensajes de Estado (Alerts)
    alert: {
        padding: 12,
        borderRadius: 6,
        marginBottom: 16,
        borderWidth: 1,
    },
    alertSuccess: {
        backgroundColor: 'rgba(40, 167, 69, 0.15)', // Verde tenue
        borderColor: COLORS.SUCCESS,
    },
    alertDanger: {
        backgroundColor: 'rgba(220, 53, 69, 0.15)', // Rojo tenue
        borderColor: COLORS.ERROR,
    },
    alertText: {
        fontSize: 14,
        color: COLORS.TEXT,
        textAlign: 'center',
    },

    // Etiquetas y Dots
    fieldContainer: {
        marginBottom: 20,
    },
    formLabel: {
        marginBottom: 8, 
        flexDirection: 'row', 
        alignItems: 'center',
        gap: 6,
    },
    dot: {
        width: 10,
        height: 10,
        borderWidth: 2,
        borderColor: COLORS.TEXT,
        borderRadius: 5,
        backgroundColor: COLORS.BACKGROUND, // Simula el borde
    },
    labelText: {
        fontSize: 13,
        color: COLORS.TEXT,
    },

    // Inputs (TextInputs)
    formControl: {
        height: 44, // Altura estándar para un buen toque
        backgroundColor: COLORS.INPUT_BG, 
        borderWidth: 0,
        borderRadius: 5,
        color: COLORS.TEXT,
        fontSize: 14,
        paddingHorizontal: 12,
    },

    // Botón de Acción
    btnPrimary: { 
        height: 48,
        backgroundColor: COLORS.PRIMARY, 
        paddingHorizontal: 25,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    btnDisabled: {
        opacity: 0.6,
    },
    loadingContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnText: {
        color: COLORS.BUTTON_TEXT,
        fontSize: 16,
        fontWeight: 'bold',
    },

    // Texto de Pie de Página
    footerLinks: {
        marginTop: 40, 
        textAlign: 'center',
    },
    footerText: {
        fontSize: 13,
        lineHeight: 20, 
        color: '#ccc',
        marginBottom: 10,
        textAlign: 'center',
    },
    footerLink: {
        color: COLORS.PRIMARY, 
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});