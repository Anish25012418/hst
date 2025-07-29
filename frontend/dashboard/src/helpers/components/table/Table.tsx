// Import - default
import { useState } from "react";

// Import - assets
import {
  table_css,
  WITH_TABLE_TH_HEIGHT,
} from "@/assets/css/styles/components-styles";

// Import - helpers
import TableOptions from "./TableOptions";
import Spinner from "../animations/Spinner";
import CenterContainer from "../containers/CenterContainer";
import Pagination from "../others/Pagination";
import NoSuchItemsFoundText from "../texts/NoSuchItemsFoundText";

// Main
export default function Table(props: any) {
  // Props
  const {
    tableRef, // Ref to denote the table id
    getTableProps,
    getTableBodyProps,
    renderHead, // Header node
    renderBody, // Body node
    isLoading, // when the data is loading
    rowSpan,
    colSpan, // mddodify as you want but it should match with your table design
    divCss: DIV_CSS,
    tableCss: TABLE_CSS,
    tHeadCss: TH_CSS,
    tBodyCss: TD_CSS,

    // Custom props to hide/show table properties
    hideTableOptions,
    hideTableActions,

    // Search props
    handleSearchFilter,

    // Select props
    showFilter,
    selectLabel,
    selectValue,
    selectOptions,
    selectOnChange,
    isSelectLoading,

    // Control buttons props
    addLabel,
    searchLabel,
    noItemsFoundLabel,
    handlePost,
    exportFilename,
    exportData,

    ...paginationProps
  } = props;

  // State to handle search value
  const [searchInput, setSearchInput] = useState("");

  // Css
  const { div_css, table_css: table_css1, thead_css, tbody_css } = table_css();
  const divCss = DIV_CSS ?? div_css;
  const tableCss = TABLE_CSS ?? table_css1;
  const tHeadCss = TH_CSS ?? thead_css;
  const tBodyCss = TD_CSS ?? tbody_css;

  // Custom props for table options
  const tableOptionsProps = {
    // Search props
    searchLabel,
    searchInput,
    setSearchInput,
    handleSearchFilter,

    // Filter props
    showFilter,
    selectLabel,
    selectValue,
    selectOptions,
    selectOnChange,
    isSelectLoading,

    // Control buttons props
    addLabel,
    handlePost,
    exportFilename,
    exportData,
    hideTableActions,
  };

  return (
    <>
      {!hideTableOptions && <TableOptions {...tableOptionsProps} />}
      <div className={`${divCss} mt-14 md:mt-0 lg:mt-0`}>
        <table ref={tableRef} className={tableCss} {...getTableProps()}>
          <thead className={tHeadCss}>{renderHead}</thead>
          <tbody className={tBodyCss} {...getTableBodyProps()}>
            {isLoading ? (
              <tr>
                <td rowSpan={rowSpan} colSpan={colSpan}>
                  <CenterContainer extendCss={WITH_TABLE_TH_HEIGHT}>
                    <Spinner color="text-brand-yellow-300 fill-brand-yellow-600" />
                  </CenterContainer>
                </td>
              </tr>
            ) : renderBody?.props?.children?.length === 0 ? (
              // Show "no items found" message when there are no items to display
              <tr>
                <td rowSpan={rowSpan} colSpan={colSpan}>
                  <NoSuchItemsFoundText title={noItemsFoundLabel} />
                </td>
              </tr>
            ) : (
              renderBody
            )}
          </tbody>
        </table>
      </div>
      <Pagination {...paginationProps} />
    </>
  );
}
