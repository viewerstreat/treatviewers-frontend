import React from 'react';
import {View, Text, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import OngoingCarousel from './OngoingCarousel';
import InviteFriend from './InviteFriend';
import OngoingContestCard from './OngoingContestCard';
import {RootState} from '../../redux/store';
import {useAppSelector} from '../../redux/useTypedSelectorHook';
import {OngoingContestsData} from '../../redux/ongoingContestsSlice';
import {COLOR_WHITE} from '../../utils/constants';

function OngoingContestHeaderSection() {
  return <Text style={styles.h1Txt}>Ongoing Contests</Text>;
}

function ListHeader() {
  return (
    <View>
      <OngoingCarousel />
      <InviteFriend />
      <OngoingContestHeaderSection />
    </View>
  );
}

function OngoingContestSection() {
  const {values, loading} = useAppSelector((state: RootState) => state.ongoingContests);

  if (loading) {
    return (
      <View>
        <ActivityIndicator color={COLOR_WHITE} size="large" />
      </View>
    );
  }

  const _renderItem = ({item}: {item: OngoingContestsData}) => {
    console.log('rendering item with key: ', item.key);
    return <OngoingContestCard data={item} />;
  };

  return <FlatList ListHeaderComponent={ListHeader} data={values} renderItem={_renderItem} />;
}

const styles = StyleSheet.create({
  h1Txt: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: COLOR_WHITE,
  },
});

export default OngoingContestSection;
