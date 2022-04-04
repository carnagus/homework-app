import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../app/stores/store";
import ReviewListItem from "./ReviewListItem";

export default observer(function ReviewList() {
  const { reviewStore } = useStore();
  const { reviewsByDate } = reviewStore;

  return (
    <>
      {reviewsByDate.map((review) => (
        <ReviewListItem key={review.id} review={review} />
      ))}
    </>
  );
});
