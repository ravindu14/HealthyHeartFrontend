import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  NativeModules,
} from "react-native";
import { Button, Text, withStyles } from "react-native-ui-kitten";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { navigateAndReset } from "@app/actions/routes";
import { ASYNC_STATUS } from "@app/constants/async";
import { miBandImage } from "@app/assets";
import { BTDeviceManager } from "../../../helpers/helpers/reactNative";

const dimensions = Dimensions.get("window");
const imageHeight = Math.round((dimensions.width * 9) / 16);
const imageWidth = dimensions.width;
class RiskCalculator extends Component {
  state = {
    loading: false,
    btDevice: 0,
    heartBeatRate: 0,
    deviceBondLevel: 0,
  };

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

  BTDeviceManager = () => {
    const { btDevice } = this.state;
    if (btDevice) {
      clearTimeout(btDevice);
    }

    this.setState({
      ...this.state,
      loading: true,
      btDevice: setTimeout(() => this.closeConnection(), 1000),
    });
  };

  closeConnection = () => {
    this.setState({
      ...this.state,
      loading: false,
    });
  };

  render() {
    const { themedStyle, BTDeviceManager, status, heartRate } = this.props;
    const { loading, heartBeatRate } = this.state;

    if (loading || status === ASYNC_STATUS.LOADING) {
      return (
        <LinearGradient colors={["#553fd1", "#000000"]} style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#ffffff" />
        </LinearGradient>
      );
    }

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
                {heartBeatRate}
              </Text>
            </View>
          </View>
          <View style={themedStyle.buttonContainer}>
            <Button
              style={themedStyle.ActionButton}
              size="giant"
              onPress={this.searchBluetoothDevices}
            >
              Link With My Band
            </Button>
            <Button
              style={themedStyle.ActionButton}
              size="giant"
              onPress={this.activateHeartRateCalculation}
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
  return {
    status: state.heart.status,
    notification: state.heart.notification,
  };
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
