import React, { useState, useEffect } from 'react';
import '../3A_Testing/ViewDatabaseT.css';
import './ViewDatabaseTMicrobio.css';
import Userfront from "@userfront/core";
import axios from 'axios';
import { useTable } from 'react-table';

Userfront.init("jb7ywq8b");

const ViewDatabase = () => {
  const [reportData, setReportData] = useState(null);
  
  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios.get(`${process.env.REACT_APP_API_URL}api/reports/microbioreport`)
      .then(response => setReportData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  console.log(reportData);
  if (!reportData) return <p>Loading...</p>;

  // Test types and months
  const tests = ['standardPlateCount', 'staphylococcusAureus', 'salmonellaSp', 'campylobacter', 'cultureAndSensitivityTest', 'coliformCount', 'eColi', 'eColiAndEColi0O157', 'yeastAndMolds'];
  //const tests = ['standardPlateCountRemarks', 'staphylococcusAureusRemarks', 'salmonellaSpRemarks', 'campylobacterRemarks', 'cultureAndSensitivityTestRemarks', 'coliformCountRemarks', 'eColiRemarks', 'eColiAndEColi0O157Remarks', 'yeastAndMoldsRemarks'];
  const months = ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12'];

  // Helper function to get positive/negative counts for an tests in a given month
  const getPosNegCounts = (test, month) => {
    const countKey = `${test}PosNegCountsByMonthAndYear`;
    return reportData[countKey]?.[month] || { positive: 0, negative: 0 };
  };

  // Helper function to get total counts for all testss in a given month
  const getTotalCountsForMonth = (month) => {
    let totalPositive = 0;
    let totalNegative = 0;

    tests.forEach(test => {
      const { positive, negative } = getPosNegCounts(test, month);
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
                        <h1>Microbiology Test Results</h1>
                    </div>
                    <div className='table-wrapper-1'>
                        <div className='table-container-1'>
                            <table className='data-table'>
                                <thead>
                                    <tr className='header-row'>
                                        <th className='month-header'>Month</th>
                                        {tests.map(test => (
                                            <th key={test} colSpan="2" className='test-header'>{test}</th>
                                        ))}
                                        <th className='total-header'>Total</th>
                                    </tr>
                                    <tr className='subheader-row'>
                                        <th></th>
                                        {tests.map(test => (
                                            <React.Fragment key={test}>
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
                                                {tests.map(test => {
                                                    const { positive, negative } = getPosNegCounts(test, month);
                                                    return (
                                                        <React.Fragment key={test}>
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
}

export default ViewDatabase;