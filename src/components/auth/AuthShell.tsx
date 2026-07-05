import Image from "next/image";
import Link from "next/link";
import Logo from "../Logo";

interface AuthShellProps {
  imgSrc: string;
  title: string;
  desc: string;
  children: React.ReactNode;
  footer: string;
  linkSrc: string;
  link: string;
}

export const AuthShell = ({
  imgSrc,
  title,
  desc,
  children,
  footer,
  linkSrc,
  link,
}: AuthShellProps) => {
  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="relative hidden md:block bg-primary-light">
        <Image src={imgSrc} alt="" fill preload className="object-cover" />
      </div>
      <div className="grid place-items-center overflow-y-auto p-6 sm:p-8">
        <div className="grid grid-cols-1 w-full max-w-xs sm:w-[85%] md:w-[70%] md:max-w-sm">
          <div className="flex flex-col items-center text-center">
            <Logo size={120} variant="light-bg" />
            <h1 className="mt-6 sm:mt-10 mb-2 text-2xl sm:text-3xl">{title}</h1>
            <p className="mb-6 text-sm sm:text-base">{desc}</p>
          </div>
          <div>{children}</div>
          <div className="h-[0.5px] w-full bg-primary my-6" />
          <p className="text-sm text-center">
            {footer}{" "}
            <Link
              href={linkSrc}
              className="text-primary font-medium hover:underline"
            >
              {link}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
