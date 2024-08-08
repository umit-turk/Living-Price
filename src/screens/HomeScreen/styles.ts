import { StyleSheet } from "react-native";
import { globalStyles } from "../../constants/styles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        backgroundColor: globalStyles.bgColor,
      },
      searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
      },
      searchInput: {
        flex: 1,
        borderColor: '#ccc',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#fff',
      },
      clearButton: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -10 }],
      },
      clearButtonText: {
        fontSize: 16,
        color: '#888',
      },
      noResults: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: globalStyles.secondaryText,
      },
})