import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export interface IMenuButtonProps {
  showNavigationBar: boolean;
  setShowNavigationBar: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MenuButton({
  showNavigationBar,
  setShowNavigationBar,
}: IMenuButtonProps) {
  return (
    <div
      className="fixed top-5 left-4 z-50 flex h-10 w-9 cursor-pointer flex-col items-center justify-center sm:hidden"
      onClick={() => {
        setShowNavigationBar(!showNavigationBar);
      }}
    >
      <div
        className={twMerge(
          "h-[2px] w-[50%] origin-left translate-y-[0.45rem] rounded-sm bg-white transition-all duration-300",
          clsx(showNavigationBar && "rotate-[-45deg]"),
        )}
      ></div>
      <div
        className={twMerge(
          "h-[2px] w-[50%] origin-center rounded-md bg-white transition-all duration-300",
          clsx(showNavigationBar && "hidden"),
        )}
      ></div>
      <div
        className={twMerge(
          "h-[2px] w-[50%] origin-left -translate-y-[0.45rem] rounded-md bg-white transition-all duration-300",
          clsx(showNavigationBar && "rotate-[45deg]"),
        )}
      ></div>
    </div>
  );
}
