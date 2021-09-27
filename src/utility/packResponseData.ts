const PackResponseData = (data: any): Record<string, unknown> => {
  const obj = {
    ...data,
    displayField: {
      min_max: false,
      wind: false,
      rise_set: false,
    },
  };

  return obj;
};

export default PackResponseData;
