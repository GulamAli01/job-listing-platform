import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

const RadioGroup = RadioGroupPrimitive.Root;

const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={`h-4 w-4 rounded-full border border-gray-400 flex items-center justify-center ${className}`}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-[#7209b7]" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});

export { RadioGroup, RadioGroupItem };