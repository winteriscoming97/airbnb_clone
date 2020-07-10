module Api
  class PropertiesController < ApplicationController
    def create
      property = Property.new(propery_params);
      if property.save
        render 'api/properties/create', status: :created
      else
        render json: { error: 'invalid_params' }, status: :bad_request
      end
    end

    def index
      @properties = Property.order(created_at: :desc).page(params[:page]).per(6)
      return render json: { error: 'not_found' }, status: :not_found if !@properties

      render 'api/properties/index', status: :ok
    end

    def show
      @property = Property.find_by(id: params[:id])
      return render json: { error: 'not_found' }, status: :not_found if !@property

      render 'api/properties/show', status: :ok
    end

    def user_properties
      user = User.find_by(username: params[:username])
      return render json: { error: 'user_not_found' }, status: :not_found if !user
      @properties = user.properties.where("user_id = ?", user.id)
      return render json: { error: 'properties_not_found' }, status: :not_found if !@properties


      render 'api/properties/by_user', status: :ok
    end

    private

    def property_params
      params.require(:property).permit(:title, :description, :city, :country, :property_type, :price_per_night, :max_guests, :bedrooms, :beds, :baths, :image, :amenities, :neighborhood, :policies)
    end
  end
end
