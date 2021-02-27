import React from "react";
import { Container, Header, Segment, Image, Button, Icon } from "semantic-ui-react";

export default function HomePage({history}) {
  return (
    <Segment inverted vertical textAlign='center' className='masthead'>
      <Container>
        <Header as='h1' inverted>
          <Image
            size='massive'
            src='/assets/logo.png'
            style={{
              marginBottom: 12,
            }}
          />
          Re-vents 
        </Header>
        <Button size='huge' inverted onClick={() => history.push('/events')} >
            Get started
            <Icon name='right arrow' inverted />
        </Button>
      </Container>
    </Segment>
  );
}
