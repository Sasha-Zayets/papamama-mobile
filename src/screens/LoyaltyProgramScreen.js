import React, {useContext} from 'react';
import { View, Text } from 'react-native';
import {SafeView} from "../components/shared";
import Header from "../components/shared/Header";
import styles from '../styles/screens/loyalty-program-screen';
import {Context as AppSettingsContext} from "../context/AppSettingsContext";

const LoyaltyProgram = ({navigation}) => {
  //Data and State
  const {state: {language, scales}} = useContext(AppSettingsContext);

  return (
      <>
        <SafeView>
          <Header
              appMenu
              backAllowed
              navigation={navigation}
              title="Програма лояльності"
              noIcons
          />

          <View style={styles(scales).container}>
            <Text style={styles(scales).content}>
              Отримуйте бали за користування додатком,
              накопичуйте та розраховуйтесь ними:
              <Text style={styles(scales).text_red}> 1 бал - 0.10грн</Text>
            </Text>
            <Text style={styles(scales).label}>
              Як отримати бали?
            </Text>
            <Text style={styles(scales).content}>
              Після реєстрації в додатку ви отримаєте
              <Text style={styles(scales).text_red}> 25 балів </Text> в подарунок
            </Text>
            <Text style={styles(scales).content}>
              Отримуйте бали під час кожного замовлення у додатку PapaMama - 5% від вартості замовлення
с            </Text>
          </View>
        </SafeView>
      </>
  )
}

export default LoyaltyProgram;