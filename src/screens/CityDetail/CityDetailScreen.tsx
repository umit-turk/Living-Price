import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, StatusBar, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../constants/styles';
import { ApiResponse, Price } from '../../api/types';
import { fetchPrices } from '../../api/api';
import { groupByCategory } from '../../helpers/helpers';
import Icon from '../../components/Icon/Icon';
import PriceCard from '../../components/PriceCard/PriceCard';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface GroupedData {
  title: string;
  data: Price[];
}

interface Cache {
  [key: string]: GroupedData[];
}

const cache: Cache = {};

const CityDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<{ params: { city: { city_name: string, country_name: string, flag_url:string } } }, 'params'>>();
  const navigation = useNavigation();
  const { city } = route.params;
  const { top } = useSafeAreaInsets();

  const [groupedData, setGroupedData] = useState<GroupedData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const cacheKey = `${city.city_name}-${city.country_name}`;

    if (cache[cacheKey]) {
      setGroupedData(cache[cacheKey]);
      setIsLoading(false);
    } else {
      const fetchData = async () => {
        try {
          const result: ApiResponse = await fetchPrices(city.city_name, city.country_name);
          const groupedData = groupByCategory(result.prices);
          cache[cacheKey] = groupedData;
          setGroupedData(groupedData);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [city]);

  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={[styles.headerContainer,, { paddingTop: Platform.OS == "ios" ? top : 20 }]}>
        <Image style={styles.flag} source={{uri:city.flag_url}} />
        <Text style={styles.headerTitle}>{city.city_name}, {city.country_name}</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name='close' color={globalStyles.primaryText} size={25} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={groupedData}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            <View style={styles.sectionHeader}>
              <Icon categoryName={item.title} />
              <Text style={styles.sectionHeaderText}>{item.title}</Text>
            </View>
            {item && item.data.map((price) => (
              <PriceCard key={price.good_id} item={price} currencyCode={price.usd?.currency_code} />
            ))}
          </View>
        )}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.bgColor,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: globalStyles.cardBgColor,
  },
  backButton: {
    padding: 12,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: globalStyles.primaryText,
  },
  flag: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: globalStyles.primaryText,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    paddingLeft: 20,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: globalStyles.black,
    marginLeft: 10,
  },
});

export default CityDetailScreen;
