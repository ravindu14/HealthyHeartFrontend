import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator, Image } from "react-native";
import { Button, Text, withStyles } from "react-native-ui-kitten";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { navigateAndReset } from "@app/actions/routes";
import { ASYNC_STATUS } from "@app/constants/async";
import { imageAuthScreenLogo } from "@app/assets";

import ScrollableAvoidKeyboardComponent from "@app/components/common/ScrollableAvoidKeyboardComponent";
import Alert from "@app/components/Alert";

class RiskCalculator extends Component {
  render() {
    const { themedStyle } = this.props;

    return (
      <ScrollableAvoidKeyboardComponent style={themedStyle.container}>
        <LinearGradient colors={["#00a2ff", "#ffffff"]} style={{ flex: 1 }}>
          <Text>function 1</Text>
        </LinearGradient>
      </ScrollableAvoidKeyboardComponent>
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
    },
    formContainer: {
      flex: 1,
      marginTop: 32,
      paddingHorizontal: 16,
    },
    buttonContainer: {
      marginHorizontal: 16,
      marginTop: 16,
      marginBottom: 16,
    },
    CalculateButton: {
      marginTop: 16,
    },
  };
});
