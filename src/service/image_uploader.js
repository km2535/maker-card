class ImageUploader {
  constructor() {
    // 필요한 변수 선언
    this.url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;
  }
  // 필요한 메소드 선언
  async upload(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      `${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`
    );
    const result = await fetch(this.url, {
      method: "POST",
      body: formData,
    });
    return await result.json();
  }
}
export default ImageUploader;
