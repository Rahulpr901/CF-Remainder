import "../style.css";
const Container = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white shadow-md rounded-2xl">
      {children}
    </div>
  );
};
export default Container;
