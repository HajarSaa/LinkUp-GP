import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./FilesContainer.module.css";
import SearchInput from "../InputField/SearchInput/SearchInput";
import MediaModal from "../Modal/MediaModal/MediaModal";
import AudioMedia from "../Media/AudioMedia/AudioMedia";
import {useSelector } from "react-redux";
function FilesContainer({ isLoading, isError, error }) {
  const channelMedia = useSelector((state) => state.channelMedia.channelMedia);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const filteredFiles =
    channelMedia?.filter((file) => {
      const lowerSearch = searchTerm?.toLowerCase();
      return (
        file.fileName.toLowerCase().includes(lowerSearch) ||
        file.fileType.toLowerCase().includes(lowerSearch)
      );
    }) || [];

  const isSearchActive = searchTerm.trim().length > 0;

  const images = filteredFiles.filter((f) =>
    f.fileType.toLowerCase().includes("image")
  );
  const videos = filteredFiles.filter((f) =>
    f.fileType.toLowerCase().includes("video")
  );
  const audios = filteredFiles.filter((f) =>
    f.fileType.toLowerCase().includes("audio")
  );

  if (isLoading) return <div className={styles.status}>Loading...</div>;
  if (isError)
    return (
      <div className={styles.statusError}>
        {error?.message || "Error fetching media."}
      </div>
    );

  const noFiles =
    (!isSearchActive && channelMedia?.length === 0) ||
    (isSearchActive && filteredFiles.length === 0);

  return (
    <div className={styles.containerWrapper}>
      <SearchInput
        placeholder="Search in files"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className={styles.container}>
        {noFiles ? (
          <p className={styles.empty}>
            {isSearchActive
              ? "No matching files found."
              : "There is no media here yet."}
          </p>
        ) : (
          <>
            {audios.length > 0 && (
              <section>
                <h3 className={styles.sectionTitle}>
                  Audios ({audios.length})
                </h3>
                <div className={`${styles.mediaGrid} ${styles.audioGrid}`}>
                  {audios.map((file) => (
                    <div
                      key={file._id}
                      className={`${styles.mediaBox} ${styles.mediaBox_audio}`}
                    >
                      <AudioMedia file={file} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {images.length > 0 && (
              <section>
                <h3 className={styles.sectionTitle}>
                  Images ({images.length})
                </h3>
                <div className={styles.mediaGrid}>
                  {images.map((file) => (
                    <div
                      key={file._id}
                      className={styles.mediaBox}
                      onClick={() => setSelectedFile(file)}
                    >
                      <img
                        src={file.fileUrl}
                        alt={file.fileName}
                        className={styles.fixedMedia}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {videos.length > 0 && (
              <section>
                <h3 className={styles.sectionTitle}>
                  Videos ({videos.length})
                </h3>
                <div className={styles.mediaGrid}>
                  {videos.map((file) => (
                    <div
                      key={file._id}
                      className={styles.mediaBox}
                      onClick={() => setSelectedFile(file)}
                    >
                      <video
                        src={file.fileUrl}
                        className={styles.fixedMedia}
                        muted
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      <MediaModal
        isOpen={!!selectedFile}
        file={selectedFile}
        handleClose={() => setSelectedFile(null)}
      />
    </div>
  );
}

FilesContainer.propTypes = {
  files: PropTypes.any,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  error: PropTypes.object,
};

export default FilesContainer;
