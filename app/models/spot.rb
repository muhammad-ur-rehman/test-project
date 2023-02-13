class Spot < ApplicationRecord
  has_one_attached :image
  has_many :reviews, dependent: :destroy

  scope :sort_by_price, -> { where("price ASC") }
end
