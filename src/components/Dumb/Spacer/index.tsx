import { FC } from 'react';

type variant = 4 | 8 | 16 | 24 | 32 | 48 | 64 | 96 | 128 | 160 | 256;

export const Spacer: FC<{ size: variant }> = ({ size }) => {
  return <div style={{ height: size }} />;
};
