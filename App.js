import * as React from 'react';
import { View, StyleSheet, TextInput, Alert, FlatList, Text, Button } from 'react-native';
 
const App = () => {
  const [todo, onChangeTodo] = React.useState('');
  const [lista, setLista] = React.useState([]);

  const API_URL =
    'https://ominous-space-train-4vpv7p94qwvfqj9w-3000.app.github.dev';

  const obtenerTodos = async () => {
    try {
      const response = await fetch(`${API_URL}/todos`);
      const data = await response.json();

      setLista(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar las tareas');
      console.error(error);
    }
  };

  const agregarTodo = async () => {
    if (!todo.trim()) {
      Alert.alert('Error', 'El campo no puede estar vacío');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/agrega_todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo }),
      });

      if (response.status === 201) {
        Alert.alert('Éxito', 'Tarea guardada correctamente');

        onChangeTodo('');

        obtenerTodos();
      } else {
        Alert.alert('Error', 'No se pudo guardar la tarea');
      }
    } catch (error) {
      Alert.alert('Error', 'Error de conexión');
      console.error(error);
    }
  };

  React.useEffect(() => {
    obtenerTodos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tareas</Text>

      <TextInput
        style={styles.textInput}
        placeholder="Escribe una tarea"
        value={todo}
        onChangeText={onChangeTodo}
      />

      <Button title="Agregar tarea" onPress={agregarTodo} />

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>• {item.todo}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    padding: 8,
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  item: {
    backgroundColor: '#dedede',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default App;