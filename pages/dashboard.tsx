import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <h1>Bem vindo a plataforma</h1>
      <p>
        {user?.firstName} {user?.lastName}
      </p>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["bank.Token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
