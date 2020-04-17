import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator, Image } from "react-native";
import { Button, Text, withStyles } from "react-native-ui-kitten";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

import ScrollableAvoidKeyboardComponent from "@app/components/common/ScrollableAvoidKeyboardComponent";
import SignUpComponent from "@app/components/auth/SignUpComponent";
import { navigateAndReset } from "@app/actions/routes";
import {
  userSignUp,
  resetNotification,
  sendNotification,
} from "@app/actions/auth";
import Alert from "@app/components/Alert";
import { ASYNC_STATUS } from "@app/constants/async";
import { imageAuthScreenLogo } from "@app/assets";

const activityLevels = ["Sedentary", "Light", "Moderate", "Active"];

class SignUp extends Component {
  state = {
    formData: null,
  };

  onSignUpButtonPress = () => {
    const {
      formData: { gender, username, email, password, confirmPassword, age },
    } = this.state;

    let jsBack = {
      gender,
      username,
      email,
      password,
      age: parseFloat(age),
    };

    if (password === confirmPassword) {
      this.props.userSignUp(jsBack);
    } else {
      this.props.sendNotification("Password is not confirmed");
    }
  };

  onSignInButtonPress = () => {
    this.props.resetNotification();
    this.props.navigateAndReset("Sign In");
  };

  onFormDataChange = (formData) => {
    this.setState({ formData });
  };

  render() {
    const { themedStyle, status, notification } = this.props;
    return (
      <ScrollableAvoidKeyboardComponent style={themedStyle.container}>
        <LinearGradient colors={["#00a2ff", "#ffffff"]} style={{ flex: 1 }}>
          <View style={themedStyle.headerContainer}>
            <Text style={themedStyle.authLabel} category="s1">
              Create an account
            </Text>
          </View>
          <SignUpComponent
            style={themedStyle.formContainer}
            onDataChange={this.onFormDataChange}
          />
          <View style={themedStyle.buttonContainer}>
            {status === ASYNC_STATUS.LOADING && (
              <View>
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
            )}
            {notification !== null && (
              <Alert status={Alert.STATUS.DANGER}>{notification}</Alert>
            )}
            <Button
              style={themedStyle.SignUpButton}
              size="giant"
              disabled={!this.state.formData}
              onPress={this.onSignUpButtonPress}
            >
              SIGN UP
            </Button>
            <Button
              style={themedStyle.signInButton}
              appearance="ghost"
              activeOpacity={0.75}
              onPress={this.onSignInButtonPress}
            >
              Already have an account? Sign In
            </Button>
          </View>
        </LinearGradient>
      </ScrollableAvoidKeyboardComponent>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.auth.status,
    notification: state.auth.notification,
  };
}

const Actions = {
  navigateAndReset,
  userSignUp,
  resetNotification,
  sendNotification,
};

const SignUpContainer = connect(mapStateToProps, Actions)(SignUp);

export default withStyles(SignUpContainer, (theme: ThemeType) => {
  return {
    container: {
      flex: 1,
    },
    headerContainer: {
      justifyContent: "center",
      alignItems: "center",
      minHeight: 50,
      paddingTop: 50,
    },
    formContainer: {
      flex: 1,
      marginTop: 32,
      paddingHorizontal: 16,
    },
    buttonContainer: {
      marginHorizontal: 16,
      marginTop: 16,
    },
    authLabel: {
      marginTop: 16,
      color: "white",
    },
    SignUpButton: {
      marginTop: 16,
    },
    signInButton: {
      marginVertical: 12,
    },
    signUpText: {
      color: theme["text-hint-color"],
    },
  };
});
