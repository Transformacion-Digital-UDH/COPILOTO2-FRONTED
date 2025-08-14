import React from "react";
import { IconEyeAbrir } from "@/components/icons/IconEyeAbrir";

interface EyeButtonProps {
  href?: string;
  title?: string;
  title2?: string;
  defaultTitle?: string;
}

const EyeButton: React.FC<EyeButtonProps> = ({
  href,
  title,
  title2,
  defaultTitle = "Ver",
}) => {
  return (
    <a
      className="flex items-center text-sm m-2 rounded-lg border-[1px] border-gray-400 hover:bg-gray-300/60 dark:border-transparent dark:bg-gray-600 dark:hover:bg-gray-800 dark:text-white px-2 py-1 w-auto cursor-pointer"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <IconEyeAbrir className="mr-1" />
      <span>{title || defaultTitle} {title2}</span>
    </a>
  );
};

export default EyeButton;