import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../definitions/navigation';
// import {FetchContestById} from '../../services/backend';
// import {showMessage} from '../../services/misc';
import {COLOR_BROWN} from '../../utils/constants';
import BackButton from './BackButton';
import Loader from './Loader';
import ContestDtls from './ContestDtls';

type Props = NativeStackScreenProps<RootStackParamList, 'QuizLanding'>;
function QuizLanding(props: Props) {
  const [showBackBtn] = useState(true);
  const [loading] = useState(true);

  // const [entryFee, setEntryFee] = useState(0);
  // const getContestDetails = async () => {
  //   try {
  //     setLoading(true);
  //     if (!props.route.params.contestId) {
  //       return;
  //     }
  //     const {data} = await FetchContestById(props.route.params.contestId);
  //     if (!data.success) {
  //       return;
  //     }
  //     setEntryFee(data.data[0].entryFee);
  //   } catch (err: any) {
  //     console.log(err);
  //     console.log(err?.response?.data);
  //     showMessage('Not able to get contest details');
  //   }
  // };

  // const getPlayTracker = async () => {
  //   try {
  //   } catch (err: any) {
  //     console.log(err);
  //     console.log(err?.response?.data);
  //     showMessage('Not able to get play tracker');
  //   }
  // };

  const onClickBackBtn = () => {
    console.log('onClickBackBtn');
  };

  const onClickPlay = () => {
    console.log('onClickPlay');
  };

  return (
    <View style={styles.container}>
      <BackButton onclick={onClickBackBtn} showBtn={showBackBtn} />
      <ScrollView style={styles.wrapper}>
        <ContestDtls
          title={props.route.params.title}
          prizeVale={100}
          entryFee={10}
          prizeRatio={'3:5'}
          onclick={onClickPlay}
        />
        <Loader loading={loading} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BROWN,
    padding: 20,
  },
  wrapper: {
    marginTop: 30,
    flex: 1,
  },
});

export default QuizLanding;
