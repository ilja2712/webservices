import { Card } from "./Card"

function Cards(props) {
    const {films = []} = props;
   return (<div className="cards">
                {films.length ? (films.map(film => (
                    <Card key={film.imdbID} name={film.Title} poster={film.Poster} year={film.Year} type={film.Type}/>
                ))) : <h4>Nothing found</h4>}
            </div>
        )
}

export {Cards}

