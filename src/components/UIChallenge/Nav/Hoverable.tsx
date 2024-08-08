import React from "react";

type Props = {
  type?: "info" | "gray";
  children: React.ReactNode;
  defaultBg?: "stay" | "onHover";
  onClick?: () => void;
};
function Hoverable({
  type = "gray",
  children,
  onClick,
  defaultBg = "onHover",
}: Props) {
  return (
    <div
      onClick={onClick && onClick}
      className={`${
        type === "info"
          ? "hover-info"
          : defaultBg === "onHover"
          ? "hover-gray"
          : "hover-gray-stay"
      }  group whitespace-nowrap`}
    >
      {children}
    </div>
  );
}

function Info({ children }: { children: React.ReactNode }) {
  return (
    <div className='absolute hidden group-hover:block -bottom-[68px] -left-[34px] bg-blue-900 text-white px-3 py-3 rounded-lg w-24 text-center duration-[150] transition-all after:absolute after:-top-1 after:bg-blue-900 after:size-3 after:rotate-45 after:left-10'>
      {children}
    </div>
  );
}

Hoverable.Info = Info;

export default Hoverable;
