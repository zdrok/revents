import { Button, Container, Header, Menu } from "semantic-ui-react";

export default function NavBar({setFormOpen}) {
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header>
          <img src='/assets/logo.png' alt='logo' style={{marginRight: 15}} />
        </Menu.Item>
        <Menu.Item name='Event' />
        <Menu.Item>
          <Button onClick={()=> setFormOpen(true)} inverted positive content='Create Event' />
        </Menu.Item>
        <Menu.Item position='right'>
          <Button basic content='Login' inverted />
          <Button
            basic
            content='Register'
            inverted
            style={{
              marginLeft: "0.5em",
            }}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
