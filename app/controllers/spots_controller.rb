class SpotsController < ApplicationController
  def index
    spots = Spot.order("created_at DESC")
    render json: spots
  end

  def create
    spot = Spot.create(spot_param)
    render json: spot
  end

  def show
    spot = Spot.find(params[:id])
    render json: spot
  end

  def update
    spot = Spot.find(params[:id])
    spot.update(spot_param)
    render json: spot
  end

  def sorted
    spots = Spot.sort_by_price
    render json: spots
  end

  def destroy
    spot = Spot.find(params[:id])
    spot.destroy
    head :no_content, status: :ok
  end
  
  private

  def spot_param
    params.require(:spot).permit(:title, :description, :price, :image)
  end
end
