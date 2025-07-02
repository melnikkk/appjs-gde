import { useSelector } from 'react-redux';
import { RootState } from '@/infrastructure/store';

export const useAppSelector = useSelector.withTypes<RootState>();
