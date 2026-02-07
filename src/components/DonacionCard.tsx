import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, IconButton, Text } from 'react-native-paper';

interface DonacionProps {
  id_donacion: number;
  nombre_campana: string;
  nombre_donante: string;
  peso_donante: string;
  fecha_donacion: string;
  es_primera_vez: boolean;
  grupo_sanguineo: string;
  URL_image: string;
  onDelete: (id: number) => void;
}

/* Respuesta del servidor API REST
   {
      "id_donacion": 1,
      "id_campana": 1,
      "nombre_donante": "Juan Pérez",
      "peso_donante": "75.50",
      "fecha_donacion": "2024-03-02",
      "es_primera_vez": true,
      "grupo_sanguineo": "A-",
      "URL_image": "https://upload.wikimedia.org/wikipedia/commons/0/01/Juan_P%C3%A9rez_Monge_y_Rub%C3%A9n_Ayala.png",
      "id_campana_campaña": {
        "nombre_campana": "Maratón Universitario"
      }
*/

export function DonacionCard(
  {
    id_donacion,
    nombre_donante,
    nombre_campana,
    peso_donante,
    fecha_donacion,
    es_primera_vez,
    grupo_sanguineo,
    URL_image,
    onDelete
  }: DonacionProps) {
  return (
    <Card style={styles.card} mode="elevated">
      {/* Cabecera con Avatar e Icono de Borrado */}
      <Card.Title
        title={<Text style={styles.title}>{nombre_donante}</Text>}
        subtitle={<Text style={styles.subtitle}>Grupo sanguíneo: {grupo_sanguineo || "Sin grupo sanguíneo"}</Text>}
        left={(props) => (
          <Image
            style={{ width: 40, height: 40, borderRadius: 10 }}
            source={URL_image} // expo-image acepta el string directo o el objeto { uri: ... }
            contentFit="cover"
            transition={1000} // Efecto suave de carga
            placeholder={nombre_donante} // Opcional
          />
        )}
        right={(props) => (
          <IconButton
            {...props}
            icon="delete-outline"
            iconColor="#B00020"
            onPress={() => onDelete(id_donacion)}
          />
        )}
      />

      <Card.Content style={styles.content}>
        <Text variant="bodyMedium" numberOfLines={3} style={styles.bio}>
          Nombre de la campaña: {nombre_campana || "Sin nombre de campaña disponible."}
        </Text>
        <Text variant="bodyMedium" numberOfLines={3} style={styles.bio}>
          Fecha de donación: {new Date(fecha_donacion).toLocaleDateString() || "Sin fecha de donación disponible."}
        </Text>
        <Text variant="bodyMedium" numberOfLines={3} style={styles.bio}>
          Peso del donante: {peso_donante || "Sin peso de donante disponible."}
        </Text>
        <Text variant="bodyMedium" numberOfLines={3} style={styles.bio}>
          ¿Es primera vez?: {es_primera_vez ? "Sí" : "No"}
        </Text>
      </Card.Content>

      {/* Acciones adicionales (Opcional: Ver detalle o Editar) */}
      <Card.Actions>
        <Button mode="text" onPress={() => console.log('Ver más no hace nada', URL_image)}>
          Ver más
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderColor: '#000000ff',
    borderWidth: 1,
  },
  content: {
    marginTop: 8,
  },
  bio: {
    color: '#424242ff',
    lineHeight: 20,
  },
  title: {
    color: '#000000ff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitle: {
    color: '#424242ff',
    fontSize: 15,
  }
});