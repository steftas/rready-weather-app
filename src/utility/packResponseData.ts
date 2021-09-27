const PackResponseData = (data) => {
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
