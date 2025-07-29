// Import - default
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";

// Import - helpers
import { DashboardContainer, Table, TableActions } from "@/helpers/components";
import { useScreenSize } from "@/helpers/hooks";
import * as hooks from "@/helpers/hooks";
import * as stores from "@/helpers/stores";

// Import - constants
import * as cc from "@/utils/constants/dashboard/subcategory-constants";
import { getTableActions } from "@/utils/constants/table-constants";

// Main
const GetSubcategories = () => {
  // Stores
  const subcategoryApi = stores.useSubcategoryApi();
  const subcategoryStore = stores.useSubcategoryStore();

  // Refs
  const refs = {
    isCategoryLoadedRef: useRef(false),
    isSubcategoryLoadedRef: useRef(false),
  };
  const tableRef = useRef<HTMLTableElement | undefined>();

  // Hooks
  const { isLessThan400, isLessThan600 } = useScreenSize();

  // Variables
  const {
    getAllRefetch,
    subgetAllData,
    subgetAllIsFetching,
    subgetAllIsRefetchError,
  } = subcategoryApi;
  const {
    clearFormModels,
    filteredData,
    searchedValue,
    setFilteredData,
    setForm,
    setSearchedValue,
  } = subcategoryStore;
  const { title } = filteredData;
  const titleLength = title?.length || 0;

  // States
  const [pageNum, setPageNum] = useState(0); // Handle custom page numbers

  // Variables
  // const responseData = store?.clientList?.clients || [];
  const responseData = subgetAllIsRefetchError ? [] : subgetAllData?.data ?? [];
  const itemsTableProps = {
    hidePrice: isLessThan400,
    hideGroupSize: isLessThan600,
    // hideFitnessLevel: isLessThanTablet,
    // hidePublishedDate: !isMoreThanDesktop,
    hideFitnessLevel: true,
    hidePublishedDate: true,
  };
  const modifiedColumns = cc.ITEMS_TABLE(itemsTableProps);
  const columns = useMemo(
    () => modifiedColumns,
    [isLessThan400, isLessThan600]
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
              store: subcategoryStore,
            })}
          />
        ),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // [api.clientListResponse, api.isClientListRefetchError, isMobile]
    [subgetAllData, getAllRefetch, title]
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
    colSpan: isLessThan400 ? 8 : isLessThan600 ? 11 : 14,
    rowSpan: 9,
    isLoading:
      responseData?.length || titleLength
        ? !refs.isSubcategoryLoadedRef.current && subgetAllIsFetching
        : subgetAllIsFetching,
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
      isNextWindow: true,
    }),

    // Table options props
    // addLabel: !isSuperAdmin && (isLessThanTablet ? "Add" : "Add Client"),
    addLabel: "Create",
    handlePost: () =>
      // !isSuperAdmin && state.setFormModal({ isOpen: true, type: "add" }), // Action when the add button is clicked
      setForm({ type: "post", isOpen: true }), // Action when the add button is clicked
    searchLabel: "Search",
    noItemsFoundLabel: "No subcategory found.",
    exportFilename: "Subcategory List.csv",
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
    isLessThan400,
    isLessThan600,
  ]);

  // Store the subcategories
  useEffect(() => {
    refs.isSubcategoryLoadedRef.current = true;

    // Handle in case there is no data in refetch
    if (subgetAllIsRefetchError) {
      setForm({ type: "get", api: [] });
    } else {
      setForm({ type: "get", api: subgetAllData });
    }
    // clearFormModels();
  }, [subgetAllIsRefetchError, subgetAllData]);

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
export default GetSubcategories;
