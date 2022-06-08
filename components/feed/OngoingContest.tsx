import React from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import OngoingCarousel from './OngoingCarousel';
import InviteFriend from './InviteFriend';

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
  return (
    <FlatList
      ListHeaderComponent={ListHeader}
      data={[
        {key: 'Devin'},
        {key: 'Dan'},
        {key: 'Dominic'},
        {key: 'Jackson'},
        {key: 'James'},
        {key: 'Joel'},
        {key: 'John'},
        {key: 'Jillian'},
        {key: 'Jimmy'},
        {key: 'Julie'},
        {key: 'abcd1'},
        {key: 'abcd2'},
        {key: 'abcd3'},
        {key: 'abcd4'},
        {key: 'abcd5'},
        {key: 'abcd6'},
        {key: 'abcd7'},
        {key: 'abcd8'},
        {key: 'abcd9'},
        {key: 'abcd10'},
        {key: 'abcd11'},
        {key: 'abcd12'},
        {key: 'abcd13'},
        {key: 'abcd14'},
        {key: 'abcd15'},
        {key: 'abcd16'},
        {key: 'abcd17'},
        {key: 'abcd18'},
        {key: 'abcd19'},
        {key: 'abcd20'},
        {key: 'abcd21'},
        {key: 'abcd22'},
        {key: 'abcd23'},
        {key: 'abcd24'},
        {key: 'abcd25'},
        {key: 'abcd26'},
        {key: 'abcd27'},
        {key: 'abcd28'},
        {key: 'abcd29'},
        {key: 'abcd30'},
        {key: 'abcd31'},
        {key: 'abcd32'},
        {key: 'abcd33'},
        {key: 'abcd34'},
        {key: 'abcd35'},
        {key: 'abcd36'},
        {key: 'abcd37'},
        {key: 'abcd38'},
        {key: 'abcd39'},
        {key: 'abcd40'},
        {key: 'abcd41'},
        {key: 'abcd42'},
        {key: 'abcd43'},
        {key: 'abcd44'},
        {key: 'abcd345'},
        {key: 'abcd46'},
        {key: 'abcd47'},
      ]}
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
