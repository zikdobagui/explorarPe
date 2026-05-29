import { useRef, useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '../components/AppButton';
import { colors } from '../theme/colors';

const PROFILE_PHOTO_KEY = '@profile_photo';

export default function ProfileScreen() {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraOpen, setCameraOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    loadProfilePhoto();
  }, []);

  async function loadProfilePhoto() {
    const savedPhoto = await AsyncStorage.getItem(PROFILE_PHOTO_KEY);

    if (savedPhoto) {
      setProfilePhoto(savedPhoto);
    }
  }

  async function openCamera() {
    if (!permission?.granted) {
      const response = await requestPermission();

      if (!response.granted) {
        return;
      }
    }

    setCameraOpen(true);
  }

  async function chooseFromGallery() {
    const permissionResponse = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResponse.granted) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      mediaTypes: ['images'],
      quality: 0.8,
    });

    if (result.canceled) {
      return;
    }

    const photoUri = result.assets[0].uri;

    setProfilePhoto(photoUri);
    await AsyncStorage.setItem(PROFILE_PHOTO_KEY, photoUri);
  }

  async function takePicture() {
    if (!cameraRef.current) {
      return;
    }

    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.8,
    });

    setProfilePhoto(photo.uri);
    await AsyncStorage.setItem(PROFILE_PHOTO_KEY, photo.uri);
    setCameraOpen(false);
  }

  if (cameraOpen) {
    return (
      <View style={styles.container}>
        <CameraView ref={cameraRef} style={styles.camera} facing="front" />

        <View style={styles.cameraActions}>
          <AppButton
            title="Cancelar"
            variant="outline"
            onPress={() => setCameraOpen(false)}
            icon={<Ionicons name="close" size={18} color={colors.primary} />}
          />

          <AppButton
            title="Tirar foto"
            onPress={takePicture}
            icon={<Ionicons name="camera" size={18} color={colors.onPrimary} />}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <View style={styles.avatarBox}>
        {profilePhoto ? (
          <Image source={{ uri: profilePhoto }} style={styles.avatar} />
        ) : (
          <Ionicons name="person" size={90} color={colors.muted} />
        )}
      </View>

      <Text style={styles.name}>Usuario ExplorarPe</Text>
      <Text style={styles.subtitle}>Adicione uma foto ao seu perfil</Text>

      <View style={styles.actions}>
        <AppButton
          title="Abrir camera"
          onPress={openCamera}
          icon={<Ionicons name="camera-outline" size={18} color={colors.onPrimary} />}
        />

        <AppButton
          title="Escolher da galeria"
          variant="outline"
          onPress={chooseFromGallery}
          icon={<Ionicons name="images-outline" size={18} color={colors.primary} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    padding: 18,
    paddingTop: 40,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 30,
  },
  avatarBox: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 90,
    borderWidth: 1,
    height: 180,
    justifyContent: 'center',
    marginBottom: 20,
    overflow: 'hidden',
    width: 180,
  },
  avatar: {
    height: '100%',
    width: '100%',
  },
  name: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    marginBottom: 24,
    marginTop: 6,
    textAlign: 'center',
  },
  actions: {
    gap: 12,
  },
  camera: {
    flex: 1,
    borderRadius: 18,
    overflow: 'hidden',
  },
  cameraActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
});
