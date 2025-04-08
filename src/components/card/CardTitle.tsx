import useTheme from "../../util/theme/theme";

const CardTitle = ({
  title,
  font = "font-bold",
}: {
  title: string;
  font?: string;  
}) => {
  const theme = useTheme();
  return (
    <p
      className={`py-2 px-6 mb-1 w-auto inline-block ${theme.text} text-2xl ${font} rounded-sm ${theme.background_card} text-center`}
    >
      {title}
    </p>
  );
};

export default CardTitle;
