export const predictSign = async (
  language,
  imageBlob
) => {
  const API_BASE =
    language === "isl"
      ? "https://viraj1923-fingertalk-indian-sl-backend.hf.space"
      : "https://viraj1923-fingertalk-american-sl-backend-version-2.hf.space";

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