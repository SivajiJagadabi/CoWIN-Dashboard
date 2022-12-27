// Write your code here
import {PieChart, Pie, Cell, Legend} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {vaccinationAgeDetails} = props

  return (
    <div className="vaccineCoverage-container">
      <h1 className="vaccineCoverage-heading">Vaccination by age</h1>
      <PieChart width={730} height={250}>
        <Pie
          cx="50%"
          cy="50%"
          data={vaccinationAgeDetails}
          startAngle={0}
          endAngle={360}
          dataKey="count"
        >
          <Cell name="18-44" fill="#2d87bb" />
          <Cell name="44-60" fill=" #a3df9f" />
          <Cell name="Above 60" fill="#64c2a6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
