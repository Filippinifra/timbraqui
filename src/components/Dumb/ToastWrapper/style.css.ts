import { tabletMediaQuery } from '@/utils/breakpoints';
import { zIndexValues } from '@/utils/zIndex';
import { style } from '@vanilla-extract/css';

export const wrapperClass = style({
  position: 'fixed',
  bottom: 0,
  left: 0,
  zIndex: zIndexValues.toast,
  padding: 20,
  boxSizing: 'border-box',
  width: '100%',

  '@media': {
    [tabletMediaQuery]: {
      width: 'auto',
    },
  },
});
