class ReviewsController < ApplicationController
  def create
    review = Review.create(review_param)
    render json: review
  end

  def update
    review = Review.find(params[:id])
    review.update(review_param)
    render json: review
  end

  private

  def review_param
    params.require(:review).permit(:description)
  end
end
