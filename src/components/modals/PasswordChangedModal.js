//----IMPORTS----//
//React
import React, { useContext } from 'react';
//React native
import { View, Text, Modal, TouchableOpacity } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//React-native-vector-icons package
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';
const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Components
import { Spacer } from "../shared";
//Localization
import translator from "../../translator/translator";
//Styles
import styles from "../../styles/components/modals/shared-modal-styles";
import { app_styles } from "../../styles/app_styles";



//----COMPONENT----//
const PasswordChangedModal = ({ isOpened, closeCallback }) => {
    //Data and State
    const { state: { scales, language } } = useContext(AppSettingsContext);



    //Template
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isOpened}
        >
            <View style={styles(scales).modal_content_container}>
                <View style={styles(scales).modal_card}>                    
                    {/* Card body */}
                    <View style={styles(scales).card_body}>
                        <View style={styles(scales).icon_container}>
                            <IcoMoonIcon name="login" color={app_styles(scales).colors.app.blue} size={Math.round(scales.widthScale * 50)} />
                        </View>
                        <Spacer spaceHeight={16} />
                        <Text style={styles(scales).card_title}>{translator.translate(language, "Пароль успішно змінено")}</Text>
                        <Spacer spaceHeight={8} />
                        <Text style={styles(scales).info}>{translator.translate(language, "Забудьте старий пароль та використовуйте новий для входу в додаток")}</Text>
                    </View>
                    {/* Close button */}
                    <TouchableOpacity onPress={closeCallback} style={styles(scales).close_modal_button}>
                        <IcoMoonIcon name="cancel" color={app_styles(scales).colors.text.primary} size={Math.round(scales.widthScale * 14)} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}




//----EXPORT----//
export default PasswordChangedModal;