import { ReactNode } from "react";
import { DottedBackground } from "@components/dotted-background";

export default function DashbordLayout({ children }: { children: ReactNode }) {
  return <DottedBackground>{children}</DottedBackground>;
}
