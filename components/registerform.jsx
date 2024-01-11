"use client";
import axios from "axios";
import { IonIcon } from "@ionic/react";
import { TailSpin } from "react-loader-spinner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  mailOutline,
  lockClosedOutline,
  diamondOutline,
  personCircleOutline,
} from "ionicons/icons";
import Link from "next/link";
import "@/app/src/register.css";

const registerform = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users", {
        name: name,
        email: email,
        password: password,
        adminCode: adminCode,
      });
      router.replace("/login");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };
  return (
    <body>
      <div className="bk1" />
      <div className="bk2" />
      <title>Register</title>
      <section>
        <div className="form-box">
          <div className="form-value">
            <form onSubmit={handleSubmit}>
              <h2 className="reg">Register</h2>
              <p className="regw">Welcome to Eva Fresh Sanitary Products!</p>
              <br />
              <div className="inputboxesreg">
                <div className="inputbox">
                  <div className="block1" />
                  <IonIcon icon={personCircleOutline} id="icc" />
                  <input
                    type="name"
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Username:"
                  />
                </div>
                <div className="inputbox">
                  <div className="block1" />
                  <IonIcon icon={mailOutline} id="icc" />
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email:"
                  />
                </div>
                <div className="inputbox">
                  <div className="block1" />
                  <IonIcon icon={lockClosedOutline} id="icc" />
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password:"
                  />
                </div>
                <div className="inputbox">
                  <div className="block1" />
                  <IonIcon icon={diamondOutline} id="icc" />
                  <input
                    type="text"
                    onChange={(e) => setAdminCode(e.target.value)}
                    placeholder="Code/optional:"
                  />
                </div>
              </div>
              <div className="block" />
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
                  "Register"
                )}
              </button>
              <div className="register">
                {error && <p className="error">Username has been registered</p>}
                {!error && (
                  <p>
                    Already have an account?{" "}
                    <Link href="/login" className="toLogin">
                      Login
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

export default registerform;
