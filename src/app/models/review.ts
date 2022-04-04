export interface Review {
  id: string;
  name: string;
  content: string;
  createDate: Date | null;
  startDate: Date | null;
  endDate: Date | null;
}

export class Review implements Review {
  constructor(init?: ReviewFormValues) {
    Object.assign(this, init);
  }
}

export class ReviewFormValues {
  id?: string = undefined;
  name: string = "";
  content: string = "";
  createDate: Date | null = null;
  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(review?: ReviewFormValues) {
    if (review) {
      this.id = review.id;
      this.name = review.name;
      this.content = review.content;
      this.createDate = review.createDate;
      this.startDate = review.startDate;
      this.endDate = review.endDate;
    }
  }
}
