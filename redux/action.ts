import {Dispatch} from 'redux';
import {OngoingContest} from './reducer';
export enum ActionType {
  GET_ONGOING_CONTESTS_PENDING = 'GET_ONGOING_CONTESTS_PENDING',
  GET_ONGOING_CONTESTS_SUCCESS = 'GET_ONGOING_CONTESTS_SUCCESS',
  GET_ONGOING_CONTESTS_FAIL = 'GET_ONGOING_CONTESTS_FAIL',
}

interface actionPending {
  type: ActionType.GET_ONGOING_CONTESTS_PENDING;
}

interface actionSuccess {
  type: ActionType.GET_ONGOING_CONTESTS_SUCCESS;
  payload: OngoingContest[];
}

interface actionFail {
  type: ActionType.GET_ONGOING_CONTESTS_FAIL;
  payload: string;
}

export type Action = actionPending | actionSuccess | actionFail;

export const getOngoingContests = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({type: ActionType.GET_ONGOING_CONTESTS_PENDING});

    try {
      const data = require('../mockData.json');
      console.log(data);
      dispatch({
        type: ActionType.GET_ONGOING_CONTESTS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      const {message} = err as Error;
      dispatch({
        type: ActionType.GET_ONGOING_CONTESTS_FAIL,
        payload: message,
      });
    }
  };
};
