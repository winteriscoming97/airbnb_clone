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
    return render 'home' if !user
    @data = { user: user }.to_json
    render 'user'
  end

  def profile
    render 'profile'
  end
end
