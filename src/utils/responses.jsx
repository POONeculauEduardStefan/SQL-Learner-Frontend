export const getErrorResponseMessage = (error) => {
    return error?.response?.data?.error?.message || '';
}

export const getSuccessData = (response) => {
    return response?.data?.data || null;
}