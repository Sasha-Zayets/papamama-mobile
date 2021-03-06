//----IMPORTS----//
//React native
import { StyleSheet } from 'react-native';
import { app_styles } from "../app_styles";



//----STYLES----//
const styles = (scales) => StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: app_styles(scales).colors.app.white,
    },
    categories_list_container: {
        backgroundColor: app_styles(scales).colors.app.white
    },
    categories_flat_list_container: {
        paddingHorizontal: Math.round(scales.widthScale * 16)
    },
    note: {
        fontSize: Math.round(scales.fontScale * 14),
        fontFamily: app_styles(scales).fonts.weight.regular,
        color: '#999999',
        textAlign: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',   
        paddingVertical: Math.round(scales.heightScale * 40),
        backgroundColor: app_styles(scales).colors.app.white,
    },
    btn_group: {
        width: '100%'
    }
});


//----EXPORT----//
export default styles;