import { cn } from "@/utils/cn";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { ToastProvider } from "@heroui/toast";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface PropsTypes {
  children: ReactNode;
}

const AppShell = (props: PropsTypes) => {
  const { children } = props;

  return (
    <main className={cn(inter.className)}>
      <ToastProvider />
      {children}
    </main>
  );
};

export default AppShell;
