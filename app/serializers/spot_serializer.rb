class SpotSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :price, :image

  def image
    object.image&.url
  end
end
