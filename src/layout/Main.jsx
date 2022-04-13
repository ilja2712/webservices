import React from 'react';
import { Cards } from './components/Cards';
import { Search } from "./components/Search";
import { Preloader } from "./components/Preloader"

const API_KEY = process.env.REACT_APP_API_KEY;

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            films: [],
            loading: true
        };
    }

    searchMovies = (str, tpf = 'all') => {
        this.setState({loading: true});
        fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${str}${tpf !== 'all' ? `&type=${tpf}` : ''}`)
            .then(res => res.json())
            .then((result) => {this.setState({films: result.Search, loading: false})})
    }

    componentDidMount() {
        fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=football`)
            .then(res => res.json())
            .then((result) => {this.setState({films: result.Search, loading: false})})
    }

    render() {
        const {films, loading} = this.state;

        return <main className="content">
            <Search searchMovies={this.searchMovies}/>
            {
                loading ? <Preloader /> : (<Cards films={this.state.films}/>)}
        </main>
    }
}

export {Main}