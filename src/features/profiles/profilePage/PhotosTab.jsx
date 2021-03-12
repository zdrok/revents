import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react';
import PhotoUploadWidget from '../../../app/common/photos/PhotoUploadWidget';
import { deleteFromFirebaseStorage } from '../../../app/firestore/firebaseService';
import {
  deletePhotoFromCollection,
  getUserPhotos,
  setMainPhoto,
} from '../../../app/firestore/firestoreService';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import { listenToUserPhotos } from '../profileActions';

export default function PhotosTab({ profile, isCurrentUser }) {
  const [editMode, setEditMode] = useState(false);
  const { loading } = useSelector((state) => state.async);
  const { photos } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState({
    isUpdating: false,
    target: null,
  });
  const [deleting, setDeleting] = useState({
    isDeleting: false,
    target: null,
  });

  useFirestoreCollection({
    query: () => getUserPhotos(profile.id),
    data: (photos) => dispatch(listenToUserPhotos(photos)),
    deps: [profile.id, dispatch],
  });

  async function handleSetMainPhoto(photo, target) {
    setUpdating({ isUpdating: true, target });
    try {
      await deleteFromFirebaseStorage(photo.name);
      await deletePhotoFromCollection(photo.id);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setUpdating({ isUpdating: false, target: null });
    }
  }

  async function handleDeletePhoto(photo, target) {
    setDeleting({ isDeleting: true, target });
    try {
      await setMainPhoto(photo);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setUpdating({ isDeleting: false, target: null });
    }
  }

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='user' content={'Photos'} />
          {isCurrentUser && (
            <Button
              basic
              floated='right'
              onClick={() => setEditMode(!editMode)}
              content={editMode ? 'Cancel' : 'Add Photo'}
            />
          )}
        </Grid.Column>

        <Grid.Column width={16}>
          {editMode ? (
            <PhotoUploadWidget setEditMode={setEditMode} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {photos.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  <Button.Group fluid width={2}>
                    <Button
                      name={photo.id}
                      loading={updating.isUpdating && updating.target === photo.id}
                      onClick={(e) => handleSetMainPhoto(photo, e.target.name)}
                      disabled={photo.url === profile.photoURL}
                      basic
                      color='green'
                      content='Main'
                    />
                    <Button
                      name={photo.id}
                      loading={deleting.isDeleting && deleting.target === photo.id}
                      onClick={(e) => handleDeletePhoto(photo, e.target.name)}
                      disabled={photo.url === profile.photoURL}
                      basic
                      color='red'
                      icon='trash'
                    />
                  </Button.Group>
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
