import { indigo, indigoDark, gold, goldDark, slate, slateDark, whiteA, amber, amberDark } from '@radix-ui/colors';
const commonStyles = {
  

  
};

const lightStyles = {
  accentedSubtle: '#dcd9d8',
  accented: '#2f4260',
  background: '#ebe3d6',
  accentedText: '#f2fafb',
  mainText: '#6e695e',
  mainHeading: '#2f4260'
};

const darkStyles = {
  accentedSubtle: '#dcd9d8',
  accented: '#1a2539',
  background: '#2a3344',
  accentedText: '#b4c1e0',
  mainText: '#fafeff',
  mainHeading: '#2957e6'
};

const colors = {  
  light: {
    ...commonStyles,
    ...lightStyles,
    ...indigo,
    ...gold,
    ...slate,
    ...amber,
    ...whiteA
  },
  dark: {
    ...commonStyles,
    ...darkStyles,
    ...indigoDark,
    ...goldDark,
    ...slateDark,
    ...amberDark,
    ...whiteA
  },
};

export default colors;
