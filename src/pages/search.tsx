import NewsCardXl from "@/components/NewsCardXl";

const Search = () => {
  return (
    <div className="mt-7 space-y-6">
      {[1, 2, 3, 4, 5].map((el) => (
        <NewsCardXl key={el} />
      ))}
    </div>
  );
};

export default Search;
