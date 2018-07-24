import React from 'react';
import { Button, Input, Container, Header } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const _registerMutation = gql`
mutation($username: String!, $email: String!, $password: String!) {
  register(username: $username, email: $email, password: $password)
}
`;

class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = async (mutation) => {
    const response = await mutation({ variables: this.state })
    console.log(response);
  }

  render() {
    const { username, email, password } = this.state;

    return (
      <Container text>
        <Header as="h2">Register</Header>
        <Input
          name="username"
          onChange={this.onChange}
          value={username}
          placeholder="Username"
          fluid
        />
        <Input name="email" onChange={this.onChange} value={email} placeholder="Email" fluid />
        <Input
          name="password"
          onChange={this.onChange}
          value={password}
          type="password"
          placeholder="Password"
          fluid
        />
        <Mutation mutation={_registerMutation}>
          {registerMutation => <Button onClick={() => this.onSubmit(registerMutation)}>Submit</Button>}
        </Mutation>
      </Container>
    );
  }
}


export default Register;


// {( mutationCallback, { loading, error } ) => {
//     if (loading) return <div>Loading...</div>
//     return <Button onClick={() => this.twojaMetoda(mutationCallback)} />
// }}
// w twojaMetoda(mutation) {...} mozesz cos zrobic typu walidacja i na koniec wywolac mutation({ variables: {} })
// a jezeli chcesz zrobic mutacje od razu przy renderowaniu to w propsach Mutation sie podaje jedynie mutation={} i variables={}