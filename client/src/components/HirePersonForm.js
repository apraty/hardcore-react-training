import React from "react";
import { Formik } from "formik";
import uuid from "uuid";

import * as Yup from "yup";
import {useAppModels} from "../config/modelHelpers";

const schema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
});

const HirePersonForm = () => {
  var { personStore } = useAppModels();

  return (
    <Formik
      validationSchema={schema}
      isInitialValid={true}
      initialValues={{
        firstName: "Abel",
        lastName: "Abrahamsson"
      }}
      onSubmit={values => {
        console.log("values", values);

        const newPerson = {
          ...values,
          id: uuid(),
          gender: "f",
          age: 30
        };

        personStore.hirePerson(newPerson);
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleSubmit,
        isValid,
        isInitialValid
      }) => {
        const goddamnValid = isInitialValid || isValid;

        return (
          <form onSubmit={handleSubmit}>
            <div>
              <label>First name</label>
              <input
                id="firstName"
                value={values.firstName}
                onChange={handleChange}
              />

              {errors.firstName && <span>{errors.firstName}</span>}
            </div>

            <div>
              <label>Last name</label>
              <input
                id="lastName"
                value={values.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <span>{errors.lastName}</span>}
            </div>

            <div>
              <button disabled={!goddamnValid} type="submit">
                Hire!
              </button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default HirePersonForm;
