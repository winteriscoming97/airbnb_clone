import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class PropertyWidget extends React.Component {
  state = {
    collapsed: true,
    image_attached: false,
    image_url: null
  }

/*  submitProperty() {
    fetch('/api/properties', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        property: {
          title: ,
          description: ,
          city: ,
          country: ,
          property_type: ,
          price_per_night: ,
          max_guests: ,
          bedrooms: ,
          beds: ,
          baths: ,
          image: ,
          amenities: ,
          neighborhood: ,
          policies:
        }
      })
    }))
  }
  */

  dropDown = () => {
    this.setState({
      collapsed: false
    });
  }

  imageAttached = (e) => {
    let input = e.target;
    if (input.files && input.files[0]) {
      let reader = new FileReader();

      reader.readAsDataURL(input.files[0])

      reader.addEventListener('load', (e) => {
        this.setState({
          image_attached: true,
          image_url: e.target.result,
        })
      });
    }
  }

  render() {
    let { image_attached, image_url, collapsed } = this.state;
    console.log(image_url);
    return (
      <div className="border p-4 mb-4">
        {collapsed && <button type="button" onClick={this.dropDown} className="btn btn-large btn-danger btn-block">Create a new Property</button>}
        {collapsed || <form>
          <div className="d-flex flex-column justify-content-between">
            <input type="text" placeholder="Title" />
            <input type="text" placeholder="Description" />
            <input type="text" placeholder="City" />
            <input type="text" placeholder="Country" />
            <input type="text" placeholder="Property Type" />
            <input type="text" placeholder="Amenities" />
            <input type="text" placeholder="Neighborhood" />
            <input type="text" placeholder="Policies" />
            <div className="price-input d-block">
              <input className="w-100" type="number" placeholder="Price per night" step="0.001" min="5" max="" />
              <span>$</span>
            </div>
            <input type="number" placeholder="Max guests" step="0.001" min="1" max="15" />

            <label id="upload-image-btn" htmlFor="image-select">Upload image</label>
            {image_attached && <img className="property-image" src={image_url} alt="image preview" />}
            <input type="file" id="image-select" name="image" accept="image/*" onChange={this.imageAttached} />
          </div>

          <button type="submit" onClick={this.submitProperty} className="btn btn-large btn-danger btn-block">Submit</button>
        </form>}
      </div>
    );
  }
}

export default PropertyWidget;
