const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Admin Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-400 mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-accent-primary">$45,280</p>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-400 mb-2">Active Cars</h3>
          <p className="text-3xl font-bold text-white">24</p>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-400 mb-2">Total Bookings</h3>
          <p className="text-3xl font-bold text-white">156</p>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-400 mb-2">Active Drivers</h3>
          <p className="text-3xl font-bold text-accent-secondary">12</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;