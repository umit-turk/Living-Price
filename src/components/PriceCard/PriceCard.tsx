import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Price } from '../../api/types';
import { currencies } from '../../constants/currencyData';
import { globalStyles } from '../../constants/styles';

interface PriceCardProps {
  item: Price;
  currencyCode?: string;
}

const PriceCard: React.FC<PriceCardProps> = ({ item, currencyCode }) => {
  const currency = currencies[currencyCode || item.currency_code];
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.item_name}</Text>
      {currency && (
        <Text style={styles.cardText}>
        {item.avg.toFixed(2)} {currency.symbol}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: globalStyles.primaryText,
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    fontWeight: '600',
    color: globalStyles.secondaryText,
    marginTop: 3,
  },
});

export default PriceCard;
