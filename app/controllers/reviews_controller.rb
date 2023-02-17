class ReviewsController < ApplicationController
  before_action :set_spot, only: %i[index create]

  def index
    reviews = @spot.reviews.order('created_at DESC')
    render json: reviews
  end

  def create
    review = @spot.reviews.create(review_param)
    render json: review
  end

  def update
    review = Review.find(params[:id])
    review.update(review_param)
    render json: review
  end

  private

  def set_spot
    @spot = Spot.find(params[:spot_id])
  end

  def review_param
    params.require(:review).permit(:description)
  end
end
