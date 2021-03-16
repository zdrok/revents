import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Header, Image, Button, Item, Label } from 'semantic-ui-react';

export default function EventDetailedSidebar({ attendees, hostUid }) {
  return (
    <>
      <Segment
        textAlign='center'
        style={{ border: 'none' }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        {attendees.length} {attendees.length > 1 ? 'People' : 'Person'} Going
      </Segment>
      <Segment attached>
        <Item.Group relaxed divided>
          {attendees.map((attendee) => (
            <Item
              key={attendee.id}
              style={{ position: 'relative' }}
              as={Link}
              to={`/profile/${attendee.id}`}
            >
              {hostUid === attendee.id && (
                <Label
                  color='orange'
                  style={{ position: 'absolute' }}
                  ribbon='right'
                  content='Host'
                />
              )}
              <Item.Image size='tiny' src={attendee.photoURL || '/assets/user.png'} />
              <Item.Content verticalAlign='middle'>
                <Item.Header as='h3'>
                  <span>{attendee.displayName}</span>
                </Item.Header>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </>
  );
}
