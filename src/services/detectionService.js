export const predictSign = async (
  language,
  imageBlob
) => {
  const API_BASE =
    language === "isl"
      ? import.meta.env.VITE_ISL_API
      : import.meta.env.VITE_ASL_API;

  const formData =
    new FormData();

  formData.append(
    "file",
    imageBlob,
    "frame.jpg"
  );

  const response =
    await fetch(
      `${API_BASE}/predict`,
      {
        method: "POST",
        body: formData,
      }
    );

  if (!response.ok) {
    throw new Error(
      "Backend unavailable"
    );
  }

  return response.json();
};
