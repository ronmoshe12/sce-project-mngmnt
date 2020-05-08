import * as Yup from "yup";
import {
  requiredField,
  email,
  passwordConfirm,
  rank,
  boolField,
} from "./inputs";

export const noValidate = Yup.object().shape({});

export const register = requiredField("name")
  .concat(email)
  .concat(passwordConfirm);

export const login = requiredField("password").concat(email);

export const adminAddUser = register.concat(rank).concat(boolField("active"));

export const adminEditUser = requiredField("name")
  .concat(rank)
  .concat(boolField("active"));

export const adminAssignFacility = requiredField("user").concat(
  requiredField("facility")
);


export const editFacility = requiredField("name").concat(
  requiredField("activity")).concat(
    requiredField("condition")).concat(
      boolField("fencing")).concat(
        boolField("handicappe")).concat(
          boolField("ligthing"))