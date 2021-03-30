import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { setAccessToken } from '../accessToken';
import { useLoginMutation } from '../generated/graphql';

interface LoginProps {

}

export const Login: React.FC<RouteComponentProps> = ({history}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();

  return (
    <form onSubmit={async e => {
      e.preventDefault()
      console.log('form submitted');
      const response = await login({
        variables: {
          email,
          password
        }
      });

      console.log(response);

      if (response && response.data) {
        setAccessToken(response.data.login.accessToken);
      }

      history.push("/");
    }}>
      <div>
      <input value={email} type={"email"} placeholder="email" onChange={e => {
        setEmail(e.target.value);
      }} />
      </div>
      <div>
      <input value={password} type={"password"} placeholder="password" onChange={e => {
        setPassword(e.target.value);
      }} />
      </div>
      <button type={"submit"}>login</button>
    </form>
  );
}

