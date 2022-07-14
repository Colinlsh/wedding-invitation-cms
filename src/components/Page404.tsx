import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

const Page404 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate("/");
    }, 1000);

    return () => {
      clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <div className="h-full w-full flex flex-col text-center justify-center text-4xl align-middle bg-white">
      404 Invalid URL
    </div>
  );
};

export default Page404;
