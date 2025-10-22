import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { useStore } from '../../store/useStore';

const FilterSidebar = () => {
  const { bookingFilters, updateBookingFilters } = useStore();
  const [priceRange, setPriceRange] = useState(bookingFilters.priceRange);

  const carTypes = [
    { id: 'hatchback', label: 'Hatchback' },
    { id: 'sedan', label: 'Sedan' },
    { id: 'suv', label: 'SUV' },
    { id: 'luxury', label: 'Luxury' },
    { id: 'electric', label: 'Electric' },
    { id: 'vans', label: 'Vans' },
  ];

  const transmissionTypes = [
    { id: 'Automatic', label: 'Automatic' },
    { id: 'Manual', label: 'Manual' },
  ];

  const fuelTypes = [
    { id: 'Petrol', label: 'Petrol' },
    { id: 'Diesel', label: 'Diesel' },
    { id: 'Electric', label: 'Electric' },
  ];

  const seatingOptions = ['2', '4', '5', '7', '8'];

  const handleCarTypeChange = (type: string) => {
    const newTypes = bookingFilters.carType.includes(type)
      ? bookingFilters.carType.filter((t) => t !== type)
      : [...bookingFilters.carType, type];
    updateBookingFilters({ carType: newTypes });
  };

  const handleTransmissionChange = (transmission: string) => {
    const newTransmissions = bookingFilters.transmission.includes(transmission)
      ? bookingFilters.transmission.filter((t) => t !== transmission)
      : [...bookingFilters.transmission, transmission];
    updateBookingFilters({ transmission: newTransmissions });
  };

  const handleFuelTypeChange = (fuel: string) => {
    const newFuels = bookingFilters.fuelType.includes(fuel)
      ? bookingFilters.fuelType.filter((f) => f !== fuel)
      : [...bookingFilters.fuelType, fuel];
    updateBookingFilters({ fuelType: newFuels });
  };

  const handlePriceRangeChange = (index: number, value: number) => {
    const newRange: [number, number] = [...priceRange] as [number, number];
    newRange[index] = value;
    setPriceRange(newRange);
    updateBookingFilters({ priceRange: newRange });
  };

  const resetFilters = () => {
    updateBookingFilters({
      carType: [],
      transmission: [],
      fuelType: [],
      priceRange: [0, 500],
      seats: '',
    });
    setPriceRange([0, 500]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Filters</h3>
        <button
          onClick={resetFilters}
          className="flex items-center space-x-1 text-sm text-accent-primary hover:text-neon-purple transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>

      {/* Price Range */}
      <div className="card p-4 space-y-3">
        <h4 className="font-semibold text-white">Price Range (per day)</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">₹{priceRange[0]}</span>
            <span className="text-gray-400">₹{priceRange[1]}</span>
          </div>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange[0]}
              onChange={(e) => handlePriceRangeChange(0, parseInt(e.target.value))}
              className="w-full accent-accent-primary"
            />
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange[1]}
              onChange={(e) => handlePriceRangeChange(1, parseInt(e.target.value))}
              className="w-full accent-accent-primary"
            />
          </div>
        </div>
      </div>

      {/* Car Type */}
      <div className="card p-4 space-y-3">
        <h4 className="font-semibold text-white">Car Type</h4>
        <div className="space-y-2">
          {carTypes.map((type) => (
            <label key={type.id} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={bookingFilters.carType.includes(type.id)}
                onChange={() => handleCarTypeChange(type.id)}
                className="w-4 h-4 rounded border-dark-border bg-dark-bg text-accent-primary focus:ring-accent-primary focus:ring-offset-0"
              />
              <span className="text-gray-400 group-hover:text-white transition-colors">
                {type.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Seats */}
      <div className="card p-4 space-y-3">
        <h4 className="font-semibold text-white">Minimum Seats</h4>
        <select
          value={bookingFilters.seats}
          onChange={(e) => updateBookingFilters({ seats: e.target.value })}
          className="input-field text-sm"
        >
          <option value="">Any</option>
          {seatingOptions.map((seat) => (
            <option key={seat} value={seat}>
              {seat}+ Seats
            </option>
          ))}
        </select>
      </div>

      {/* Transmission */}
      <div className="card p-4 space-y-3">
        <h4 className="font-semibold text-white">Transmission</h4>
        <div className="space-y-2">
          {transmissionTypes.map((type) => (
            <label key={type.id} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={bookingFilters.transmission.includes(type.id)}
                onChange={() => handleTransmissionChange(type.id)}
                className="w-4 h-4 rounded border-dark-border bg-dark-bg text-accent-primary focus:ring-accent-primary focus:ring-offset-0"
              />
              <span className="text-gray-400 group-hover:text-white transition-colors">
                {type.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Fuel Type */}
      <div className="card p-4 space-y-3">
        <h4 className="font-semibold text-white">Fuel Type</h4>
        <div className="space-y-2">
          {fuelTypes.map((type) => (
            <label key={type.id} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={bookingFilters.fuelType.includes(type.id)}
                onChange={() => handleFuelTypeChange(type.id)}
                className="w-4 h-4 rounded border-dark-border bg-dark-bg text-accent-primary focus:ring-accent-primary focus:ring-offset-0"
              />
              <span className="text-gray-400 group-hover:text-white transition-colors">
                {type.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* With Driver Toggle */}
      <div className="card p-4">
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="font-semibold text-white">Include Driver</span>
          <input
            type="checkbox"
            checked={bookingFilters.withDriver}
            onChange={(e) => updateBookingFilters({ withDriver: e.target.checked })}
            className="w-5 h-5 rounded border-dark-border bg-dark-bg text-accent-primary focus:ring-accent-primary focus:ring-offset-0"
          />
        </label>
      </div>
    </div>
  );
};

export default FilterSidebar;
