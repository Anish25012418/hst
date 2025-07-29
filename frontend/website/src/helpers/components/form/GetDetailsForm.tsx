"use client";
import React, {useState} from "react";
import {
  Button,
  Input,
  Select,
  Textarea,
  Option,
} from "@material-tailwind/react";
import { CustomTypography } from "@/helpers/components";
import { useCountries } from "use-react-countries";
import { MdOutlineCancel } from "react-icons/md";
import Image from "next/image";

const GetDetailsForm = ({
  tripName,
  // price,
  onClose,
}: {
  tripName: string;
  price: string;
  onClose: () => void;
}) => {
  // Get countries from the package
  const { countries }: any = useCountries();
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>("");
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-[9999]">
      <div className="bg-white p-8 rounded-md max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <CustomTypography className="text-xl font-bold">
            Get Details
          </CustomTypography>
          <button onClick={onClose} className="text-gray-500">
            <MdOutlineCancel className="text-xl" />
          </button>
        </div>
        <form>
          <div className="mb-4">
            <CustomTypography className="block text-sm font-medium text-gray-700">
              Trip Name: {tripName}
            </CustomTypography>
            {/*<CustomTypography className="mt-1 p-2 block w-full font-semibold border-gray-300 rounded-md">*/}

            {/*</CustomTypography>*/}
          </div>
          <div className="mb-4 flex flex-col gap-4">
            <Input label="Full name" />
            <Input label="Email" />
            <Input label="Phone Number" />
            {/* <Input label="Choose Country" /> */}
            {/* <div className="mb-4"> */}

            <Select label="Choose Country" value={selectedCountry} className="" onChange={(val) => setSelectedCountry(val)} selected={() =>
              countries
                ?.filter((c: any) => c.name === selectedCountry)
                .map((country: any) => (
                  <div className="flex items-center gap-2" key={country.name}>
                    <Image
                      src={country?.flags?.svg}
                      alt={country?.name}
                      className="w-5 h-3.5"
                      height={3}
                      width={5}
                    />
                    {country?.name}
                  </div>
                ))
            }>
              {countries?.map((country: any) => (
                  <Option
                    key={country?.name}
                    value={country?.name}
                    className="flex items-center gap-2"
                  >
                    <Image
                      src={country?.flags?.svg}
                      alt={country?.name}
                      className="w-5 h-3.5"
                      height={3}
                      width={3}
                    />

                    {country?.name}
                  </Option>
              ))}
            </Select>
            {/* </div> */}

            <Input label="No. of Adults" />
            <Input label="No. of Children" />
            <Input label="Enquriy Subject" />
            <Textarea label="Your Message" className="w-[100%]" />
          </div>
          {/* Repeat similar blocks for other fields: Email, Phone, Planned Date, etc. */}
          <div className="mb-4">
            <Button className="rounded-none bg-brand-yellow-600 text-white hover:bg-gray-800 hover:text-white hover:border-gray-800 flex items-center gap-4">
              Send Email
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GetDetailsForm;
