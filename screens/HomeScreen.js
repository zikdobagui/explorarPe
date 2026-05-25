import { Ionicons } from '@expo/vector-icons';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import StatCard from '../components/StatCard';
import { places } from '../data/places';
import { colors } from '../theme/colors';

export default function HomeScreen({ navigation }) {
  const topPlace = places[0];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground source={{ uri: topPlace.image }} style={styles.hero} imageStyle={styles.heroImage}>
        <View style={styles.overlay}>
          <Text style={styles.kicker}>Guia de viagem de Pernambuco</Text>
          <Text style={styles.title}>ExplorarPe</Text>
          <Text style={styles.subtitle}>
            Descubra pontos turisticos de Pernambuco e veja detalhes importantes para planejar o passeio.
          </Text>
          <AppButton
            title="Explorar locais"
            onPress={() => navigation.navigate('List')}
            icon={<Ionicons name="map" size={18} color={colors.onPrimary} />}
          />
        </View>
      </ImageBackground>

      <View style={styles.statsRow}>
        <StatCard label="locais cadastrados" value={places.length} />
        <StatCard label="categorias" value="7" />
        <StatCard label="versao" value="1.0" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>O que ja esta nesta versao</Text>
        <View style={styles.step}>
          <Ionicons name="list-circle-outline" size={28} color={colors.primary} />
          <Text style={styles.stepText}>Lista de pontos turisticos com imagem, categoria, avaliacao e endereco.</Text>
        </View>
        <View style={styles.step}>
          <Ionicons name="reader-outline" size={28} color={colors.primary} />
          <Text style={styles.stepText}>Tela de detalhes recebendo as informacoes do local por parametro.</Text>
        </View>
        <View style={styles.step}>
          <Ionicons name="construct-outline" size={28} color={colors.primary} />
          <Text style={styles.stepText}>GPS, perfil e camera ficaram separados para uma proxima etapa.</Text>
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
  content: {
    padding: 18,
    paddingBottom: 30,
    paddingTop: 28,
  },
  hero: {
    borderRadius: 20,
    minHeight: 340,
    overflow: 'hidden',
  },
  heroImage: {
    borderRadius: 20,
  },
  overlay: {
    backgroundColor: 'rgba(15, 23, 42, 0.66)',
    flex: 1,
    justifyContent: 'flex-end',
    padding: 22,
  },
  kicker: {
    color: colors.secondary,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 38,
    fontWeight: '900',
    marginTop: 8,
  },
  subtitle: {
    color: '#E2E8F0',
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 18,
    marginTop: 8,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 12,
  },
  step: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
    padding: 14,
  },
  stepText: {
    color: colors.text,
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});
