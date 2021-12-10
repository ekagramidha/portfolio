import React, { useEffect, useState } from 'react';
import { Card, CardTitle, Collapse, CardBody } from 'reactstrap';
import { Link } from 'react-scroll';

import assessLogo from './assets/images/assessLogo.webp';
import bootstrap from './assets/images/bootstrap.webp';
import certificates from './assets/certificates.js';
import express from './assets/images/express.webp';
import fullStack from './assets/images/fullStack.webp';
import machineLearning from './assets/images/machineLearning.webp';
import projects from './assets/projects.js';
import react from './assets/images/react.webp';
import reactNative from './assets/images/reactNative.webp';
import slyLogo from './assets/images/slyLogo.webp';
import tools from './assets/tools.js';
import wkLogo from './assets/images/wkLogo.webp';

export default function App() {
    const projectImages = {
        assessLogo: assessLogo,
        wkLogo: wkLogo,
        slyLogo: slyLogo
    };
    const certificateImages = {
        fullStack: fullStack,
        express: express,
        reactNative: reactNative,
        react: react,
        bootstrap: bootstrap,
        machineLearning: machineLearning
    };

    useEffect(() => {
        window.addEventListener(
            "scroll",
            () => {
                document.body.style.setProperty(
                    "--scroll",
                    window.pageYOffset / document.getElementById("invisible-div").offsetHeight
                );
                document.body.style.setProperty(
                    "--progress",
                    window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
                );
            },
            false
        );
    }, []);

    // ? For starting the scroll
    // const [scrolled, setScrolled] = useState(false);
    // const startScrolling = () => {
    //     setScrolled(!scrolled);
    //     document.body.style.setProperty("overflow", "initial");
    //     setTimeout(() => {
    //         document.getElementById("initiate-scroll").style.setProperty("display", "none");
    //     }, 1000);
    // }

    const [menuOpen, setMenuOpen] = useState(false);
    const [collapseOpen, setCollapseOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }
    useEffect(() => {
        if(menuOpen) {
            setTimeout(() => {
                setCollapseOpen(true);
            }, 350);
        }
        else {
            setCollapseOpen(false);
        }
    }, [menuOpen]);

    const [expandedTool, setExpandedTool] = useState(0);
    const expandTool = id => () => {
        setExpandedTool(expandedTool === id ? 0 : id);
    }

    const [expandedCerti, setExpandedCerti] = useState(0);
    const expandCerti = id => () => {
        setExpandedCerti(expandedCerti === id ? 0 : id);
    }
    
    const renderTools = () => (
        tools.map(icon =>
            <div key={icon.id} className="col-6 col-md-4 my-3">
                <Card className="shadow border-radius-3">
                    <svg className="d-block w-75 h-75 mx-auto my-3" viewBox="0 0 128 128">
                        {icon.id === 7 ? <circle fill="#61DAFB" cx="64" cy="64" r="11.4"></circle> : ""}
                        {icon.path.map((path, index) =>
                            <path key={index} fill={path.fill} d={path.d}></path>
                        )}
                        {icon.id === 14 ? <circle fill="#205081" cx="63.983" cy="61.737" r="8.691"></circle> : ""}
                    </svg>
                    <CardTitle className="d-flex justify-content-between align-items-center p-3 m-0">
                        <h3 className="m-0">{icon.title}</h3>
                        <span className="fa fa-plus-circle fa-lg" style={expandedTool === icon.id ? {transform: "rotate(45deg)", color: icon.path[0].fill} : {color: icon.path[0].fill}} onClick={expandTool(icon.id)}></span>
                    </CardTitle>
                    <Collapse isOpen={expandedTool === icon.id}>
                        <CardBody>
                            {icon.description}
                        </CardBody>
                    </Collapse>
                </Card>
            </div>
        )
    );

    const renderProjects = () => (
        projects.map(project =>
            <div key={project.id} className="col-12 my-3">
                <Card className="shadow border-radius-3">
                    <div className="row m-0">
                        <div className="col-12 col-md-3 d-flex justify-content-center align-items-center">
                            <img className="mw-100 mh-100 my-3 mx-0 border-radius-3" src={projectImages[project.logo]} alt={project.title} />
                        </div>
                        <div className="col-12 col-md-9">
                            <CardTitle className="d-flex justify-content-between align-items-center p-3 m-0">
                                <h3>{project.title}</h3>
                            </CardTitle>
                            <CardBody className="pt-0">
                                {project.description}
                                {project.link &&
                                <a className="d-block" href={project.link} target="_blank" rel="noopener noreferrer">
                                    Take a look <span className="fa fa-external-link"></span>
                                </a>}
                            </CardBody>
                        </div>
                    </div>
                </Card>
            </div>
        )
    );

    const renderCertificates = () => (
        certificates.map(certi =>
            <Card key={certi.id}>
                <div className="card-header">
                    <div className="btn" onClick={expandCerti(certi.id)}>
                        <CardTitle className="p-0 m-0"><h4 className="m-0 text-left">{certi.title}</h4></CardTitle>
                    </div>
                </div>
                <Collapse isOpen={expandedCerti === certi.id}>
                    <CardBody className="p-0">
                        <img className="mw-100 mh-100 m-0" src={certificateImages[certi.certificate]} alt={certi.title} />
                    </CardBody>
                </Collapse>
            </Card>
        )
    );

    const renderNavbar = () => {
        const navigationMap = {
            whoAmI: "Who am I?",
            education: "My education?",
            achievements: "My achievements?",
            whatDoIDo: "What do I do?",
            howDoIDoIt: "How do I do it?",
            experience: "How experienced am I?"
        };
        return (
            Object.keys(navigationMap).map(key =>
                <div key={key} className="row mx-0 my-1 pb-1">
                    <Link activeClass="active" to={key} spy={true} smooth={true} duration={1000} offset={-30}>
                        {navigationMap[key]}
                    </Link>
                </div>
            )
        );
    }
    
    return (
        <>
            <div id="progress-bar"></div>
            <div id="invisible-div">
                <div className="container d-flex justify-content-center align-items-center">
                    <div className="row w-100">
                        <div className="col-6 d-flex position-relative pe-0">
                            <span>
                                <span>
                                    <span>
                                        ekagra
                                    </span>
                                    midha.
                                </span>
                                dev
                            </span>
                        </div>
                        <div className="col-6 position-relative ps-0">
                            <span>elop</span>
                            <span>ise</span>
                        </div>
                    </div>
                </div>
                {/*
                // ? For starting the scroll
                {<Link id="scroll" to="whoAmI" spy={true} smooth={true} duration={5000} onClick={startScrolling}>
                    <span id="initiate-scroll" className="fa fa-chevron-circle-down" style={scrolled ? {opacity: "0"} : {}}></span>
                </Link>}
                */}
            </div>
            <header className="d-flex justify-content-center align-items-center">
                <span>
                    <span>
                        ekagra
                    </span>
                    midha.dev
                </span>
            </header>
            <main className="container mb-5">
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <section id="whoAmI" className="row pt-5">
                            <div className="col-12">
                                <h2>Who am I?</h2>
                                <p>
                                    As you might have guessed, I am Ekagra Midha; a software engineer who received his degree in mid-2021.
                                    Born and brought up in Delhi, I thrive on coding. You can call me web-development enthusiast (cliche, isn't it?),
                                    but it is not what I am limited to. I never learnt to procrastinate, nor can I overlook the minute details of any
                                    task assigned to me.
                                </p>
                            </div>
                        </section>
                        <section id="education" className="row pt-5">
                            <div className="col-12">
                                <h2>My education?</h2>
                                <p>
                                    Let me summarise this for you in the following table.
                                </p>
                                <Card className="p-3 mb-3 shadow border-radius-3">
                                    <div className="overflow-scroll">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Year</th>
                                                    <th>Course</th>
                                                    <th>Institution</th>
                                                    <th>Result</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>2017-2021</td>
                                                    <td>Bachelor of Technology (CSE)</td>
                                                    <td>Maharaja Agrasen Institute of Technology, GGSIPU</td>
                                                    <td>8.6 CGPA</td>
                                                </tr>
                                                <tr>
                                                    <td>2017</td>
                                                    <td>Senior Secondary Education (CBSE)</td>
                                                    <td>St. Margaret Sr. Sec. School, Delhi</td>
                                                    <td>95.4%</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </Card>
                            </div>
                        </section>
                        <section id="achievements" className="row pt-5">
                            <div className="col-12">
                                <h2>My achievements?</h2>
                                <ul>
                                    <li>Awarded with the title of All Rounder student for outstanding performance in scholastic and co-scholastic areas</li>
                                    <li>Received scholarships for being subject topper in Computer Science and Chemistry in Class XII Boards</li>
                                    <li>Bestowed with 7 Merit scholarships for 7 consecutive years for excellent academic performance in Classes VI-XII</li>
                                </ul>
                            </div>
                        </section>
                        <section id="whatDoIDo" className="row pt-5">
                            <div className="col-12">
                                <h2>What do I do?</h2>
                                <p>
                                    Well, the initial frames of the website sum this up. I devise (rather than develop) responsive frontend for web-applications,
                                    and am still exploring the backend development. Though not a designer, I know my way around CSS and can play with Photoshop tools
                                    in order to render my imagination. Also, I click really good photographs.
                                </p>
                            </div>
                        </section>
                        <section id="howDoIDoIt" className="row pt-5">
                            <div className="col-12">
                                <h2>How do I do it?</h2>
                                <p>
                                    A relaxed mind with a pinch of creativity and (more importantly) the following technology stack help me achieve what I aspire.
                                </p>
                            </div>
                            {renderTools()}
                        </section>
                        <section id="experience" className="row pt-5">
                            <div className="col-12">
                                <h2>How experienced am I?</h2>
                                <p>
                                    I am a frontend developer at <a href="https://www.turningcloud.com" target="_blank" rel="noopener noreferrer">TurningCloud Solutions Private Limited <span className="fa fa-external-link"></span></a> since October 2020.
                                    Using ReactJS and Redux, I work on development of various modules for our product <a href="https://www.supplymint.com/" target="_blank" rel="noopener noreferrer">Supplymint <span className="fa fa-external-link"></span></a>;
                                    integrating REST APIs and creating flawless UX. Following are the initiatives and significant developments taken by me here.
                                </p>
                                <ul>
                                    <li>Handling of data (associated with frequently hit APIs) at frontend using IndexedDB</li>
                                    <li>Development of major form components using Formik</li>
                                </ul>
                                <p>
                                    Besides, I have certificates from Coursera for courses on Full-Stack (MERN) Web Development.
                                    While undergoing these courses, I built the following projects.
                                </p>
                            </div>
                            {renderProjects()}
                            <div className="col-12 mt-3 mb-5 mb-lg-0">
                                <p>
                                    In case you want to take a look at the certificates-
                                </p>
                                <div className="accordion shadow border-radius-3">
                                    {renderCertificates()}
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="d-none d-lg-flex col-lg-4">
                        <nav>
                            {renderNavbar()}
                        </nav>
                        <div className="row social">
                            <a href="https://github.com/ekagra25" target="_blank" rel="noopener noreferrer"><span id="github" className="fa fa-github-square"></span></a>
                            <a href="https://www.linkedin.com/in/ekagra-midha/" target="_blank" rel="noopener noreferrer"><span id="linkedin" className="fa fa-linkedin-square"></span></a>
                            <a href="https://www.facebook.com/ekagra.midha.3/" target="_blank" rel="noopener noreferrer"><span id="facebook" className="fa fa-facebook-square"></span></a>
                        </div>
                    </div>
                    <div id="floating-menu" className="container d-flex w-100 justify-content-center">
                        <div className={`row d-flex d-lg-none position-relative main ${menuOpen ? "open" : "close"}`}>
                            <Collapse isOpen={collapseOpen}>
                                <nav className="col-12 p-2">
                                    {renderNavbar()}
                                </nav>
                            </Collapse>
                            <span className="toggle" onClick={toggleMenu}>
                                <svg x="0px" y="0px" viewBox="0 0 500 50">
                                    <path fill="#dddddd" d="M475,50H25C11.19,50,0,38.81,0,25v0C0,11.19,11.19,0,25,0l450,0c13.81,0,25,11.19,25,25v0 C500,38.81,488.81,50,475,50z"/>
                                </svg>
                                <svg x="0px" y="0px" viewBox="0 0 500 50">
                                    <path fill="#dddddd" d="M475,50H25C11.19,50,0,38.81,0,25v0C0,11.19,11.19,0,25,0l450,0c13.81,0,25,11.19,25,25v0 C500,38.81,488.81,50,475,50z"/>
                                </svg>
                            </span>
                            <a href="https://github.com/ekagra25" target="_blank" rel="noopener noreferrer">
                                <span className="fa fa-github-square"></span>
                            </a>
                            <a href="https://www.linkedin.com/in/ekagra-midha/" target="_blank" rel="noopener noreferrer">
                                <span id="linkedin" className="fa fa-linkedin-square"></span>
                            </a>
                            <a href="https://www.facebook.com/ekagra.midha.3/" target="_blank" rel="noopener noreferrer">
                                <span id="facebook" className="fa fa-facebook-square"></span>
                            </a>
                        </div>
                    </div>
                </div>
                
            </main>
        </>
    );
}