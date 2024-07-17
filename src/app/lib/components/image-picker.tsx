"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface ImagePickerProps {
  defaultImage?: string;
}

export const ImagePicker = ({ defaultImage }: ImagePickerProps) => {
  const image = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState<string>(defaultImage || "");

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    let file = image.current?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setUrl(reader.result as string);
      };
    }
  };

  useEffect(() => {
    if (defaultImage) {
      setUrl(defaultImage);
    }
  }, [defaultImage]);

  return (
    <>
      <input
        type="file"
        className="input is-primary is-hidden"
        ref={image}
        name="cover"
        onChange={handleChange}
      />

      <button
        onClick={() => image.current?.click()}
        type="button"
        className="button is-light"
      >
        Pick
      </button>
      {url && (
        <div className="box" style={{ width: 158, height: 150 }}>
          <Image src={url} width={150} height={150} alt="course photo" />
        </div>
      )}
    </>
  );
};
