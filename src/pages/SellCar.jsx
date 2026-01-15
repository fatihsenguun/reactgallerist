import React, { use, useEffect, useState } from 'react'
import "../css/addCars.css";
import { useNavigate, useParams } from 'react-router'
import PageStruct from '../components/PageStruct';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
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

    if (showConfirmModal) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: carDetails.plate ,
            text:"Do you approve the sale transaction based on the following information?" ,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, approve!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {

                setShowConfirmModal(false);
                handleFinalConfirm();
                swalWithBootstrapButtons.fire({
                    title: "Approved!",
                    text: "Car has been sold",
                    icon: "success"
                });
              
            } else if (

                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Car sale not approved",
                    icon: "error"
                });
            }
        });
    }


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
        


        </PageStruct>
    )
}

export default SellCar