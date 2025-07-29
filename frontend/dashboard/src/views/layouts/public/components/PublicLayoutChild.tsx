// Import - helpers
import { LogoImage } from "@/helpers/components";

// Import - utils
import { ChildrenSchema } from "@/utils/schemas/GlobalSchema";

const PublicLayoutChild = ({ children }: ChildrenSchema) => {
  // Action when the header is clicked
  const handleHeaderClick = () => {
    window.open("/", "_self");
  };

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <header className="h-[60px] px-4 py-1" onClick={handleHeaderClick}>
        <LogoImage />
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
};

export default PublicLayoutChild;
