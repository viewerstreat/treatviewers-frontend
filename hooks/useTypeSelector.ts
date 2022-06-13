import {useSelector, TypedUseSelectorHook} from 'react-redux';
import {RootState} from '../redux/reducer';
export const useBackupTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
