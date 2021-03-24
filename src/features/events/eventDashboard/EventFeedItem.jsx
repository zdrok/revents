import React from "react";
import { Link } from "react-router-dom";
import { Feed } from "semantic-ui-react";
import { formatDistance } from "date-fns";

export default function EventFeedItem({ post }) {
  let summury;

  switch (post.code) {
    case "joined-event":
      summury = (
        <>
          <Link to={`/profile/${post.userUid}`}>{post.displayName}</Link> has signed up to{" "}
          <Link to={`/events/${post.eventId}`}>{post.title}</Link>
        </>
      );
      break;

    case "left-event":
      summury = (
        <>
          <Link to={`/profile/${post.userUid}`}>{post.displayName}</Link> has canceled his place on{" "}
          <Link to={`/events/${post.eventId}`}>{post.title}</Link>
        </>
      );
      break;
    default:
      summury = "somethig happened";
      break;
  }
  return (
    <Feed.Event>
      <Feed.Label image={post.photoURL} />
      <Feed.Content>
        <Feed.Date>{formatDistance(new Date(post.date), new Date())} ago</Feed.Date>
        <Feed.Summary>
            {summury}
        </Feed.Summary>
      </Feed.Content>
    </Feed.Event>
  );
}
