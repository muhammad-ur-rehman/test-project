require 'rails_helper'

RSpec.describe 'Spots', type: :request do
  describe 'POST /create' do
    context 'with valid parameters' do
      let!(:my_spot) { FactoryBot.create(:spot) }

      before do
        post '/api/v1/spots', params:
                          { spot: {
                            title: my_spot.title,
                            description: my_spot.description,
                            price: my_spot.price
                          } }
      end

      it 'returns the title' do
        expect(JSON.parse(response.body)['title']).to eq(my_spot.title)
      end

      it 'returns the description' do
        expect(JSON.parse(response.body)['description']).to eq(my_spot.description)
      end

      it 'returns the price' do
        expect(JSON.parse(response.body)['price'].to_f).to eq(my_spot.price)
      end

      it 'returns a ok status' do
        expect(response).to have_http_status(:ok)
      end
    end

    # context 'with invalid parameters' do
    #   before do
    #     post '/api/v1/spots', params:
    #                       { spot: {
    #                         title: '',
    #                         description: '',
    #                         price: 0.0
    #                       } }
    #   end

    #   it 'returns a unprocessable entity status' do
    #     expect(response).to have_http_status(:unprocessable_entity)
    #   end
    # end
  end
end
