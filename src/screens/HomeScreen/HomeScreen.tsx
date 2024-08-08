import React, { useCallback, useState } from 'react';
import { View, Text, SafeAreaView, TextInput, FlatList, TouchableOpacity, ViewToken } from 'react-native';
import { Location, data } from '../../constants/data';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import City from '../../components/City/City';
import { useSharedValue } from 'react-native-reanimated';
import { styles } from './styles';
import { globalStyles } from '../../constants/styles';

const HomeScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const viewableItems = useSharedValue<ViewToken[]>([])

  // Filter data based on search term
  const filteredData = searchTerm 
    ? data.filter((item: Location) =>
        item.city_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.country_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data;

  const handleItemPress = (item: Location) => {
    navigation.navigate('CityDetail', { city: item });
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Input with Custom Clear Button */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by city or country name..."
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor={globalStyles.primaryText}
        />
        {searchTerm ? (
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearButtonText}>X</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Display list only if there is data */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.city_id.toString()}
        onViewableItemsChanged={({viewableItems:vItems}) => {
            viewableItems.value = vItems
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <City item={item} viewableItems={viewableItems} onPress={handleItemPress} />
        )}
        ListEmptyComponent={
          searchTerm && filteredData.length === 0 ? (
            <Text style={styles.noResults}>No results found</Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
};


export default HomeScreen;
