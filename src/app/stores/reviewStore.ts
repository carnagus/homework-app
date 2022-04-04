import { makeAutoObservable } from "mobx";
import {addMinutes} from 'date-fns'
import agent from "../api/agent";
import { Review, ReviewFormValues } from "../models/review";
import { Pagination, PagingParams } from "../models/pagination";

export default class ReviewStore {
    reviewRegistry = new Map<string, Review>();
    loading = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();

    constructor() {
        makeAutoObservable(this);
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());

        return params;
    }

    get reviewsByDate() {
        return Array.from(this.reviewRegistry.values())
        .sort((a, b) =>
            a.createDate!.getTime() - b.createDate!.getTime());
    }

    loadReviews = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Reviews.list(this.axiosParams);
            result.data.forEach(review => {
                this.setInitReview(review);
            })
            this.setPagination(result.pagination);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }

    private setReview = (review: Review) => {
        review.startDate = new Date(review.startDate!);
        review.endDate = new Date(review.endDate!);
        review.createDate = new Date(review.createDate!);
        this.reviewRegistry.set(review.id, review);
    }

    private setInitReview = (review: Review) => {
        review.startDate = this.setOffset(new Date(review.startDate!));
        review.endDate = this.setOffset(new Date(review.endDate!));
        review.createDate = this.setOffset(new Date(review.createDate!));

        this.reviewRegistry.set(review.id, review);
    }

    private setOffset = (date:Date):Date => {
        const offset = new Date().getTimezoneOffset();
        const offsetDate = addMinutes(date, -offset);
        
        return offsetDate;
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createReview = async (review: ReviewFormValues) => {
        try {
            await agent.Reviews.create(review);
            const newReview = new Review(review);
            this.setReview(newReview);
        } catch (error) {
            console.log(error);
        }
    }
}