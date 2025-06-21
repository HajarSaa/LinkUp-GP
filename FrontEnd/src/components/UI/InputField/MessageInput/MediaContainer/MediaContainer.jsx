import { useDispatch, useSelector } from "react-redux";
import styles from "./MediaContainer.module.css";
import { removeFile } from "../../../../../API/redux_toolkit/api_data/media/fileUploadSlice";
import { FaTimes } from "react-icons/fa";
import Spinner from "../../../Spinner/Spinner";
import { useParams } from "react-router-dom";
import AudioMedia from "../../../Media/AudioMedia/AudioMedia";

function MediaContainer() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const isChannel = location.pathname.includes("/channels");
  const pageId = `${isChannel ? "channel" : "conversation"}-${id}`;
  const { pages } = useSelector((state) => state.fileUpload);
  const files = pages[pageId]?.files || [];


  const renderMediaItem = (file, idx) => {
    return (
      <div key={idx} className={styles.media_item}>
        <div className={styles.media_icon}>
          {file.status !== "done" ? (
            <Spinner width={12} height={12} color="#000" />
          ) : (
            <FaTimes
              className={styles.close_icon}
              onClick={() =>
                dispatch(removeFile({ pageId, previewURL: file.previewURL }))
              }
            />
          )}
        </div>

        {file.type.startsWith("image/") && (
          <img
            src={file.previewURL}
            className={styles.media_image}
            alt="preview"
          />
        )}

        {file.type.startsWith("video/") && (
          <video
            src={file.previewURL}
            // controls
            className={styles.media_video}
          />
        )}

        {file.type.startsWith("audio/") && (
          <>
          {console.log(file)}
            <AudioMedia file={file} />
            </>
        )}
      </div>
    );
  };

  return (
    <>
      {files.length > 0 && (
        <div className={styles.media_container}>
          {files.map(renderMediaItem)}
        </div>
      )}
    </>
  );
}

export default MediaContainer;
