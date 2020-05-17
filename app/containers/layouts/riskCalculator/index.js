import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
} from "react-native";
import { Button, Text, withStyles } from "react-native-ui-kitten";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { navigateAndReset } from "@app/actions/routes";
import { ASYNC_STATUS } from "@app/constants/async";
import { miBandImage } from "@app/assets";

const dimensions = Dimensions.get("window");
const imageHeight = Math.round((dimensions.width * 9) / 16);
const imageWidth = dimensions.width;
class RiskCalculator extends Component {
  searchBluetoothDevices = () => {
    NativeModules.DeviceConnector.enableBTAndDiscover(
      (error, deviceBondLevel) => {
        this.setState({ deviceBondLevel: deviceBondLevel });
      }
    );
    setInterval(this.getDeviceBondLevel, 2000);
  };

  getDeviceBondLevel = () => {
    NativeModules.DeviceConnector.getDeviceBondLevel(
      (error, deviceBondLevel) => {
        this.setState({ deviceBondLevel: deviceBondLevel }, () => {
          this.getDeviceBondLevel;
        });
      }
    );
  };

  activateHeartRateCalculation = () => {
    NativeModules.HeartBeatMeasurer.startHeartRateCalculation(
      (error, heartBeatRate) => {
        this.setState({ heartBeatRate: heartBeatRate });
      }
    );
    setInterval(this.getHeartRate, 2000);
  };

  getHeartRate = () => {
    NativeModules.HeartBeatMeasurer.getHeartRate((error, heartBeatRate) => {
      this.setState({ heartBeatRate: heartBeatRate });
    });
  };

  render() {
    const { themedStyle } = this.props;

    return (
      <LinearGradient colors={["#553fd1", "#ffffff"]} style={{ flex: 1 }}>
        <View style={themedStyle.container}>
          <View style={themedStyle.imageContainer}>
            <Image
              source={miBandImage}
              style={{ maxWidth: 200, maxHeight: 300 }}
            />
          </View>
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
                Your heartbeat reading value
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
                  lineHeight: 60,
                }}
              >
                72 beats/second
              </Text>
            </View>
          </View>
          <View style={themedStyle.buttonContainer}>
            <Button
              style={themedStyle.ActionButton}
              size="giant"
              onPress={() => {}}
            >
              Link With My Band
            </Button>
            <Button
              style={themedStyle.ActionButton}
              size="giant"
              onPress={() => {}}
            >
              Get My Heart Rate
            </Button>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const Actions = {};

const RiskCalculatorContainer = connect(
  mapStateToProps,
  Actions
)(RiskCalculator);

export default withStyles(RiskCalculatorContainer, (theme: ThemeType) => {
  return {
    container: {
      flex: 1,
      marginHorizontal: 16,
    },
    formContainer: {
      flex: 1,
      marginTop: 32,
      paddingHorizontal: 16,
    },
    buttonContainer: {
      marginBottom: 40,
      marginTop: 20,
    },
    ActionButton: {
      marginTop: 16,
    },
    CalculateButton: {
      marginTop: 16,
    },
    imageContainer: {
      marginTop: 20,
      marginLeft: "auto",
      marginRight: "auto",
      height: 300,
    },
    predictionContainer: {
      marginTop: 10,
      backgroundColor: "#3e26c7",
      borderRadius: 10,
      height: 120,
      padding: 10,
    },
  };
});
