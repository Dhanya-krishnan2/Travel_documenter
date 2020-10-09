import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Acard } from "../card/index";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
// import Image from 'react-bootstrap/Image';
import './style.css';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import API from "../../utils/API";
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'


function Reports() {

    const [filteredUsers, setFilteredUsers] = useState([]);
    const [sortOrder, setSortOrder] = useState('descend');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [searchResults, setSearchResults] = useState([]);
    const [newtrips, setNewTrips] = useState([]);

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const [state, setState] = useState([]);
    const [modal, setModal] = useState({
        tripId: "AJK691",
        tripName: "Vahalla Survey Trip",
        people: ["Alan Grosse", "Joy Palmer", "Elliot Stahl"],
        type: "survey",
        lat: "34.838257106021047",
        long: "-86.009409930557013",
        description: "Mapped some cave",
        image: "url",
        date: "2015-07-23",
    });


    const searchFilter = (e) => {
        const filter = e.target.value;
        const filteredUserList = newtrips.filter(trip => {
            let values = Object.values(trip).join("").toLowerCase();
            return values.indexOf(filter.toLowerCase()) !== -1;
        });
        setSearchResults(filteredUserList);
    }

    const getTrips = () => {
        // const userId = isAuth()._id;
        API.getTrips()
            .then((results) => {
                console.log("all trips from db:", results.data);
                setNewTrips(results.data);
                setSearchResults(results.data);
            })
            .catch((err) => console.log(err));
    };


     function renderTableHeader() {
        let header = ["Id", "Date", "Title", "View", "Edit", "Delete"]
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}

                {key === "Id" ?
                    <FontAwesomeIcon icon={faSort} onClick={() => sortId()} className="ml-2 " /> : null
                }

                {key === "Date" ?
                    <FontAwesomeIcon icon={faSort} onClick={() => sortDate()} className="ml-2 " /> : null
                }

                {key === "Title" ?
                    <FontAwesomeIcon icon={faSort} onClick={() => sortName()} className="ml-2 " /> : null
                }
            </th>
        })
    }


    const sortName = (key) => {

        if (sortOrder === 'descend') {
            const filteredUsersList = searchResults.sort((a, b) => {
                if (a.tripName < b.tripName) { return -1; }
                if (a.tripName > b.tripName) { return 1; }
            });
            setSearchResults(filteredUsersList);
            setSortOrder('ascend');
            console.log(filteredUsers)

        } else {
            const filteredUsersList = searchResults.sort((a, b) => {
                if (a.tripName < b.tripName) { return 1; }
                if (a.tripName > b.tripName) { return -1; }
            });

            setSearchResults(filteredUsersList);
            setSortOrder('descend');

        }
    }

    const sortDate = () => {
        if (sortOrder === 'descend') {
            const filteredUsersList = searchResults.sort((a, b) => {
                if (a.date < b.date) { return -1; }
                if (a.date > b.date) { return 1; }
            });
            setSearchResults(filteredUsersList);
            setSortOrder('ascend');
            console.log(filteredUsers)

        } else {
            const filteredUsersList = searchResults.sort((a, b) => {
                if (a.date < b.date) { return 1; }
                if (a.date > b.date) { return -1; }
            });

            setSearchResults(filteredUsersList);
            setSortOrder('descend');

        }
    }

    const sortId = () => {
        if (sortOrder === 'descend') {
            const filteredUsersList = searchResults.sort((a, b) => {
                if (a.tripId < b.tripId) { return -1; }
                if (a.tripId > b.tripId) { return 1; }
            });
            setSearchResults(filteredUsersList);
            setSortOrder('ascend');
            console.log(filteredUsers)

        } else {
            const filteredUsersList = searchResults.sort((a, b) => {
                if (a.tripId < b.tripId) { return 1; }
                if (a.tripId > b.tripId) { return -1; }
            });

            setSearchResults(filteredUsersList);
            setSortOrder('descend');

        }
    }



    function convertDate(x) {
        var parts = x.split('-');
        var day = parts[2].split('', 2);
        var newdate = parts[1] + '/' + day[0] + day[1] + '/' + parts[0];
        return newdate
    }

    function showModal(id) {
        const trip = searchResults.find(x => x._id === id)
        console.log(trip)
        setModal({
            _id: trip._id,
            tripId: trip.tripId,
            tripName: trip.tripName,
            people: trip.people,
            type: trip.type,
            // lat: trip.lat,
            // long: trip.long,
            description: trip.description,
            // image: trip.image,
            date: trip.date,
        })
        setShow(true)
    };

    function newTrip (){
        setState([])
        setShow1(true)
    }


    function renderTableData() {
        return searchResults.map((trip) => {
            return (
                <tr key={trip._id}>
                    <td>{trip.tripId}</td>
                    <td>{convertDate(trip.date)}</td>
                    <td>{trip.tripName}</td>
                    <td><a style={{ cursor: "pointer", color: "blue" }} className='view-trip' id={trip._id} onClick={() => showModal(trip._id)} >VIEW</a></td>
                    <td><a style={{ cursor: "pointer", color: "orange" }} className='edit-trip' id={trip._id} onClick={() => handleEdit(trip)}>EDIT</a></td>
                    <td><a style={{ cursor: "pointer", color: "red" }} className='delete-trip' id={trip._id} onClick={() => confirmDelete(trip)}>DELETE</a></td>
                </tr>
            )
        })
    }


    function handleEdit(trip) {
        setShow1(true)
        setState({
            _id: trip._id,
            tripId: trip.tripId,
            tripName: trip.tripName,
            people: trip.people,
            type: trip.type,
            lat: trip.lat,
            long: trip.long,
            description: trip.description,
            image: trip.image,
            date: convertDate(trip.date),
        });
    }

    const confirmDelete = (trip) => {
        var result = window.confirm(`Are you sure you want to delete ${trip.tripName}?`);
        if (result) {
            deleteTrip(trip)
        }
    }

    const deleteTrip = (trip) => {
        API.deleteTrip(trip._id)
            .then((res) => {
                console.log("after delete API", res)
                getTrips()
                toast("Your trip has been deleted")
            })
            .catch((err) => console.log("ERROR:" + err));
    };


    const handleInputChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // let data = state
        searchResults.find(x => x._id === state._id) ?
        
            API.updateTrip({
                
                _id: state._id,
                tripId: state.tripId,
                tripName: state.tripName,
                people: state.people,
                type: state.type,
                lat: state.lat,
                long: state.long,
                description: state.description,
                image: state.image,
                date: state.date
            })
            .then((result) => {

                console.log("yo yo yo")

            })
                .then(setShow1(false))
                .then(getTrips())

                // .then(setState([]))
                .catch((err) => {
                    console.log(err);
                })


            :
            API.uploadTrips({
                tripId: state.tripId,
                tripName: state.tripName,
                people: state.people,
                type: state.type,
                lat: state.lat,
                long: state.long,
                description: state.description,
                image: state.image,
                date: state.date,
            })
                .then((result) => {
                    console.log(result)
                    toast("Your trip has been saved")
                })
                .then(setShow1(false))
                .then(getTrips())

                // .then(setState([]))
                .catch((err) => {
                    console.log(err);
                });
    }

    useEffect(() => { getTrips(); }, []);

    return (
        <div id="reportid">

           

            <Container>
            
                <>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton className="paper">
                            <Modal.Title >{modal.tripName}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="paper2">
                            <p><b>Trip ID:</b> {modal.tripId}</p>
                            <p><b>Trip Name:</b> {modal.tripName}</p>
                            <p><b>Trip Type:</b> {modal.type}</p>
                            <p><b>People:</b> {modal.people[0]}</p>
                            <p>{modal.people[1]}</p>
                            <p>{modal.people[2]}</p>
                            <p>{modal.people[3]}</p>
                            <p><b>Date:</b> {convertDate(modal.date)}</p>
                            <p><b>Trip Description:</b> {modal.description}</p>


                        </Modal.Body>
                        <Modal.Footer className="paper2">
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </>
                
                <Row>
                    <Col xs={9}>

                        <Card className='cardSearch mb-md-4'>
                            <Card.Body>
                                <Card.Title>Search Your Trips</Card.Title>
                                <Form
                                    inline
                                    onSubmit={handleSubmit}
                                >
                                    <FormControl
                                        style={{ textAlign: "center", width: "100%" }}
                                        type="text"
                                        placeholder="Search here..."
                                        className="mr-md-5"

                                        id="inputID"

                                        onChange={e => searchFilter(e)}
                                    />
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col >
                    <Col xs={3}>
                        <Card className='cardCreate mb-md-4'>
                            <Card.Body>
                                <center>
                                    <Card.Title>Start Here</Card.Title>

                                    <Button variant="outline-info" onClick={() => newTrip()}>Create a New Report</Button>{' '}
                                </center>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>

                        <Acard
                            className='tripsCard card '
                            title="Trip Reports"
                            category="Welcome to Your Report Library"
                            ctTableFullWidth
                            ctTableResponsive
                            content={
                                <div>

                                    <Table id='tripTable' className="" striped hover>
                                        <tbody>
                                            <tr>{renderTableHeader()}</tr>
                                            {renderTableData()}
                                        </tbody>
                                    </Table>
                                </div>







                            }




                        />


                    </Col>

                    <>
                        <Modal show={show1} onHide={handleClose1}>
                            <Card style={{ padding: '1em' }} className='card'>

                                <Card.Title style={{ textAlign: 'center' }}>Trip Report</Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formGridName">
                                        <Form.Label>Trip Id:</Form.Label>
                                        <Form.Control
                                            type="text"

                                            value={state.tripId || ""}
                                            onChange={handleInputChange}
                                            name="tripId"
                                        />
                                    </Form.Group>





                                    <Form.Group controlId="formGridName">
                                        <Form.Label>Trip Name:</Form.Label>
                                        <Form.Control
                                            type="text"

                                            value={state.tripName || ""}
                                            onChange={handleInputChange}
                                            name="tripName"
                                        />
                                    </Form.Group>



                                    <Form.Group >
                                        <Form.Label>People on the Trip:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={state.people || ""}
                                            onChange={handleInputChange}
                                            name="people"

                                        />
                                    </Form.Group>

                                    <Form.Row>

                                        <Form.Group as={Col} >
                                            <Form.Label>Date (MM/DD/YYYY):</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={state.date || ""}
                                                name="date"
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <Form.Label>Trip Type:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={state.type || ""}
                                                name="type"
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>




                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} >
                                            <Form.Label>Lat:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="lat"
                                                value={state.lat || ""}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col} >
                                            <Form.Label>Long:</Form.Label>
                                            <Form.Control
                                                type="text"

                                                name="long"
                                                value={state.long || ""}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Group >
                                        <Form.Label>Trip Details:</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows="6"
                                            name="description"
                                            value={state.description || ""}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
                                        Submit
                                </Button>

                                </Form>
                            </Card>
                        </Modal>
                    </>

                </Row>
            </Container>
        </div>

    )
}

export default Reports;
