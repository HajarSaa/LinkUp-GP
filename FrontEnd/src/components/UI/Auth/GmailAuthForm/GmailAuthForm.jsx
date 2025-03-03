import { useState } from "react";
import styles from "./GmailAuthForm.module.css";

// eslint-disable-next-line react/prop-types
const GmailAuthForm = ({ btnName }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  const emailHandler = () => {
    if (gmailRegex.test(email)) {
      console.log("Right Gmail Form : ✅ ", email);
      setEmail("");
      setStatus("")
    } else {
      console.log("Wrong Gmail Form : ❌ ", email);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      emailHandler();
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value === "") {
      setStatus("");
    }
    else if (gmailRegex.test(value)) {
      setStatus("success");
    } else if(!gmailRegex.test(value)){
      setStatus("error");
    }
  };

  return (
    <div className={styles.formContainer}>
      <input
        type="email"
        name="email"
        autoComplete="on"
        placeholder="name@gmail.com"
        value={email}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={`${styles.input} ${status && styles[status]}`}
      />
      <div className={`${styles.feedback} ${status && styles[status]}`}>
        {status === "error" && "email should be end with @gmail.com"}
      </div>
      <button className={styles.authBtn} onClick={emailHandler}>
        {btnName}
      </button>
    </div>
  );
};

export default GmailAuthForm;
