//----IMPORTS----//
//React
import React, {useContext, useState, useEffect} from 'react';
//React native
import {View, ScrollView, Text, Animated, Easing, Linking} from 'react-native';
//Context
import {Context as AppSettingsContext} from "../context/AppSettingsContext";
//React-native-vector-icons package
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../../selection.json';

const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Componetns
import Header from "../components/shared/Header";
import {SafeView, Block, Spacer, DataLoadingIndicator, HorizontalDivider, VerticalSpacer} from "../components/shared";
import {NetworkErrorModal} from "../components/modals";
import ContactsCard from "../components/shared/ContactsCard";
//Navigation Events
import {NavigationEvents} from 'react-navigation';
//Localization
import translator from "../translator/translator";
//Helpers
import {prepareLanguageToHttpRequest, notEmptyString} from "../helpers/helpers";
//Styles
import styles from '../styles/screens/contacts-screen';


//----COMPONENT----//
const ContactsScreen = ({navigation}) => {
  //Data and State
  const {state: {scales, language, emmaPizzaRestaurant, emmaPizzaRestaurantMetaData, settingsNetworkError, screen_width, contacts}, getEmmaPizzaRestaurant, clearSettingsNetworkError} = useContext(AppSettingsContext);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [animatedHeight, setAnimatedHeight] = useState(new Animated.Value(Math.round(scales.heightScale * 270)));
  const [extendedCard, setExtendedCard] = useState(false);


  //Hooks and Methods
  const widenPhoto = () => {
    Animated.timing(animatedHeight, {
      toValue: Math.round(scales.widthScale * 110),
      duration: 300,
      easing: Easing.linear
    }).start();
  }


  const shortenPhoto = () => {
    Animated.timing(animatedHeight, {
      toValue: Math.round(scales.widthScale * 270),
      duration: 300,
      easing: Easing.linear
    }).start();
  }


  const toggleHeight = () => {
    if (extendedCard) {
      shortenPhoto();
    } else {
      widenPhoto();
    }
    setExtendedCard(!extendedCard)
  }


  const getArrowPosition = () => {
    return !extendedCard ? "180deg" : "0deg";
  }

  const handleFocus = async () => {
    if (!Object.keys(emmaPizzaRestaurant).length || emmaPizzaRestaurantMetaData.language !== language) {
      await getRestaurant();
    }
  }

  const getRestaurant = async () => {
    setIsDataLoading(true);
    await getEmmaPizzaRestaurant();
    setIsDataLoading(false);
  }

  const makeCall = () => {
    let cleanedPhoneNumber = emmaPizzaRestaurant.phone.replace(/\D||\s/g, "");

    if (cleanedPhoneNumber.indexOf('38') === 0) {
      cleanedPhoneNumber = cleanedPhoneNumber.substring(2);
    }
    const link = Platform.OS === 'ios' ? `tel://+38${cleanedPhoneNumber}` : `tel:+38${cleanedPhoneNumber}`;
    Linking.openURL(link)
  }

  const sendEmail = () => {
    let address = contacts.email;
    if (!notEmptyString(address)) return;
    let link = `mailto: ${contacts.email}`
    return Linking.openURL(link)
  }

  const openMap = () => {
    let link = emmaPizzaRestaurant.gmap;
    return notEmptyString(link) ? Linking.openURL(link.trim()) : false;
  }

  const hasAtLeLeastOneSocial = () => {
    return notEmptyString(emmaPizzaRestaurant.facebook)
      || notEmptyString(emmaPizzaRestaurant.instagram)
      || notEmptyString(emmaPizzaRestaurant.youtube)
      || notEmptyString(emmaPizzaRestaurant.tripadvisor)
  }


  const handleLink = async (link, type) => {
    if (type === 'instagram') {
      let urlParts = link.split('/');
      let username = urlParts[urlParts.length - 1];
      let url = `instagram://user?username=${username}`;
      try {
        await Linking.openURL(url)
      } catch (err) {
        await Linking.openURL(link.trim())
      }
    } else if (type === 'youtube') {
      let urlParts = link.split('/');
      let chanelName = urlParts[urlParts.length - 1];
      let url = `youtube://chanel=${chanelName}`;
      try {
        await Linking.openURL(url)
      } catch (err) {
        await Linking.openURL(link.trim())
      }
    } else {
      await Linking.openURL(link.trim())
    }
  }




  //Template
  return (
    <>
      <SafeView>
        <NavigationEvents
          onWillFocus={handleFocus}
        />
        <Header
          backAllowed
          navigation={navigation}
          title={translator.translate(language, "Контакти")}
          noIcons
        />


        <View style={styles(scales).body}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            keyboardShouldPersistTaps={'always'}
            contentContainerStyle={{paddingBottom: Math.round(scales.heightScale * 20), flexGrow: 1}}
          >
            {
              !isDataLoading
                ? (
                  !settingsNetworkError
                    ? (
                      <>
                        <View style={styles(scales).container}>
                          <ContactsCard style={styles(scales).contacts_card}/>
                          <ContactsCard style={styles(scales).contacts_card}/>
                          <ContactsCard style={styles(scales).contacts_card}/>
                        </View>
                      </>
                    )
                    : <NetworkErrorModal
                      isOpened={settingsNetworkError}
                      closeCallback={clearSettingsNetworkError}
                    />
                )
                : <DataLoadingIndicator/>
            }
          </ScrollView>
        </View>
      </SafeView>
    </>
  );
}


//----EXPORT----//
export default ContactsScreen;
