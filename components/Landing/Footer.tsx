import { useIntl } from "react-intl";

function Footer() {
  const intl = useIntl();
  return (
    <div className="w-full bg-yellow-200">
      <div className="flex flex-col items-center justify-center p-10 gap-2">
        <p>Made with ❤️ for everyone</p>
        <h2 className="text-center">
          Copyright &copy; {new Date().getFullYear()} All Rights Reserved By{" "}
          <a href="#" className="text-gray-900 font-bold">
            Phuket Instant Print
          </a>
        </h2>
      </div>
    </div>
  );
}

export default Footer;
