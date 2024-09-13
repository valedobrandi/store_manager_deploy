const createColumns = (data: Record<string, any>[]) => {
  if (!data) return [];

  let checkForArray = data;

  if (!Array.isArray(data)) { checkForArray = [data]; }

  const columns = checkForArray.reduce((prev, curr) => {
    const keys = Object.keys(curr);
    keys.forEach((key) => {
      if (!prev.includes(key)) prev.push(key);
    });
    return prev;
  }, []);

  return columns as unknown as string[];
};

export default createColumns;
