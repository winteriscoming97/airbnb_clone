class AddColumnsToProperties < ActiveRecord::Migration[5.2]
  def change
    add_column :properties, :amenities, :string
    add_column :properties, :policies, :string
    add_column :properties, :neighborhood, :string
  end
end
