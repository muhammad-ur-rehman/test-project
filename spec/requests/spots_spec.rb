require 'rails_helper'

RSpec.describe 'Spots', type: :request do
  describe 'GET /index' do
    before do
      FactoryBot.create_list(:spot, 10)
      get '/api/v1/spots'
    end
    
    it 'returns all spots' do
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(:success)
    end
  end

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
        expect(json['title']).to eq(my_spot.title)
      end

      it 'returns the description' do
        expect(json['description']).to eq(my_spot.description)
      end

      it 'returns the price' do
        expect(json['price'].to_f).to eq(my_spot.price.to_f)
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

  describe 'GET /show' do
    let!(:spot) { FactoryBot.create(:spot) }

    before do
      FactoryBot.create_list(:spot, 10)
      get "/api/v1/spots/#{spot.id}"
    end
    
    it 'returns a spot' do
      expect(json['title']).to eq(spot.title)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(:success)
    end
  end

  describe 'PUT /update' do
    let!(:my_spot) { FactoryBot.create(:spot) }

    before do
      put "/api/v1/spots/#{my_spot.id}", params:
                        { spot: {
                          title: "new title",
                          description: my_spot.description,
                          price: my_spot.price
                        } }
    end

    it 'returns the title' do
      expect(json['title']).to eq("new title")
    end

    it 'returns the description' do
      expect(json['description']).to eq(my_spot.description)
    end

    it 'returns the price' do
      expect(json['price'].to_f).to eq(my_spot.price.to_f)
    end

    it 'returns a ok status' do
      expect(response).to have_http_status(:ok)
    end
  end

  describe "DELETE /destroy" do
    let!(:spot) { FactoryBot.create(:spot, id: 1001, title: "testing in rspec") }

    before do
      delete "/api/v1/spots/#{spot.id}"
    end

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
