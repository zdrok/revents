import React from "react";
import { useDispatch } from "react-redux";
import { Button, Menu } from "semantic-ui-react";
import { openModal } from "../../app/common/modals/modalReducer";

export default function SignOutMenu({ setAuthenticated }) {
  const dispatch = useDispatch();
  return (
    <Menu.Item position='right'>
      <Button
        basic
        content='Login'
        onClick={() =>
          dispatch(
            openModal({
              modalType: "LoginForm",
            })
          )
        }
        inverted
      />
      <Button
        basic
        content='Register'
        inverted
        style={{
          marginLeft: "0.5em",
        }}
      />
    </Menu.Item>
  );
}
