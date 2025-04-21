import { ReactNode } from "react";

interface HeaderContainerProps {
  children: ReactNode;
}

const HeaderContainer: React.FC<HeaderContainerProps> = ({ children }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">{children}</div>
      </div>
    </header>
  );
};

export default HeaderContainer;
