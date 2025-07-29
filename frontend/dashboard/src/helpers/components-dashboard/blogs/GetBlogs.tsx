// Import - default
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";

// Import - helpers
import { DashboardContainer, Table, TableActions } from "@/helpers/components";
import * as hooks from "@/helpers/hooks";
import * as stores from "@/helpers/stores";

// Import - constants
import * as cc from "@/utils/constants/dashboard/blog-constants";
import { getTableActions } from "@/utils/constants/table-constants";
import { useScreenSize } from "@/helpers/hooks";

// Main
const GetBlogs = () => {
  // Stores
  const blogApi = stores.useBlogApi();
  const blogStore = stores.useBlogStore();

  // Refs
  const isAlreadyLoadedRef = useRef(false);
  const tableRef = useRef<HTMLTableElement | undefined>();

  // Hooks
  const { isLessThan600, isLessThanTablet, isMoreThanLaptop } = useScreenSize();

  // Variables
  const { getAllData, getAllIsFetching, getAllIsRefetchError, getAllRefetch } =
    blogApi;
  const {
    clearFormModels,
    filteredData,
    searchedValue,
    setFilteredData,
    setForm,
    setSearchedValue,
  } = blogStore;
  const { title } = filteredData;
  const titleLength = title?.length || 0;

  // States
  const [pageNum, setPageNum] = useState(0); // Handle custom page numbers

  // Variables
  // const responseData = store?.clientList?.clients || [];
  const responseData = getAllIsRefetchError ? [] : getAllData?.data ?? [];
  const itemsTableProps = {
    hideAuthor: isLessThan600,
    hidePublishedDate: isLessThanTablet,
    hideContent: !isMoreThanLaptop,
  };
  const modifiedColumns = cc.ITEMS_TABLE(itemsTableProps);
  const columns = useMemo(
    () => modifiedColumns,
    [isLessThan600, isLessThanTablet, isMoreThanLaptop]
  );
  const data = useMemo(
    () =>
      responseData?.map((item: any, idx: number) => ({
        ...item,
        actions: (
          <TableActions
            key={idx}
            {...getTableActions({
              hideGetById: true,
              hidePost: true,
              item,
              store: blogStore,
            })}
          />
        ),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // [api.clientListResponse, api.isClientListRefetchError, isMobile]
    [getAllData, getAllRefetch, titleLength]
  );
  const is: any = { pageSize: 20, pageIndex: 0 };
  // Table instance
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialState = useMemo(() => is, []);
  const defaultStates = { columns, data, initialState };
  const tableInstance: any = useTable(
    { ...defaultStates },
    useFilters,
    useSortBy,
    usePagination
  );

  // Variables required for useTable Hook
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows, // previiously we used this variable to fetch every items, but now we are switching to pagination items
    prepareRow,

    // Filter part
    setFilter,

    // Pagination part
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  }: any = tableInstance;

  // Action - when the header is clicked
  const handleHeaderClick = () => {
    // alert(column.Header);
  };

  // Update the specified filter with the new value
  const handleSearchFilter = (value?: any) => {
    setSearchedValue && setSearchedValue(value);
    setFilteredData && setFilteredData(value);
  };

  // Custom props for table
  const tableProps = {
    pageNum,
    setPageNum,
    pageIndex: 0,
    // colSpan: isMobile ? 7 : 17,
    colSpan: isLessThan600
      ? 9
      : isLessThanTablet
      ? 12
      : isMoreThanLaptop
      ? 17
      : 22,
    rowSpan: 9,
    isLoading: responseData?.length
      ? !isAlreadyLoadedRef.current && getAllIsFetching
      : getAllIsFetching,
    tableRef,
    getTableProps,
    getTableBodyProps,
    renderHead: cc.renderTableHead({
      headerGroups,
      handleHeaderClick,
    }),
    renderBody: cc.renderTableBody({
      rows: page,
      prepareRow,
      pageNum,
      pageSize,
    }),

    // Table options props
    // addLabel: !isSuperAdmin && (isLessThanTablet ? "Add" : "Add Client"),
    addLabel: "Create",
    handlePost: () =>
      // !isSuperAdmin && state.setFormModal({ isOpen: true, type: "add" }), // Action when the add button is clicked
      setForm({ type: "post", isOpen: true }), // Action when the add button is clicked
    searchLabel: "Search",
    noItemsFoundLabel: "No blogs found.",
    exportFilename: "Blog List.csv",
    exportData: responseData,
    handleSearchFilter,

    // Pagination props
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  };

  // Handle multiple search filters here
  useEffect(() => {
    // Variables
    if (searchedValue) {
      if (titleLength) {
        setFilter("title", searchedValue);
      } else {
        setFilter("title", undefined);
      }
    }
  }, [
    titleLength,
    searchedValue,
    isLessThan600,
    isLessThanTablet,
    isMoreThanLaptop,
  ]);

  // Callback function inside useffect when something is searched
  const handleSearchEffect = useCallback(() => {
    if (searchedValue) {
      if (titleLength) {
        setFilter("title", searchedValue);
      } else {
        setFilter("title", undefined);
      }
    }
  }, [searchedValue, titleLength, setFilter]);
  hooks.useDebouncedEffect(handleSearchEffect, 300, [
    searchedValue,
    titleLength,
    isLessThan600,
    isLessThanTablet,
    isMoreThanLaptop,
  ]);

  // Clear the forms on initial load
  useEffect(() => {
    clearFormModels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardContainer>
      <Table {...tableProps} />
    </DashboardContainer>
  );
};
export default GetBlogs;
