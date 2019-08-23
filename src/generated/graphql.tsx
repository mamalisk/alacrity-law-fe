import gql from "graphql-tag";
import * as React from "react";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactComponents from "@apollo/react-components";
import * as ApolloReactHoc from "@apollo/react-hoc";
import * as ApolloReactHooks from "@apollo/react-hooks";
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Book = {
  __typename?: "Book";
  bookId: Scalars["Int"];
  title: Scalars["String"];
  author: Scalars["String"];
  price: Scalars["Float"];
};

export type BookInput = {
  title: Scalars["String"];
  author: Scalars["String"];
  price: Scalars["Float"];
};

export type Mutation = {
  __typename?: "Mutation";
  createBook?: Maybe<Book>;
  editBook?: Maybe<Book>;
};

export type MutationCreateBookArgs = {
  title: Scalars["String"];
  author: Scalars["String"];
  price: Scalars["Float"];
};

export type MutationEditBookArgs = {
  bookId: Scalars["Int"];
  title: Scalars["String"];
  author: Scalars["String"];
  price: Scalars["Float"];
};

export type Query = {
  __typename?: "Query";
  books?: Maybe<Array<Maybe<Book>>>;
  book?: Maybe<Book>;
};

export type QueryBookArgs = {
  bookId: Scalars["Int"];
};
export type AllBooksQueryVariables = {};

export type AllBooksQuery = { __typename?: "Query" } & {
  books: Maybe<
    Array<
      Maybe<
        { __typename?: "Book" } & Pick<
          Book,
          "bookId" | "title" | "author" | "price"
        >
      >
    >
  >;
};

export const AllBooksDocument = gql`
  query AllBooks {
    books {
      bookId
      title
      author
      price
    }
  }
`;
export type AllBooksComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    AllBooksQuery,
    AllBooksQueryVariables
  >,
  "query"
>;

export const AllBooksComponent = (props: AllBooksComponentProps) => (
  <ApolloReactComponents.Query<AllBooksQuery, AllBooksQueryVariables>
    query={AllBooksDocument}
    {...props}
  />
);

export type AllBooksProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  AllBooksQuery,
  AllBooksQueryVariables
> &
  TChildProps;
export function withAllBooks<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    AllBooksQuery,
    AllBooksQueryVariables,
    AllBooksProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    AllBooksQuery,
    AllBooksQueryVariables,
    AllBooksProps<TChildProps>
  >(AllBooksDocument, {
    alias: "withAllBooks",
    ...operationOptions
  });
}

export function useAllBooksQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    AllBooksQuery,
    AllBooksQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<AllBooksQuery, AllBooksQueryVariables>(
    AllBooksDocument,
    baseOptions
  );
}
export type AllBooksQueryHookResult = ReturnType<typeof useAllBooksQuery>;
export type AllBooksQueryResult = ApolloReactCommon.QueryResult<
  AllBooksQuery,
  AllBooksQueryVariables
>;
