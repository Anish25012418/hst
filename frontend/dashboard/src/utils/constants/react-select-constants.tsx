// Custom sryles for react-select
export const reactSelectStyles = (errorMessage?: string) => ({
  control: (provided: any, state: any) => ({
    ...provided,
    background: "#fff",
    borderColor: state.isFocused
      ? errorMessage
        ? "#ef4444"
        : "#2196F3"
      : "#B0BEC5",
    borderWidth: state.isFocused ? "2px" : "1px",
    // borderRadius: "0.375rem",
    borderRadius: 0,
    boxSizing: "border-box",
    minHeight: "45.5px",
    fontSize: "13px",
    paddingTop: "6px",
    // marginBottom: "6px",
    gap: "5px",
    // height: "40px",
    cursor: "pointer",
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      borderColor: "#2196F3",
      borderWidth: "2px",
    },
  }),
  option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
    // const color = chroma(data.color);
    return {
      ...styles,
      fontSize: "14px",
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? "#D7DFE2"
        : isFocused
        ? "#F0F2F7"
        : undefined,
      color: isDisabled ? "#ccc" : isSelected ? "#2196F3" : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? "#2196F3"
            : "#F0F2F7"
          : undefined,
      },
      ":hover": {
        // backgroundColor: "#D7DFE2",
        color: "#2196F3",
      },
    };
  },
  multiValue: (styles: any) => {
    // const color = chroma(data.color);
    return {
      ...styles,
      // borderRadius: "0.375rem",
      backgroundColor: "#F0F2F7",
      ":hover": {
        backgroundColor: "#D7DFE2",
        // color: "#2196F3",
      },
    };
  },
  // multiValueLabel: (styles: any{,  data }) => ({
  multiValueLabel: (styles: any) => ({
    ...styles,
    color: "#2a2e37",
  }),
  multiValueRemove: (styles: any) => ({
    ...styles,
    color: "#2a2e37",
    ":hover": {
      // backgroundColor: "#D7DFE2",
      color: "#CC3333",
    },
  }),
  container: (provided: any) => ({
    ...provided,
    // background: "#2196F3",
    // color: "#fff",
    position: "relative",
    // height: "300px",
    // "&::-webkit-scrollbar": {
    //   width: "10px",
    // },
    // "&::-webkit-scrollbar-track": {
    //   background: "red", // Change the background color as needed
    //   borderRadius: "10px",
    // },
    // "&::-webkit-scrollbar-thumb": {
    //   background: "#2196F3!important", // Change the thumb color as needed
    //   borderRadius: "12px",
    // },
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    // height: "40px",
    padding: "0 10px",
    fontSize: "13px",
    gap: "4px",
  }),
  input: (provided: any) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    // height: "40px",
  }),
  menu: (provided: any) => ({
    ...provided,
    // background: "#2196F3",
    // color: "#fff",
    // borderRadius: "0.375rem",
    borderRadius: 0,
    color: "#2a2e37",
    zIndex: 1200, // Increase z-index value if needed
    // position: "fixed", // Adjust positioning as needed
    // top: 100,
    // minHeight: "300px",
    // zIndex: "99999999999999",
  }),
  group: (provided: any) => ({
    ...provided,
    // background: "#2196F3",
    // color: "#fff",
    "&::-webkit-scrollbar-track": {
      // borderRadius: "0.375rem",
      // borderRadius: "0.375rem",
      borderRadius: 0,
      background: "red",
    },
  }),

  groupHeading: (provided: any) => ({
    ...provided,
    fontSize: "18px",
    fontWeight: "bold",
    fontFamily: "Poppins, sans-serif",
  }),
});
