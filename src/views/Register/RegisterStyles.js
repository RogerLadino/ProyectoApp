import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Colores basados en el CSS original
export const COLORS = {
    BACKGROUND: '#1e1919',
    PRIMARY: '#ff6e6e', // Color principal (el círculo y los enlaces)
    TEXT: '#fff',
    INPUT_BG: '#2d2727',
    BUTTON_TEXT: '#fff',
    ERROR: '#dc3545',
    SUCCESS: '#28a745',
};

export const registerStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
    },
    // Contenedor principal que centra el contenido
    registerWrapper: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    // Contenedor del formulario (max-width para tablet/desktop)
    registerContainer: {
        width: '100%',
        maxWidth: 400,
        padding: 20,
        backgroundColor: COLORS.BACKGROUND,
    },

    // Header (Logo)
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        gap: 10,
    },
    circle: {
        width: 28,
        height: 28,
        backgroundColor: COLORS.PRIMARY,
        borderRadius: 14,
    },
    brand: {
        fontSize: 13,
        color: COLORS.TEXT,
        fontWeight: 'bold', // Añadido para mejor visibilidad
    },
    title: {
        textAlign: 'center',
        marginBottom: 25,
        fontWeight: '500',
        fontSize: 24, 
        color: COLORS.TEXT,
    },

    // Mensajes de Estado (Alerts)
    alert: {
        padding: 12,
        borderRadius: 6,
        marginBottom: 16,
        borderWidth: 1,
    },
    alertSuccess: {
        backgroundColor: 'rgba(40, 167, 69, 0.15)',
        borderColor: COLORS.SUCCESS,
    },
    alertDanger: {
        backgroundColor: 'rgba(220, 53, 69, 0.15)',
        borderColor: COLORS.ERROR,
    },
    alertText: {
        fontSize: 14,
        color: COLORS.TEXT,
        textAlign: 'center',
    },

    // Formulario y Campos
    form: {
        width: '100%',
    },
    fieldContainer: {
        marginBottom: 15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    col: {
        width: '48%', // Simula col-6
    },
    formLabel: {
        fontSize: 12,
        marginBottom: 4,
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
        backgroundColor: COLORS.BACKGROUND,
    },
    formControl: {
        height: 40,
        backgroundColor: COLORS.INPUT_BG,
        borderRadius: 6,
        paddingHorizontal: 10,
        color: COLORS.TEXT,
        fontSize: 14,
    },
    
    // Estilos específicos para Picker
    pickerWrapper: {
        backgroundColor: COLORS.INPUT_BG,
        borderRadius: 6,
        overflow: 'hidden', // Asegura que el color de fondo se aplique
        height: 40,
        justifyContent: 'center',
    },
    picker: {
        height: 40,
        color: COLORS.TEXT,
    },
    pickerItem: {
        fontSize: 14,
        color: COLORS.TEXT, 
    },

    // Botón de Submit
    submitBtn: {
        height: 48,
        backgroundColor: COLORS.PRIMARY,
        borderRadius: 8,
        fontWeight: 'bold',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background-color 0.2s ease',
    },
    btnDisabled: {
        opacity: 0.6,
    },
    submitBtnText: {
        color: COLORS.BUTTON_TEXT,
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    // Pie de página
    footer: {
        textAlign: 'center',
        fontSize: 13,
        marginTop: 15,
        color: '#ccc',
    },
    footerLink: {
        fontWeight: 'bold',
        color: COLORS.PRIMARY,
        textDecorationLine: 'underline',
    },
});