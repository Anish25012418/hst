// Import - assets
import { table_css } from "@/assets/css/styles/components-styles";

// Import - utils
import {
  TableAvatarImage,
  TableDate,
  TableFitnessTag,
  TableGroupSize,
  TablePrice,
  TableSnNumber,
} from "../table-constants";
import { getUniqueKey } from "@/utils/methods/string-methods";
import { openWebUrl } from "@/utils/methods/app-methods";

// Default table items list
export const ITEMS_TABLE = (props: any) => {
  // Props
  const { hideFitnessLevel, hideGroupSize, hidePrice, hidePublishedDate } =
    props;

  // Variables
  const columns = [
    {
      Header: "S.N.",
      // accessor: "ADMIN_SUBCATEGORIES_TABLE_ID",
      accessor: "sn",
    },
    {
      Header: "Title",
      accessor: "title",
    },

    {
      hideHeader: false,
      Header: "Image Thumbnail Pic",
      accessor: "imageThumbnailPic",
    },
    {
      Header: "Actions",
      accessor: "actions",
    },
  ];
  const indexToInsert = columns.length - 1;

  // Hide price
  if (!hidePrice) {
    columns.splice(indexToInsert, 0, {
      Header: "Price",
      accessor: "priceOriginal",
    });
  }

  // Hide group size
  if (!hideGroupSize) {
    columns.splice(indexToInsert, 0, {
      Header: "Group Size",
      accessor: "groupSize",
    });
  }

  // Hide fitness level
  if (!hideFitnessLevel) {
    columns.splice(indexToInsert, 0, {
      Header: "Fitness Level",
      accessor: "fitnessLevel",
    });
  }

  // Hide fitness level
  if (!hidePublishedDate) {
    columns.splice(indexToInsert, 0, {
      Header: "Published Date",
      accessor: "createdAt",
    });
  }

  return [
    {
      Header: "",
      id: "ITEMS_TABLE_ID",
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
    "Price",
    "Group Size",
    "Fitness Level",
    "Published Date",
    "Actions",
  ];

  // Actual map function
  const [
    isSn,
    isTitle,
    isPrice,
    isGroupSize,
    isFitnessLevel,
    isPublishedDate,
    isActions,
  ] = headers.map((h) => header === h);

  const flags = {
    isSn,
    isTitle,
    isPrice,
    isGroupSize,
    isFitnessLevel,
    isPublishedDate,
    isActions,
  };

  // Specify colspan here to use in thead & tbody
  const colSpan = isSn ? 2 : 3;
  return { flags, colSpan };
};

// Header of categories table
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

// Body of categories table
export const renderTableBody = (props: any) => {
  // Props
  const { rows, prepareRow, pageNum, pageSize, hideTitlePic, isNextWindow } =
    props;

  // Variables
  const customPageNum = (pageNum === 2 ? 1 : pageNum) * pageSize;

  return (
    <>
      {rows.map((row: any, idx: number) => {
        prepareRow(row);
        const { key, ...rest } = row.getRowProps();
        return (
          <tr
            key={getUniqueKey(idx, key)}
            className={table_css(idx).tr_css}
            {...rest}
          >
            {row.cells.map((cell: any, idx1: number) => {
              // Variables
              const header = cell.column.Header;
              const { imageThumbnailPic, slug, categoryIds } =
                cell.row.original;
              const {
                flags: {
                  isSn,
                  isTitle,
                  isPublishedDate,
                  isPrice,
                  isFitnessLevel,
                  isGroupSize,
                },
                colSpan,
              } = getTableHeader(header);
              const pathname = `${categoryIds?.[0]?.slug}/${slug}`;

              // Render variables based on headers
              const d = cell.value;
              const result = isSn ? (
                <TableSnNumber idx={customPageNum + idx + 1} />
              ) : isTitle ? (
                <div
                  onClick={isNextWindow && openWebUrl({ pathname })}
                  className={`${isNextWindow ? "apply-live-link" : ""}`}
                >
                  {!hideTitlePic ? (
                    <TableAvatarImage imgPath={imageThumbnailPic} title={d} />
                  ) : (
                    d
                  )}
                </div>
              ) : isFitnessLevel ? (
                <TableFitnessTag fitnessLevel={d} />
              ) : isGroupSize ? (
                <TableGroupSize size={d} />
              ) : isPrice ? (
                <TablePrice price={d} />
              ) : isPublishedDate ? (
                <TableDate isoString={d} />
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
