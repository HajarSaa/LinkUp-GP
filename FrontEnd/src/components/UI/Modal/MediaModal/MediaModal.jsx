// import styles from "./MediaModal.module.css";
// import Modal from "../Modal";
// import PropTypes from "prop-types";

// function MediaModal({ isOpen, handleClose, file }) {

//   const getPreview = () => {
//     const type = file?.fileType?.toLowerCase();

//     if (type?.includes("image")) {
//       return (
//         <img src={file.fileUrl} alt={file.fileName} className={styles.media} />
//       );
//     }

//     if (type?.includes("video")) {
//       return (
//         <video controls className={styles.media}>
//           <source src={file.fileUrl} type={file.fileType} />
//           Your browser does not support the video tag.
//         </video>
//       );
//     }

//     if (type?.includes("audio")) {
//       return (
//         <audio controls className={styles.media}>
//           <source src={file.fileUrl} type={file.fileType} />
//           Your browser does not support the audio tag.
//         </audio>
//       );
//     }

//     return (
//       <div className={styles.unknown}>
//         <p>Preview not available for this file type.</p>
//         <a
//           href={file.fileUrl}
//           target="_blank"
//           rel="noopener noreferrer"
//           className={styles.downloadBtn}
//         >
//           Download file
//         </a>
//       </div>
//     );
//   };

//   if (!file) return null;
//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={handleClose}
//       className={styles.media_previw_modal}
//       zIndex={1002}
//       title={file?.fileName || "File Preview"}
//     >
//       <div className={styles.media_previw_body}>{getPreview()}</div>
//     </Modal>
//   );
// }

// MediaModal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   handleClose: PropTypes.func.isRequired,
//   file: PropTypes.object,
// };

// export default MediaModal;




import PropTypes from "prop-types";
import styles from "./MediaModal.module.css";
import CloseIcon from "../../Icons/CloseIcon/CloseIcon";


function MediaModal({ isOpen, handleClose, file }) {


const getPreview = () => {
  const type = file?.fileType?.toLowerCase();

  if (type?.includes("image")) {
    return (
      <img src={file.fileUrl} alt={file.fileName} className={styles.media} />
    );
  }

  if (type?.includes("video")) {
    return (
      <video controls className={styles.media}>
        <source src={file.fileUrl} type={file.fileType} />
        Your browser does not support the video tag.
      </video>
    );
  }

  if (type?.includes("audio")) {
    return (
      <audio controls className={styles.media}>
        <source src={file.fileUrl} type={file.fileType} />
        Your browser does not support the audio tag.
      </audio>
    );
  }

  return (
    <div className={styles.unknown}>
      <p>Preview not available for this file type.</p>
      <a
        href={file.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.downloadBtn}
      >
        Download file
      </a>
    </div>
  );
};
  function handleCloseModal(e) {
    if (e.target === e.currentTarget) handleClose();
  }
  if (!isOpen || !file) return null;

  return (
    <div
      className={styles.overlay}
      style={{ zIndex: 1001 }}
      onClick={handleCloseModal}
    >
      <div className={`${styles.modal}`}>
        <div className={styles.modal_header}>
          <h2 className={styles.title}>{file?.fileName || "File Preview"}</h2>
          <CloseIcon closeEvent={handleClose} />
        </div>
        <div className={styles.modal_body}>
          <div className={styles.media_previw_body}>{getPreview()}</div>
        </div>
      </div>
    </div>
  );
};


MediaModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  file: PropTypes.object,
};

export default MediaModal;
