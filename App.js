import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
  
} from "react-native";
import Final from "./final";
import { getGameStatus } from "./game";


const squares = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export default class App extends Component {
  state = {
    user: "X",
    moves: {},
    view: 0
  };
  

  handleRestart = () => {
    this.setState({
      moves: {},
      user: "X",
      gameStatus: undefined
    });
  };

  handlePlaceMove = index => {
    this.setState(
      state => {
        const moves = { ...state.moves, [index]: state.user };
        const gameStatus = getGameStatus(moves);

        return {
          moves,
          user: state.user === "X" ? "O" : "X",
          gameStatus,
         
        };
      },
      
    );
  };


   getMessage = value => {
  if (value === "X_WIN") {
    return "X WINS!";
  } else if (value === "O_WIN") {
    return "O WINS!";
  } else if (value === "DRAW") {
    return "It's a Draw";
  }
};

  
  render() {
    const { moves, user, gameStatus } = this.state;
    const { width } = Dimensions.get("window");
const squareSize = width / 3 - 4;


    return (

       <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.turn}>Player 1 (X)</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.board}>
            {squares.map(i => {
              return (
                <View key={i} style={[styles.square, { width: squareSize, height: squareSize }]}>
                  <TouchableOpacity
                    style={styles.touchSquare}
                    onPress={!moves[i] ? () => this.handlePlaceMove(i) : undefined}
                  >
                    {!!moves[i] && (
                      
                        <Text style={styles.value}>{moves[i]}</Text>
                      
                    )}
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
         <View style={styles.header}>
          <Text style={styles.turn}>Player 2 (O)</Text>
        </View>
        <View style={styles.footer}>
        </View>
        {!!gameStatus && <Final value={gameStatus} onRestart={this.handleRestart} />}
      </SafeAreaView>
    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  footer: {
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  turn: {
    fontSize: 24
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center"
  },
  square: {
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center"
  },
  touchSquare: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  },
  value: {
    fontSize: 100
  },
  winValue: {
    fontSize: 18
  },
  resetButton: {
    borderRadius: 8,
    backgroundColor: "tomato",
    paddingHorizontal: 10,
    paddingVertical: 7,
    alignItems: "center",
    justifyContent: "center"
  },
  resetButtonText: {
    color: "#FFF",
    fontSize: 20
  }
});
