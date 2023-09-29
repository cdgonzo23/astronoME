import React, { useEffect } from "react";

const CloudinaryUploadWidget = ({ setImg }) => {
  useEffect(() => {
    const cloudName = "djvsww0dv"; // replace with your own cloud name
    const uploadPreset = "w6bzpfa4"; // replace with your own upload preset

    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          setImg(result.info.secure_url);
          document.getElementById("uploadedimage").setAttribute("src", result.info.secure_url);
        }
      }
    );

    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );

    // removed this because caused an error when leaving blogpostform without submitting
    // Cleanup the event listener when the component unmounts
    // return () => {
    //   document.getElementById("upload_widget").removeEventListener("click", myWidget.open);
    // };
  }, [setImg]);

  return (
    <button type="button" id="upload_widget" className="cloudinary-button">
      Upload
    </button>
  );
};

export default CloudinaryUploadWidget;
