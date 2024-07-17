import { getBedhubClient } from '@/lib/bedhub-client'
import { GetCartOnlyDocument } from '@/gql/queries/getCartOnly.bedhub.generated'


export async function getCart(cartId: string) {
  const client = getBedhubClient();
  const { data } = await client.query({
    query: GetCartOnlyDocument,
    variables: {
      cartId: cartId,
    },
  });
  return data.cart;
}
