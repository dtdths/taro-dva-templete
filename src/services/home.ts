import requestAPI from "@/utils/request";

export const fetchIndexData = (config) => requestAPI('getIndexData', config)
