"use client";

// Import - default
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import Image from "next/image";

// Import - assets
import { HST_LOGO_png } from "@/assets/image";

// Import - utils
import { InformationModalSchema } from "@/utils/schemas/ComponentSchema";

// Main
export default function InformationModal(props: InformationModalSchema) {
  // Props
  const {
    open,
    setOpen,
    dialogHeader,
    dialogBody,
    dialogCss,
    dialogBodyCss,
    isNotMessage,
  } = props;

  // States
  const handleOpen = () => setOpen && setOpen(!open);

  // Css
  const parentCss =
    dialogCss ?? "flex flex-col text-center items-center p-0 m-0 font-poppins";
  const imgDivCss = isNotMessage
    ? "w-full h-full max-w-[80px] font-poppins"
    : "w-full h-full max-w-[40px] font-poppins";
  const bodyCss = isNotMessage
    ? "relative w-full h-full rounded-b-md flex flex-col gap-2 justify-between items-center text-gray-900 font-poppins"
    : dialogBodyCss ??
      "relative w-full h-full rounded-b-md flex gap-2 justify-between items-center text-gray-900 font-poppins";
  const bodyContentCss = isNotMessage
    ? "w-full px-5 font-poppins"
    : "font-poppins";

  return (
    <>
      <Dialog
        className={parentCss}
        open={open ?? false}
        handler={handleOpen}
        size="xs"
      >
        {dialogHeader && (
          <DialogHeader className="font-poppins">{dialogHeader}</DialogHeader>
        )}
        <DialogBody className={bodyCss}>
          <div className={imgDivCss}>
            <Image
              src={HST_LOGO_png}
              alt=""
              className="object-cover bg-black w-full h-full rounded-md"
            />
          </div>
          <div className={bodyContentCss}>
            {dialogBody ?? "Your email has been sent. We'll be in touch soon."}
          </div>
          <div className="w-full px-5">
            <Button
              className="w-full"
              variant="gradient"
              color="gray"
              onClick={handleOpen}
            >
              <span>Close</span>
            </Button>
          </div>
        </DialogBody>
        {/* <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            // className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            className="p-5 m-0"
            variant="gradient"
            color="gray"
            onClick={handleOpen}
          >
            <span>Close</span>
          </Button>
        </DialogFooter> */}
      </Dialog>
    </>
  );
}
