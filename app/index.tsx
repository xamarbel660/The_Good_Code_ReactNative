import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge">App de Donaciones</Text>
      <Text style={styles.subtitle}>Gestión de Donaciones</Text>
      <Button style={styles.button} mode="contained" onPress={() => router.push('/listadoDonaciones')}>
        Ver Listado Donaciones
      </Button>
      <Button style={styles.button} mode="contained" onPress={() => router.push('/listadoCampañas')}>
        Ver Listado Campañas
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  subtitle: { marginBottom: 10, color: 'gray' },
  button: { margin: 10, width: '80%' },
});
