import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells apollo we will take care of everything

    // First, we the Read function for the items
    // We can either:
    //  1. Return the items because they are already in the cache, or...
    //  2. Return false and send a network request for the items
    read(existing = [], { args, cache }) {
      const { skip, first } = args;

      // Read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);

      // IF there are items
      // AND there aren't enough items to satisfy how many were requested
      // AND we are on the last page
      // THEN JUST SEND IT
      if (items.length && items.length !== first && page === pages) {
        return items;
      }

      // We don't have any items, we must go to the network to fetch them
      if (items.length !== first) {
        return false;
      }

      // If there are items, return them from the cache. We don't need to go to the network.
      if (items.length) {
        console.log(
          `There are ${items.length} items in the cache! Gonna send them to apollo`
        );

        return items;
      }

      return false; // fallback to network
    },
    merge(existing, incoming, { args }) {
      // The Merge function runs when the Apollo client comes back from the network with our product
      const { skip, first } = args;

      console.log(`MErging items from the network ${incoming.length}`);

      const merged = existing ? existing.slice(0) : [];

      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }

      // Finally we return the merged items from the cache,
      return merged;
    },
  };
}
