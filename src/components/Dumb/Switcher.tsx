import { colors } from "@/utils/colors";
import { FC } from "react";
import { Icon, Icons } from "./Icon";

interface Props {
  elements: { id: string; icon: Icons }[];
  active: string;
  onChange: (id: string) => void;
}

export const Switcher: FC<Props> = ({ active, elements, onChange }) => {
  return (
    <div
      style={{
        backgroundColor: colors.primaryLight,
        height: "fit-content",
        padding: 4,
        borderRadius: 8,
        gap: 4,
        display: "flex",
      }}
    >
      {elements.map(({ icon, id }) => {
        const isActive = active === id;

        return (
          <button
            onClick={() => onChange(id)}
            style={{
              padding: 4,
              backgroundColor: isActive ? colors.primary : colors.primaryLight,
              borderRadius: 4,
            }}
          >
            <Icon
              key={id}
              name={icon}
              color={isActive ? colors.white : colors.black}
            />
          </button>
        );
      })}
    </div>
  );
};
