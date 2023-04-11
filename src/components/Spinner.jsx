import { RotatingLines } from "react-loader-spinner";

function Spinner({ message }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <RotatingLines strokeColor="grey" width="60" className="m-5" />
      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;
