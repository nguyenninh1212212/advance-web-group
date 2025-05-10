import ClipLoader from "react-spinners/ClipLoader";

const useLoading = (isLoading: boolean) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <ClipLoader
        color="gray"
        loading={isLoading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default useLoading;
