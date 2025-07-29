// Default
import { useContext } from "react";
import { CSVLink } from "react-csv";
import { TbFileExport } from "react-icons/tb";

// Helpers
import CustomButton from "../buttons/CustomButton";
import { ToastContext } from "@/helpers/contexts";
import { useScreenSize } from "@/helpers/hooks";

// Utils
import { EMPTY_EXPORT_DATA_ERROR } from "@/utils/constants/toast-constants";
import { CSVExportSchema } from "@/utils/schemas/ComponentsSchema";
import { OnClickSchema } from "@/utils/schemas/GlobalSchema";

// Main
const CSVExport = (props: CSVExportSchema) => {
  // Props
  const { css, extendCss, title, filename, data } = props;

  // Context
  const { setToast } = useContext(ToastContext);

  // Hooks
  const { isLessThanTablet } = useScreenSize();

  // Validate data with toast
  const handleExportClick = () => {
    if (!data?.length) {
      setToast(EMPTY_EXPORT_DATA_ERROR);
      return;
    }
  };

  // Css
  const defaultCss = "";
  const modifiedCss = `${defaultCss} ${extendCss ?? ""}`;
  const className = css ?? modifiedCss;

  // Custom props for CSVLink
  const exportProps = {
    className,
    filename: filename ?? "Export Table Data.csv",
    data: data ?? [],
  };

  // Components
  const Button = ({ onClick }: OnClickSchema) => (
    <CustomButton
      isPadding
      extendCss="pl-2 px-3 py-1 text-xs font-[1000]"
      status="secondary"
      onClick={onClick}
    >
      <TbFileExport className="text-lg font-bold" />
      {title ?? `Export${!isLessThanTablet ? " to CSV" : ""}`}
    </CustomButton>
  );

  return (
    <>
      {!data?.length ? (
        <Button onClick={handleExportClick} />
      ) : (
        <CSVLink {...exportProps}>
          <Button />
        </CSVLink>
      )}
    </>
  );
};

export default CSVExport;
