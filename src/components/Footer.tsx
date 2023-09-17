import Image from "next/image";
import { type FakeFooter } from "~/types";
import { useToast } from "~/hooks/useToast";

const fakeFooterData: FakeFooter[] = [
  {
    title: "About",
    subtitles: [
      { label: "Contact Us", url: "#mock" },
      { label: "About Us", url: "#mock" },
      { label: "Press", url: "#mock" },
      { label: "Investors", url: "#mock" },
      { label: "Corporate", url: "#mock" },
    ],
  },
  {
    title: "Help",
    subtitles: [
      { label: "Contact Us", url: "#mock" },
      { label: "About Us", url: "#mock" },
      { label: "Press", url: "#mock" },
      { label: "Investors", url: "#mock" },
      { label: "Corporate", url: "#mock" },
    ],
  },
  {
    title: "Socials",
    subtitles: [
      { label: "Contact Us", url: "#mock" },
      { label: "About Us", url: "#mock" },
      { label: "Press", url: "#mock" },
      { label: "Investors", url: "#mock" },
      { label: "Corporate", url: "#mock" },
    ],
  },
];
const fakeFooterRightData: FakeFooter[] = [
  {
    title: "Office",
    subtitles: [
      { label: "FacilitatorBae SAS", url: "#mock" },
      { label: "PO Box #59123", url: "#mock" },
      { label: "5th Avenue, Manhattan, 58001", url: "#mock" },
      { label: "New York, New York", url: "#mock" },
      { label: "United States of America", url: "#mock" },
    ],
  },
];

const Footer = () => {
  const toast = useToast();

  const footerItems = fakeFooterData.map((item) => {
    const subtitles = item.subtitles.map((subtitle) => (
      <span key={subtitle.label}>{subtitle.label}</span>
    ));
    return (
      <div key={item.title} className="mt-[40px] flex flex-col">
        <span className="font-poppins text-base font-thin text-gray-300 ">
          {item.title}
        </span>
        <span className="mt-[20px] flex flex-col font-poppins text-sm font-thin text-gray-500">
          {subtitles}
        </span>
      </div>
    );
  });

  const footerRightItems = fakeFooterRightData.map((item) => {
    const subtitles = item.subtitles.map((subtitle) => (
      <span key={subtitle.label}>{subtitle.label}</span>
    ));
    return (
      <div key={item.title} className="mt-[40px] flex flex-col">
        <span className="font-poppins text-base font-normal text-gray-300">
          {item.title}
        </span>
        <span className="mt-[20px] flex flex-col font-poppins text-sm font-thin text-gray-500">
          {subtitles}
        </span>
      </div>
    );
  });

  return (
    <>
      <div className="mt-16 flex h-[350px] flex-col bg-gray-900">
        <div className="flex h-[300px] w-full flex-row">
          <div className="flex h-full w-1/2 flex-row justify-around">
            {footerItems}
          </div>
          <hr className="h-[140px] self-center border-l-[1px] border-solid border-gray-800" />
          <div className="flex h-full w-1/2 flex-row pl-[80px]">
            {footerRightItems}
          </div>
        </div>
        <hr className="flex w-4/5 flex-row self-center border-gray-800" />
        <div className="flex h-[50px] w-full items-center justify-between px-[80px] font-poppins text-base font-thin text-gray-300">
          <span>© 2023 FacilitatorBae</span>
          <div className="flex h-full flex-row items-center justify-between">
            <Image
              className="mr-1"
              src="https://static-00.iconduck.com/assets.00/mastercard-icon-512x329-wscuj0gs.png"
              alt="mastercard"
              width={38}
              height={24}
              unoptimized
            />
            <Image
              className="mr-1"
              src="https://static-00.iconduck.com/assets.00/amex-icon-512x329-g2fd23x9.png"
              alt="amex"
              width={38}
              height={24}
              unoptimized
            />
            <Image
              className="mr-1"
              src="https://static-00.iconduck.com/assets.00/visa-icon-512x329-4s9w66xq.png"
              alt="visa"
              width={38}
              height={24}
              unoptimized
            />
            <Image
              className="mr-1"
              src="https://static-00.iconduck.com/assets.00/paypal-icon-512x329-iizij0nu.png"
              alt="paypal"
              width={38}
              height={24}
              unoptimized
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
