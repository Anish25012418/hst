// Import - assets
import { table_css } from "@/assets/css/styles/components-styles";

// Import - utils
import {
  TableAvatarImage,
  TableDate,
  TableDetails,
  TableSnNumber,
} from "../table-constants";
import { getUniqueKey } from "@/utils/methods/string-methods";

// Default table items list
export const ITEMS_TABLE = (props: any) => {
  // Props
  const { hideAuthor, hideContent, hidePublishedDate } = props;

  // Variables
  const columns = [
    {
      Header: "S.N.",
      accessor: "ITEMS_TABLE_ID",
    },
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Actions",
      accessor: "actions",
    },
  ];
  const indexToInsert = columns.length - 1;

  // Hide author case
  if (!hidePublishedDate) {
    columns.splice(indexToInsert, 0, {
      Header: "Published Date",
      accessor: "createdAt",
    });
  }

  // Hide author case
  if (!hideAuthor) {
    columns.splice(indexToInsert, 0, {
      Header: "Author",
      accessor: "author",
    });
  }

  // Hide content case
  if (!hideContent) {
    columns.splice(indexToInsert, 0, {
      Header: "Content",
      accessor: "content",
    });
  }

  return [
    {
      Header: "",
      id: "ITEMS_TABLE",
      isVisible: false,
      hideHeader: false,
      columns,
    },
  ];
};

// Get table header
export const getTableHeader = (header: string) => {
  // Compare the header from param with this known headers below
  const headers = [
    "S.N.",
    "Title",
    "Published Date",
    "Author",
    "Content",
    // "Subcategories",
    // "Image Cover Pic",
    // "Image Thumbnail Pic",
    "Actions",
  ];

  // Actual map function
  const [isSn, isTitle, isPublishedDate, isAuthor, isContent, isActions] =
    headers.map((h) => header === h);

  const flags = {
    isSn,
    isTitle,
    isPublishedDate,
    isAuthor,
    isContent,
    isActions,
  };

  // Specify colspan here to use in thead & tbody
  const colSpan = isSn ? 2 : isContent ? 5 : 3;
  return { flags, colSpan };
};

// Table head
export const renderTableHead = ({ headerGroups, handleHeaderClick }: any) => {
  return (
    <>
      {headerGroups.map((headerGroup: any, idx: number) => {
        const { key, ...rest } = headerGroup.getHeaderGroupProps();

        return (
          <tr key={getUniqueKey(idx, key)} {...rest}>
            {headerGroup.headers.map((column: any, idx1: number) => {
              // Get the required values based on header
              const { colSpan } = getTableHeader(column.Header);
              const { key, ...rest } = column.getHeaderProps(
                column.getSortByToggleProps()
              );

              // Hide header
              const hideHeader = column.hideHeader === false;

              return hideHeader ? null : (
                <th
                  key={getUniqueKey(idx1, key)}
                  {...rest}
                  colSpan={colSpan}
                  className={`${
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sort-desc p-7"
                        : "sort-asc p-7"
                      : table_css(idx1).th_css
                  }`}
                  onClick={() => handleHeaderClick(column)}
                >
                  {/* <div className="border-[1px] border-brand-yellow-800 w-fit px-1.5 bg-brand-yellow-600">
                    {column.render("Header")}
                  </div> */}
                  {column.render("Header")}
                </th>
              );
            })}
          </tr>
        );
      })}
    </>
  );
};

// Table body
export const renderTableBody = (props: any) => {
  // Props
  const { rows, prepareRow, pageNum, pageSize } = props;

  // Variables
  const customPageNum = (pageNum === 2 ? 1 : pageNum) * pageSize;

  return (
    <>
      {rows.map((row: any, idx: number) => {
        prepareRow(row);
        const { key, ...rest } = row.getRowProps();
        return (
          <tr
            className={table_css(idx).tr_css}
            key={getUniqueKey(idx, key)}
            {...rest}
          >
            {row.cells.map((cell: any, idx1: number) => {
              // Variables
              const header = cell.column.Header;
              const { imageThumbnailPic } = cell.row.original;
              const {
                flags: { isContent, isPublishedDate, isSn, isTitle },
                colSpan,
              } = getTableHeader(header);

              // Render variables based on headers
              const d = cell.value;
              const result = isSn ? (
                <TableSnNumber idx={customPageNum + idx + 1} />
              ) : isTitle ? (
                <TableAvatarImage imgPath={imageThumbnailPic} title={d} />
              ) : isPublishedDate ? (
                <TableDate isoString={d} />
              ) : isContent ? (
                <TableDetails details={d} />
              ) : (
                d
              );

              // Return none in case there is an image thumbnail as header
              if (header === "Image Thumbnail Pic") return;

              return (
                <td
                  key={idx1}
                  className={table_css(idx1).td_css}
                  colSpan={colSpan}
                >
                  {result}
                </td>
              );
            })}
          </tr>
        );
      })}
    </>
  );
};
