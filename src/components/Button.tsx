import clsx from "clsx";
import { cva, type VariantProps } from "class-variance-authority";
import { type PropsWithChildren } from "react";

const buttonStyles = cva(
  ["inline-flex items-center border border-transparent font-medium shadow-sm"],
  {
    variants: {
      variant: {
        primary: "text-white bg-blue-600 hover:bg-blue-700 focus:outline-none", // focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        secondary:
          "text-white bg-gray-600 hover:bg-gray-700 focus:outline-none", // focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
        danger: "text-white bg-red-600 hover:bg-red-700 focus:outline-none", // focus:ring-2 focus:ring-offset-2 focus:ring-red-500
        warning:
          "text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none", // focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500
        success:
          "text-white bg-green-600 hover:bg-green-700 focus:outline-none", // focus:ring-2 focus:ring-offset-2 focus:ring-green-500
      },
      size: {
        xs: "px-2.5 py-1.5 text-xs",
        sm: "px-3 py-2 text-sm leading-4",
        base: "px-4 py-2 text-sm",
        lg: "px-4 py-2 text-base",
        xl: "px-6 py-3 text-base",
      },
      as: {
        button: "",
        link: "",
      },
    },
    defaultVariants: {
      size: "base",
      variant: "primary",
    },
    compoundVariants: [
      {
        variant: "primary",
        as: "link",
        className:
          "text-blue-600 bg-transparent hover:bg-transparent shadow-none hover:underline",
      },
      {
        variant: "secondary",
        as: "link",
        className:
          "text-gray-600 bg-transparent hover:bg-transparent shadow-none hover:underline",
      },
      {
        variant: "danger",
        as: "link",
        className:
          "text-red-600 bg-transparent hover:bg-transparent shadow-none hover:underline",
      },
      {
        variant: "warning",
        as: "link",
        className:
          "text-yellow-600 bg-transparent hover:bg-transparent shadow-none hover:underline",
      },
      {
        variant: "success",
        as: "link",
        className:
          "text-green-600 bg-transparent hover:bg-transparent shadow-none hover:underline",
      },
    ],
  }
);
export interface ButtonProps
  extends PropsWithChildren,
    VariantProps<typeof buttonStyles> {
  className?: string;
}

const Button = ({ variant, size, as, className, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(buttonStyles({ variant, size, as }), className)}
      {...props}
    />
  );
};

export default Button;
