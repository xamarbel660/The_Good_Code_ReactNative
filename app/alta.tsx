import React, { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, Switch } from 'react-native-paper';
import api from '../src/services/api';

export default function AltaCampania() {
  // Estado para el formulario basado en tu JSON de la API

  /*
{
    "nombre_campana": "Maratón Borrar",
    "objetivo_litros_campana": "1.00",
    "fecha_inicio_campana": "2024-03-01",
    "fecha_fin_campana": "2024-03-05",
    "urgente_campana": true
}
  */

  const [form, setForm] = useState({
    nombre_campana: '',
    objetivo_litros_campana: '1.00',
    fecha_inicio_campana: '',
    fecha_fin_campana: '',
    urgente_campana: false,
  });

  const [loading, setLoading] = useState(false);

  // Helper para mostrar alert con fallback en web
  const showAlert = (title: string, message?: string) => {
    if (Platform.OS === 'web') {
      // window.alert funciona en la web (Expo web)
      window.alert(title + (message ? '\n\n' + message : ''));
    } else {
      Alert.alert(title, message);
    }
  };

  // Función para enviar los datos
  const handleSave = async () => {
    console.log('[AltaCampaña] handleSave called — form:', form);
    // Validación simple
    if (!form.nombre_campana) {
      showAlert('Error', 'Por favor, rellena al menos el nombre.');
      return;
    }

    setLoading(true);
    try {
      const datosParaEnviar = {
        ...form,
        // Aseguramos que litros sea un string con decimales (o number si tu API lo prefiere)
        objetivo_litros_campana: form.objetivo_litros_campana,
      };
      // Usamos el endpoint para el alta
      await api.post('/campanas', datosParaEnviar);

      showAlert('Éxito', 'Campaña guardada correctamente');

      // Limpiar formulario tras éxito
      setForm({
        nombre_campana: '',
        objetivo_litros_campana: '1.00',
        fecha_inicio_campana: '',
        fecha_fin_campana: '',
        urgente_campana: false
      });
    } catch (error: any) {
      // El interceptor que creamos antes manejará el log,
      // aquí mostramos el error en consola y al usuario.
      console.error('[AltaCampaña] save error:', error);
      showAlert('Error', error?.mensaje || 'No se pudo guardar la campaña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>Nueva Campaña</Text>

      <TextInput
        label="Nombre de la Campaña"
        value={form.nombre_campana}
        onChangeText={(text) => setForm({ ...form, nombre_campana: text })}
        mode="outlined"
        style={styles.input}
        placeholder="Ej: Maratón Veraniedo del 92"
      />

      <TextInput
        label="Objetivo de Litros"
        value={form.objetivo_litros_campana}
        // Permitimos escribir, validaremos al enviar
        onChangeText={(text) => setForm({ ...form, objetivo_litros_campana: text })}
        mode="outlined"
        keyboardType="numeric" // Teclado solo números
        style={styles.input}
        placeholder="1.00"
      />

      <TextInput
        label="Fecha de Inicio (AAAA-MM-DD)"
        value={form.fecha_inicio_campana}
        onChangeText={(text) => setForm({ ...form, fecha_inicio_campana: text })}
        mode="outlined"
        style={styles.input}
        placeholder="2024-03-01"
      />

      <TextInput
        label="Fecha de Fin (AAAA-MM-DD)"
        value={form.fecha_fin_campana}
        onChangeText={(text) => setForm({ ...form, fecha_fin_campana: text })}
        mode="outlined"
        multiline
        numberOfLines={4}
        style={styles.input}
        placeholder="2024-03-05"
      />

      <View style={styles.switchContainer}>
        <Text variant="bodyLarge">¿Es campaña urgente?</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>{form.urgente_campana ? "Sí" : "No"}</Text>
          <Switch
            value={form.urgente_campana}
            onValueChange={(val) => setForm({ ...form, urgente_campana: val })}
            color="#B00020" // Rojo si es urgente
            style={{ marginLeft: 10 }}
          />
        </View>
      </View>

      <Button
        mode="contained"
        onPress={handleSave}
        loading={loading}
        disabled={loading}
        icon="content-save"
        style={styles.button}
      >
        Guardar Campaña
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40, // Espacio extra al final
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  button: {
    marginTop: 10,
    paddingVertical: 6,
  },
});