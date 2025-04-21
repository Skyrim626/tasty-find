import { ReactNode } from "react";

interface TabButtonProps {
  active: boolean;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({
  active,
  icon,
  label,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
        active
          ? "bg-amber-50 text-amber-700"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );
};

export default TabButton;
