import React from 'react';
import logo from './logo.svg';
import Main from './components/Main'
import { Link } from 'react-router-dom';
import './App.css';
import { Header } from './components/layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;
