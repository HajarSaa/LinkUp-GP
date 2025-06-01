import React, { useState } from "react";
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

export default RichTextEditor;
