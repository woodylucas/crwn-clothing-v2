import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (!email || !password) {
      return;
    }

    try {
      const response = await signInAuthWithEmailAndPassword(email, password);
      console.log(response);
    } catch (error) {
      console.log("There was an error", error);
    }
  };

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign up with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="text"
          name="email"
          onChange={(evt) => setEmail(evt.target.value)}
          value={email}
          required
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          required
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button buttonType="google" onClick={handleSignInWithGoogle}>
            Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
