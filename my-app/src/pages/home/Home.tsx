import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import axios from "axios";
import './Home.scss'

const FormComponent = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const onSubmit = () => {
        // console.log("email", email)
        // console.log("password", password)
    }

    return (
        <>
            <form className="container was-validated" onSubmit={onSubmit} noValidate >
                <h2><label>Validation form</label></h2>
                <div className="form-group">
                    <label htmlFor="email">Enter Your Mail ID:</label>
                    <input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <div className="invalid-feedback">Enter a valid Mail address</div>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Enter Password:</label>
                    <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} required />
                    <div className="invalid-feedback">Enter atleast 5 characters.</div>
                </div>
                <div className="form-group">
                    <label htmlFor="confirm_password">Confirm Password:</label>
                    <input type="password" className="form-control form-control-lg" placeholder="Confirm Password" name="confirm_password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required />
                    <div className="invalid-feedback">password should match.</div>
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
        </>
    )
}

const MousePointComponent = () => {

    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const setFromEvent = (e: any) => setPosition({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", setFromEvent);

        return () => {
            window.removeEventListener("mousemove", setFromEvent);
        };
    }, [])

    return (
        <div>
            <h2 className=''>Mouse point position</h2>
            <div>
                <p>Client X</p>
                <p>{position.x}</p>
            </div>
            <div>
                <p>Client Y</p>
                <p>{position.y}</p>
            </div>
        </div>
    )
}

const CompareValueType = () => {

    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [result, setResult] = useState(false);
    const [visible, setVisible] = useState(false);




    const compareBothValue = () => {
        setResult(value1 === value2)
        setVisible(true)
    }

    return (
        <Container>
            <h2 className=''>Compare 2 input</h2>
            <Row>
                <label>Value 1:</label>
                <input type="text" className="form-control form-control-lg" placeholder="value 1" name="value1" value={value1} onChange={(e) => setValue1(e.target.value)} />

            </Row>
            <Row>
                <label>Value2:</label>
                <input type="text" className="form-control form-control-lg" placeholder="value 2" name="value2" value={value2} onChange={(e) => setValue2(e.target.value)} />
            </Row>
            <input type="button" className="btn btn-info btn-block mt-4" onClick={compareBothValue} title="Compare" name='Compare' value="Compare" />
            {visible && <Row>
                <label>{result ? 'True' : 'False'}</label>
            </Row>}
        </Container>
    )
}

const WeatherComponent = () => {

    const [name, setName] = useState('');
    const [visible, setVisible] = useState(false);
    const [cityName, setCityName] = useState();
    const [temperature, setTemperature] = useState();
    const [weather, setWeather] = useState();
    const [country, setCountry] = useState();
    const [localTime, setLocalTime] = useState();
    const [urlImage, setUrlImage] = useState();


    const baseUrl = `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=`


    const getWeather = () => {
        axios.get(baseUrl + name).then((res) => {
            if (res)
                setVisible(true)
            const { location, current } = res.data;
            setCountry(location.country)
            setCityName(location.name)
            setTemperature(current.temp_c)
            setWeather(current.condition.text)
            setLocalTime(location.localtime)
            setUrlImage(current.condition.icon)
        })
    }

    return (
        <Container>
            <h2 className=''><a href='https://developer.accuweather.com/apis'>Get weahter from API</a></h2>
            <Row>
                <label>City name:</label>
                <input type="text" className="form-control form-control-lg" placeholder="value 1" name="value1" value={name} onChange={(e) => setName(e.target.value)} />
            </Row>
            <input type="button" className="btn btn-info btn-block mt-4" onClick={getWeather} title="getWeather" name='getWeather' value="Get Weather" />
            {visible && <section>
                <div className='home'>
                    <div>Country</div>
                    <div>{country}</div>
                </div>
                <div className='home'>
                    <div>City Name</div>
                    <div>{cityName}</div>
                </div>
                <div className='home'>
                    <div>Temperature</div>
                    <div>{temperature}<sup>°C</sup></div>

                </div>
                <div className='home'>
                    <div><img src={urlImage} /></div>
                    <div>{weather}</div>
                </div>
                <div className='home'>
                    <div>Localtime</div>
                    <div>{localTime}</div>
                </div>
            </section>}
        </Container>
    )
}

function home() {
    return (
        <Row xs={6} md={2} className="justify-content-center">
            <Col>
                <Container className='container-cus'>
                    <FormComponent />
                </Container>
            </Col>
            <Col>
                <Container className='container-cus'>
                    <MousePointComponent />
                </Container>
            </Col>
            <Col>
                <Container className='container-cus'>
                    <CompareValueType />
                </Container>
            </Col>
            <Col>
                <Container className='container-cus'>
                    <WeatherComponent />
                </Container>
            </Col>
        </Row>
    )
}

export default home