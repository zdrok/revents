import React from "react";
import { Button,  Menu } from "semantic-ui-react";

export default function SignOutMenu({setAuthenticated}) {
  return (
    <Menu.Item position='right'>
      <Button basic content='Login' onClick={()=>setAuthenticated(true)} inverted />
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
