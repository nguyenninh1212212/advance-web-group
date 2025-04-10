import React, { useState } from "react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Cần import style của Quill

interface ExportWordProps {
  title: string;
}

const ExportWord: React.FC<ExportWordProps> = ({ title }) => {
  const [description, setDescription] = useState<string>("");

  // Hàm để loại bỏ thẻ HTML và chỉ lấy văn bản thuần
  const getTextWithoutHTML = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleExport = () => {
    const cleanDescription = getTextWithoutHTML(description); // Lấy nội dung mà không có thẻ HTML

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun({ text: title, bold: true })],
            }),
            new Paragraph({
              children: [new TextRun(cleanDescription)], // Dùng nội dung đã được làm sạch
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `${title}.docx`);
    });
  };

  return (
    <div className="mt-4">
      {/* Quill Editor */}
      <ReactQuill
        value={description}
        onChange={setDescription}
        theme="snow"
        placeholder="Nhập nội dung tại đây..."
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "strike"],
            ["link"],
            [{ align: [] }],
            ["clean"],
          ],
        }}
        className="h-2/3 bg-white text-black "
      />
      <button
        onClick={handleExport}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-4"
      >
        Xuất Word
      </button>
    </div>
  );
};

export default ExportWord;
