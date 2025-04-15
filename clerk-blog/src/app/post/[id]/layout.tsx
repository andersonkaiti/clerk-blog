import { DottedBackground } from "@components/dotted-background";
import { ReactNode } from "react";

export default function PostLayout({ children }: { children: ReactNode }) {
  return <DottedBackground>{children}</DottedBackground>;
}
