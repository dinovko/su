import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'store/store';

// Использование вместо простого `useDispatch`
export const useAppDispatch: () => AppDispatch = useDispatch;

// Использование вместо простого `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;