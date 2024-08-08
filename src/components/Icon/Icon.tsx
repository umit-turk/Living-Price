import React from 'react';
import { globalStyles } from '../../constants/styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface IconProps {
  categoryName?: string;
}

const Icon: React.FC<IconProps> = ({ categoryName }) => {
  switch (categoryName) {
    case "Buy Apartment":
      return <MaterialIcons name="apartment" size={25} color={globalStyles.black} />;
    case "Childcare":
      return <FontAwesome5 name="child" size={25} color={globalStyles.black} />;
    case "Clothing And Shoes":
      return <FontAwesome5 name="tshirt" size={25} color={globalStyles.black} />;
    case "Markets":
      return <AntDesign name="shoppingcart" size={25} color={globalStyles.black} />;
    case "Rent Per Month":
      return <AntDesign name="home" size={25} color={globalStyles.black} />;
    case "Restaurants":
      return <Ionicons name="restaurant-outline" size={25} color={globalStyles.black} />;
    case "Salaries And Financing":
      return <FontAwesome name="money" size={25} color={globalStyles.black} />;
    case "Sports And Leisure":
      return <MaterialIcons name="sports-soccer" size={25} color={globalStyles.black} />;
    case "Transportation":
      return <FontAwesome5 name="bus" size={25} color={globalStyles.black} />;
    case "Utilities Per Month":
      return <Ionicons name="exit-outline" size={25} color={globalStyles.black} />;
    default:
      return <MaterialIcons name="category" size={25} color={globalStyles.black} />;
  }
};

export default Icon;
