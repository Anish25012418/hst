"use client";
// Default
import React from "react";
import { IoClose } from "react-icons/io5";
import { PiCaretDownBold } from "react-icons/pi";
// import Image from "next/image";

// Relative
import CustomTypography from "../texts/CustomTypography";

// Utils
import { NavListSchema } from "@/utils/schemas/GlobalSchema";
import { useRouter } from "next/navigation";

// Assets
// import { HST_LOGO_png } from "@/assets/image";

// Schema
type MobileMenuSchema = {
  isOpen?: boolean;
  onClose: () => void;
  navProps: NavListSchema;
};

const MobileMenu = (props: MobileMenuSchema) => {
  // Props
  const { isOpen, onClose, navProps } = props;

  // console.log("Nav props", navProps?.menuItem);

  // Hooks
  const router = useRouter();

  // States
  const [openDropdown, setOpenDropdown] = React.useState(null);

  // Function to handle menu item click
  const handleMenuClick = (item: any) => {
    setOpenDropdown(openDropdown === item ? null : item);
  };

  // Function to close the sidebar
  const handleClose = () => {
    setOpenDropdown(null);
    onClose();
  };

  // Effect to lock/unlock scroll when the sidebar is open/closed
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[9999]"
          onClick={handleClose}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] lg:w-[400px] bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-[10000]`}
      >
        <div className="flex justify-between items-center gap-4 bg-[#333333] h-[68px] px-6">
          {/* <Image
            src={HST_LOGO_png}
            alt=""
            className="h-[50px] w-[50px]"
            width={10}
            height={10}
          /> */}
          <div className="flex flex-col">
            <CustomTypography className="text-sm font-bold text-center text-brand-yellow-600">
              Himalayan Single Track
            </CustomTypography>
          </div>

          <IoClose
            className="text-4xl text-brand-yellow-600 hover:text-red-500 cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <div className="overflow-y-auto h-full thin-scrollbar">
          <div className="flex flex-col items-center justify-center">
            <div className="bg-gray-200 w-full flex items-center justify-center">
              <CustomTypography className="text-gray-500 my-4 font-bold uppercase">
                Menu
              </CustomTypography>
            </div>
            {navProps.list?.map((item: any, idx: number) => (
              <React.Fragment key={idx}>
                <div
                  onClick={() => handleMenuClick(item)}
                  className="flex flex-col items-center justify-center gap-2 py-2 hover:bg-transparent hover:text-green-500 duration-0 text-black cursor-pointer"
                >
                  <div
                    className="flex flex-row items-center justify-center"
                    onClick={() => {
                      if (!item?.child) {
                        onClose();
                        router.push(item.href);
                      }
                      // router.push(item.href);
                    }}
                  >
                    {item.label}
                    {item.child && <PiCaretDownBold className="ml-2 text-sm" />}
                  </div>
                </div>

                {openDropdown === item && item.child && (
                  <div className="pl-4">
                    {item.child.map((childItem: any, childIdx: number) => (
                      <div key={childIdx} className="py-2">
                        <div className="hover:text-green-500 cursor-pointer">
                          <CustomTypography
                            className="text-center"
                            onClick={() => {
                              router.push(childItem.href);
                              onClose();
                            }}
                          >
                            {childItem.label}
                          </CustomTypography>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center mb-24">
            <div className="bg-gray-200 w-full flex items-center justify-center">
              <CustomTypography className="text-gray-500 my-4 text-center font-bold uppercase">
                Category
              </CustomTypography>
            </div>
            {navProps?.menuItem?.map((item: any, idx: number) => (
              <div
                key={idx}
                className="relative group w-full flex flex-col items-center justify-center"
              >
                <div onClick={() => handleMenuClick(item)}>
                  <div className="flex flex-col items-center gap-2 py-2 hover:bg-transparent hover:text-green-500 duration-0 text-black cursor-pointer">
                    <div
                      className="flex flex-row items-center justify-center"
                      onClick={() => {
                        if (!item.categories.length) {
                          onClose();
                          router.push("/" + item.title.slug);
                        }
                      }}
                    >
                      {item.title.name}
                      {item.categories && item.categories.length > 0 && (
                        <PiCaretDownBold className="ml-2 text-sm" />
                      )}
                    </div>
                  </div>
                </div>
                {openDropdown === item && item.categories && (
                  <div className="">
                    {item?.categories?.map(
                      (childItem: any, childIdx: number) => (
                        <div key={childIdx} className="py-2">
                          <div className="hover:text-green-500 cursor-pointer">
                            <CustomTypography
                              className="text-center"
                              onClick={() => {
                                router.push(childItem.slug);
                                onClose();
                              }}
                            >
                              {childItem.title}
                            </CustomTypography>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
