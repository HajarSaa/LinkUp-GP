import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./FilesContainer.module.css";
import SearchInput from "../InputField/SearchInput/SearchInput";

import MediaCard from "./MediaCard/MediaCard";
import MediaModal from "../Modal/MediaModal/MediaModal";

function FilesContainer({ files: channelMedia, isLoading, isError, error }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const filteredFiles = channelMedia?.filter((file) => {
    const lowerSearch = searchTerm?.toLowerCase();
    return (
      file.fileName.toLowerCase().includes(lowerSearch) ||
      file.fileType.toLowerCase().includes(lowerSearch)
    );
  });

  if (isLoading) return <div className={styles.status}>Loading...</div>;
  if (isError)
    return (
      <div className={styles.statusError}>
        {error?.message || "Error fetching media."}
      </div>
    );

  return (
    <div className={styles.containerWrapper}>
      <SearchInput
        placeholder="Search in files"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={styles.container}>
        {filteredFiles.length === 0 ? (
          <p className={styles.empty}>No matching files found.</p>
        ) : (
          <>
            {filteredFiles.map((file) => (
              <MediaCard key={file._id} file={file} onClick={setSelectedFile} />
            ))}
            <MediaModal
              isOpen={!!selectedFile}
              file={selectedFile}
              handleClose={() => setSelectedFile(null)}
            />
          </>
        )}
      </div>
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
