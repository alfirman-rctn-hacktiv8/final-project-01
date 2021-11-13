import {
  FacebookIcon,
  MailIcon,
  PinterestIcon,
  TwitterIcon,
  WhatsappIcon,
} from "@/components/icon";

export default function SocialMediaDetailNews() {
  return (
    <div className="h-full w-full flex xs:flex-col items-center justify-center space-x-3 xs:space-x-0 xs:space-y-3">
      {socialMedias.map((e, i) => (
        <a
          href="#"
          key={i}
          className={`${e.color} rounded-full h-12 w-12 text-white grid place-items-center`}
        >
          {e.icon}
        </a>
      ))}
    </div>
  );
}

const socialMedias = [
  {
    name: "facebook",
    icon: <FacebookIcon />,
    color: "bg-[#3b5998]",
  },
  {
    name: "twitter",
    icon: <TwitterIcon />,
    color: "bg-[#00acee]",
  },
  {
    name: "pinterest",
    icon: <PinterestIcon />,
    color: "bg-[#c8232c]",
  },
  {
    name: "mail",
    icon: <MailIcon />,
    color: "bg-gray-400",
  },
  {
    name: "whatsapp",
    icon: <WhatsappIcon />,
    color: "bg-[#075E54]",
  },
];
