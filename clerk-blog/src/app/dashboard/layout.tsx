import { DottedBackground } from "@components/dotted-background";
import { ReactNode } from "react";

export default function DashbordLayout({ children }: { children: ReactNode }) {
  return <DottedBackground>{children}</DottedBackground>;
}
