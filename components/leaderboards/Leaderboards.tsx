import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';
import YourResults from './YourResults';
import {COLOR_BLACK, COLOR_LIGHT_BROWN, COLOR_RED, COLOR_WHITE} from '../../utils/constants';
import {formatCurrency} from '../../utils/utils';

interface LeaderboardsDataType {
  key: number;
  rank: number;
  name: string;
  contestsWon: number;
  earned: number;
}

const values: LeaderboardsDataType[] = [
  {
    key: 1,
    rank: 1,
    name: 'Sibaprasad Maiti',
    contestsWon: 12,
    earned: 126340,
  },
  {
    key: 2,
    rank: 2,
    name: 'Sibaprasad Maiti',
    contestsWon: 12,
    earned: 126340,
  },
  {
    key: 3,
    rank: 3,
    name: 'Sibaprasad Maiti',
    contestsWon: 12,
    earned: 126340,
  },
];

function Leaderboards() {
  const resetsIn = '22d 14Hrs';
  const _renderTableItem = (item: LeaderboardsDataType) => (
    <View key={item.key} style={styles.tableRow}>
      <Text style={[styles.rowTxt, styles.rankCell]}>{item.rank}</Text>
      <Text style={[styles.rowTxt, styles.nameCell]}>{item.name}</Text>
      <Text style={[styles.rowTxt, styles.contestsWonCell]}>{item.contestsWon}</Text>
      <Text style={[styles.rowTxt, styles.earnedCell]}>₹{formatCurrency(item.earned)}</Text>
    </View>
  );

  const loadMore = () => {
    console.log('loadMore');
  };

  return (
    <ScrollView style={styles.page}>
      <Text style={styles.h1Txt}>Leaderboards</Text>
      <LinearGradient
        colors={[COLOR_LIGHT_BROWN, COLOR_RED, COLOR_LIGHT_BROWN]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View style={styles.tableWrapper}>
          <View style={styles.headerRow}>
            <Text style={[styles.headerTxt, styles.rankCell]}>Rank</Text>
            <Text style={[styles.headerTxt, styles.nameCell]}>Name</Text>
            <Text style={[styles.headerTxt, styles.contestsWonCell]}>Contests Won</Text>
            <Text style={[styles.headerTxt, styles.earnedCell]}>Earned</Text>
          </View>
          <View>{values.map(item => _renderTableItem(item))}</View>
          <View style={styles.bottomRow}>
            <View style={styles.loadIconWrapper}>
              <TouchableOpacity onPress={loadMore}>
                <FeatherIcon name="chevrons-down" size={40} color={COLOR_WHITE} />
              </TouchableOpacity>
            </View>
            <Text style={styles.resetText}>Resets in: {resetsIn}</Text>
          </View>
        </View>
      </LinearGradient>
      <YourResults />
      <View style={styles.blank} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    // paddingBottom: 50,
  },
  h1Txt: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 15,
    textAlign: 'center',
    color: COLOR_BLACK,
  },
  tableWrapper: {
    minHeight: 200,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    paddingBottom: 5,
  },

  headerTxt: {
    color: COLOR_WHITE,
    fontSize: 12,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: COLOR_WHITE,
    paddingVertical: 3,
    marginBottom: 5,
  },
  rowTxt: {
    color: COLOR_RED,
    fontSize: 14,
  },
  rankCell: {
    width: 60,
    textAlign: 'center',
  },
  nameCell: {
    flex: 1,
    textAlign: 'center',
  },
  contestsWonCell: {
    width: 70,
    textAlign: 'center',
  },
  earnedCell: {
    width: 70,
    textAlign: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadIconWrapper: {
    width: '51%',
    flexDirection: 'row-reverse',
  },
  resetText: {
    color: COLOR_WHITE,
    marginLeft: 10,
  },
  yourResultWrapper: {
    paddingHorizontal: 20,
  },
  resultCard: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: COLOR_RED,
    borderRadius: 5,
  },
  blank: {
    height: 50,
  },
});

export default Leaderboards;
