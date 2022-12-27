// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  in_progress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {vaccineData: {}, apiStatus: apiStatusConstant.initial}

  componentDidMount() {
    this.getVaccinationList()
  }

  getVaccinationList = async () => {
    this.setState({apiStatus: apiStatusConstant.in_progress})

    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    if (response.ok === true) {
      const data = await response.json()

      const formattedData = {
        last7DaysVaccineData: data.last_7_days_vaccination.map(item => ({
          vaccineDate: item.vaccine_date,
          dose1: item.dose_1,
          dose2: item.dose_2,
        })),

        vaccinationByAge: data.vaccination_by_age.map(range => ({
          age: range.age,
          count: range.count,
        })),
        vaccinationByGender: data.vaccination_by_gender.map(genderType => ({
          count: genderType.count,
          gender: genderType.gender,
        })),
      }

      this.setState(
        {vaccineData: formattedData},
        this.setState({apiStatus: apiStatusConstant.success}),
      )
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-view">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderVaccineDetails = () => {
    const {vaccineData} = this.state
    console.log(vaccineData)

    return (
      <>
        <VaccinationCoverage
          vaccineCoverageData={vaccineData.last7DaysVaccineData}
        />
        <VaccinationByGender
          vaccineGenderDetails={vaccineData.vaccinationByGender}
        />
        <VaccinationByAge
          vaccinationAgeDetails={vaccineData.vaccinationByAge}
        />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </div>
  )

  renderVaccineDetailsByApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.in_progress:
        return this.renderLoaderView()
      case apiStatusConstant.success:
        return this.renderVaccineDetails()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return ''
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="response-container">
          <div className="web-site-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="web-site-logo"
            />
            <h1 className="web-site-name ">Co-WIN</h1>
          </div>
          <h1 className="heading">CoWIN Vaccination in India</h1>

          <div className="vaccination-container">
            {this.renderVaccineDetailsByApiStatus()}
          </div>
        </div>
      </div>
    )
  }
}

export default CowinDashboard
