require 'rails_helper'

RSpec.describe 'Reviews', type: :request do
  describe 'POST /create' do
    context 'with valid parameters' do
      let!(:review) { FactoryBot.create(:review) }

      before do
        post '/api/v1/reviews', params:
                          { review: {
                            description: review.description
                          } }
      end

      it 'returns the description' do
        expect(json['description']).to eq(review.description)
      end

      it 'returns a ok status' do
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe 'PUT /update' do
    let!(:review) { FactoryBot.create(:review) }

    before do
      put "/api/v1/reviews/#{review.id}", params:
                        { review: {
                          description: "new description"
                        } }
    end

    it 'returns the description' do
      expect(json['description']).to eq("new description")
    end

    it 'returns a ok status' do
      expect(response).to have_http_status(:ok)
    end
  end
end
