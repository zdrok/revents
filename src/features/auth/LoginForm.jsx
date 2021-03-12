import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Button, Divider, Label } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../app/common/modals/modalReducer';
import { signInWithEmail } from '../../app/firestore/firebaseService';
import SocialLogin from './SocialLogin';

export default function LoginForm() {
  const dispatch = useDispatch();

  return (
    <ModalWrapper size='mini' header='Sign in to Re-vents'>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().required().email(),
          password: Yup.string().required(),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await signInWithEmail(values);
            setSubmitting(false);
            dispatch(closeModal());
          } catch (error) {
            // setErrors({ auth: error.message });
            setErrors({ auth: 'Problem with username or passwoed' });
            setSubmitting(false);
            // console.log(error);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid, errors }) => (
          <Form className='ui form'>
            <MyTextInput name='email' placeholder='Email address' />
            <MyTextInput name='password' placeholder='Password' type='password' />
            {errors.auth && (
              <Label basic color='red' style={{ marginBottom: 10 }} content={errors.auth} />
            )}
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='submit'
              color='teal'
              content='Login'
              size='large'
              fluid
            />
            <Divider horizontal>Or</Divider>
            <SocialLogin />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}
