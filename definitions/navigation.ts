import {
  PATH_FEED_SCREEN,
  PATH_FULLSCREEN,
  PATH_HOME,
  PATH_MOVIE_DETAILS,
  PATH_QUIZ_LANDING,
  PATH_SPLASH,
} from '../utils/constants';
import {MovieDetailsRouteParams} from './movie';
import {QuizParams} from './quiz';
import {VideoParams} from './video';

export type RootStackParamList = {
  [PATH_SPLASH]: undefined;
  [PATH_HOME]: undefined;
  [PATH_FULLSCREEN]: VideoParams;
  [PATH_QUIZ_LANDING]: QuizParams;
};

export type FeedStackParamList = {
  [PATH_FEED_SCREEN]: undefined;
  [PATH_MOVIE_DETAILS]: MovieDetailsRouteParams;
};
