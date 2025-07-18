import { style } from '@vanilla-extract/css';

export const boxShadow = '0px 6px 12px 0px rgba(0, 0, 0, 0.10)';
export const boxShadowClass = style({ boxShadow });

export const softBoxShadow = '0 1px 2px 0 rgba(0,0,0,0.05)';
export const softBoxShadowClass = style({ boxShadow: softBoxShadow });

export const heavyBoxShadow = '0px 10px 18px -5px #B0B0B0';
export const heavyBoxShadowClass = style({ boxShadow: heavyBoxShadow });
