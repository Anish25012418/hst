import * as React from "react";

interface ContactEmailProps {
  data: {
    full_name: string;
    email: string;
    phone: string;
    country?: string;
    request_date?: string;
    question?: string;
  };
}

const ContactEmail: React.FC<ContactEmailProps> = ({ data }) => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.5" }}>
      <h2>📬 New Contact Form Submission</h2>

      <p><strong>Full Name:</strong> {data.full_name}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Phone:</strong> {data.phone}</p>
      {data.country && <p><strong>Country:</strong> {data.country}</p>}
      {data.request_date && <p><strong>Request Date:</strong> {data.request_date}</p>}
      {data.question && (
        <>
          <hr />
          <p><strong>Question / Description:</strong></p>
          <p>{data.question}</p>
        </>
      )}
    </div>
  );
};

export default ContactEmail;
