import { colors } from "@/utils/colors";
import { FC } from "react";
import { Typography } from "../Typography";
import {
  tabItemActiveClass,
  tabItemClass,
  tabItemInactiveClass,
  tabsWrapperClass,
} from "./style.css";

export type Tab<T = string> = {
  label: string;
  onClick: () => void;
  tab: T;
};

export const Tabs: FC<{
  currentTab: string;
  tabs: Tab[];
}> = ({ tabs, currentTab }) => {
  return (
    <div>
      <div className={tabsWrapperClass}>
        {tabs.map(({ label, onClick, tab }) => {
          const isActive = tab === currentTab;

          return (
            <button
              key={label}
              onClick={onClick}
              className={`${
                isActive ? tabItemActiveClass : tabItemInactiveClass
              } ${tabItemClass}`}
            >
              <Typography
                variant="p-s-sb"
                color={isActive ? colors.primary : colors.grey}
              >
                {label}
              </Typography>
            </button>
          );
        })}
      </div>
    </div>
  );
};
