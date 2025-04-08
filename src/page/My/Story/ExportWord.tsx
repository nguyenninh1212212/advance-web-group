// components/ExportWord.tsx
import React from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { FaFileWord } from "react-icons/fa";

interface Props {
  title: string;
  description: string;
}

const ExportWord: React.FC<Props> = ({ title, description }) => {
  const exportToWord = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun({ text: title, bold: true, size: 32 })],
              spacing: { after: 300 },
            }),
            ...description.split("\n").map(
              (line) =>
                new Paragraph({
                  children: [new TextRun({ text: line, size: 24 })],
                  spacing: { after: 200 },
                })
            ),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${title || "chuong"}.docx`);
  };

  return (
    <button
      type="button"
      onClick={exportToWord}
      className="mt-3 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
    >
      <FaFileWord />
      Xuất file Word
    </button>
  );
};

export default ExportWord;
