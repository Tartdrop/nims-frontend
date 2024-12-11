import React, { useState, useEffect } from 'react';
import './ViewDatabaseRR.css';
import axios from 'axios';
import { useTable } from 'react-table';

const ViewDatabaseRR = () => {
  const [microbioData, setMicrobioData] = useState([]);
  const [chemMicrobialData, setChemMicrobialData] = useState([]);
  const [chemElisaData, setChemElisaData] = useState([]);
  const [molbioData, setMolbioData] = useState([]);

  useEffect(() => {
    // Fetch Microbio test results
    axios.get(`${process.env.REACT_APP_API_URL}api/reports/microbioreport`)
      .then(response => setMicrobioData(response.data))
      .catch(error => console.error('Error fetching Microbio test results:', error));

    // Fetch Chem Microbial test results
    axios.get(`${process.env.REACT_APP_API_URL}api/reports/chemmicrobialreport`)
      .then(response => setChemMicrobialData(response.data))
      .catch(error => console.error('Error fetching Chem Microbial test results:', error));

    // Fetch Chem ELISA test results
    axios.get(`${process.env.REACT_APP_API_URL}api/reports/chemelisareport`)
      .then(response => setChemElisaData(response.data))
      .catch(error => console.error('Error fetching Chem ELISA test results:', error));

    // Fetch Molbio test results
    axios.get(`${process.env.REACT_APP_API_URL}api/reports/molbioreport`)
      .then(response => setMolbioData(response.data))
      .catch(error => console.error('Error fetching Molbio test results:', error));
  }, []);

  const months = ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12'];

  const getPosNegCounts = (data, test, month) => {
    const countKey = `${test}PosNegCountsByMonthAndYear`;
    return data[countKey]?.[month] || { positive: 0, negative: 0 };
  };

  const getTotalCountsForMonth = (data, tests, month) => {
    let totalPositive = 0;
    let totalNegative = 0;

    tests.forEach(test => {
      const { positive, negative } = getPosNegCounts(data, test, month);
      totalPositive += positive;
      totalNegative += negative;
    });

    return { totalPositive, totalNegative };
  };

  const microbioTests = ['standardPlateCount', 'staphylococcusAureus', 'salmonellaSp', 'campylobacter', 'cultureAndSensitivityTest', 'coliformCount', 'eColi', 'eColiAndeColi0O157', 'yeastAndMolds'];
  const chemMicrobialTests = ['betaLactams', 'tetracyclines', 'sulfonamides', 'aminoglycosides', 'macrolides', 'quinolones'];
  const chemElisaTests = ['chloramphenicol', 'nitrofuranAoz', 'betaAgonists', 'corticosteroids', 'olaquindox', 'nitrufuranAmoz', 'stilbenes', 'ractopamine'];
  const molbioTests = ['dog', 'cat', 'chicken', 'buffalo', 'cattle', 'horse', 'goat', 'sheep', 'swine'];

  const renderTable = (data, tests, title) => (
    <div className='table-section'>
      <h2>{title}</h2>
      <div className="table-container">
        <table className="test-table">
          <thead>
            <tr>
              <th>Month</th>
              {tests.map(test => (
                <th key={test} colSpan="2">{test}</th>
              ))}
              <th>Total</th>
            </tr>
            <tr>
              <th></th>
              {tests.map(test => (
                <React.Fragment key={test}>
                  <th>Positive</th>
                  <th>Negative</th>
                </React.Fragment>
              ))}
              <th>Positive / Negative</th>
            </tr>
          </thead>
          <tbody>
            {months.map(month => {
              const { totalPositive, totalNegative } = getTotalCountsForMonth(data, tests, month);

              return (
                <tr key={month}>
                  <td>{month}</td>
                  {tests.map(test => {
                    const { positive, negative } = getPosNegCounts(data, test, month);
                    return (
                      <React.Fragment key={test}>
                        <td>{positive}</td>
                        <td>{negative}</td>
                      </React.Fragment>
                    );
                  })}
                  <td>{totalPositive} / {totalNegative}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="database-all-container">
      <div className='database-container'>
        <h1>All Test Results</h1>

        {renderTable(microbioData, microbioTests, 'Microbio Test Results')}
        {renderTable(chemMicrobialData, chemMicrobialTests, 'Chem Microbial Test Results')}
        {renderTable(chemElisaData, chemElisaTests, 'Chem ELISA Test Results')}
        {renderTable(molbioData, molbioTests, 'Molbio Test Results')}
      </div>
    </div>
  );
};

export default ViewDatabaseRR;