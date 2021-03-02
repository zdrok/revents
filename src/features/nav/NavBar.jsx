import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import SignInMenu from "./SignInMenu";
import SignOutMenu from "./SignOutMenu";

export default function NavBar({ setFormOpen }) {
  const { authenticated } = useSelector((state) => state.auth);

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} to='/' exact header>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: 15 }} />
        </Menu.Item>
        <Menu.Item name='Event' as={NavLink} to='/events' />
        <Menu.Item name='Sandbox' as={NavLink} to='/sandbox' />
        {authenticated && (
          <Menu.Item as={NavLink} to='/createEvent'>
            <Button inverted positive content='Create Event' />
          </Menu.Item>
        )}
        {authenticated ? <SignInMenu /> : <SignOutMenu />}
      </Container>
    </Menu>
  );
}
