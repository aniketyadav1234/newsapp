import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NewsItem from './NewsItem';
import Spinner from './spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios';

export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  };
  capitlizeText(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  constructor(props) {
    super(props);
    console.log("Hello, I am a constructor from News component");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.props.category}-NewsMonkey`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageSize}&apiKey=${this.props.apiKey}`;
    console.log(url)
    this.setState({ loading: true });
    this.props.setProgress(30);
    axios.get(url)
      .then((data) => {
        const parseData = data.data;
        console.log(parseData)
        this.props.setProgress(70);
        this.setState({
          articles: parseData.articles,
          totalArticles: parseData.totalResults,
          loading: false,
          totalResults: parseData.totalResults,
        });
      }).catch((error) => console.log(error))

    this.props.setProgress(100)

  }

  async componentDidMount() {
    this.updateNews();
  }


  handlePrevsClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews()

  };

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 })
    this.updateNews()
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ffa25119d84a4a53b2ceef2a54c07837&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    axios.get(url).then((data) => {
      const parseData = data.data;
      this.setState({
        articles: this.state.articles.concat(parseData.articles),
        totalArticles: parseData.totalResults,
      });
    })

  };


  render() {
    console.log("render");
    return (
      <>
        <h1 className='text-center' style={{ margin: '74px 0px' }}>NewsMonkey - Top {this.props.category} Headlines</h1>;
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length || 0}
          next={this.fetchMoreData}
          hasMore={this.state.articles.lenght !== this.state.totalResults}
        >


          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.title}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={element.description ? element.description.slice(0, 88) : ""}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>

    );
  }
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
