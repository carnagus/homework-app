import React from "react";
import { Item, Segment } from "semantic-ui-react";
import { format } from "date-fns";
import { Review } from "../../../app/models/review";

interface Props {
  review: Review;
}

export default function ReviewListItem({ review }: Props) {
  return (
    <Segment>
    <Item.Group>
      <Item>
        <Item.Content>
          <Item.Header>{review.name}</Item.Header>
          <Item.Meta>
            <span>
              <b>Id:</b> {review.id}
            </span>
          </Item.Meta>
          <Item.Meta></Item.Meta>
          <Item.Meta>
            <span>
              <b>Start date:</b> {format(review.startDate!, "dd MMM yyyy h:mm aa")}
            </span>
          </Item.Meta>
          <Item.Meta>
            <span>
              <b>End date:</b> {format(review.endDate!, "dd MMM yyyy h:mm aa")}
            </span>
          </Item.Meta>
          <Item.Meta>
            <span>
              <b>Created:</b> {format(review.createDate!, "dd MMM yyyy h:mm aa")}
            </span>
          </Item.Meta>
          <Item.Description>{review.content}</Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>
    </Segment>
  );
}
