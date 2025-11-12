import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const COLORS = {
    PRIMARY: '#f47c7c', // Rojo/Rosa principal
    BACKGROUND_DARK: '#1e1919',
    CARD_DARK: '#2d2727',
    TEXT_WHITE: '#fff',
    TEXT_DARK: '#1e1919',
    INPUT_BG: '#1e1919',
    ALERT_SUCCESS_BG: '#216d3f',
    ALERT_SUCCESS_TEXT: '#d1e7dd',
    ALERT_DANGER_BG: '#842029',
    ALERT_DANGER_TEXT: '#f8d7da',
    ALERT_WARNING_BG: '#664d03',
    ALERT_WARNING_TEXT: '#ffc107',
    PLACEHOLDER: '#a0a0a0',
    DISABLED: '#3c3c3c',
};

export const CODE_LENGTH = 6;
export const MIN_PASSWORD_LENGTH = 8;


export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND_DARK,
    },
    wrapper: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    container: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: COLORS.CARD_DARK,
        borderRadius: 12,
        padding: 30,
        maxWidth: 450,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    logo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
        gap: 8,
    },
    circle: {
        backgroundColor: COLORS.PRIMARY,
        borderRadius: 50,
        width: 30,
        height: 30,
    },
    brandText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.PRIMARY,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        color: COLORS.TEXT_WHITE,
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: '#ccc',
        textAlign: 'center',
        marginBottom: 20,
    },
    
    // --- Alertas ---
    alert: {
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        alignItems: 'center',
    },
    alertSuccess: {
        backgroundColor: COLORS.ALERT_SUCCESS_BG,
    },
    alertDanger: {
        backgroundColor: COLORS.ALERT_DANGER_BG,
    },
    alertWarning: {
        backgroundColor: COLORS.ALERT_WARNING_BG,
    },
    alertText: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.ALERT_SUCCESS_TEXT,
        textAlign: 'center',
    },

    // --- Formularios ---
    form: {
        width: '100%',
    },
    inputLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
        marginTop: 15,
    },
    labelText: {
        fontSize: 13,
        color: '#ccc',
        fontWeight: '500',
    },
    circleEmpty: {
        width: 10,
        height: 10,
        borderWidth: 2,
        borderColor: COLORS.PRIMARY,
        borderRadius: 50,
    },
    inputContainer: {
        width: '100%',
        position: 'relative',
    },
    formControl: {
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#443c3c',
        backgroundColor: COLORS.INPUT_BG,
        borderRadius: 8,
        color: COLORS.TEXT_WHITE,
        fontSize: 15,
    },
    inputDisabled: {
        opacity: 0.7,
        backgroundColor: COLORS.DISABLED,
    },
    
    // --- OTP/Code Inputs ---
    codeSection: {
        marginTop: 15,
    },
    codeInputs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    codeInput: {
        width: width / 9, // Adaptado para que sea proporcional al ancho
        height: width / 9,
        borderWidth: 1,
        borderColor: '#443c3c',
        backgroundColor: COLORS.INPUT_BG,
        borderRadius: 8,
        color: COLORS.TEXT_WHITE,
        fontSize: 20,
        textAlign: 'center',
    },

    // --- Botones ---
    buttonGroup: {
        marginTop: 25,
        width: '100%',
    },
    submitBtn: {
        backgroundColor: COLORS.DISABLED, // Color para el botón "Enviar Código" (Paso 1)
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
    },
    submitBtnText: {
        color: COLORS.TEXT_DARK, 
        fontSize: 16,
        fontWeight: 'bold',
    },
    verifyBtn: {
        backgroundColor: COLORS.PRIMARY, // Color para el botón "Verificar Código" / "Restablecer Contraseña" (Paso 2)
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
    },
    verifyBtnText: {
        color: COLORS.TEXT_DARK, 
        fontSize: 16,
        fontWeight: 'bold',
    },
    btnDisabled: {
        opacity: 0.6,
        backgroundColor: COLORS.DISABLED,
    },
    linkBtn: {
        paddingVertical: 10,
        marginTop: 15,
        alignSelf: 'center',
    },
    linkBtnText: {
        color: COLORS.PRIMARY,
        fontSize: 14,
        fontWeight: '600',
    },
    loadingContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});