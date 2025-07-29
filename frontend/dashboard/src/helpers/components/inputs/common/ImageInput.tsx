// Import - default
import React, { useContext, useEffect, useRef, useState } from "react";
import { PiInfoBold } from "react-icons/pi";

// Import - helpers
import DeletePopup from "../../popups/DeletePopup";
import MultiTag from "../../tags/MultiTag";
import CustomTypography from "../../texts/CustomTypography";
import FormErrorText from "../../texts/FormErrorText";
import { ToastContext } from "@/helpers/contexts";
import { useGlobalStore } from "@/helpers/stores";

// Import - utils
import { deleteModalProps } from "@/utils/constants";
import * as t from "@/utils/constants/toast-constants";
import { formatTimeOnZone } from "@/utils/methods/datetime-methods";
import {checkImageFormat, getImageSrc} from "@/utils/methods/image-methods";
import { generateUniqueId } from "@/utils/methods/string-methods";
import {ImageSlider} from "@/helpers/components";

const ImageInput = React.forwardRef((props: any, ref: any) => {
  // Props
  const {
    caption,
    errorMessage,
    imageList,
    singleImage,
    isMultiple,
    label,
    name,
    trigger,
    setValue,
    onChange,
    handleFirstLoad,
    imgHidden,
    setImgHidden,
    defaultFiles = [],
  } = props;

  // Refs
  const refs = {
    fileImage: useRef<any>(null),
  };

  // Context
  const { setToast } = useContext(ToastContext);

  // Store
  const { initialState: store, ...state } = useGlobalStore();

  // States
  const [selectedFile, setSelectedFile] = useState<any[]>([]);
  const [allFiles, setAllFiles] = useState<any[]>([]);

  // Get filesizes
  const filesizes = (bytes: any, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  // Variables
  const title = label ?? "Multiple File Upload With Preview";
  const { isOpen, item } = store.modal ?? {};

  // Css
  const defaultParentDivCss =
    "relative controller-container fileupload-view font-poppins text-blue-gray-500";
  const fileUploadErrorCss = errorMessage
    ? "border-red-400 hover:border-red-700"
    : "border-gray-400 hover:border-input-blue";

  // Action to clear out the value in form input
  const clearFileInput = () => {
    setValue(name ?? "dummy", null);
    if (refs.fileImage.current) {
      refs.fileImage.current.value = "";
    }
  };

  const handleInputChange = (e: any) => {
    onChange && onChange(e);

    const files = Array.from(e.target.files);
    const validFiles: any[] = [];

    files.forEach((fileImg: any) => {
      const msg = checkImageFormat(fileImg);

      if (msg !== "TRUE") {
        setToast(t.TOAST_ERROR(msg));
      } else {
        validFiles.push(fileImg);
      }
    });

    if (validFiles?.length > 0) {
      const images = validFiles.map((file: any) => {
        const { name: filename, type: filetype, lastModifiedDate, size } = file;
        const id = generateUniqueId();
        const datetime = formatTimeOnZone(lastModifiedDate);
        const filesize = filesizes(size);

        return {
          id,
          filename,
          filetype,
          datetime,
          filesize,
          fileimage: URL.createObjectURL(file),
          file, // store original file for FormData if needed
        };
      });

      const updatedFiles = isMultiple ? [...allFiles, ...images] : images;

      setAllFiles(updatedFiles);
      setSelectedFile(updatedFiles);

      // Also update form value
      setValue(name ?? "dummy", updatedFiles.map((f) => f.file));
      trigger(name ?? "dummy");
    }
  };

  // Custom props for delete
  const deleteProps = {
    ...deleteModalProps("this file"),
    isOpen,
    handleOkayPrompt: () => {
      if (!isMultiple) {
        const result = selectedFile.filter((data: any) => data.id !== item.id);
        setSelectedFile(result);
      } else {
        const result = allFiles.filter((data: any) => data.id !== item.id);
        setAllFiles(result);
      }

      state.setIsModal({ isOpen: false });
      clearFileInput();
    },
    handleCancelPrompt: () => state.setIsModal({ isOpen: false }),
    extendCss: "top-3 right-3",
  };

  // Reset the image values on first load
  useEffect(() => {
    if (imgHidden) {
      setAllFiles([]);
      setSelectedFile([]);
      handleFirstLoad && handleFirstLoad();
    }
    setTimeout(() => setImgHidden && setImgHidden(false), 200);
  }, [imgHidden]);

  // Handle initial/first load
  useEffect(() => {
    const initialDefault = defaultFiles.map((img: string) => ({
      id: generateUniqueId(),
      filename: img.split("/").pop(),
      filetype: "image", // assume image
      datetime: "-",
      filesize: "-",
      fileimage: getImageSrc(img),
      file: img, // store original string for now
    }));

    setAllFiles(initialDefault);
    setSelectedFile(initialDefault);
  }, []);

  return (
    <>
      {isOpen && <DeletePopup {...deleteProps} />}
      <div ref={ref} className={defaultParentDivCss}>
        {isMultiple && (
          <MultiTag
            position="right"
            extendCss="-translate-y-1"
            content="Accepts multiple images"
          />
        )}

        <div className="row justify-content-center m-0">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="kb-data-box">
                  <div className="kb-modal-data-title">
                    <div className="kb-data-title">
                      <CustomTypography>{title}</CustomTypography>
                      {caption && (
                        <div className="flex items-center gap-1">
                          <PiInfoBold />
                          <CustomTypography className="text-[12px] text-gray-600">
                            Note:{" "}
                            {caption === "default"
                              ? "Adding image(s) will replace the existing ones."
                              : caption}
                            .
                          </CustomTypography>
                        </div>
                      )}
                    </div>
                    {imageList !== false && (
                      <div className="pt-14 flex justify-center pb-5">
                        <ImageSlider
                          imageSrc={allFiles.map((f) => f.fileimage)}
                          onRemove={(idx: number) => {
                            const updated = [...allFiles];
                            updated.splice(idx, 1);
                            setAllFiles(updated);
                            setSelectedFile(updated);
                            setValue(name ?? "dummy", updated.map((f) => f.file));
                            trigger(name ?? "dummy");
                          }}
                        />
                      </div>
                    )}
                    {singleImage && (
                      <div className="flex justify-center py-5">
                        {singleImage}
                      </div>
                    )}
                  </div>
                  <div className="kb-file-upload">
                    <div
                      className={`${fileUploadErrorCss} file-upload-box border-[1px] hover:border-[2px]`}
                    >
                      <input
                        ref={refs.fileImage}
                        name={name ?? "dummy"}
                        type="file"
                        id="fileupload"
                        className="file-upload-input"
                        onChange={handleInputChange}
                        multiple={isMultiple}
                      />
                      <p className="text-[12px]">
                        Drag and drop or&nbsp;
                        <span className="text-[12px]">Choose your files</span>
                      </p>
                    </div>
                  </div>
                  <div className="kb-attach-box mt-3 mb-0">
                    {(isMultiple ? allFiles : selectedFile)?.map(
                      (data: any) => {
                        const {
                          id,
                          filename,
                          // filetype,
                          fileimage,
                        } = data;
                        return (
                          <div
                            className="file-atc-box flex items-center"
                            key={id}
                          >
                            {filename?.match(/.(jpg|jpeg|png|gif|svg)$/i) ? (
                              <div className="file-image">
                                <img src={fileimage} alt="" />
                              </div>
                            ) : (
                              <div className="file-image">
                                <i className="far fa-file-alt"></i>
                              </div>
                            )}
                            <div className="file-detail h-full flex flex-col justify-center gap-2">
                              <h6>{filename}</h6>
                              <div className="file-actions">
                                <button
                                  type="button"
                                  className="file-action-btn"
                                  onClick={() => {
                                    const filtered = allFiles.filter((img) => img.id !== id);
                                    setAllFiles(filtered);
                                    setSelectedFile(filtered);
                                    setValue(name ?? "dummy", filtered.map((f) => f.file));
                                    trigger(name ?? "dummy");
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FormErrorText errorMessage={errorMessage} isRelative />
      </div>
    </>
  );
});

export default ImageInput;
// Main
// const ImageInput = React.forwardRef((props: any, ref: any) => {
//   // Ref
//   const refs = {
//     fileImage: useRef<any>(null),
//   };

//   // Props
//   const {
//     caption,
//     errorMessage,
//     imageList,
//     singleImage,
//     isMultiple,
//     label,
//     name,
//     trigger,
//     setValue,
//     onChange,
//   } = props;

//   // Contexts
//   const { setToast } = useContext(ToastContext);

//   // Stores
//   const { initialState: store, ...state } = useGlobalStore();

//   // Variables
//   const title = label ?? "Multiple File Upload With Preview";
//   const { isOpen, item } = store.modal ?? {};

//   // Specific states to handle the inputs
//   const [selectedFile, setSelectedFile] = useState<any[]>([]);
//   const [allFiles, setAllFiles] = useState<any>([]);

//   // File sizes
//   const filesizes = (bytes: any, decimals = 2) => {
//     if (bytes === 0) return "0 Bytes";
//     const k = 1024;
//     const dm = decimals < 0 ? 0 : decimals;
//     const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
//   };

//   // Css
//   const fileUploadErrorCss = errorMessage
//     ? "border-red-400 hover:border-red-700"
//     : "border-gray-400 hover:border-input-blue";

//   const clearFileInput = () => {
//     setValue(name ?? "dummy", null); // Clear the form state
//     if (refs.fileImage.current) {
//       refs.fileImage.current.value = ""; // Clear the file input
//     }
//   };

//   // Action when the image file changes
//   const handleInputChange = (e: any) => {
//     // On change sent from the previous component
//     onChange && onChange(e);

//     // Variables
//     const files = Array.from(e.target.files);
//     const validFiles: any[] = [];

//     files.forEach((fileImg: any) => {
//       const msg = checkImageFormat(fileImg);

//       if (msg !== "TRUE") {
//         setToast(t.TOAST_ERROR(msg));
//       } else {
//         validFiles.push(fileImg);
//       }
//     });

//     if (validFiles.length > 0) {
//       // state.setFileImages(validFiles);
//       // setAllFiles(validFiles);

//       console.log("validFiles inside", validFiles);

//       const images = validFiles?.map((file: any) => {
//         const { name: filename, type: filetype, lastModifiedDate, size } = file;
//         const id = generateUniqueId();
//         const datetime = formatTimeOnZone(lastModifiedDate);
//         const filesize = filesizes(size);

//         return {
//           id,
//           filename,
//           filetype,
//           datetime,
//           filesize,
//           fileimage: URL.createObjectURL(file),
//         };
//       });

//       console.log("images", images);
//       setSelectedFile(images);
//       setAllFiles(images);
//       // state.setSelectedImage(images);
//       setValue(name ?? "dummy", validFiles);
//       trigger(name ?? "dummy");
//     }
//   };

//   // Custom props for delete modal
//   const deleteProps = {
//     ...deleteModalProps("this file"),
//     isOpen,
//     handleOkayPrompt: () => {
//       console.log("before");
//       console.log("selectedFile", selectedFile);
//       console.log("allFiles", allFiles);
//       if (!isMultiple) {
//         const result = selectedFile?.filter(
//           (data: any) => data?.id !== item?.id
//         );
//         setSelectedFile(result);
//       } else {
//         const result = allFiles?.filter((data: any) => data?.id !== item?.id);
//         setAllFiles(result);
//       }
//       console.log("after");
//       console.log("selectedFile", selectedFile);
//       console.log("allFiles", allFiles);

//       // const fileImages =
//       //   allFiles?.length > 0
//       //     ? allFiles[0]
//       //     : [].filter((data: any) => data?.name !== item?.filename);
//       // return;

//       // console.log("fileImages afte", fileImages);
//       state.setIsModal({ isOpen: false });
//       clearFileInput();
//     },
//     handleCancelPrompt: () => state.setIsModal({ isOpen: false }),
//     extendCss: "top-3 right-3",
//   };

//   return (
//     <>
//       {isOpen && <DeletePopup {...deleteProps} />}
//       <div
//         ref={ref}
//         className="relative controller-container fileupload-view font-poppins text-blue-gray-500"
//       >
//         {isMultiple && (
//           <MultiTag
//             position="right"
//             extendCss="-translate-y-1"
//             content="Accepts multiple images"
//           />
//         )}

//         <div className="row justify-content-center m-0">
//           <div className="col-md-6">
//             <div className="card">
//               <div className="card-body">
//                 <div className="kb-data-box">
//                   <div className="kb-modal-data-title">
//                     <div className="kb-data-title">
//                       <CustomTypography>{title}</CustomTypography>
//                       {caption && (
//                         <div className="flex items-center gap-1">
//                           <PiInfoBold />
//                           <CustomTypography className="text-[12px] text-gray-600">
//                             Note: {caption}.
//                           </CustomTypography>
//                         </div>
//                       )}
//                     </div>
//                     {imageList && (
//                       <div className="pt-14 flex justify-center pb-5">
//                         {imageList}
//                       </div>
//                     )}
//                     {singleImage && (
//                       <div className="flex justify-center py-5">
//                         {singleImage}
//                       </div>
//                     )}
//                   </div>
//                   <div className="kb-file-upload">
//                     <div
//                       // className={`${fileUploadErrorCss} file-upload-box border-[2px] border-dashed`}
//                       className={`${fileUploadErrorCss} file-upload-box border-[1px] hover:border-[2px]`}
//                     >
//                       <input
//                         ref={refs.fileImage}
//                         name={name ?? "dummy"}
//                         type="file"
//                         id="fileupload"
//                         className="file-upload-input"
//                         onChange={handleInputChange}
//                         multiple={isMultiple}
//                       />
//                       <p className="text-[12px]">
//                         Drag and drop or&nbsp;
//                         <span className="text-[12px]">Choose your files</span>
//                       </p>
//                     </div>
//                   </div>
//                   <div className="kb-attach-box mt-3 mb-0">
//                     {/* {selectedFile?.map((data: any) => { */}
//                     {(isMultiple ? allFiles : selectedFile)?.map(
//                       (data: any) => {
//                         const {
//                           id,
//                           filename,
//                           filetype,
//                           fileimage,
//                           datetime,
//                           filesize,
//                         } = data;
//                         return (
//                           <div className="file-atc-box" key={id}>
//                             {filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ? (
//                               <div className="file-image">
//                                 <img src={fileimage} alt="" />
//                               </div>
//                             ) : (
//                               <div className="file-image">
//                                 <i className="far fa-file-alt"></i>
//                               </div>
//                             )}
//                             <div className="file-detail">
//                               <h6>{filename}</h6>
//                               <p>
//                                 <span>Size : {filesize}</span>
//                                 <span className="ml-2">
//                                   Modified Time : {datetime}
//                                 </span>
//                               </p>
//                               <div className="file-actions">
//                                 <button
//                                   type="button"
//                                   className="file-action-btn"
//                                   onClick={() =>
//                                     state.setIsModal({
//                                       isOpen: true,
//                                       item: {
//                                         id,
//                                         filename,
//                                         filetype,
//                                         fileimage,
//                                         datetime,
//                                         filesize,
//                                       },
//                                     })
//                                   }
//                                 >
//                                   Delete
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         );
//                       }
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <FormErrorText errorMessage={errorMessage} isRelative />
//       </div>
//     </>
//   );
// });
