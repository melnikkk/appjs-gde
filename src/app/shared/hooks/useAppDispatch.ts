import { AppDispatch } from '@/infrastructure/store';
import { useDispatch } from 'react-redux';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
