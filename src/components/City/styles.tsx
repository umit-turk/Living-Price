import { StyleSheet } from "react-native";
import { globalStyles } from "../../constants/styles";

export const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        marginLeft:15,
        marginRight:15,
      },
      flag: {
        width: 50,
        height: 50,
        borderRadius: 25,
      },
      textContainer: {
        flex: 1,
        marginLeft: 10,
      },
      cityName: {
        fontWeight: 'bold',
        fontSize: 17,
        color:globalStyles.primaryText
      },
      countryName: {
        fontSize: 14,
        fontWeight:"500",
        color: globalStyles.secondaryText,
      },
      icon:{
        color:globalStyles.primaryText,
        fontSize:25
      }
})