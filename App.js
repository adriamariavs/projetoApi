import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { styles } from './src/styles/Styles';
//Importando axios para poder ter acesso por qualquer serviço de API
import axios from 'axios';

//Função para definir estado de 'CEP'
const App = () => {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);

//Função para buscar o endereço de acordo com o CEP
  const fetchAddress = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setAddress(response.data);
    } catch (error) {
      //Caso der errado a busca pelo CEP, um aviso de erro aparecerá 
      console.error('Error fetching address:', error);
      setAddress(null);
    }
  };

  return (
    //View englobando todas as funções 
    <View style={styles.container}>
      {/* Função para dar valor ao estado CEP */}
      <TextInput style={styles.Input}
        placeholder="Digite o CEP"
        value={cep}
        //Atualiza o estado CEP com o texto digitado
        onChangeText={setCep}
        keyboardType="numeric"
      />
      {/* Função button, quando pressionado chama a função de procurar endereço */}
      <Button title="Buscar Endereço" onPress={fetchAddress} />
      {address && (
        
        //Resultados
        <View style={styles.resultados}>
          <Text>CEP: {address.cep}</Text>
          <Text>Rua: {address.logradouro}</Text>
          <Text>Bairro: {address.bairro}</Text>
          <Text>Cidade: {address.localidade}</Text>
          <Text>Estado: {address.uf}</Text>
        </View>
      )}

    </View>
  );
};
//Exporta o componente App como padrão
export default App;
