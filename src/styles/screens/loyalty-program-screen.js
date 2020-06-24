//----IMPORTS----//
//React native
import { StyleSheet } from 'react-native';
import { app_styles } from "../app_styles";

const styles = (scales) => StyleSheet.create({
  container: {
    paddingVertical: Math.round(scales.widthScale * 25),
    paddingHorizontal: Math.round(scales.widthScale * 15)
  },
  label: {
    fontFamily: app_styles(scales).fonts.weight.bold,
    fontSize: app_styles(scales).fonts.size.base,
    marginVertical: Math.round(scales.fontScale * 5)
  },
  content: {
    marginBottom: Math.round(scales.widthScale * 10)
  },
  text_red: {
    fontFamily: app_styles(scales).fonts.weight.bold,
    color: app_styles(scales).colors.text.red
  }
});

export default styles;