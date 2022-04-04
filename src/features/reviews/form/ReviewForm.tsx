import { observer } from "mobx-react-lite";
import React, {  useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ReviewFormValues } from "../../../app/models/review";
import RelexTextArea from "../../../app/common/form/RelexTextArea";
import RelexTextInput from "../../../app/common/form/RelexTextInput";
import RelexDateInput from "../../../app/common/form/RelexDateInput";

export default observer(function ReviewForm() {
  const history = useHistory();
  const { reviewStore } = useStore();
  const { createReview } = reviewStore;

  const [review] = useState<ReviewFormValues>(
    new ReviewFormValues()
  );

  const validationSchema = Yup.object({
    name: Yup.string().required("The review name is required"),
    startDate: Yup.string()
      .required("The review start date is required")
      .nullable(),
    endDate: Yup.string()
      .required("The review end date is required")
      .nullable(),
  });

  function handleFormSubmit(review: ReviewFormValues) {
    let newReview = {
      ...review,
      id: uuid(),
      createDate: new Date(),
    };
    createReview(newReview).then(() => history.push(`/reviews`));
  }

  return (
    <Segment clearing>
      <Header content="Review Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={review}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <RelexTextInput name="name" placeholder="Name" />
            <RelexTextArea rows={3} placeholder="Content" name="content" />
            <RelexDateInput
              placeholderText="Start date"
              name="startDate"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <RelexDateInput
              placeholderText="End date"
              name="endDate"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              as={Link}
              to="/reviews"
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
