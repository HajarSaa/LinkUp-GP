import { useState } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // الشكل الافتراضي

const RichTextEditor = ({ onChange }) => {
  const [value, setValue] = useState("");

  const handleChange = (content) => {
    setValue(content);
    onChange(content); // تبعت النص للباك أو تحفظه
  };

  return (
    <div>
      <ReactQuill theme="snow" value={value} onChange={handleChange} />
    </div>
  );
};

RichTextEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default RichTextEditor;
