import { Formik, Form } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header, Segment, Button, Label } from 'semantic-ui-react';
import * as yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import { updateUserPassword } from '../../app/firestore/firebaseService';

export default function AcountPage(params) {
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <Segment>
      <Header dividing size='large' content='Account' />
      {currentUser.providerId === 'password' && (
        <>
          <Header sub content='Change Password' color='teal' />
          <p>Use this to change your password</p>
          <Formik
            initialValues={{
              newPassword1: '',
              newPassword2: '',
            }}
            validationSchema={yup.object({
              newPassword1: yup.string().required('password is required'),
              newPassword2: yup
                .string()
                .oneOf([yup.ref('newPassword1'), null], 'passwords do not match'),
            })}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              //
              try {
                await updateUserPassword(values);
              } catch (error) {
                setErrors({ auth: error.message });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ errors, isSubmitting, isValid, dirty }) => (
              <Form className='ui form'>
                <MyTextInput name='newPassword1' type='password' placeholder='New Password' />
                <MyTextInput name='newPassword2' type='password' placeholder='Confirm Password' />
                {errors.auth && (
                  <Label basic color='red' style={{ marginBottom: 10 }} content={errors.auth} />
                )}
                <Button
                  style={{ display: 'block' }}
                  type='submit'
                  disabled={!isValid || isSubmitting || !dirty}
                  loading={isSubmitting}
                  size='large'
                  positive
                  content='update password'
                />
              </Form>
            )}
          </Formik>
        </>
      )}
      {currentUser.providerId === 'facebook.com' && (
        <>
          <Header sub content='facebook account' color='teal' />
          <p>Please visit facebook to update your account</p>
          <Button
            icon='facebook'
            color='facebook'
            content='go to facebook'
            as={Link}
            to='https://facebook.com'
          />
        </>
      )}
      {currentUser.providerId === 'google.com' && (
        <>
          <Header sub content='google' color='teal' />
          <p>Please visit google to update your account</p>
          <Button
            icon='google'
            color='google plus'
            content='go to google'
            as={Link}
            to='https://google.com'
          />
        </>
      )}
    </Segment>
  );
}
