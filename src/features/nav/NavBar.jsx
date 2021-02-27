import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Button, Container, Header, Menu } from "semantic-ui-react";
import SignInMenu from "./SignInMenu";
import SignOutMenu from "./SignOutMenu";

export default function NavBar({ setFormOpen }) {
  const history = useHistory()
  const [authenticated, setAuthenticated] = useState(false);

  function handleSignOut() {
    setAuthenticated(false)
    history.push('/')
  }
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} to='/' exact header>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: 15 }} />
        </Menu.Item>
        <Menu.Item name='Event' as={NavLink} to='/events' />
        {authenticated && (
          <Menu.Item as={NavLink} to='/createEvent'>
            <Button inverted positive content='Create Event' />
          </Menu.Item>
        )}
        {authenticated ? (
          <SignInMenu signOut={handleSignOut} />
        ) : (
          <SignOutMenu setAuthenticated={setAuthenticated} />
        )}
      </Container>
    </Menu>
  );
}
