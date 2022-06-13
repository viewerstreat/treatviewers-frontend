import {combineReducers} from 'redux';
import {Action, ActionType} from './action';

export interface OngoingContest {
  key: number;
  title: string;
  sponsoredBy: string;
  topPrize: string;
  prizeRatio: string;
  entryFee: number;
}

export interface OngoingContestState {
  contests: OngoingContest[];
  loading: boolean;
  error: string | null;
}

const initialState = {
  contests: [],
  loading: false,
  error: null,
};

export const ongoingContestsReducer = (
  state: OngoingContestState = initialState,
  action: Action,
): OngoingContestState => {
  switch (action.type) {
    case ActionType.GET_ONGOING_CONTESTS_PENDING:
      return {...state, loading: true};
    case ActionType.GET_ONGOING_CONTESTS_SUCCESS:
      return {...state, loading: false, contests: action.payload};
    case ActionType.GET_ONGOING_CONTESTS_FAIL:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};

const reducers = combineReducers({
  ongoingContests: ongoingContestsReducer,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
