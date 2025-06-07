import { cn } from "@/lib/utils";

interface Props {
  value: string;
  className?: string;
}
const ProductPrice = ({ value, className }: Props) => {
  const [intValue, floatValue] = value.split(".");
  return (
    <p className={cn("text-2xl", className)}>
      <span className="align-super text-xs">$</span>
      {intValue}
      <span className="align-super text-xs">.{floatValue}</span>
    </p>
  );
};

export default ProductPrice;
