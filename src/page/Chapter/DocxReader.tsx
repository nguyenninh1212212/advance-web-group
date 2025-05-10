/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import mammoth from "mammoth";
import { useTheme } from "../../util/theme/theme";
import { htmlToText, HtmlToTextOptions } from "html-to-text";

// Định nghĩa kiểu cho formatter
type FormatterFn = (
  elem: { children: any[] }, // Chứa các phần tử con
  walk: (children: any[], builder: any) => void, // Hàm duyệt các phần tử con
  builder: { addInline: (text: string) => void } // Hàm thêm inline text
) => void;

interface DocxReaderProps {
  base64String: string;
  preserveHtmlTags?: boolean;
}

const DocxReader: React.FC<DocxReaderProps> = ({
  base64String,
  preserveHtmlTags = true,
}) => {
  const theme = useTheme();
  const [htmlContent, setHtmlContent] = useState<string>("");

  const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
    const cleanedBase64 = base64.includes(",") ? base64.split(",")[1] : base64;
    const binaryString = window.atob(cleanedBase64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

  const handleBase64ToDocx = (base64String: string) => {
    const arrayBuffer = base64ToArrayBuffer(base64String);

    const options = {
      preserveEmbeddedHtml: preserveHtmlTags,
      styleMap: [
        "p[style-name='Heading 1'] => h1:fresh",
        "p[style-name='Heading 2'] => h2:fresh",
        "p[style-name='Heading 3'] => h3:fresh",
        "p[style-name='Normal'] => p:fresh",
        "p => p:fresh",
      ],
    };

    mammoth
      .convertToHtml({ arrayBuffer }, options)
      .then((result) => {
        const convertedHtml = result.value;

        const textOptions: HtmlToTextOptions = {
          wordwrap: 130,
          selectors: [
            { selector: "h1", format: "block" },
            { selector: "h2", format: "block" },
            {
              selector: "p",
              format: "block",
              options: {
                leadingLineBreaks: 1,
                trailingLineBreaks: 1,
              },
            },
            {
              selector: "strong",
              format: "inline",
              options: {
                formatter: ((elem, walk, builder) => {
                  builder.addInline("**");
                  walk(elem.children, builder);
                  builder.addInline("**");
                }) as FormatterFn,
              },
            },
            {
              selector: "em",
              format: "inline",
              options: {
                formatter: ((elem, walk, builder) => {
                  builder.addInline("_");
                  walk(elem.children, builder);
                  builder.addInline("_");
                }) as FormatterFn,
              },
            },
          ],
        };

        const plainText = htmlToText(convertedHtml, textOptions);

        setHtmlContent(plainText);

        if (result.messages.length > 0) {
          console.log("Conversion warnings:", result.messages);
        }
      })
      .catch((err) => {
        console.error("Error reading DOCX:", err);
        setHtmlContent(`<p>Lỗi khi đọc file DOCX: ${err.message}</p>`);
      });
  };

  useEffect(() => {
    if (base64String) {
      handleBase64ToDocx(base64String);
    }
  }, [base64String, preserveHtmlTags]);

  return (
    <div
      className={`${theme.text} w-full max-w-2xl whitespace-normal overflow-auto`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default DocxReader;
