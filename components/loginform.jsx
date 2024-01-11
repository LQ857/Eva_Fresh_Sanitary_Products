"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IonIcon } from "@ionic/react";
import { TailSpin } from "react-loader-spinner";
import { mailOutline, lockClosedOutline } from "ionicons/icons";
import { signIn } from "next-auth/react";
import ReCAPTCHA from "react-google-recaptcha";
import "@/app/src/login.css";

const LoginForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [captchaValue, setCaptchaValue] = useState("");

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
        setTimeout(() => {
          setError(false);
        }, 3000);
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
    <body>
      <title>Login</title>
      <div className="bk3" />
      <div className="bk4" />
      <section>
        <div className="form-box">
          <div className="form-value">
            <form onSubmit={handleSubmit} id="loginForm">
              <h2 className="log">Login</h2>
              <p className="logw">Sign in to unlock more sanitary products!</p>
              <div className="inputbox">
                <IonIcon icon={mailOutline} id="icc" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Username:"
                />
              </div>
              <div className="inputbox">
                <IonIcon icon={lockClosedOutline} id="icc" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password:"
                />
              </div>
              <ReCAPTCHA
                className="recaptcha"
                size="normal"
                sitekey="6LfebB8pAAAAAJ5MZgjhiWg1HCIsBRC5bhdIFIRr"
                onChange={handleCaptchaChange}
              />
              <button type="submit" className="reg1" disabled={loading}>
                {loading ? (
                  <div className="load">
                    <TailSpin
                      type="ThreeDots"
                      color="white"
                      height={25}
                      width={35}
                      style={{ marginRight: "5px" }}
                    />
                    <span>Loading...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
              <div className="register">
                {error && (
                  <p className="error">Incorrect Username or Password</p>
                )}
                {!error && (
                  <p>
                    Do not have an account?{" "}
                    <Link className="toReg" href="/register">
                      Register
                    </Link>
                  </p>
                )}
                <br />
                <p>© 2023 Eva Fresh. All rights reserved.</p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </body>
  );
};

export default LoginForm;
