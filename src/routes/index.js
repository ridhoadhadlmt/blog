import React from 'react'
import { Routes, Route } from "react-router-dom";

import Dashboard from '../views/Dashboard.jsx'
import Article from '../views/Article.jsx'
function routes() {
  return (
    <Routes>

            {/* route "/" */}
            <Route path="/" element={<Dashboard />} />

            {/* route "/posts" */}
            <Route path="/article" element={<Article />} />

        </Routes>
  )
}

export default routes