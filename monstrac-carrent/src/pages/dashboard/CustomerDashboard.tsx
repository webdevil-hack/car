const CustomerDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-400 mb-2">Active Bookings</h3>
          <p className="text-3xl font-bold text-white">2</p>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-400 mb-2">Total Trips</h3>
          <p className="text-3xl font-bold text-white">15</p>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-400 mb-2">Wallet Balance</h3>
          <p className="text-3xl font-bold text-accent-primary">$250</p>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-400 mb-2">Rewards Points</h3>
          <p className="text-3xl font-bold text-accent-secondary">500</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;