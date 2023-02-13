FactoryBot.define do
  factory :spot do
    title { Faker::Lorem.sentence }
    description { Faker::Lorem.paragraph }
    price { Faker::Commerce.price }
  end
end
