import { Ionicons } from '@expo/vector-icons';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import { colors } from '../theme/colors';

export default function DetailScreen({ navigation, route }) {
  const { place } = route.params;

  function handleSaveRoute() {
    Alert.alert('Roteiro salvo', `${place.name} foi adicionado ao seu roteiro da viagem.`);
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <Image source={{ uri: place.image }} style={styles.image} />
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.categoryRow}>
          <Text style={styles.category}>{place.category}</Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={16} color={colors.secondary} />
            <Text style={styles.ratingText}>{place.rating}</Text>
          </View>
        </View>

        <Text style={styles.title}>{place.name}</Text>
        <View style={styles.infoLine}>
          <Ionicons name="location-outline" size={18} color={colors.primary} />
          <Text style={styles.infoText}>{place.address}</Text>
        </View>
        <View style={styles.infoLine}>
          <Ionicons name="time-outline" size={18} color={colors.primary} />
          <Text style={styles.infoText}>Tempo sugerido: {place.duration}</Text>
        </View>

        <Text style={styles.sectionTitle}>Sobre o local</Text>
        <Text style={styles.description}>{place.description}</Text>

        <View style={styles.tipBox}>
          <Ionicons name="bulb-outline" size={22} color={colors.secondary} />
          <Text style={styles.tipText}>{place.tips}</Text>
        </View>

        <View style={styles.actions}>
          <AppButton
            title="Salvar roteiro"
            onPress={handleSaveRoute}
            icon={<Ionicons name="bookmark" size={18} color={colors.onPrimary} />}
          />
          <AppButton
            title="Voltar"
            variant="outline"
            onPress={() => navigation.goBack()}
            icon={<Ionicons name="arrow-back" size={18} color={colors.primary} />}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  image: {
    height: 290,
    width: '100%',
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.78)',
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    left: 18,
    position: 'absolute',
    top: 36,
    width: 44,
  },
  pressed: {
    opacity: 0.8,
  },
  content: {
    padding: 18,
  },
  categoryRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  category: {
    backgroundColor: colors.softTeal,
    borderRadius: 999,
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: '900',
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  rating: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 999,
    flexDirection: 'row',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  ratingText: {
    color: colors.text,
    fontWeight: '800',
  },
  title: {
    color: colors.text,
    fontSize: 31,
    fontWeight: '900',
    marginTop: 14,
  },
  infoLine: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  infoText: {
    color: colors.muted,
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    marginTop: 24,
  },
  description: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
  },
  tipBox: {
    alignItems: 'flex-start',
    backgroundColor: colors.softOrange,
    borderRadius: 14,
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
    padding: 14,
  },
  tipText: {
    color: colors.text,
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    gap: 10,
    marginBottom: 24,
    marginTop: 22,
  },
});
