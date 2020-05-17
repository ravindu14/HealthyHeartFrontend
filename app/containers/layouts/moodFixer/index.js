import React, { Component } from "react";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { ASYNC_STATUS } from "@app/constants/async";
import { ActivityIndicator, View } from "react-native";
import { TabView, Tab, Text, withStyles, Button } from "react-native-ui-kitten";
import { ChartIcon, FoodIntakeIcon } from "@app/assets/icons";

import ImageUpload from "@app/components/common/ImageUpload";

class MoodFixerScreen extends Component {
  render() {
    const { themedStyle } = this.props;

    return (
      <LinearGradient colors={["#553fd1", "#ffffff"]} style={{ flex: 1 }}>
        <View style={themedStyle.container}>
          <View style={themedStyle.photoContainer}>
            <ImageUpload
              onFinishUploading={(baseImage) => this.onTakePhoto(baseImage)}
            />
          </View>
          <View>
            <View style={themedStyle.predictionContainer}>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 14,
                    marginTop: 10,
                    marginLeft: "auto",
                    marginRight: "auto",
                    fontWeight: "bold",
                  }}
                >
                  You are currently in a
                </Text>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Text
                  style={{
                    color: "#d9d5f0",
                    fontSize: 30,
                    marginTop: 10,
                    marginLeft: "auto",
                    marginRight: "auto",
                    fontWeight: "900",
                    lineHeight: 35,
                  }}
                >
                  Happy
                </Text>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 14,
                    marginTop: 10,
                    marginBottom: 10,
                    marginLeft: "auto",
                    marginRight: "auto",
                    fontWeight: "bold",
                  }}
                >
                  mood
                </Text>
              </View>
            </View>
            <View style={themedStyle.buttonContainer}>
              <Button
                style={themedStyle.ActionButton}
                size="giant"
                onPress={() => {}}
              >
                GET ACTIVITIES
              </Button>
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const Actions = {};

function mapStateToProps(state) {
  return {};
}

const MoodFixerScreenContainer = connect(
  mapStateToProps,
  Actions
)(MoodFixerScreen);

export default withStyles(MoodFixerScreenContainer, (theme) => ({
  container: {
    marginHorizontal: 16,
    marginVertical: 50,
    flexDirection: "column",
  },
  photoContainer: {
    marginTop: 30,
    marginLeft: "25%",
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 40,
    marginTop: 20,
  },
  listItem: {
    textAlign: "center",
    color: "#66b2ff",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 10,
  },
  remainHeader: {
    textAlign: "center",
    color: "#66b2ff",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
  },
  remain: {
    textAlign: "center",
    color: "#009900",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 10,
  },
  predictionContainer: {
    marginTop: 100,
    backgroundColor: "#3e26c7",
    borderRadius: 10,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  ActionButton: {
    marginTop: 16,
  },
}));
