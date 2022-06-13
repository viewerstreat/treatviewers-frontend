import React, {useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import {useDispatch} from 'react-redux';
// import {useTypedSelector} from '../../hooks/useTypeSelector';
import OngoingCarousel from './OngoingCarousel';
import InviteFriend from './InviteFriend';
import {getOngoingContests} from '../../redux/action';
import {useTypedSelector} from '../../redux/store';

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

function OngoingContest() {
  const dispatch = useDispatch();
  const {contests, loading, error} = useTypedSelector(state => state.ongoingContests);
  const getData = async () => {
    dispatch(getOngoingContests());
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (error) {
    console.log(error);
  }
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      ListHeaderComponent={ListHeader}
      data={contests}
      renderItem={({item}) => {
        console.log('rendering item with key: ', item);
        return (
          <View>
            <Text style={styles.item}>{item.key}</Text>
            <Image
              style={{height: 300, resizeMode: 'contain'}}
              source={{uri: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Kahaani_poster.jpg'}}
            />
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  h1Txt: {
    backgroundColor: '#FFFFFA',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  listWrapper: {
    // minHeight: 200,
    // backgroundColor: 'blue',
  },
  item: {
    padding: 10,
    color: '#FFFFFA',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },
});

export default OngoingContest;
