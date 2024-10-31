import ItemEntry from "../Components/ItemEntry";
import ItemCard from "../Components/ItemCard";
import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "../graphQL/queries/queries";
import { Container } from "react-bootstrap";
import { useEffect } from "react";

const ItemPage = ({ user }) => {
  // Fetch items using Apollo Client's useQuery hook
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

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error 😭</p>;

  console.log(data);

  return (
    <Container fluid>
      <ItemEntry user={user} refetch={refetch} />
    </Container>
  );
};

export default ItemPage;
