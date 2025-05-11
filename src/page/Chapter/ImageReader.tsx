import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface ImageReaderProps {
  src: string;
  index: number;
  onLoad: (index: number) => void;
  loaded: { [key: number]: boolean };
}

const ImageReader: React.FC<ImageReaderProps> = ({
  src,
  index,
  onLoad,
  loaded,
}) => {
  return (
    <div className="relative w-full mb-4">
      {!loaded[index] && (
        <ClipLoader
          color={"gray"}
          cssOverride={{ display: "block", margin: "0 auto" }}
          loading={!loaded[index]}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      <img
        src={src}
        alt={`img-${index}`}
        onLoad={() => onLoad(index)}
        className={`w-full transition-opacity duration-500 ${
          loaded[index] ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default ImageReader;
