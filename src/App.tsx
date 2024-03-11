import { routes } from 'data/Routes';
import { CreatePage } from 'pages/create';
import { EditPage } from 'pages/edit';
import { MainPage } from 'pages/main';
import { NotFoundPage } from 'pages/notFound';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.main} element={<MainPage />} />
        <Route path={routes.create} element={<CreatePage />} />
        <Route path={routes.edit} element={<EditPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
