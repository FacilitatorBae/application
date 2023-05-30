import clsx from "clsx";
import { cva, type VariantProps } from "class-variance-authority";
import { type PropsWithChildren } from "react";

const badgeStyles = cva(["inline-flex items-center py-0.5 font-medium"], {
  variants: {
    variant: {
      primary: "bg-blue-100 text-blue-800",
      secondary: "bg-gray-100 text-gray-800",
      danger: "bg-red-100 text-red-800",
      warning: "bg-yellow-100 text-yellow-800",
      success: "bg-green-100 text-green-800",
    },
    size: {
      small: "px-2 rounded text-xs",
      medium: "px-2.5 rounded-md text-sm",
    },
  },
  defaultVariants: {
    size: "medium",
    variant: "primary",
  },
});
export interface BadgeProps
  extends PropsWithChildren,
    VariantProps<typeof badgeStyles> {
  classes?: string;
}

const Badge = ({ variant, size, classes, ...props }: BadgeProps) => {
  return (
    <div className={clsx(badgeStyles({ variant, size }), classes)} {...props} />
  );
};

export default Badge;
