import React from 'react';
import { Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic } from 'semantic-ui-react';

export default function ProfileHeader({ profile, isCurrentUser }) {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image size='small' avatar src={profile.photoURL || '/assetc/user.png'} />
              <Item.Content verticalAlign='middle'>
                <Header
                  as='h1'
                  content={profile.displayName}
                  style={{ dispalay: 'block', marginBottom: 10 }}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>

        <Grid.Column width={4}>
          <Statistic.Group>
            <Statistic label='Followers' value={10} />
            <Statistic label='Following' value={5} />
          </Statistic.Group>
        </Grid.Column>
        {!isCurrentUser && (
          <>
            <Divider />
            <Reveal animated='move'>
              <Reveal.Content visible style={{ width: '100%' }}>
                <Button fluid color='teal' content='Following' />
              </Reveal.Content>
              <Reveal.Content hidden style={{ width: '100%' }}>
                <Button basic fluid color='red' content='Unfollow' />
              </Reveal.Content>
            </Reveal>
          </>
        )}
      </Grid>
    </Segment>
  );
}
