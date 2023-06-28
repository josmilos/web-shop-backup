import React, { useState } from "react";

export const ImageEncode = (props) => {
  const files = props.event.target.files;
  const file = files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    return reader.result;
  };
};

export const decodeBase64 = (base64) => {
  const decoded = atob(base64.split(",")[1]);
  const length = decoded.length;
  const arrayBuffer = new ArrayBuffer(length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < length; i++) {
    uint8Array[i] = decoded.charCodeAt(i);
  }

  const blob = new Blob([uint8Array], { type: "image/jpeg" });
  const url = URL.createObjectURL(blob);

  return url;
};
