import { cn } from "@utils/cn";

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
        className={cn(
          "h-[2px] w-[50%] origin-left translate-y-[0.45rem] rounded-sm bg-white transition-all duration-300",
          showNavigationBar && "rotate-[-45deg]",
        )}
      ></div>
      <div
        className={cn(
          "h-[2px] w-[50%] origin-center rounded-md bg-white transition-all duration-300",
          showNavigationBar && "hidden",
        )}
      ></div>
      <div
        className={cn(
          "h-[2px] w-[50%] origin-left -translate-y-[0.45rem] rounded-md bg-white transition-all duration-300",
          showNavigationBar && "rotate-[45deg]",
        )}
      ></div>
    </div>
  );
}
