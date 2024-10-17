'use client'
import React from 'react'
import { useState } from 'react'

const organizationsData = [
  {
    id: 1,
    name: 'Example Organization 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    imageUrl: 'example1.jpg',
  },
  {
    id: 2,
    name: 'Example Organization 2',
    description:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90001',
    imageUrl: 'example2.jpg',
  },
  {
    id: 1,
    name: 'Example Organization 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    imageUrl: 'example1.jpg',
  },
  {
    id: 1,
    name: 'Example Organization 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    imageUrl: 'example1.jpg',
  },
  {
    id: 1,
    name: 'Example Organization 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    imageUrl: 'example1.jpg',
  },
  {
    id: 1,
    name: 'Example Organization 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    imageUrl: 'example1.jpg',
  },
]

const OrganizationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterOptions, setFilterOptions] = useState({
    address: '',
    zipcode: '',
    yearFounded: '',
  })
  const [organizations, setOrganizations] = useState(organizationsData)

  // Function to handle search term change
  const handleSearchTermChange = (e) => {
    const newSearchTerm = e.target.value.toLowerCase()
  }

  // Function to handle filtering based on address, zipcode, or year founded
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilterOptions({ ...filterOptions, [name]: value })
  }

  // Filter organizations based on search term and filter options
  const filteredOrganizations = organizationsData.filter((org) =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search organizations..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {organizations.map((org) => (
          <div key={org.id} className="bg-white shadow-md rounded-md p-4">
            <img
              src={org.imageUrl}
              alt={org.name}
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold">{org.name}</h2>
            <p className="text-gray-600 mb-2">{org.description}</p>
            <p className="text-gray-500">
              {`${org.city}, ${org.state} ${org.zip}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrganizationsPage
