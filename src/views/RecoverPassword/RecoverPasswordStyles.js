import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Constantes de color y configuracion, basadas en el CSS
export const CODE_LENGTH = 6;
export const COLORS = {
    BACKGROUND: '#1e1919',  // body background-color
    INPUT_BG: '#2d2727',    // input background-color, verify-btn background-color
    PRIMARY: '#f47c7c',     // .circle background-color
    TEXT_LIGHT: '#ccc',     // .description color
    TEXT_DARK: '#333',      // color de texto en submit-btn
    TEXT_WHITE: '#fff',     // body color, input color, verify-btn color, code-inputs border
};

// Estilos convertidos a React Native StyleSheet.create
export const styles = StyleSheet.create({
    // Estilos globales (body/Safe Area/Wrapper)
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
    },
    wrapper: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    container: {
        width: '100%',
        maxWidth: 400, // .container max-width
        padding: 20,    // .container padding
        alignItems: 'center',
    },
    
    // Logo
    logo: {
        flexDirection: 'row', // display: flex
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 10,
    },
    circle: {
        backgroundColor: COLORS.PRIMARY,
        borderRadius: 15, // 50% de 30px es 15px
        width: 30,
        height: 30,
    },
    brandText: {
        color: COLORS.TEXT_WHITE,
        fontSize: 18,
        fontWeight: 'bold',
    },
    
    // Títulos y descripción
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.TEXT_WHITE,
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: COLORS.TEXT_LIGHT,
        textAlign: 'center',
        marginBottom: 20,
    },

    // Etiquetas y campos de input
    form: {
        width: '100%',
    },
    inputLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        justifyContent: 'flex-start',
        marginBottom: 5,
        width: '100%',
    },
    labelText: {
        color: COLORS.TEXT_WHITE,
        fontSize: 12,
    },
    circleEmpty: {
        width: 12,
        height: 12,
        borderWidth: 2,
        borderColor: COLORS.TEXT_WHITE,
        borderRadius: 6,
    },
    inputContainer: {
        marginBottom: 20,
        width: '100%',
        position: 'relative', // Para posicionar el ícono de envío
        flexDirection: 'row', // Simular el display: flex
        alignItems: 'center',
    },
    formControl: {
        flex: 1, // Para que tome el ancho completo dentro de inputContainer
        height: 50,
        paddingHorizontal: 15,
        borderWidth: 0,
        backgroundColor: COLORS.INPUT_BG,
        borderRadius: 5,
        color: COLORS.TEXT_WHITE,
        fontSize: 14,
    },
    
    // Icono de envío (React Native usa Pressable o Button)
    sendIcon: {
        position: 'absolute',
        right: 10,
        padding: 0,
        // En RN, la apariencia se controla por las props, no por CSS hover
    },
    iconImg: {
        width: 20,
        height: 20,
    },

    // OTP Inputs
    codeSection: {
        marginBottom: 30,
    },
    codeInputs: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Centrar y espaciar
        width: '100%',
        gap: width < 400 ? 5 : 10, // gap: 10px del CSS
    },
    codeInput: {
        width: width < 400 ? 40 : 50, // width: 40px del CSS, ajustado
        height: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.TEXT_WHITE,
        backgroundColor: 'transparent',
        color: COLORS.TEXT_WHITE,
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
    },

    // Botones (RN usa Pressable)
    buttonGroup: {
        width: '100%',
    },
    submitBtn: {
        height: 50,
        backgroundColor: '#EFEFEF', // .submit-btn background-color
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        color: COLORS.TEXT_DARK, // .submit-btn color
        fontSize: 16,
        fontWeight: 'bold',
    },
    verifyBtn: {
        height: 50,
        backgroundColor: COLORS.INPUT_BG, // .verify-btn background-color
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        // Nota: se debe aplicar un estilo de texto para el color.
    },
    verifyBtnText: {
        color: COLORS.TEXT_WHITE, // .verify-btn color
        fontSize: 16,
        fontWeight: 'bold',
    },
    
    // Estilos para deshabilitar o estados intermedios
    btnDisabled: {
        opacity: 0.5,
    },
    loadingContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    // Estilos de enlace
    linkBtn: {
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
    },
    linkBtnText: {
        color: COLORS.PRIMARY, // Asumiendo que el link usa el color primario
        fontSize: 14,
        textDecorationLine: 'underline',
    }
});


