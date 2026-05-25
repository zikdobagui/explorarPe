import { FlatList, StyleSheet, Text, View } from 'react-native';
import PlaceCard from '../components/PlaceCard';
import { places } from '../data/places';
import { colors } from '../theme/colors';

export default function ListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pontos turisticos</Text>
        <Text style={styles.subtitle}>
          Toque em um card para abrir a tela de detalhes com passagem de parametros.
        </Text>
      </View>

      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlaceCard place={item} onPress={() => navigation.navigate('Detail', { place: item })} />
        )}
        contentContainerStyle={styles.list}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 36,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 21,
    marginTop: 6,
  },
  list: {
    padding: 18,
    paddingBottom: 28,
  },
});
