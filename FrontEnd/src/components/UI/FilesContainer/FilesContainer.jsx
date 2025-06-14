import PropTypes from "prop-types";

function FilesContainer({ files=[], type='' }) {
  return (
    <div style={{ padding: "1rem" }}>
      <h3>Shared files in {type === "channel" ? "Channel" : "Conversation"}</h3>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <a href={file.url} target="_blank" rel="noreferrer">
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

FilesContainer.propTypes = {
  files: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default FilesContainer;
