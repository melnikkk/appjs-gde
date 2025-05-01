import { useSelector } from 'react-redux';
import type { RootState } from '../../../infrastructure/store';

export const useAppSelector = useSelector.withTypes<RootState>();
