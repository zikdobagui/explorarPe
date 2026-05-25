import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

import { places } from '../data/places';
import { colors } from '../theme/colors';

function calcularDistanciaKm(lat1, lon1, lat2, lon2) {
  const raioTerra = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return raioTerra * c;
}

export default function GpsScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(true);

  async function pegarLocalizacao() {
    setCarregando(true);
    setErro('');

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setErro('Permissao de localizacao negada.');
      setCarregando(false);
      return;
    }

    const posicaoAtual = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    setLocation(posicaoAtual.coords);
    setCarregando(false);
  }

  useEffect(() => {
    pegarLocalizacao();
  }, []);

  const locaisComDistancia = location
    ? places
        .map((place) => ({
          ...place,
          distance: calcularDistanciaKm(
            location.latitude,
            location.longitude,
            place.latitude,
            place.longitude
          ),
        }))
        .sort((a, b) => a.distance - b.distance)
    : [];

  function abrirMapa(place) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`;
    Linking.openURL(url);
  }

  const mapRegion = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
      }
    : null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="navigate-circle-outline" size={42} color={colors.primary} />
        <Text style={styles.title}>GPS em tempo real</Text>
        <Text style={styles.subtitle}>
          Veja sua localizacao atual e encontre pontos turisticos proximos.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Minha localizacao</Text>

        {carregando ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Buscando localizacao...</Text>
          </View>
        ) : erro ? (
          <Text style={styles.errorText}>{erro}</Text>
        ) : (
          <MapView
            style={styles.map}
            mapType="hybrid"
            initialRegion={mapRegion}
            region={mapRegion}
            showsUserLocation
            showsMyLocationButton
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Voce esta aqui"
              description={`Precisao aproximada: ${Math.round(location.accuracy)} metros`}
              pinColor={colors.primary}
            />

            {places.map((place) => (
              <Marker
                key={place.id}
                coordinate={{
                  latitude: place.latitude,
                  longitude: place.longitude,
                }}
                title={place.name}
                description={place.address}
              />
            ))}
          </MapView>
        )}

        <TouchableOpacity style={styles.button} onPress={pegarLocalizacao}>
          <Ionicons name="refresh" size={18} color={colors.onPrimary} />
          <Text style={styles.buttonText}>Atualizar localizacao</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Locais mais proximos</Text>

      <FlatList
        data={locaisComDistancia}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.placeCard}>
            <View style={styles.placeInfo}>
              <Text style={styles.placeName}>{item.name}</Text>
              <Text style={styles.placeAddress}>{item.address}</Text>
              <Text style={styles.distance}>
                {item.distance.toFixed(2)} km de distancia
              </Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate('Detail', { place: item })}
              >
                <Ionicons name="information-circle-outline" size={22} color={colors.text} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => abrirMapa(item)}
              >
                <Ionicons name="map-outline" size={22} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        )}
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
    marginTop: 8,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 21,
    marginTop: 6,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    margin: 18,
    padding: 16,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  loadingBox: {
    alignItems: 'center',
    paddingVertical: 18,
  },
  loadingText: {
    color: colors.muted,
    marginTop: 10,
  },
  errorText: {
    color: colors.danger,
    fontSize: 15,
    marginBottom: 12,
  },
  map: {
    borderRadius: 12,
    height: 260,
    overflow: 'hidden',
    width: '100%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginTop: 14,
    padding: 12,
  },
  buttonText: {
    color: colors.onPrimary,
    fontSize: 15,
    fontWeight: '800',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    marginHorizontal: 18,
    marginBottom: 10,
  },
  list: {
    paddingHorizontal: 18,
    paddingBottom: 28,
  },
  placeCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 10,
    padding: 14,
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  placeAddress: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 4,
  },
  distance: {
    color: colors.secondary,
    fontSize: 13,
    fontWeight: '800',
    marginTop: 6,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 10,
  },
  iconButton: {
    alignItems: 'center',
    backgroundColor: colors.primaryDark,
    borderRadius: 10,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
});
