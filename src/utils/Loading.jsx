import FadeLoader from "react-spinners/FadeLoader";
const Loading = () => {
  const style = {
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <div style={style}>
      <FadeLoader color="#36d7b7" />
    </div>
  );
};

export default Loading;
