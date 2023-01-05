import { Button, FlatList, StyleSheet, View } from "react-native";

import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  const startAddGoalHandler = () => {
    setModalIsVisible(true);
  };
  const endAddGoalHandler = () => {
    setModalIsVisible(false);
  };
  const deleteGoalHandler = (id) => {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  };
  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler(false);
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#a66df2"
          onPress={startAddGoalHandler}
        />
        <GoalInput
          visible={modalIsVisible}
          endAddGoal={endAddGoalHandler}
          onAddGoal={addGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDelete={deleteGoalHandler}
                  onDeleteItem={deleteGoalHandler}
                ></GoalItem>
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    // backgroundColor: "#1e085a",
  },

  goalsContainer: {
    flex: 5,
  },
});
