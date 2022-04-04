import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, Loader } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import ReviewList from "./ReviewList";

export default observer(function ReviewsDashboard() {
  const { reviewStore } = useStore();
  const { loadReviews, reviewRegistry, setPagingParams, pagination } = reviewStore;
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadReviews().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    if (reviewRegistry.size <= 1) loadReviews();
  }, [reviewRegistry.size, loadReviews]);

  if (reviewStore.loadingInitial && !loadingNext) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width="10">
        <InfiniteScroll
          pageStart={0}
          loadMore={handleGetNext}
          hasMore={
            !loadingNext &&
            !!pagination &&
            pagination.currentPage < pagination.totalPages
          }
          initialLoad={false}
        >
          <ReviewList />
        </InfiniteScroll>
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
});
