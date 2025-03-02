import { fakedatadetail } from "../../FakeData/FakedataDetail";

export const groupData = (data: typeof fakedatadetail) => {
  return data.reduce((acc: (typeof fakedatadetail)[][], item, index) => {
    const groupIndex = Math.floor(index / 4);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(item);
    return acc;
  }, []);
};

export const groupDataIntoFour = (data: typeof fakedatadetail, groups = 4) => {
  const grouped: (typeof fakedatadetail)[] = Array.from(
    { length: groups },
    () => []
  );
  data.forEach((item, index) => {
    grouped[index % groups] = [...grouped[index % groups], item];
  });
  return grouped;
};
