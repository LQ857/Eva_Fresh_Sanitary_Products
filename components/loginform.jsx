'use client'
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Fix import
import { IonIcon } from "@ionic/react";
import { TailSpin } from "react-loader-spinner";
import { mailOutline, lockClosedOutline } from "ionicons/icons";
import { signIn } from "next-auth/react";
import ReCAPTCHA from 'react-google-recaptcha';
import validateCaptcha from "@/app/api/validateCaptcha/route";

const LoginForm = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [captchaValue, setCaptchaValue] = useState('');

  const handleCaptchaChange = (value) => {
    // Handle captcha value change
    setCaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!captchaValue) {
      alert("Please click <I'm not a robot> before sending the form");
      return;
    }

    try {
      setLoading(true);
      const res = await signIn("credentials", {
        name,
        password,
        redirect: false,
      });

      if (res.error) {
        setError(true);
      } else {
        router.push("/dashboard");
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Internal Server Error");
    }
  };

  return (
    <div>
      <title>Login</title>
      <section>
        <div className="form-box">
          <div className="form-value">
            <form onSubmit={handleSubmit} id="loginForm">
              <h2>Login</h2>
              <div className="inputbox">
                <IonIcon icon={mailOutline} />
                <input
                  type="text" // Change type to text
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="name">Username:</label>
              </div>
              <div className="inputbox">
                <IonIcon icon={lockClosedOutline} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
              </div>
              <br />
              <ReCAPTCHA
                size="normal"
                sitekey="6LfebB8pAAAAAJ5MZgjhiWg1HCIsBRC5bhdIFIRr"
                onChange={handleCaptchaChange}
              />
              <button type="submit" className="reg1" disabled={loading}>
                {loading ? (
                  <>
                    <TailSpin
                      type="ThreeDots"
                      color="black"
                      height={20}
                      width={40}
                      style={{ marginRight: "5px" }}
                    />
                    <span>Loading...</span>
                  </>
                ) : (
                  'Login'
                )}
              </button>
              <div className="register">
                {error && <p className="error">Incorrect Username or Password</p>}
                {!error && (
                  <p>
                    Do not have an account? <Link href="/register">Register</Link>
                  </p>
                )}
                <br />
                <p>© 2023 Oasis. All rights reserved.</p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginForm;
