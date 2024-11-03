import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ITEM } from "../graphQL/queries/queries";
import ItemCard from "../Components/ItemCard";
import { Container } from "react-bootstrap";

const ItemDetail = ({ user }) => {
  const { itemId } = useParams();

  // Check for token existence before querying
  if (!user?.token) {
    return <p>Please log in to view this item.</p>;
  }

  const { loading, error, data, refetch } = useQuery(GET_ITEM, {
    variables: { itemId },
    context: {
      headers: {
        authorization: user.token,
      },
    },
  });

  if (loading) {
    return (
      <div className="mx-auto spinner-grow text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (error) return <p>Error 😭</p>;

  return (
    <Container>
      {data?.item ? (
        <ItemCard
          key={data.item.id}
          item={data.item}
          user={user}
          refetch={refetch}
        />
      ) : (
        <p>No item found.</p>
      )}
    </Container>
  );
};

export default ItemDetail;
