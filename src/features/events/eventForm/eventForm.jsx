import cuid from "cuid";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import { createEvent, updateEvent } from "../eventActions";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectinput from "../../../app/common/form/MySelectinput";
import { categoryData } from "../../../app/api/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";

export default function EventForm({ match, history }) {
  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );
  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provie a title"),
    category: Yup.string().required("You must provie a category"),
    description: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
    date: Yup.string().required(),
  });

  // function handleFormSubmit() {}

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          selectedEvent
            ? dispatch(updateEvent({ ...selectedEvent, ...values }))
            : dispatch(
                createEvent({
                  ...values,
                  id: cuid(),
                  hostedBy: "Bob",
                  attendees: [],
                  //   hostPhotoURL: "https://randomuser.me/api/portraits/men/20.jpg",
                  hostPhotoURL: "./assets/user.png",
                  //   /home/ma/udemy/revents/public/assets/user.png
                })
              );
          history.push("/events");
        }}
      >
        {({isSubmitting, dirty, isValid}) => (
          <Form className='ui form'>
            <Header sub content='Event Details' color='teal' />
            <MyTextInput name='title' placeholder='Event title' />
            <MySelectinput
              name='category'
              placeholder='Event category'
              options={categoryData}
            />
            <MyTextArea name='description' placeholder='Description' rows={3} />
            <Header sub content='Event Location Details' color='teal' />
            <MyTextInput name='city' placeholder='City' />
            <MyTextInput name='venue' placeholder='Venue' />
            <MyDateInput
              name='date'
              placeholderText='Event Date'
              timeFormat='HH:mm'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm a'
            />
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='submit'
              positive
              content='Submit'
              floated='right'
            />
            <Button
              disabled={isSubmitting}
              type='submit'
              content='Cancel'
              floated='right'
              as={Link}
              to='/events'
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
