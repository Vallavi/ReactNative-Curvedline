import React, { useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Animated, PanResponder } from "react-native";
import Svg, { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const App = () => {
  const animationProgress = useRef(new Animated.Value(0)).current;
  const [isDashed, setIsDashed] = useState(true);

  // PanResponder to detect hover-like gestures
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: () => handleHover(),
  });

  // Handle hover action
  const handleHover = () => {
    if (isDashed) {
      Animated.timing(animationProgress, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }).start(() => setIsDashed(false));
    }
  };

  // Reset to dashed state
  const refreshLine = () => {
    animationProgress.setValue(0);
    setIsDashed(true);
  };

  // Define the dashed curve path
  const curvePath = "M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80";

  return (
    <View style={styles.container}>
      <View {...panResponder.panHandlers}>
        <Svg height="150" width="200">
          <AnimatedPath
            d={curvePath}
            stroke="black"
            strokeWidth="2"
            strokeDasharray={animationProgress.interpolate({
              inputRange: [0, 1],
              outputRange: ["5, 5", "0, 0"], // Transition from dashed to solid
            })}
            fill="none"
          />
        </Svg>
      </View>

      {/* Refresh Button */}
      <TouchableOpacity style={styles.refreshButton} onPress={refreshLine}>
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  refreshButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  refreshButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default App;
