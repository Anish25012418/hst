"use client";

// Import - default
import React, { useState } from "react";
import { Input, Textarea, Button } from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form";

// Import - helpers
import InformationModal from "../../modals/InformationModal";
import CustomTypography from "../../texts/CustomTypography";
import { useContactMutation } from "@/helpers/hooks/api/useContactMutation";

// Import - utils
import { ChildrenSchema } from "@/utils/schemas/GlobalSchema";
import {sendEmail} from "@/utils/email/resend.ts";

interface ContactFormProps {
  isMobile?: boolean;
}

const ErrorMessageText = ({ children }: ChildrenSchema) => (
  <CustomTypography className="text-red-500 text-xs font-medium">
    {children}
  </CustomTypography>
);

const ContactForm: React.FC<ContactFormProps> = ({ isMobile }) => {
  // Hooks
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();

  // States
  const [open, setOpen] = useState(false);

  // Use the custom hook for mutation
  // const mutation = useContactMutation();

  const onSubmit: SubmitHandler<any> = async (data) => {
    // const modifiedData = { ...data, subject: "Contact" };

    try {
      await sendEmail(data)
      reset();
      setOpen(true);
    }catch (e){
      console.error("Error sending email:", e);
      return;
    }
    // mutation.mutate(modifiedData, {
    //   onSuccess: () => {
    //     reset();
    //     setOpen(true);
    //   },
    // });
  };

  const today = new Date().toISOString().split("T")[0];


  return (
    <>
      <InformationModal open={open} setOpen={setOpen} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col gap-4"
      >
        {/* Form fields */}
        <div>
          <Input
            label="Full name"
            {...register("full_name", {
              required: "Full name is required",
              minLength: {
                value: 3,
                message: "Full name must be at least 3 characters long",
              },
            })}
          />
          {errors.full_name && (
            <ErrorMessageText>
              <>{errors.full_name.message}</>
            </ErrorMessageText>
          )}
        </div>
        <div>
          <Input
            label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
              minLength: {
                value: 5,
                message: "Email must be at least 5 characters long",
              },
            })}
          />
          {errors.email && (
            <ErrorMessageText>
              <>{errors.email.message}</>
            </ErrorMessageText>
          )}
        </div>
        <div>
          <Input
            label="Phone number"
            {...register("phone", {
              required: "Phone number is required",
              minLength: {
                value: 10,
                message: "Phone number must be at least 10 characters long",
              },
            })}
          />
          {errors.phone && (
            <ErrorMessageText>
              <>{errors.phone.message}</>
            </ErrorMessageText>
          )}
        </div>
        <div>
          <Input label="Tour interested" {...register("tour_interested")} />
        </div>
        <div>
          <Input label="Country" {...register("country")} />
        </div>
        <div>
          <Input
            type="date"
            label="Request Date"
            {...register("request_date")}
            min={today}
          />
        </div>
        <div>
          <Textarea
            label={
              isMobile
                ? "Ask a question"
                : "Ask us a question about our mountain bike tours"
            }
            className="w-[100%]"
            {...register("question")}
          />
        </div>
        <Button
          type="submit"
          className="w-full rounded-md tracking-wide uppercase bg-brand-yellow-600 text-white hover:bg-brand-yellow-800 hover:text-white"
          // disabled={mutation.isPending}
          // loading={mutation.isPending}
        >
          {/*{mutation.isPending ? "Submitting..." : "Submit"}*/}
          Submit
        </Button>
      </form>
    </>
  );
};

export default ContactForm;
