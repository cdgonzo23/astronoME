import React, { useEffect, useState } from "react";

const CloudinaryUploadWidget = ({ setImg }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const cloudName = "djvsww0dv";
    const uploadPreset = "w6bzpfa4";

    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        cropping: true,
        multiple: false,
        croppingShowBackButton: true,
        resourceType: "image",
        showCompletedButton: true,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info.secure_url);
          setData(result.info);
          setImg(result.info.secure_url);
          // document.getElementById("uploadedimage").setAttribute("src", result.info.secure_url);
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
    <div>
      {data ? (
        ""
      ) : (
        <button type="button" id="upload_widget" className="text-gray-300 px-4 py-2 bg-div-gray hover:bg-hover-blue rounded font-body">
          Upload Image
        </button>
      )}
    </div>
  );
};

export default CloudinaryUploadWidget;
