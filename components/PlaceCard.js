import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export default function PlaceCard({ place, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Image source={{ uri: place.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.category}>{place.category}</Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={14} color={colors.secondary} />
            <Text style={styles.ratingText}>{place.rating}</Text>
          </View>
        </View>

        <Text style={styles.title}>{place.name}</Text>
        <Text style={styles.address} numberOfLines={1}>
          {place.address}
        </Text>

        <View style={styles.footer}>
          <View style={styles.meta}>
            <Ionicons name="time-outline" size={15} color={colors.muted} />
            <Text style={styles.metaText}>{place.duration}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.primary} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 14,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    height: 132,
    width: 116,
  },
  content: {
    flex: 1,
    padding: 12,
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  category: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  rating: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 3,
  },
  ratingText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 8,
  },
  address: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 5,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  meta: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  metaText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '600',
  },
});
