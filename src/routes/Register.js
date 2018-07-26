import React from 'react';
import {
  Message, Button, Input, Container, Header,
} from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const REGISTER_MUTATION = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

class Register extends React.Component {
  state = {
    username: '',
    usernameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = async (mutation) => {
    this.setState({
      usernameError: '',
      emailError: '',
      passwordError: '',
    });
    const { username, email, password } = this.state;
    const response = await mutation({ variables: { username, email, password } });

    const { ok, errors } = response.data.register;
    const { history } = this.props;

    if (ok) {
      history.push('/');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.setState(err);
    }
  };

  render() {
    const {
      username, email, password, usernameError, emailError, passwordError,
    } = this.state;

    const errorList = [];

    if (usernameError) {
      errorList.push(usernameError);
    }
    if (emailError) {
      errorList.push(emailError);
    }
    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
      <Container text>
        <Header as="h2">
Register
        </Header>
        <Input
          error={!!usernameError}
          name="username"
          onChange={this.onChange}
          value={username}
          placeholder="Username"
          fluid
        />
        <Input
          error={!!emailError}
          name="email"
          onChange={this.onChange}
          value={email}
          placeholder="Email"
          fluid
        />
        <Input
          error={!!passwordError}
          name="password"
          onChange={this.onChange}
          value={password}
          type="password"
          placeholder="Password"
          fluid
        />
        <Mutation mutation={REGISTER_MUTATION}>
          {registerMutation => (
            <Button onClick={() => this.onSubmit(registerMutation)}>
Submit
            </Button>
          )}
        </Mutation>
        {usernameError || emailError || passwordError ? (
          <Message error header="There were some errors with your submission" list={errorList} />
        ) : null}
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
