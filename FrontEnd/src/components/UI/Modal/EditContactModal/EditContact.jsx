// import { useEffect, useRef, useState } from "react";
// import Modal from "../Modal";
// import styles from "./EditContact.module.css";
// import { FaLock } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { closeEditContactModal } from "../../../../API/redux_toolkit/modals/userProfile/editContactModal";
// const EditContactModal = () => {
//   const { isOpen, data } = useSelector((state) => state.editContact);
//   const [phone, setPhone] = useState(data?.phone || "");
//   const dispatch = useDispatch();
//   const phoneRef = useRef();

//   const handleChange = (e) => {
//     setPhone(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Updated Phone:", phone);
//     handleClose();
//   };

//   const handleClose = () => {
//     dispatch(closeEditContactModal());
//     setPhone("");
//   };

//   useEffect(() => {
//     if (isOpen && phoneRef.current) phoneRef.current.focus();
//   }, [isOpen]);

//   if (!isOpen || !data) return null;
//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={handleClose}
//       className={styles.contactModal}
//       zIndex={1002}
//       title="Edit Contact information"
//     >
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <label className={styles.mailLabel}>
//           <span className={styles.icon}>
//             <FaLock />
//           </span>
//           <span>Email Address</span>
//         </label>
//         <input
//           type="email"
//           value={data?.email}
//           // readOnly
//           className={styles.readOnlyInput}
//         />

//         <label>Phone</label>
//         <input
//           ref={phoneRef}
//           type="text"
//           value={phone}
//           onChange={handleChange}
//           className={styles.phoneInput}
//         />

//         <div className={styles.buttons}>
//           <button
//             className={styles.cancel_btn}
//             type="button"
//             onClick={handleClose}
//           >
//             Cancel
//           </button>
//           <button className={styles.submit_btn} type="submit">
//             Save Changes
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default EditContactModal;


import { useEffect, useRef, useState } from "react";
import Modal from "../Modal";
import styles from "./EditContact.module.css";
// import { FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { closeEditContactModal } from "../../../../API/redux_toolkit/modals/userProfile/editContactModal";
import useUpdateUserProfile from "../../../../API/hooks/userProfile/useUpdateUserProfile";
import Spinner from "../../Spinner/Spinner";

const EditContactModal = () => {
  const { isOpen, data } = useSelector((state) => state.editContact);
  // const userProfile = useSelector((state) => state.userProfile.data);

  const dispatch = useDispatch();
  const updateProfile = useUpdateUserProfile();

  const [form, setForm] = useState({
    email: data?.email || "",
    phone: data?.phone || "",
  });

  // const phoneRef = useRef();
  const mailRef = useRef();

  useEffect(() => {
    if (isOpen && data) {
      setForm({
        email: data?.email || "",
        phone: data?.phone || "",
      });
    }
  }, [isOpen, data]);

  const handleClose = () => {
    dispatch(closeEditContactModal());
    setForm({ email: "", phone: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateProfile.mutate(
      {
        email: form.email.trim(),
      },
      {
        onSuccess: () => {
          handleClose();
        },
      }
    );
  };

  useEffect(() => {
    // if (isOpen && phoneRef.current) phoneRef.current.focus();
    if (isOpen && mailRef.current) mailRef.current.focus();
  }, [isOpen]);

  if (!isOpen || !data) return null;
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className={styles.contactModal}
      zIndex={1002}
      title="Edit Contact information"
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.mailLabel}>
          {/* <span className={styles.icon}>
            <FaLock />
            </span>
            <span>Email Address</span> */}
            {/* <label> */}
          Email Address
        </label>
        <input
          ref={mailRef}
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className={styles.input}
        />

        {/* <label>Phone</label>
        <input
          ref={phoneRef}
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className={styles.phoneInput}
        /> */}

        <div className={styles.buttons}>
          <button
            className={styles.cancel_btn}
            type="button"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button className={styles.submit_btn} type="submit" disabled={updateProfile.isPending}>
            {updateProfile.isPending ? (
              <Spinner width={20} height={20} color="var(--white)" />
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditContactModal;
