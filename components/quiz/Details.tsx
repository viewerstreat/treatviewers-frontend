import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Entypo from 'react-native-vector-icons/Entypo';
import {AnswerSchema} from '../../definitions/quiz';
import {
  COLOR_BLACK,
  COLOR_BROWN,
  COLOR_GREEN,
  COLOR_GREY,
  COLOR_LIGHT_BROWN,
  COLOR_RED,
  COLOR_WHITE,
} from '../../utils/constants';

interface DetailsProps {
  showDetails: boolean;
  answers: AnswerSchema[];
  onBack: () => void;
}

function Details(props: DetailsProps) {
  if (!props.showDetails) {
    return <></>;
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.h1Txt}>Your Answers</Text>
      <View style={styles.hr} />
      {props.answers.map(ans => (
        <Answer {...ans} key={ans.questionNo} />
      ))}
      <View style={styles.btnWrapper}>
        <TouchableOpacity style={styles.btn} onPress={props.onBack}>
          <Text style={styles.btnTxt}>Back To Feed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Answer(ans: AnswerSchema) {
  return (
    <View style={styles.ansWrapper} key={ans.questionNo}>
      <Text style={styles.qTxt}>
        {ans.questionNo}. {ans.questionText}
      </Text>
      <View style={styles.optWrapper}>
        {ans.options.map(e => (
          <View key={e.optionId} style={styles.chkRow}>
            <BouncyCheckbox
              disableBuiltInState
              size={20}
              isChecked={e.optionId === ans.selectedOptionId}
              text={e.optionText}
              textStyle={styles.optTxt}
              fillColor={COLOR_LIGHT_BROWN}
              unfillColor={COLOR_WHITE}
              innerIconStyle={styles.optIconInner}
              onPress={() => {}}
            />
            {e.optionId === ans.selectedOptionId ? (
              <View style={styles.iconWrapper}>
                {e.isCorrect ? (
                  <Entypo name="check" size={20} color={COLOR_GREEN} />
                ) : (
                  <Entypo name="cross" size={20} color={COLOR_RED} />
                )}
              </View>
            ) : (
              <></>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    backgroundColor: COLOR_WHITE,
  },
  h1Txt: {
    textAlign: 'center',
    fontSize: 24,
    color: COLOR_BLACK,
  },
  hr: {
    width: '100%',
    borderBottomColor: COLOR_GREY,
    borderBottomWidth: 1,
  },
  ansWrapper: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLOR_LIGHT_BROWN,
    marginBottom: 10,
  },
  qTxt: {
    fontSize: 16,
    color: COLOR_BROWN,
  },
  optWrapper: {
    paddingLeft: 15,
  },
  optIconInner: {
    borderWidth: 2,
  },
  optTxt: {
    textDecorationLine: 'none',
    width: '100%',
    alignItems: 'center',
  },
  chkRow: {
    flexDirection: 'row',
  },
  iconWrapper: {
    marginLeft: 10,
  },
  btnWrapper: {
    marginVertical: 10,
    alignItems: 'center',
  },
  btn: {
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_RED,
    borderRadius: 10,
    marginBottom: 10,
  },
  btnTxt: {
    fontSize: 16,
    color: COLOR_WHITE,
  },
});

export default Details;
