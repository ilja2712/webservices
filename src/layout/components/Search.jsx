import React from 'react';

class Search extends React.Component {
    state = {
        search: '',
        type: 'all'
    }

    handleKey = (event) => {
        if (event.key === 'Enter') {
            this.props.searchMovies(this.state.search, this.state.type);
        }
    }

    handleFilter = (event) => {
        this.setState(() => ({type: event.target.dataset.type}), () => {
            this.props.searchMovies(this.state.search, this.state.type);
        });
    }

    render() {
        return <div className="row">
            <div className="input-field">
                <input 
                    placeholder='search'
                    type="search"
                    className="validate"
                    value={this.state.search}
                    onChange={(e) => this.setState({search: e.target.value})}
                    onKeyDown={this.handleKey}
                />
                <button className='waves-effect waves-light btn search-btn' onClick={() => this.props.searchMovies(this.state.search, this.state.type)}>Search</button>
            </div>
            <div className='filtration-group'>
                <form action="#">
                    <label className='group1'>
                        <input name="group1" type="radio" value="" data-type="all" onChange={this.handleFilter} checked={this.state.type === 'all'}/>
                        <span>All views</span>
                    </label>
                    <label className='group1'>
                        <input name="group1" type="radio" value="movie" data-type="movie" onChange={this.handleFilter} checked={this.state.type === 'movie'} />
                        <span>Movies</span>
                    </label>
                    <label className='group1'>
                        <input name="group1" type="radio" value="series" data-type="series" onChange={this.handleFilter} checked={this.state.type === 'series'}/>
                        <span>Series</span>
                    </label>
                </form>
            </div>
        </div>
    }
}

export {Search}