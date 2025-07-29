// Import - default
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";

// Import - helpers
import { DashboardContainer, Table, TableActions } from "@/helpers/components";
import * as hooks from "@/helpers/hooks";
import * as stores from "@/helpers/stores";

// Import - constants
import {
  ITEMS_TABLE,
  renderCategoriesBody,
  renderCategoriesHead,
} from "@/utils/constants/dashboard/category-constants";
import { getTableActions } from "@/utils/constants/table-constants";
import { useScreenSize } from "@/helpers/hooks";

// Main
const GetCategories = () => {
  // Stores
  const categoryApi = stores.useCategoryApi();
  const categoryStore = stores.useCategoryStore();
  // const categoryStore =

  // Refs
  const isAlreadyLoadedRef = useRef(false);
  const tableRef = useRef<HTMLTableElement | undefined>();

  // Hooks
  const { isLessThan600, isMoreThanDesktop } = useScreenSize();

  // Variables
  const { getAllData, getAllIsFetching, getAllIsRefetchError, getAllRefetch } =
    categoryApi;
  const {
    clearFormModels,
    filteredData,
    searchedValue,
    setFilteredData,
    setForm,
    setSearchedValue,
  } = categoryStore;
  const { title } = filteredData ?? {};
  const titleLength = title?.length || 0;

  // States
  const [pageNum, setPageNum] = useState(0); // Handle custom page numbers

  // Variables
  // const responseData = store?.clientList?.clients || [];
  const responseData = getAllIsRefetchError ? [] : getAllData?.data ?? [];
  const itemsTableProps = {
    hidePublishedDate: isLessThan600,
    hideDescription: !isMoreThanDesktop,
  };
  const modifiedColumns = ITEMS_TABLE(itemsTableProps);
  const columns = useMemo(
    () => modifiedColumns,
    [isLessThan600, isMoreThanDesktop]
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
              store: categoryStore,
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
    colSpan: isLessThan600 ? 9 : !isMoreThanDesktop ? 12 : 17,
    rowSpan: 9,
    isLoading: responseData?.length
      ? !isAlreadyLoadedRef.current && getAllIsFetching
      : getAllIsFetching,
    tableRef,
    getTableProps,
    getTableBodyProps,
    renderHead: renderCategoriesHead({
      headerGroups,
      handleHeaderClick,
    }),
    renderBody: renderCategoriesBody({
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
    noItemsFoundLabel: "No category found.",
    exportFilename: "Category List.csv",
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
    isLessThan600,
    isMoreThanDesktop,
  ]);

  // // Fetch all clients
  // useEffect(() => {
  //   // Refetch the store users when the store value changes
  //     api.refetchClientListResponse();
  //     if && isAlreadyLoadedRef.current) {
  //     isAlreadyLoadedRef.current = false;
  //     api.refetchClientListResponse();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // },]);

  // Refetch the clients
  useEffect(() => {
    isAlreadyLoadedRef.current = true;

    // Handle in case there is no data in refetch
    if (getAllIsRefetchError) {
      setForm({ type: "get", api: [] });
    } else {
      setForm({ type: "get", api: getAllData });
    }
    // clearFormModels();
  }, [getAllIsRefetchError, getAllData]);

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
export default GetCategories;
