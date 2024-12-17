import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewDatabase = () => {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios.get(`${process.env.REACT_APP_API_URL}api/reports/molbioreport`)
      .then(response => setReportData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!reportData) return <p>Loading...</p>;

  // Animal types and months
  const animals = ['dog', 'cat', 'chicken', 'buffalo', 'cattle', 'horse', 'goat', 'sheep', 'swine'];
  const months = ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12'];

  // Helper function to get positive/negative counts for an animal in a given month
  const getPosNegCounts = (animal, month) => {
    const countKey = `${animal}PosNegCountsByMonthAndYear`;
    return reportData[countKey]?.[month] || { positive: 0, negative: 0 };
  };

  // Helper function to get total counts for all animals in a given month
  const getTotalCountsForMonth = (month) => {
    let totalPositive = 0;
    let totalNegative = 0;

    animals.forEach(animal => {
      const { positive, negative } = getPosNegCounts(animal, month);
      totalPositive += positive;
      totalNegative += negative;
    });

    return { totalPositive, totalNegative };
  };

  return (
    <div className="db-all-container">
      <div className='db-container'>
        <div className='db-title'>Database</div>
          <div className="db-tables">
          <div className='db-content'>
            <div className='table-header'>
              <h1>Molecular Biology Test Results</h1>
            </div>
            <div className='table-wrapper'>
              <div className='table-container'>
                <table className='data-table'>
                  <thead>
                    <tr className='header-row'>
                      <th className='month-header'>Month</th>
                      {animals.map(animal => (
                        <th key={animal} colSpan="2" className='animal-header'>{animal}</th>
                      ))}
                      <th className='total-header'>Total</th>
                    </tr>
                    <tr className='subheader-row'>
                      <th></th>
                      {animals.map(animal => (
                        <React.Fragment key={animal}>
                          <th className='result-header'>Positive</th>
                          <th className='result-header'>Negative</th>
                        </React.Fragment>
                      ))}
                      <th className='total-subheader'>Positive / Negative</th>
                    </tr>
                  </thead>
                  <tbody>
                    {months.map(month => {
                      const { totalPositive, totalNegative } = getTotalCountsForMonth(month);

                      return (
                        <tr key={month} className='data-row'>
                          <td className='month-cell'>{month}</td>
                          {animals.map(animal => {
                            const { positive, negative } = getPosNegCounts(animal, month);
                            return (
                              <React.Fragment key={animal}>
                                <td className='result-cell positive'>{positive}</td>
                                <td className='result-cell negative'>{negative}</td>
                              </React.Fragment>
                            );
                          })}
                          <td className='total-cell'>{totalPositive} / {totalNegative}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDatabase;