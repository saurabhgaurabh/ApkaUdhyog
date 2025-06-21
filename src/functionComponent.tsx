import react from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface myProps{
    name: string;
    age: number;
}
const FunctionalComponent = ({name}: myProps) =>{
    return (
        <View>
            <Text>{name}</Text>
        </View>
    )
}

export default FunctionalComponent;