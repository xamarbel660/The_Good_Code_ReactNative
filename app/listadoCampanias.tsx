import { CampañaCard } from "@/src/components/CampañaCard";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, FlatList, Platform, StyleSheet, View } from "react-native";
import { ActivityIndicator, FAB, Text } from "react-native-paper";
import api from "../src/services/api";

export default function ListadoCampanias() {
  const [campañas, setCampañas] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Helper para mostrar mensajes (Multiplataforma)
  const showSimpleAlert = (title: string, message: string) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  // 2. Función para obtener las donaciones (GET)
  const fetchCampañas = async () => {
    try {
      setLoading(true);
      const data = await api.get("/campanas");
      // Recordatorio: nuestro interceptor ya devuelve el .data de axios
      setCampañas(data.datos);
    } catch (error: any) {
      showSimpleAlert(
        "Error",
        error.mensaje || "No se pudieron cargar los datos",
      );
    } finally {
      setLoading(false);
    }
  };

  // 3. Refrescar datos cuando la pantalla gana el foco
  //   Con useFocusEffect, la función fetchDirectors() se ejecuta
  //   cada vez que el usuario entra en la pestaña.
  //   lleva un useCallback dentro para evitar bucles infinitos.
  //   useCallback memoriza la función
  useFocusEffect(
    useCallback(() => {
      fetchCampañas();
    }, []),
  );

  // 4. Lógica de borrado (Multiplataforma)
  const handleDelete = (id: number) => {
    const title = "Eliminar";
    const msg = "¿Estás seguro de que quieres eliminar esta campaña?";

    if (Platform.OS === "web") {
      if (window.confirm(`${title}\n\n${msg}`)) {
        ejecutarBorrado(id);
      }
    } else {
      Alert.alert(title, msg, [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: () => ejecutarBorrado(id),
          style: "destructive",
        },
      ]);
    }
  };

  const ejecutarBorrado = async (id: number) => {
    try {
      await api.delete(`/campanas/${id}`);
      showSimpleAlert("Éxito", "Campaña eliminada");
      fetchCampañas(); // Recargar la lista tras borrar
    } catch (error: any) {
      showSimpleAlert("Error", "No se pudo eliminar el registro");
    }
  };

  // 5. Renderizado
  if (loading && campañas.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating={true} color="#6200ee" size="large" />
        <Text style={{ marginTop: 10 }}>Cargando campañas...</Text>
      </View>
    );
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


  return (
    <View style={styles.container}>
      <FlatList
        data={campañas}
        keyExtractor={(item: any) => item.id_campana.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <CampañaCard
            id_campana={item.id_campana}
            nombre_campana={item.nombre_campana}
            objetivo_litros_campana={item.objetivo_litros_campana}
            fecha_inicio_campana={item.fecha_inicio_campana}
            fecha_fin_campana={item.fecha_fin_campana}
            urgente_campana={item.urgente_campana}
            onDelete={() => handleDelete(item.id_campana)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text variant="bodyLarge">No hay campañas disponibles</Text>
          </View>
        }
      />

      {/* Botón flotante para refrescar manualmente */}
      <FAB
        icon="refresh"
        style={styles.fab}
        onPress={fetchCampañas}
        color="white"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100, // Espacio para que el FAB no tape la última card
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#6200ee",
  },
});
