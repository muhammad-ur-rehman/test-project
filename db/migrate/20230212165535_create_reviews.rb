class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.text :description
      t.belongs_to :spot, index: true, foreign_key: true

      t.timestamps
    end
  end
end
