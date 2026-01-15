import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import PageStruct from '../components/PageStruct'
import "../css/home.css"
import api from '../config/axios';
import WelcomeSection from '../components/WelcomeSection';

function Home() {
  const navigate = useNavigate();
  // 1. Düzeltme: Listeler [] (Array) olarak başlatılır, {} değil.
  const [isLoading, setIsLoading] = useState(false);
  const [carList, setCarList] = useState([]);
  const role = localStorage.getItem("role")

  useEffect(() => {
    getCars();
  }, [])

  const getCars = async () => {
    try {
      setIsLoading(true)
      const response = await api.get('/rest/api/galleristcar/cars');
      setIsLoading(false)


      if (response && response.data && response.data.data) {
        setCarList(response.data.data);
      }

    } catch (error) {
      setIsLoading(false)
    }
  }


  const activeInventory = carList.filter(car => car.carSaled === false);
  const soldVehicles = carList.filter(car => car.carSaled === true);


  const totalRevenue = soldVehicles.reduce((total, car) => total + (car.price || 0), 0);


  const stats = {
    totalCars: activeInventory.length,
    soldCars: soldVehicles.length,
    revenue: totalRevenue
  };

  return (
    <PageStruct>
      <div className='dashboard-container'>

        <WelcomeSection title="Dashboard" desc="Overview of your gallery performance and AI tools." />

        { role=="ADMIN"? (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Inventory</div>

            <div className="stat-value">{stats.totalCars}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Sold Vehicles</div>

            <div className="stat-value">{stats.soldCars}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Revenue</div>

            <div className="stat-value">
              {stats.revenue.toLocaleString('tr-TR')} TL
            </div>
          </div>
        </div>
        ):(<div></div>)
      }
        <h2 className="section-title">AI Power Tools</h2>
        <div className="ai-tools-grid">

          <div className="ai-card" onClick={() => navigate('/carfinder')}>
            <div className="ai-icon">🔍</div>
            <div className="ai-content">
              <h3>Smart Car Finder</h3>
              <p>Find the perfect car from your inventory using natural language search.</p>
              <span className="link-text">Go to Finder &rarr;</span>
            </div>
          </div>

          <div className="ai-card" onClick={() => navigate('/description')}>
            <div className="ai-icon">✨</div>
            <div className="ai-content">
              <h3>Description Generator</h3>
              <p>Generate professional sales descriptions for your vehicles instantly.</p>
              <span className="link-text">Create Content &rarr;</span>
            </div>
          </div>

        </div>

        <div className="quick-actions">
          <button className="action-btn primary" onClick={() => navigate('/cars/add')}>+ Add New Car</button>
          <button className="action-btn secondary" onClick={() => navigate('/cars')}>View Inventory</button>
        </div>

      </div>
    </PageStruct>
  )
}

export default Home;