import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const allUsersQuery = gql`
  {
    allUsers {
      id
      email
    }
  }
`;

const Home = () => (
  <Query query={allUsersQuery}>
    {({ loading, error, data }) => {
      if (loading) {
        return (
          <p>
Loading...
          </p>
        );
      }
      if (error) {
        return (
          <p>
Error :(
          </p>
        );
      }

      return data.allUsers.map(u => (
        <div key={u.id}>
          <h1>
            {u.email}
          </h1>
        </div>
      ));
    }}
  </Query>
);

export default Home;

// import React from 'react';
// import { graphql } from 'react-apollo';
// import gql from 'graphql-tag';

// const Home = ({ data: { allUsers = [] } }) => allUsers.map(u => <h1 key={u.id}>{u.email}</h1>);

// const allUsersQuery = gql`
//   {
//     allUsers {
//       id
//       email
//     }
//   }
// `;

// export default graphql(allUsersQuery)(Home);
