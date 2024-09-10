import { useState } from "react";
import { Tab } from "../types";

interface TabListProps {
  tabs: Tab[];
  selectTab: (gid: number) => void;
}

export const TabList = ({ tabs, selectTab }: TabListProps) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(-1);

  const handleClick = (indx: number) => {
    setSelectedTabIndex(indx);
    selectTab(tabs[indx].gId);
  };

  return (
    <div className="flex flex-col w-40 border-r border-r-green-200 border-dashed">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          className={`w-full text-center py-4 border-b border-b-green-200 ${
            selectedTabIndex === index && "bg-green-100"
          } hover:bg-green-100/50`}
        >
          {tab.tabName}
        </button>
      ))}
    </div>
  );
};
