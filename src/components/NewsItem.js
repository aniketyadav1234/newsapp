import React, { Component } from 'react';

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;

    // Define a default image URL
    const defaultImageUrl =
      'https://imageio.forbes.com/specials-images/imageserve/652949452b5e61ecd2fc7a28/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds';

    return (
      <div className="my-3">
        <div className="card" >
          <div stule={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right: '0'
            }}>

        <span class="badge rounded-pill bg-danger" >
             {source}
            </span>
          </div>

          <img
            src={imageUrl || defaultImageUrl}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}...</p>
            <p class="card-text"><small class="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank"
            rel='noreferrer'
            className="btn btn-sm btn-dark">
              Go Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
