class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def property
    @data = { property_id: params[:id] }.to_json
    render 'property'
  end

  def login
    render 'login'
  end

  def user
    user = User.find_by(username: params[:username])
    return render 'home', status: :bad_request if !user
    @data = { user: user }.to_json
    render 'user'
  end

  def profile
    token = cookies.signed[:airbnb_session_token]
    session = Session.find_by(token: token)
    return render json: { error: 'user_not_found' }, status: :not_found if !session
    user = session.user
    @data = { user: user }.to_json
    return render json: { error: 'user_not_found' }, status: :not_found if !@data
    render 'profile'
  end
end
