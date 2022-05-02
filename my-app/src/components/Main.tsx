import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home'

// const Loading = () => <p>Loading ...</p>;
// const Home = React.lazy(() => import('./home/Home'));
// const Topics = React.lazy(() => import('./components/Topics'));

const Main = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            {/* <Route path='/weather' element={<Topics />} /> */}
        </Routes>
    );
}
export default Main;