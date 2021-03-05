import { compareDesc } from "date-fns";
import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { openModal } from "../../app/common/modals/modalReducer";
import TestMap from "./TestMap";
import TestPlaceInput from "./TestPlaceInput";
import { decrement, increment } from "./testReducer";

export default function Sandbox() {
  // const [cords, setCords] =  useState(null)
  const dispatch = useDispatch();
  const data = useSelector((state) => state.test.data);
  // console.log(typeof data);
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };
  const [location, setLocation]= useState(defaultProps)


function handleSetLocation(latLng){
  setLocation({...location, center: {lat: latLng.lat, lng: latLng.lng}})
}

  return (
    <>
      <h1>Testing 123</h1>
      <h2>The data is: {data}</h2>
      <Button
        content='Increment'
        color='green'
        onClick={() => dispatch(increment(20))}
      />
      <Button
        content='Decrement'
        color='red'
        onClick={() => dispatch(decrement(20))}
      />
      <Button
        content='Open modal'
        color='teal'
        onClick={() =>
          dispatch(
            openModal({
              modalType: "TestModal",
              modalProps: { data },
            })
          )
        }
      />

      <div className='' style={{ marginTop: 15 }}>
        <TestPlaceInput setLocation={handleSetLocation} />
        <TestMap location={location} />
      </div>
    </>
  );
}
