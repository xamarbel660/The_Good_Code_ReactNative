import { Tabs } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    <PaperProvider>
      <Tabs screenOptions={{ 
        tabBarActiveTintColor: '#6200ee',
        headerTitleAlign: 'center' 
      }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Inicio',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="alta"
          options={{
            title: 'Alta Campaña',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-plus" size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="listadoCampañas"
          options={{
            title: 'Listado Campañas',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="format-list-bulleted" size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="listadoDonaciones"
          options={{
            title: 'Listado Donaciones',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="format-list-bulleted" size={28} color={color} />,
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}
