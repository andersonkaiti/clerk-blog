import { ReactNode } from "react";
import { DottedBackground } from "@components/dotted-background";

export default function PostLayout({ children }: { children: ReactNode }) {
  return <DottedBackground>{children}</DottedBackground>;
}
