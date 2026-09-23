import { Camera, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ProfileImgPicker = ({ file, error, onFileChange }) => {
  const fileRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // create object url for image preview
  useEffect(() => {
    if (!file) return setPreviewUrl("");
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="h-30 w-30 rounded-full bg-(--clr-input-bg) relative border-2 border-dashed mb-3">
        <button
          onClick={() => {
            fileRef.current.click();
          }}
          type="button"
          className="bg-(--clr-primary) rounded-full p-0.5 absolute right-1 bottom-1 z-10 border-2 border-(--clr-text-light)!"
        >
          <Plus color="var(--clr-text-light)" size={20} />
        </button>

        {file && previewUrl ? (
          <img
            src={previewUrl}
            alt="Profile preview"
            className="h-full w-full rounded-full object-cover object-top"
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full opacity-40 ">
            <Camera size={35} />
            <span className="text-sm">Select Photo</span>
          </div>
        )}

        <input
          className="text-wrap hidden"
          onChange={onFileChange}
          ref={fileRef}
          type="file"
          name="image"
          accept="image/*"
        />
      </div>
      {error && <span className="text-red-700 text-sm">{error}</span>}
    </div>
  );
};

export default ProfileImgPicker;
