import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";

import "./sign-up-form.styles.scss";
import Button from "../button/button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const signUpSchema = z.object({
  displayName: z
    .string()
    .min(6, "Display name must be at least 6 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z
    .string()
    .refine((value, { password }) => value === password, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }),
});

const SignUpForm = () => {
  const { handleSubmit, watch, register, reset } = useForm({
    defaultValues: defaultFormFields,
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    const { displayName, email, password, confirmPassword } = data;
    if (password !== confirmPassword) {
      alert("passwords do no match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      reset();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use ");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don&apos;t have an account yet?</h2>
      <span>Sign up with email and password</span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Display Name"
          type="text"
          name="displayName"
          register={register}
          watch={watch}
        />

        <FormInput
          label="Email"
          type="text"
          name="email"
          register={register}
          watch={watch}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          register={register}
          watch={watch}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          register={register}
          watch={watch}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
