import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Icon from 'react-native-vector-icons/AntDesign';
import {OptionSchema} from '../../definitions/quiz';
import {GetNextQues} from '../../services/backend';
import {showMessage} from '../../services/misc';
import {COLOR_BROWN, COLOR_RED, COLOR_WHITE} from '../../utils/constants';

const windowHeight = Dimensions.get('window').height;
interface QuestionProps {
  showQuestion: boolean;
  contestId: string | undefined;
  currQuestionNo: number | undefined;
  submitAnswer: (questionNo: number, optionId: number) => void;
}

function Question(props: QuestionProps) {
  const [qNo, setQNo] = useState<number | null>(null);
  const [qTxt, setQTxt] = useState('');
  const [options, setOptions] = useState<OptionSchema[]>([]);

  const getQuestion = useCallback(async () => {
    console.log('getQuestion called', props.contestId);
    if (!props.contestId) {
      return;
    }
    try {
      const {data} = await GetNextQues(props.contestId);
      if (data.success) {
        setQNo(data.data.questionNo);
        setQTxt(data.data.questionText);
        setOptions(data.data.options);
      }
    } catch (err) {
      showMessage('Unable to retrive question');
    }
  }, [props.contestId]);

  useEffect(() => {
    if (props.showQuestion) {
      getQuestion();
    }
  }, [getQuestion, props.currQuestionNo, props.showQuestion]);

  const optionSelected = (optionId: number) => {
    setOptions(prev => prev.map(e => ({...e, isSelected: e.optionId === optionId})));
  };

  const submitAnswer = () => {
    if (!qNo) {
      return;
    }
    console.log('submitAnswer called here');
    const selected = options.filter(e => e.isSelected);
    if (selected.length < 1) {
      showMessage('Please select an answer');
      return;
    }
    console.log(selected[0].optionId);
    props.submitAnswer(qNo, selected[0].optionId);
  };

  if (!props.showQuestion) {
    return <></>;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.qTxtWrapper}>
        <Text style={styles.qTxt}>
          {`${qNo || ''}.`} {qTxt}
        </Text>
      </View>
      <View style={styles.optWrapper}>
        {options.map(e => (
          <View key={e.optionId} style={styles.optBox}>
            <BouncyCheckbox
              style={styles.checkbox}
              disableBuiltInState
              size={25}
              isChecked={e.isSelected}
              text={e.optionText}
              textStyle={styles.optTxt}
              fillColor={COLOR_RED}
              unfillColor={COLOR_WHITE}
              innerIconStyle={styles.optIconInner}
              onPress={() => optionSelected(e.optionId)}
            />
          </View>
        ))}
      </View>
      <View style={styles.btnWrapper}>
        <TouchableOpacity onPress={submitAnswer} style={styles.btn}>
          <Text style={styles.btnTxt}>Next</Text>
          <Icon name="rightcircleo" size={20} color={COLOR_WHITE} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    minHeight: windowHeight * 0.6,
  },
  qTxtWrapper: {
    backgroundColor: COLOR_WHITE,
    padding: 10,
    minHeight: 120,
  },
  qTxt: {
    fontSize: 18,
    color: COLOR_BROWN,
  },
  optWrapper: {
    marginTop: 20,
  },
  optBox: {
    marginTop: 15,
    padding: 5,
    paddingLeft: 10,
    flexDirection: 'row',
    backgroundColor: COLOR_WHITE,
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
  },
  checkbox: {
    width: '100%',
    height: '100%',
  },
  optTxt: {
    textDecorationLine: 'none',
    color: COLOR_BROWN,
    width: '100%',
    alignItems: 'center',
  },
  optIconInner: {
    borderWidth: 2,
  },
  btnWrapper: {
    marginTop: 40,
    alignItems: 'center',
  },
  btn: {
    width: 120,
    height: 40,
    backgroundColor: COLOR_RED,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
  },
  btnTxt: {
    fontSize: 18,
    color: COLOR_WHITE,
    marginRight: 10,
  },
});

export default Question;
