import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'

class TravelGuide extends Component {
  state = {packagesList: [], isLoading: true}

  componentDidMount() {
    this.getPackagesList()
  }

  getPackagesList = async () => {
    const url = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(url)
    const data = await response.json()
    const updatedList = data.packages.map(each => ({
      id: each.id,
      description: each.description,
      name: each.name,
      imageUrl: each.image_url,
    }))
    this.setState({packagesList: updatedList, isLoading: false})
  }

  loadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  packagesView = () => {
    const {packagesList} = this.state
    console.log(packagesList)
    return (
      <ul className="cards_list">
        {packagesList.map(each => (
          <li key={each.id} className="trip_item">
            <img src={each.imageUrl} alt={each.name} className="image" />
            <div className="content_cont">
              <h1 className="name">{each.name}</h1>
              <p className="description">{each.description}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="bg_container">
        <h1 className="title">Travel Guide</h1>
        <div className="cards_container">
          {isLoading ? this.loadingView() : this.packagesView()}
        </div>
      </div>
    )
  }
}

export default TravelGuide
