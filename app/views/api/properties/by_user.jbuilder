json.properties do
  json.array! @properties do |property|
    json.id property.id
    json.title property.title
    json.city property.city
    json.country property.country
    json.property_type property.property_type
    json.amenities property.amenities
    json.policies property.policies
    json.neighborhood property.neighborhood
    json.price_per_night property.price_per_night
    json.image_url property.image if property.image
    json.image_url url_for(property.image) if property.image.attached?
  end
end
