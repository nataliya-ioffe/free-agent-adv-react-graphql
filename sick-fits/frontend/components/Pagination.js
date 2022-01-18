import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import DisplayError from './DisplayError';
import PaginationStyles from './styles/PaginationStyles';

import { perPage } from '../config';

// _allProductsMeta is a Keystone query
export const PAGINATION_QUERY = gql`
  query {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { error, loading, data } = useQuery(PAGINATION_QUERY);

  if (loading) return 'Loading...';
  if (error) return <DisplayError error={error} />;

  const { count } = data._allProductsMeta;

  //   Round up to the next whole number
  const pageCount = Math.ceil(count / perPage);

  return (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits - Page {page} of {pageCount}
        </title>
      </Head>

      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>Prev</a>
      </Link>

      <p>
        Page {page} of {pageCount}
      </p>

      <p>{count} items total</p>

      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next</a>
      </Link>
    </PaginationStyles>
  );
}

// Render pagination links
// Allow for dynamic routing
// Filter the products for the current page
// deal with cache invalidation

// Query string routing
// localhost:7777/products?page=2

// File based routing with Next.js
// localhost:7777/products/2
