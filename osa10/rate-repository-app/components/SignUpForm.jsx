import { View, StyleSheet } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import Button from './Button';

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <FormikTextInput
        name="passwordConfirmation"
        placeholder="Confirm password"
        secureTextEntry
      />
      <Button onPress={onSubmit} style={styles.button}>
        Sign up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.itemBackground,
    padding: theme.spacing.large,
  },
  button: {
    marginTop: theme.spacing.medium,
  },
});

export default SignUpForm; 