import { Pressable, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.small,
    padding: theme.spacing.medium,
  },
  text: {
    color: theme.colors.white,
    textAlign: 'center',
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
});

const Button = ({ children, style, ...props }) => {
  const buttonStyle = [styles.button, style];

  return (
    <Pressable style={buttonStyle} {...props}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default Button; 