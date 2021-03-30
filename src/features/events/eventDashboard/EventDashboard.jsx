import React, { useEffect, useState } from "react";
import { Button, Grid, Loader } from "semantic-ui-react";
import EventList from "./EventList";
import { useSelector, useDispatch } from "react-redux";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";
import { listenToEventsFromFirestore } from "../../../app/firestore/firestoreService";
import { clearEvents, fetchEvents, listenToEvents } from "../eventActions";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import EventsFeed from "./EventFeed";

export default function EventDashboard() {
  const limit = 2;
  const dispatch = useDispatch();
  const { events, moreEvents } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);
  const { authenticatad } = useSelector((state) => state.auth);
  const [lastDocSnapshot, setLastDocSnapshot] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [predicate, setPredicate] = useState(
    new Map([
      ["startDate", new Date()],
      ["filter", "all"],
    ])
  );

  function handleSetPredicate(key, value) {
    dispatch(clearEvents());
    setLastDocSnapshot(null)
    setPredicate(new Map(predicate.set(key, value)));
  }

  useEffect(() => {
    setLoadingInitial(true);
    dispatch(fetchEvents(predicate, limit)).then((lastVisible) => {
      setLastDocSnapshot(lastVisible);
      setLoadingInitial(false);
    });
    return ()=> dispatch(clearEvents())
  }, [predicate, dispatch]);

  function handleFetchNextEvents() {
    dispatch(fetchEvents(predicate, limit)).then((lastVisible) => {
      setLastDocSnapshot(lastVisible);
    });
  }

  // useFirestoreCollection({
  //   query: () => listenToEventsFromFirestore(predicate),
  //   data: (events) => dispatch(listenToEvents(events)),
  //   deps: [dispatch, predicate],
  // });

  return (
    <Grid>
      <Grid.Column width={10}>
        {loadingInitial && (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        )}
        <EventList
          events={events}
          loading={loading}
          moreEvents={moreEvents}
          getNextEvents={handleFetchNextEvents}
        />
        {/* <Button
        loading={loading}
        disabled={!moreEvents}
        color='green'
        onClick={handleFetchNextEvents} content='more...' floated='right' /> */}
      </Grid.Column>
      <Grid.Column width={6}>
        {authenticatad && <EventsFeed />}
        <EventFilters predicate={predicate} setPredicate={handleSetPredicate} loading={loading} />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loading} />
      </Grid.Column>
    </Grid>
  );
}
