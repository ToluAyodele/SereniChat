'use client'
import React, { useState } from 'react'

// Sample data for mental health organizations
const organizationsData = [
  {
    id: 1,
    name: 'Organization 1',
    description: 'Description of Organization 1',
    city: 'City 1',
    state: 'State 1',
    zip: '12345',
    image: 'organization1.jpg', // path to image/logo
  },
  {
    id: 2,
    name: 'Organization 2',
    description: 'Description of Organization 2',
    city: 'City 2',
    state: 'State 2',
    zip: '23456',
    image: 'organization2.jpg', // path to image/logo
  },
  // Add more organizations as needed
]

const MentalHealthOrgsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [organizations, setOrganizations] = useState(organizationsData)

  // Function to handle search term change
  const handleSearchTermChange = (e) => {
    const newSearchTerm = e.target.value.toLowerCase()
    setSearchTerm(newSearchTerm)

    // Filter organizations based on search term
    const filteredOrgs = organizationsData.filter((org) =>
      Object.values(org).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(newSearchTerm)
      )
    )
    setOrganizations(filteredOrgs)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search bar */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search organizations..."
            className="w-full py-2 px-4 rounded-md border-2 border-gray-200 focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>
      </div>

      {/* List of organizations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {organizations.map((org) => (
          <div key={org.id} className="bg-white rounded-md shadow-md p-4">
            <img
              src={`/images/${org.image}`} // Assuming images are stored in public/images directory
              alt={org.name}
              className="w-full h-40 object-cover mb-4 rounded-md"
            />
            <h2 className="text-lg font-semibold mb-2">{org.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{org.description}</p>
            <p className="text-sm text-gray-500">{`${org.city}, ${org.state} ${org.zip}`}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MentalHealthOrgsPage
