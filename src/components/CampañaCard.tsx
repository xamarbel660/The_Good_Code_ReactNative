import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, IconButton, Text } from 'react-native-paper';

interface DonacionProps {
  id_campana: number;
  nombre_campana: string;
  objetivo_litros_campana: string;
  fecha_inicio_campana: string;
  fecha_fin_campana: string;
  urgente_campana: boolean;
  onDelete: (id: number) => void;
}

  /* 
  {
      "id_campana": 1,
      "nombre_campana": "Maratón Universitario",
      "objetivo_litros_campana": "100.00",
      "fecha_inicio_campana": "2024-03-01",
      "fecha_fin_campana": "2024-03-05",
      "urgente_campana": false
    }
  */

export function CampañaCard(
  {
    id_campana,
    nombre_campana,
    objetivo_litros_campana,
    fecha_inicio_campana,
    fecha_fin_campana,
    urgente_campana,
    onDelete
  }: DonacionProps) {
  return (
    <Card style={styles.card} mode="elevated">
      {/* Cabecera con Avatar e Icono de Borrado */}
      <Card.Title
        title={<Text style={styles.title}>{nombre_campana}</Text>}
        subtitle={<Text style={styles.subtitle}>Objetivo: {objetivo_litros_campana || "Sin objetivo"}</Text>}
        right={(props) => (
          <IconButton
            {...props}
            icon="delete-outline"
            iconColor="#B00020"
            onPress={() => onDelete(id_campana)}
          />
        )}
      />

      <Card.Content style={styles.content}>
        <Text variant="bodyMedium" numberOfLines={1} style={styles.bio}>
          Fecha de inicio: {new Date(fecha_inicio_campana).toLocaleDateString() || "Sin fecha de inicio disponible."}
        </Text>
        <Text variant="bodyMedium" numberOfLines={1} style={styles.bio}>
          Fecha de fin: {new Date(fecha_fin_campana).toLocaleDateString() || "Sin fecha de fin disponible."}
        </Text>
        <Text variant="bodyMedium" numberOfLines={3} style={styles.bio}>
          ¿La campaña es urgente?: {urgente_campana ? "Sí" : "No"}
        </Text>
      </Card.Content>
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