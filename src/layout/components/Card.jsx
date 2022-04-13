export function Card(props) {
    return <div className="card movie">
      <div className="card-image waves-effect waves-block waves-light">
        <img className="activator" src={props.poster} />
      </div>
      <div className="card-content">
        <span className="card-title activator grey-text text-darken-4">{props.name}</span>
        <p><a href="#">{props.year}</a></p>
      </div>
      <div className="card-action">
          <a><span>{props.type}</span></a>
      </div>
    </div>          
}