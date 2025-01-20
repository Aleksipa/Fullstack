import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import { CREATE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  input: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: theme.borderRadius.small,
    padding: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.small,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.white,
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner username is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  text: yup
    .string()
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="ownerName"
        placeholder="Repository owner name"
        style={styles.input}
      />
      <FormikTextInput
        name="repositoryName"
        placeholder="Repository name"
        style={styles.input}
      />
      <FormikTextInput
        name="rating"
        placeholder="Rating between 0 and 100"
        style={styles.input}
        keyboardType="numeric"
      />
      <FormikTextInput
        name="text"
        placeholder="Review"
        style={styles.input}
        multiline
      />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText} fontWeight="bold">
          Create review
        </Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName: values.ownerName,
            repositoryName: values.repositoryName,
            rating: parseInt(values.rating),
            text: values.text,
          },
        },
      });

      if (data?.createReview) {
        navigate(`/repository/${data.createReview.repository.id}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={{
        ownerName: '',
        repositoryName: '',
        rating: '',
        text: '',
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReview; 