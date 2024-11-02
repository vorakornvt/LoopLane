import ItemEntry from "../Components/ItemEntry";
import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "../graphQL/queries/queries";
import { Container, Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import ItemGrid from "../Components/ItemGrid";

const ItemPage = ({ user }) => {
  const { loading, error, data, refetch } = useQuery(GET_ITEMS, {
    context: {
      headers: {
        authorization: user.token,
      },
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading)
    return (
      <div className="mx-auto spinner-grow text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );

  if (error) return <p>Error 😭</p>;

  console.log(data);

  return (
    <>
      <Container fluid>
        <ItemEntry user={user} refetch={refetch} />
      </Container>
    </>
  );
};

export default ItemPage;
