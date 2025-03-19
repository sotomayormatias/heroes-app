import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../components/HeroCard";
import { getHeroesByName } from "../helpers";

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search);
  
  const heroes = getHeroesByName(q);
  
  const showSearch = q === '';
  const showError = q !== '' && heroes.length < 1;

  const {searchText, onInputChange, } = useForm({
    searchText: q,

  });

  const onSearchSubmit = (e) => {
    e.preventDefault();

    navigate(`?q=${searchText}`);
  }

  return (
    <>
      <h1>Search</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={onSearchSubmit}>
            <input
              type="text"
              placeholder="Search a Hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />
            <button className="btn btn-primary mt-1">
              Search
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />
          {
            showSearch && (
              <div className="alert alert-primary animate__animated animate__fadeIn">
                Search a Hero
              </div>
            )
          }
          {
            showError && (
              <div className="alert alert-danger animate__animated animate__fadeIn">
                No Hero with <b>{q}</b>
              </div>
            )
          }
          {heroes.map( hero => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  )
}
