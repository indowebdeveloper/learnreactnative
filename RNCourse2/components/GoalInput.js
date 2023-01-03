import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { useState } from 'react'
const GoalInput = props => {
    const [enteredGoalText, setEnteredGoalText] = useState('');
    function goalInputHandler(enteredText) {
        setEnteredGoalText(enteredText);
    }
    const addGoalHandler = () => {
        props.onAddGoal(enteredGoalText);
        setEnteredGoalText('');
    }
    return <View style={styles.inputContainer}>
        <TextInput
            style={styles.textInput}
            placeholder="Your course goals!"
            onChangeText={goalInputHandler}
            value={enteredGoalText}
        />
        <Button title="Add Goal" onPress={addGoalHandler} />
    </View>
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        width: '70%',
        marginRight: 8,
        padding: 8,
    },
})
export default GoalInput;