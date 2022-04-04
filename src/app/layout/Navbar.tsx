import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Icon, Menu } from "semantic-ui-react";
function Navbar() {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          <Icon name="book" />
          Relex Homework
        </Menu.Item>
        <Menu.Item as={NavLink} to="/reviews" name="Reviews" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createReview"
            positive
            content="Create Review"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default Navbar;
