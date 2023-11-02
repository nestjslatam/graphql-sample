import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { About, Events, Logs, NotFound, Notifications, Tags, Users } from '../pages';

const Paths = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tags />} />
        <Route path="/users" element={<Users />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/events" element={<Events />} />
        <Route path="/Logs" element={<Logs />} />
        <Route path="/about" element={<About />} />
        <Route component={NotFound} />
      </Routes>
    </BrowserRouter>
  );
};

export default Paths;
