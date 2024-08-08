import React from 'react';
import { View, Text, TouchableOpacity, Image, ViewToken } from 'react-native';
import { styles } from './styles';
import { Location } from '../../constants/data';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { globalStyles } from '../../constants/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface CityProps {
    viewableItems: Animated.SharedValue<ViewToken[]>
    item: Location;
    onPress: (item: Location) => void;
}

const City: React.FC<CityProps> = React.memo(({ item, viewableItems, onPress }) => {

    const rStyle = useAnimatedStyle(() => {
        const isVisible = Boolean(viewableItems.value.filter((item) => item.isViewable).find((viewableItem) => viewableItem.item.city_id === item.city_id))
        return {
            opacity: withTiming(isVisible ? 1 : 0),
            transform:[
                {
                    scale:withTiming(isVisible ? 1 : 0)
                }
            ]
        }
    }, [])

    return (
        <Animated.View style={[
            {
                height: 80,
                backgroundColor: globalStyles.cardBgColor,
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
                borderRadius: 15
            }, rStyle
        ]}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onPress(item)} // Pass item to onPress
                style={styles.itemContainer}
            >
                {item.flag_url ? (
                    <Image source={{ uri: item.flag_url }} style={styles.flag} resizeMode="cover" />
                ) : (
                    <View style={styles.flag} /> // Placeholder if no flag
                )}
                <View style={styles.textContainer}>
                    <Text style={styles.cityName}>
                        {item.city_name}{item.state_code ? `, ${item.state_code}` : ''}
                    </Text>
                    <Text style={styles.countryName}>{item.country_name}</Text>
                </View>
                <AntDesign style={styles.icon} name="rightcircleo" />

            </TouchableOpacity>
        </Animated.View>
    );
});

export default City;
