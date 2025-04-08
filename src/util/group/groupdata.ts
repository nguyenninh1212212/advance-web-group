export const groupData = <T>(data: T[], num: number): T[][] => {
  return data.reduce((acc: T[][], item, index) => {
    const groupIndex = Math.floor(index / num);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(item);
    return acc;
  }, []);
};

export const groupDataIntoFour = <T>(data: T[], groups: number): T[][] => {
  const grouped: T[][] = Array.from({ length: groups }, () => []);

  data.forEach((item, index) => {
    grouped[index % groups].push(item);
  });

  return grouped;
};
