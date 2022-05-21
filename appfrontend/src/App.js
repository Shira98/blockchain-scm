import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./components/Home";
import Header from "./components/static/Header";
import Footer from "./components/static/Footer";
import { PageLoader } from "./components/static/PageLoader";
import Profile from "./components/Profile";
import NotFound from "./components/static/NotFound";

import "./css/App.css";

const drizzle = new Drizzle(drizzleOptions);

/**
 * The main app component. Tha main paths and components are called from here.
 * Drizzle initialization state is checked here and is passed down to the child components when required.
 * 
 * @author syuki
 */
const App = () => {
    return (
        <DrizzleContext.Provider drizzle={drizzle}>
            <DrizzleContext.Consumer>
                {
                    drizzleContext => 
                    {
                        const { drizzle, drizzleState, initialized } = drizzleContext;

                        if (!initialized) {
                            return (<PageLoader />)
                        }

                        return (
                            <Router>
                                <Header />
                                <div className="main-body" color="primary">
                                    <Routes>
                                        <Route exact path="/" element={<Home drizzle={drizzle} drizzleState={drizzleState} />} /> 
                                        <Route exact path="/profile" element={<Profile drizzle={drizzle} drizzleState={drizzleState} />} />   
                                        <Route path="*" element={<NotFound />} />
                                    </Routes>
                                </div>
                                <Footer />
                            </Router>
                        )
                    }
                }
            </DrizzleContext.Consumer>
        </DrizzleContext.Provider>
    );
}

export default App;
