import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      people: [],
      nextPage: 'https://swapi.co/api/people',
    }
  }

  componentWillMount() {
    this.getResults()
  }

  getMoreResults = () => {
    this.getResults()
  }

  getResults = () => {
    fetch(this.state.nextPage)
    .then(response => response.json())
    .then(json => {
      this.setState(state => {
        return {
          nextPage: json.next,
          people : state.people.concat(json.results)
        }
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Star Wars</h1>
        <p>Personajes {this.state.people.length}</p>

        <ul>
          {
            this.state.people.map(function (person, index) {
              return <li key={index}>{person.name}</li>
            })
          }
        </ul>

        {
          this.state.nextPage ? 
            <button onClick={this.getMoreResults}>Cargar Mas</button> : ''
        }
      </div>
    )
  }
}

export default App
