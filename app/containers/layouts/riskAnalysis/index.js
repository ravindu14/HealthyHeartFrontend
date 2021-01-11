import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Dimensions,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { withStyles, Button, Radio, RadioGroup } from "react-native-ui-kitten";
import { LinearGradient } from "expo-linear-gradient";
import { navigate, navigateAndReset } from "@app/actions/routes";
import { getUserData } from "@app/actions/auth";
import { initializeAnalysis, getRiskAnalysis } from "@app/actions/heartRate";
import { ASYNC_STATUS } from "@app/constants/async";

import ScrollableAvoidKeyboardComponent from "@app/components/common/ScrollableAvoidKeyboardComponent";
import ValidationInput from "@app/components/common/ValidationInput";

class RiskAnalysisScreen extends Component {
  state = {
    heartDisease: 0,
    smoker: 0,
    subAbuse: 0,
    bloodPressure: 0,
    historyHeart: 0,
    hyperlipidemia: 0,
    alcohol: 0,
    exercises: 0,
    exertion: 0,
    cold: 0,
    Dizzy: 0,
    fainting: 0,
    fatigue: 0,
    breathing: 0,
  };

  componentDidMount() {
    this.props.initializeAnalysis();
    this.props.getUserData();
  }

  onChangeFormValue = (value) => {
    this.setState({
      ...this.state,
      ...value,
    });
  };

  onSubmitAnalysis = () => {
    const {
      heartDisease,
      smoker,
      subAbuse,
      bloodPressure,
      historyHeart,
      hyperlipidemia,
      alcohol,
      exercises,
      exertion,
      cold,
      Dizzy,
      fainting,
      fatigue,
      breathing,
    } = this.state;
    const { gender, userDetails } = this.props;

    let data = {
      sex: gender,
      age: userDetails ? userDetails.age : 50,
      Q1: heartDisease,
      Q2: smoker,
      Q3: subAbuse,
      Q4: bloodPressure,
      Q5: historyHeart,
      Q6: hyperlipidemia,
      Q7: alcohol,
      Q8: exercises,
      Q9: exertion,
      Q10: cold,
      Q11: Dizzy,
      Q12: fainting,
      Q13: fatigue,
      Q14: breathing,
    };

    this.props.getRiskAnalysis(data);
  };

  render() {
    const {
      heartDisease,
      smoker,
      subAbuse,
      bloodPressure,
      historyHeart,
      hyperlipidemia,
      alcohol,
      exercises,
      exertion,
      cold,
      dizzy,
      fainting,
      fatigue,
      breathing,
    } = this.state;
    const { themedStyle, heartRate, authStatus, status, analysis } = this.props;

    return (
      <ScrollableAvoidKeyboardComponent style={themedStyle.formContainer}>
        <LinearGradient colors={["#553fd1", "#000000"]} style={{ flex: 1 }}>
          {status === ASYNC_STATUS.LOADING ||
          authStatus === ASYNC_STATUS.LOADING ? (
            <LinearGradient colors={["#553fd1", "#000000"]} style={{ flex: 1 }}>
              <ActivityIndicator size="large" color="#ffffff" />
            </LinearGradient>
          ) : (
            <Fragment>
              {heartRate ? (
                <View style={themedStyle.container}>
                  <RadioGroup
                    selectedIndex={heartDisease}
                    onChange={(heartDisease) =>
                      this.onChangeFormValue({ heartDisease })
                    }
                  >
                    <Text
                      style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}
                    >
                      Are you already diagnosed as having heart disease?
                    </Text>
                    <Radio
                      key={0}
                      text="No"
                      style={{ marginVertical: 10 }}
                      textStyle={{ color: "#ffffff" }}
                    />
                    <Radio
                      key={1}
                      text="Yes"
                      style={{ marginVertical: 10 }}
                      textStyle={{ color: "#ffffff" }}
                    />
                  </RadioGroup>
                  <RadioGroup
                    selectedIndex={smoker}
                    onChange={(smoker) => this.onChangeFormValue({ smoker })}
                  >
                    <Text
                      style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}
                    >
                      Are you smoker?
                    </Text>
                    <Radio
                      key={0}
                      text="No"
                      style={{ marginVertical: 10 }}
                      textStyle={{ color: "#ffffff" }}
                    />
                    <Radio
                      key={1}
                      text="Yes"
                      style={{ marginVertical: 10 }}
                      textStyle={{ color: "#ffffff" }}
                    />
                  </RadioGroup>
                  <RadioGroup
                    selectedIndex={subAbuse}
                    onChange={(subAbuse) =>
                      this.onChangeFormValue({ subAbuse })
                    }
                  >
                    <Text
                      style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}
                    >
                      Do you have a history of substance abuse?
                    </Text>
                    <Radio
                      key={0}
                      text="No"
                      style={{ marginVertical: 10 }}
                      textStyle={{ color: "#ffffff" }}
                    />
                    <Radio
                      key={1}
                      text="Yes"
                      style={{ marginVertical: 10 }}
                      textStyle={{ color: "#ffffff" }}
                    />
                  </RadioGroup>
                  <RadioGroup
                    selectedIndex={bloodPressure}
                    onChange={(bloodPressure) =>
                      this.onChangeFormValue({ bloodPressure })
                    }
                  >
                    <Text
                      style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}
                    >
                      Do you suffer from high blood pressure?
                    </Text>
                    <Radio
                      key={0}
                      text="No"
                      style={{ marginVertical: 10 }}
                      textStyle={{ color: "#ffffff" }}
                    />
                    <Radio
                      key={1}
                      text="Yes"
                      style={{ marginVertical: 10 }}
                      textStyle={{ color: "#ffffff" }}
                    />
                  </RadioGroup>
                  <RadioGroup
                    selectedIndex={historyHeart}
                    onChange={(historyHeart) =>
                      this.onChangeFormValue({ historyHeart })
                    }
                  >
                    <Text
                      style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}
                    >
                      Do you have a family history of heart disease?
                    </Text>
                    <Radio
                      key={0}
                      text="No"
                      style={{ marginVertical: 10 }}
                      textStyle={{ color: "#ffffff" }}
                    />
                    <Radio
                      key={1}
                      text="Yes"
                      style={{ marginVertical: 10 }}
                      textStyle={{ color: "#ffffff" }}
                    />
                  </RadioGroup>
                  <RadioGroup
                    selectedIndex={hyperlipidemia}
                    onChange={(hyperlipidemia) =>
                      this.onChangeFormValue({ hyperlipidemia })
                    }
                  >
                    <Text
                      style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}
                    >
                      Do you have hyperlipidemia?
                    </Text>
                    <Radio
                      key={0}
                      text="No"
                      style={{ marginVertical: 10 }}
                      textStyle={{ color: "#ffffff" }}
                    />
                    <Radio
                      key={1}
                      text="Yes"
                      style={{ marginVertical: 10 }}
                      textStyle={{ color: "#ffffff" }}
                    />
                  </RadioGroup>
                  <RadioGroup
                    selectedIndex={alcohol}
                    onChange={(alcohol) => this.onChangeFormValue({ alcohol })}
                  >
                    <Text
                      style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}
                    >
                      Do you have a history of excessive use of alcohol or
                      caffeine?
                    </Text>
                    <Radio
                      key={0}
                      text="No"
                      style={{ marginVertical: 10 }}
                      textStyle={{ color: "#ffffff" }}
                    />
                    <Radio
                      key={1}
                      text="Yes"
                      style={{ marginVertical: 10 }}
                      textStyle={{ color: "#ffffff" }}
                    />
                  </RadioGroup>
                  <RadioGroup
                    selectedIndex={exercises}
                    onChange={(exercises) =>
                      this.onChangeFormValue({ exercises })
                    }
                  >
                    <Text
                      style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}
                    >
                      Do you engage in regular exercises?
                    </Text>
                    <Radio
                      key={0}
                      text="No"
                      style={{ marginVertical: 10 }}
                      textStyle={{ color: "#ffffff" }}
                    />
                    <Radio
                      key={1}
                      text="Yes"
                      style={{ marginVertical: 10 }}
                      textStyle={{ color: "#ffffff" }}
                    />
                  </RadioGroup>

                  <RadioGroup
                    selectedIndex={exertion}
                    onChange={(exertion) =>
                      this.onChangeFormValue({ exertion })
                    }
                  >
                    <Text
                      style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}
                    >
                      Do you have any chest pain, neck, back, or jaw pain on
                      exertion?
                    </Text>
                    <Radio
                      key={0}
                      text="No"
                      style={{ marginVertical: 10 }}
                      textStyle={{ color: "#ffffff" }}
                    />
                    <Radio
                      key={1}
                      text="Yes"
                      style={{ marginVertical: 10 }}
                      textStyle={{ color: "#ffffff" }}
                    />
                  </RadioGroup>

                  <RadioGroup
                    selectedIndex={cold}
                    onChange={(cold) => this.onChangeFormValue({ cold })}
                  >
                    <Text
                      style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}
                    >
                      Do you have sudden cold sweat?
                    </Text>
                    <Radio
                      key={0}
                      text="No"
                      style={{ marginVertical: 10 }}
                      textStyle={{ color: "#ffffff" }}
                    />
                    <Radio
                      key={1}
                      text="Yes"
                      style={{ marginVertical: 10 }}
                      textStyle={{ color: "#ffffff" }}
                    />
                  </RadioGroup>
                  <RadioGroup
                    selectedIndex={dizzy}
                    onChange={(dizzy) => this.onChangeFormValue({ dizzy })}
                  >
                    <Text
                      style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}
                    >
                      Do you feel any Dizzy spells?
                    </Text>
                    <Radio
                      key={0}
                      text="No"
                      style={{ marginVertical: 10 }}
                      textStyle={{ color: "#ffffff" }}
                    />
                    <Radio
                      key={1}
                      text="Yes"
                      style={{ marginVertical: 10 }}
                      textStyle={{ color: "#ffffff" }}
                    />
                  </RadioGroup>
                  <RadioGroup
                    selectedIndex={fainting}
                    onChange={(fainting) =>
                      this.onChangeFormValue({ fainting })
                    }
                  >
                    <Text
                      style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}
                    >
                      Do you have any fainting or near fainting?
                    </Text>
                    <Radio
                      key={0}
                      text="No"
                      style={{ marginVertical: 10 }}
                      textStyle={{ color: "#ffffff" }}
                    />
                    <Radio
                      key={1}
                      text="Yes"
                      style={{ marginVertical: 10 }}
                      textStyle={{ color: "#ffffff" }}
                    />
                  </RadioGroup>
                  <RadioGroup
                    selectedIndex={fatigue}
                    onChange={(fatigue) => this.onChangeFormValue({ fatigue })}
                  >
                    <Text
                      style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}
                    >
                      Do you have any Weaknesses or fatigue?
                    </Text>
                    <Radio
                      key={0}
                      text="No"
                      style={{ marginVertical: 10 }}
                      textStyle={{ color: "#ffffff" }}
                    />
                    <Radio
                      key={1}
                      text="Yes"
                      style={{ marginVertical: 10 }}
                      textStyle={{ color: "#ffffff" }}
                    />
                  </RadioGroup>
                  <RadioGroup
                    selectedIndex={breathing}
                    onChange={(breathing) =>
                      this.onChangeFormValue({ breathing })
                    }
                  >
                    <Text
                      style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}
                    >
                      Do you have any breathing difficulties on exertion?
                    </Text>
                    <Radio
                      key={0}
                      text="No"
                      style={{ marginVertical: 10 }}
                      textStyle={{ color: "#ffffff" }}
                    />
                    <Radio
                      key={1}
                      text="Yes"
                      style={{ marginVertical: 10 }}
                      textStyle={{ color: "#ffffff" }}
                    />
                  </RadioGroup>
                  <View style={themedStyle.buttonContainer}>
                    <Button
                      style={themedStyle.ActionButton}
                      size="giant"
                      onPress={this.onSubmitAnalysis}
                    >
                      Predict Risk Value
                    </Button>
                  </View>
                </View>
              ) : (
                <View style={themedStyle.errorContainer}>
                  <Text style={themedStyle.errorText}>
                    Please get the current heart rate
                  </Text>
                </View>
              )}
              {analysis === "You are in risk zone" ? (
                <View
                  style={{
                    flex: 1,
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 20,
                    backgroundColor: "#b51212",
                    borderRadius: 10,
                    padding: 30,
                  }}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 12,
                      marginTop: 10,
                      marginBottom: 10,
                      marginLeft: "auto",
                      marginRight: "auto",
                      fontWeight: "500",
                    }}
                  >
                    {analysis}
                  </Text>
                  <Button
                    onPress={() => this.props.navigateAndReset("Dashboard")}
                  >
                    Got It
                  </Button>
                </View>
              ) : analysis === "You are in safe zone" ? (
                <View
                  style={{
                    flex: 1,
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 20,
                    backgroundColor: "#119e1d",
                    borderRadius: 10,
                    padding: 30,
                  }}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 12,
                      marginTop: 10,
                      marginBottom: 10,
                      marginLeft: "auto",
                      marginRight: "auto",
                      fontWeight: "500",
                    }}
                  >
                    {analysis}
                  </Text>
                  <Button
                    onPress={() => this.props.navigateAndReset("Dashboard")}
                  >
                    Got It
                  </Button>
                </View>
              ) : null}
            </Fragment>
          )}
        </LinearGradient>
      </ScrollableAvoidKeyboardComponent>
    );
  }
}

const Actions = {
  navigate,
  navigateAndReset,
  getUserData,
  initializeAnalysis,
  getRiskAnalysis,
};

function mapStateToProps(state) {
  return {
    heartRate: state.heart.heartRate,
    gender: state.auth.user.gender,
    authStatus: state.auth.status,
    userDetails: state.auth.userDetails,
    status: state.heart.status,
    analysis: state.heart.analysis,
  };
}

const RiskAnalysisScreenContainer = connect(
  mapStateToProps,
  Actions
)(RiskAnalysisScreen);

export default withStyles(RiskAnalysisScreenContainer, (theme) => ({
  formContainer: {
    flex: 1,
  },
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  imageContainer: {
    marginTop: 60,
  },
  buttonContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
  ActionButton: {},
  errorContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#db3737",
    marginTop: 20,
    borderRadius: 20,
  },
  errorText: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "700",
  },
}));
