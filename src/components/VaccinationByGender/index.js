// Write your code here
import {PieChart, Pie, Cell, Legend} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {vaccineGenderDetails} = props

  return (
    <div className="vaccineCoverage-container">
      <h1 className="vaccineCoverage-heading">Vaccination by gender</h1>
      <PieChart width={730} height={250}>
        <Pie
          cx="50%"
          cy="50%"
          data={vaccineGenderDetails}
          startAngle={180}
          endAngle={0}
          innerRadius="40%"
          dataKey="count"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill=" #5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
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

export default VaccinationByGender
