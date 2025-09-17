import Footer from "@/components/Footer";
import SideBar from "@/components/SideBar";
import { type ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <main>
        <SideBar />
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
