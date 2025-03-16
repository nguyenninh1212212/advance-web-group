const CardTitle = ({
  title,
  font = "font-bold",
  bg = "bg-primary-200",
  text = "text-white",
}: {
  title: string;
  font?: string;
  bg?: string;
  text?: string;
}) => {
  return (
    <p
      className={`py-2 px-6 mb-1 w-auto inline-block ${text} text-2xl ${font} rounded-sm ${bg} text-center`}
    >
      {title}
    </p>
  );
};

export default CardTitle;
