FactoryBot.define do
  factory :review do
    spot { FactoryBot.create(:spot) }
    description { Faker::Lorem.paragraph }
  end
end
