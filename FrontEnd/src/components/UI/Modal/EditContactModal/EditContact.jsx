import { useEffect, useRef, useState } from "react";
import Modal from "../Modal";
import styles from "./EditContact.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeEditContactModal } from "../../../../API/redux_toolkit/modals/userProfile/editContactModal";
import useUpdateUserProfile from "../../../../API/hooks/userProfile/useUpdateUserProfile";
import Spinner from "../../Spinner/Spinner";

const EditContactModal = () => {
  const { isOpen, data } = useSelector((state) => state.editContact);
  const dispatch = useDispatch();
  const updateProfile = useUpdateUserProfile();

  const [form, setForm] = useState({
    email: data?.email || "",
    phone: data?.phone || "",
  });

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
