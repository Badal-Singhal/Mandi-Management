import { useNavigate } from "react-router-dom";
import "./../App.css";
import { getProfileInfo, register } from "../API/Auth";
import { useEffect, useState } from "react";

const UpdateProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null); // Initialize as null
    const [loading, setLoading] = useState(true); // Add a loading state

    useEffect(() => {
        let obj = {};
        getProfileInfo(obj).then((res) => {
            setProfile(res.data);
            setLoading(false); // Set loading to false when data is fetched
        });
    }, []);

    console.log(profile);

    const HandleReceiptFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const result = register(formData);
        console.log(result);
    };

    const HandleGoBackClick = (e) => {
        e.preventDefault();
        navigate("/purchase_book");
    };

    if (loading) return <p>Loading...</p>; // Show loading message

    return (
        <div className="custom-receipt-container">
            <form className="receipt-form" onSubmit={HandleReceiptFormSubmit}>
                <h2>Update Profile</h2>
                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">
                        Email/Phone Number
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="userName"
                        name="userName"
                        defaultValue={profile[0]?.userName || ""}
                        aria-describedby="userNameHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="firmName" className="form-label">
                        Firm's Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="firmName"
                        defaultValue={profile[0]?.firmName || ""}
                        aria-describedby="firmNameHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="firmAddress" className="form-label">
                        Firm's Address
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="firmAddress"
                        name="firmAddress"
                        defaultValue={profile[0]?.firmAddress || ""}
                        aria-describedby="firmAddressHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="mobileNumber" className="form-label">
                        Mobile Number
                    </label>
                    <input
                        type="text"
                        name="mobileNumber"
                        className="form-control"
                        defaultValue={profile[0]?.mobileNumber || ""}
                        id="mobileNumber"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="gstNumber" className="form-label">
                        GST Number
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="gstNumber"
                        name="gstNumber"
                        defaultValue={profile[0]?.gstNumber || ""}
                        aria-describedby="gstNumberHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="panNumber" className="form-label">
                        PAN Number
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="panNumber"
                        name="panNumber"
                        defaultValue={profile[0]?.panNumber || ""}
                        aria-describedby="panNumberHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="pan_photo" className="form-label">
                        Upload PAN Card Photo
                    </label>
                    <input
                        type="file"
                        name="pan_photo"
                        className="form-control"
                        // defaultValue={profile[0]?.panPhoto || ""}
                        id="pan_photo"
                    />
                </div>
                <div className="d-flex mb-3">
                    <button
                        className="btn btn-secondary mx-2 btn-lg"
                        onClick={HandleGoBackClick}
                    >
                        Go Back
                    </button>
                    <button type="submit" className="btn btn-success mx-2 btn-lg">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfile;
