import Image from "next/image";
import loader from "@/assets/loader.gif";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Image
        src={loader}
        alt={`Loading...`}
        width={150}
        height={150}
        priority
      />
    </div>
  );
};

export default Loading;
