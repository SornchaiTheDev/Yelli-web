import { FormEvent, forwardRef, useState, useEffect, useCallback } from "react";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail, AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import emailjs from "emailjs-com";
import PhoneInput from "@components/PhoneInput";
import SelectedPlanCard from "@components/SelectedPlanCard";
import { ContactProps } from "@decor/Contact";
import { FormI } from "@decor/Form";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const contact = [
  {
    name: "Name",
    key: "name",
    placeholder: "Dylan Serif",
    type: "text",
    required: true,
  },
  {
    name: "Email",
    key: "email",
    placeholder: "Dylan@gmail.com",
    type: "email",
    required: true,
  },
];

const Contact = forwardRef<HTMLDivElement, ContactProps>(
  ({ selectedPlan, cancelPlan }, ref) => {
    const [formStatus, setFormStatus] = useState<string>("DISABLED");
    const [form, setForm] = useState<FormI>({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();

      window.grecaptcha.ready(async () => {
        setFormStatus("SUBMITTING");
        const token = await window.grecaptcha.execute(SITE_KEY, {
          action: "contact",
        });

        const res = await axios.post("/api/contact", { ...form, token });
        const { success } = res.data;

        if (success) {
          await emailjs.send(
            "service_vcp9z2j",
            "template_8505ivy",
            { ...(form as any), ...selectedPlan },
            "r5JxDrTgFL6MEWyG_"
          );
        }
        setFormStatus("INITIAL");
      });
    };

    const handleMessageChange = (e: FormEvent<HTMLTextAreaElement>) => {
      setForm({ ...form, message: e.currentTarget.value });
    };

    const handleCancelPlan = (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      cancelPlan();
    };

    useEffect(() => {
      let valid = true;
      for (let value in form) {
        if (value !== "message" && value !== "phone") {
          if (form[value as keyof FormI] === "") {
            valid = false;
            break;
          }
        }
      }
      if (
        (valid && form.phone.replace(/\+\w{2}/, "").length < 9) ||
        selectedPlan === null
      ) {
        valid = false;
      }

      if (valid) return setFormStatus("INITIAL");
      setFormStatus("DISABLED");
    }, [form, selectedPlan]);

    return (
      <div
        ref={ref}
        id="contact"
        className="flex flex-col items-center my-2 w-full p-4"
      >
        <h2 className="text-2xl font-bold my-10">Contact</h2>
        <div className="grid grid-cols-6 w-full rounded-lg overflow-hidden max-w-4xl drop-shadow-md">
          <div className="col-span-6 md:col-span-2 bg-yellow-300 w-full h-full flex flex-col p-6">
            <h2 className="text-2xl font-semibold">Contact Information</h2>
            <p>Fill up the form and we will get back to you in a few hours</p>
            <div className="mt-4 flex flex-col gap-2">
              <div className="inline-flex items-center gap-4">
                <BsTelephone />
                <h2>(+66) 090-240-1701</h2>
              </div>
              <div className="inline-flex items-center gap-4">
                <AiOutlineMail />
                <h2>contact@goodshot.com</h2>
              </div>
            </div>
          </div>
          <div className="col-span-6 md:col-span-4 bg-white w-full h-full flex flex-col p-4">
            {selectedPlan === null && (
              <ul className="text-red-500 my-2">
                <li>*Please Select Plan First</li>
              </ul>
            )}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {contact.map(({ name, placeholder, type, required, key }) => (
                <div key={name} className="flex flex-col gap-4">
                  <label>
                    {name} <span className="text-red-500">*</span>
                  </label>
                  <input
                    required={required}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                    type={type}
                    placeholder={placeholder}
                    className="rounded-lg"
                  />
                </div>
              ))}

              <label>
                Phone <span className="text-red-500">*</span>
              </label>
              <PhoneInput
                onValueChange={(dial_code: string) =>
                  setForm({ ...form, phone: dial_code })
                }
              />

              {selectedPlan !== null && (
                <>
                  <button
                    className="inline-flex items-center gap-1 self-end bg-red-500 rounded-lg p-1 text-white"
                    onClick={handleCancelPlan}
                  >
                    <IoClose />
                    <p>ยกเลิกแพ็คเกจ</p>
                  </button>
                  <SelectedPlanCard plan={selectedPlan} />
                </>
              )}

              <label>Message (optional)</label>
              <textarea
                className="rounded-lg"
                placeholder="Message to us"
                onChange={handleMessageChange}
              />

              <button
                className="bg-yellow-300 w-32 h-10 rounded-lg flex justify-center items-center disabled:bg-gray-200 disabled:cursor-not-allowed"
                disabled={formStatus === "DISABLED"}
              >
                {formStatus === "SUBMITTING" ? (
                  <AiOutlineLoading3Quarters className="animate-spin fill-white text-2xl" />
                ) : (
                  <p>Send</p>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
);

Contact.displayName = "Contact";

export default Contact;
