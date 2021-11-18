import { EffectCallback, useEffect } from 'react';

export function useMountEffect(callback: EffectCallback) {
    useEffect(callback, [callback]);
}