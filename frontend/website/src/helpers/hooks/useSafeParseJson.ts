const useSafeParseJson = (jsonData: any, defaultValue: any = {}): any => {
  if (typeof jsonData === "string") {
    try {
      return JSON.parse(jsonData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return defaultValue;
    }
  } else {
    return jsonData || defaultValue;
  }
};

export default useSafeParseJson;
