import React, { useState } from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useToast } from "../../../util/ToastContext";

interface ExportWordProps {
  title: string;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setFile: React.Dispatch<React.SetStateAction<File[]>>;
}

const ExportWord: React.FC<ExportWordProps> = ({
  title,
  description,
  setDescription,
  setFile,
}) => {
  const [createdFile, setCreatedFile] = useState<File | null>(null); // File duy nhất được tạo
  const { showToast } = useToast();

  const handleExport = () => {
    if (description.length < 100) {
      return showToast("Số ký tự phải lớn hơn 100", "error");
    }
    const cleanDescription = description;

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun({ text: title, bold: true })],
            }),
            new Paragraph({
              children: [new TextRun(cleanDescription)],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      const file = new File([blob], `${title}.docx`, {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      // Ghi đè file vừa tạo
      setCreatedFile(file);

      setFile([file]); // luôn chỉ có 1 file trong state
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
        className="h-2/3 bg-white text-black"
      />

      {/* Các nút bấm */}
      <div className="mt-4 flex gap-4 justify-between">
        {createdFile != null ? (
          <button
            onClick={() => {
              setCreatedFile(null); // Hủy file trong state local
              setFile([]); // Hủy file trong state cha
            }}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Hủy file xuất
          </button>
        ) : (
          <button
            type="button"
            onClick={() => handleExport()}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Xuất file để gửi
          </button>
        )}
      </div>

      {createdFile && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-800 font-medium mb-2">
            Đã tạo file:{" "}
            <span className="p-1 bg-blue-500 text-white inline-block rounded-md">
              {createdFile.name}
            </span>
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                const url = URL.createObjectURL(createdFile);
                window.open(url);
              }}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Lưu file
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportWord;
