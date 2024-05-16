export const objectDataGetter = (request: Object) => {
    return Object.entries(request)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v || "")}`).join("&");
};
