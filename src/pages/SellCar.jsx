import React, { use, useEffect, useState } from 'react'
import "../css/addCars.css";
import { useNavigate, useParams } from 'react-router'
import PageStruct from '../components/PageStruct';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';
import api from '../config/axios';


function SellCar() {
    const navigate = useNavigate();
    let params = useParams();


    if (params == null) {
        navigate("/cars")
    }

    const [carDetails, setCarDetails] = useState({});
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [tckn, setTckn] = useState("");
    const [birthOfDate, setBirthOfDate] = useState("");

    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [street, setStreet] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [showSuccess, setShowSuccess] = useState(false);

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successModal, setSuccessModal] = useState(false);


    const handlePreSubmit = () => {
        if (!firstName || !lastName || !tckn || !birthOfDate || !city || !district || !neighborhood
            || !street) {
            alert("Please fill in all customer information.")
            return;
        }
        setShowConfirmModal(true);
    };

    useEffect(() => {
        getCarDetails();
    }, []);

    const success = () => {
        setShowConfirmModal(false);
        setSuccessModal(true);

        setTimeout(() => {
            navigate("/cars")
        }, 2500);

    }


    const handleFinalConfirm = async () => {
        const payload = {
            car: params.carId,
            customer: {
                firstName: firstName,
                lastName: lastName,
                tckn: tckn,
                birthOfDate: birthOfDate,
                address: {
                    city: city,
                    district: district,
                    street: street
                }
            }
        };

        try {
            setIsLoading(true)
            const response = await api.post(`/rest/api/sell`, payload);
            setIsLoading(false)
            if (response == null) {
                console.log("null");
            }
            else {
                success();
            }
        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    }

    const getCarDetails = async () => {

        try {
            setIsLoading(true)
            const response = await api.get(`/rest/api/galleristcar/cars/${params.carId}`);
            setIsLoading(false)
            setCarDetails(response.data.data);

            if (response == null) {
                console.log("null");
            }
        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    }
    return (
        <PageStruct>


            {showSuccess && (
                <div style={{ width: '400px', marginTop: "20px", margin: '20px auto 20px auto' }}>
                    <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
                        The vehicle has been successfully registered! You are being redirected to the list...
                    </Alert>
                </div>
            )}

            <div className="info-div">
                <h2>Sell Car</h2>
                <p>Enter the customer's information to whom the vehicle will be sold.</p>
            </div>

            <div className="form-div">

                <input
                    className='custom-input'
                    placeholder='First Name'
                    type='text'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <input
                    className='custom-input'
                    placeholder='Last Name'
                    type='text'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input
                    className='custom-input'
                    placeholder='TCKN'
                    type='number'
                    value={tckn}
                    onChange={(e) => setTckn(e.target.value)}
                />

                <input
                    className='custom-input'
                    placeholder='Birth Of Date (dd/mm/yyyy)'
                    type='text'
                    value={birthOfDate}
                    onChange={(e) => setBirthOfDate(e.target.value)}
                />

                <input
                    className='custom-input'
                    placeholder='City'
                    type='text'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />

                <input
                    className='custom-input'
                    placeholder='District'
                    type='text'
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                />
                <input
                    className='custom-input'
                    placeholder='Neighborhood'
                    type='text'
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                />
                <input
                    className='custom-input'
                    placeholder='Street'
                    type='text'
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                />

                <button onClick={handlePreSubmit} className="send-button" disabled={isLoading || showSuccess}>
                    {isLoading ? "Loading..." : "Complete "}
                </button>

            </div>
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Sales Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Do you approve the sale transaction based on the following information?</p>
                    <ul style={{ background: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
                        <h4 style={{ margin: 0, color: '#333' }}>{carDetails.brand} {carDetails.model}</h4>
                        <p style={{ margin: 0, color: '#666' }}>Plate: {carDetails.plate} | Year: {carDetails.productionYear}</p>
                        <p style={{ margin: 0, fontWeight: 'bold', color: '#28a745' }}></p>
                    </ul>
                    <p className="text-danger small">* This action is irreversible.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleFinalConfirm} disabled={isSubmitting}>
                        {isSubmitting ? "Processing..." : "Yes, Confirm Sale"}
                    </Button>
                </Modal.Footer>
            </Modal>



            <Modal show={successModal} onHide={() => setShowConfirmModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Sale Completed</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 style={{ color: '#28a745', fontWeight: 'bold'}}> SUCCESS ✅</h4>
                    <p >The vehicle has been sold successfully.</p>

                    <p className="text-danger small">* You are being redirected to the car list...</p>
                </Modal.Body>
            </Modal>

        </PageStruct>
    )
}

export default SellCar