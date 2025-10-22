import { PrismaClient, Role, FuelType, Transmission, BookingStatus, PaymentMethod, PaymentStatus } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Admin/Owner/Customer users
  const [admin, owner, customer] = await Promise.all([
    prisma.user.upsert({
      where: { email: 'admin@monstrac.dev' },
      update: {},
      create: { name: 'Admin', email: 'admin@monstrac.dev', role: Role.ADMIN, walletBalance: 0 },
    }),
    prisma.user.upsert({
      where: { email: 'owner@monstrac.dev' },
      update: {},
      create: { name: 'Fleet Owner', email: 'owner@monstrac.dev', role: Role.OWNER },
    }),
    prisma.user.upsert({
      where: { email: 'customer@monstrac.dev' },
      update: {},
      create: { name: 'First Customer', email: 'customer@monstrac.dev', role: Role.CUSTOMER },
    }),
  ]);

  // Cars
  const carsData = [
    { title: 'Swift Hatch', brand: 'Suzuki', model: 'Swift', year: 2022, registrationNo: 'MH01AB1234', vin: 'VIN000001', seatCount: 5, fuelType: FuelType.PETROL, transmission: Transmission.MANUAL, color: 'Black', priceHour: 5, priceDay: 30, priceWeek: 180, perKmPrice: 0.2, depositAmount: 100, mileageIncluded: 150, images: [
      '/sample/cars/swift-1.jpg', '/sample/cars/swift-2.jpg', '/sample/cars/swift-3.jpg', '/sample/cars/swift-4.jpg', '/sample/cars/swift-5.jpg', '/sample/cars/swift-6.jpg'
    ], features: { ac: true, gps: true, childSeat: false }, model3dUrl: null },
    { title: 'City Sedan', brand: 'Honda', model: 'City', year: 2023, registrationNo: 'MH02CD5678', vin: 'VIN000002', seatCount: 5, fuelType: FuelType.PETROL, transmission: Transmission.AUTOMATIC, color: 'Grey', priceHour: 7, priceDay: 45, priceWeek: 270, perKmPrice: 0.25, depositAmount: 150, mileageIncluded: 200, images: [
      '/sample/cars/city-1.jpg', '/sample/cars/city-2.jpg', '/sample/cars/city-3.jpg', '/sample/cars/city-4.jpg', '/sample/cars/city-5.jpg', '/sample/cars/city-6.jpg'
    ], features: { ac: true, gps: true, childSeat: true }, model3dUrl: null },
    { title: 'Model 3 Electric', brand: 'Tesla', model: 'Model 3', year: 2024, registrationNo: 'DL01EV0001', vin: 'VIN000003', seatCount: 5, fuelType: FuelType.ELECTRIC, transmission: Transmission.AUTOMATIC, color: 'White', priceHour: 12, priceDay: 80, priceWeek: 480, perKmPrice: 0.3, depositAmount: 300, mileageIncluded: 250, images: [
      '/sample/cars/model3-1.jpg', '/sample/cars/model3-2.jpg', '/sample/cars/model3-3.jpg', '/sample/cars/model3-4.jpg', '/sample/cars/model3-5.jpg', '/sample/cars/model3-6.jpg'
    ], features: { ac: true, gps: true, ev: true }, model3dUrl: null },
  ];

  const cars = await Promise.all(
    carsData.map((c, idx) =>
      prisma.car.upsert({
        where: { registrationNo: c.registrationNo },
        update: {},
        create: {
          ownerId: owner.id,
          title: c.title,
          brand: c.brand,
          model: c.model,
          year: c.year,
          registrationNo: c.registrationNo,
          vin: c.vin,
          seatCount: c.seatCount,
          fuelType: c.fuelType,
          transmission: c.transmission,
          color: c.color,
          priceHour: c.priceHour,
          priceDay: c.priceDay,
          priceWeek: c.priceWeek,
          perKmPrice: c.perKmPrice,
          depositAmount: c.depositAmount,
          mileageIncluded: c.mileageIncluded,
          images: c.images,
          model3dUrl: c.model3dUrl,
          features: c.features,
        },
      })
    )
  );

  // Drivers
  const drivers = await Promise.all(
    [
      { name: 'Alex Driver', phone: '+1555000001', licenseNo: 'LIC0001' },
      { name: 'Sam Driver', phone: '+1555000002', licenseNo: 'LIC0002' },
      { name: 'Riya Driver', phone: '+1555000003', licenseNo: 'LIC0003' },
    ].map((d, i) =>
      prisma.driver.upsert({
        where: { phone: d.phone },
        update: {},
        create: { ...d, verified: true, attachedCarId: cars[i % cars.length].id },
      })
    )
  );

  // Bookings + Payments
  const now = new Date();
  const pickup = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const drop = new Date(now.getTime() + 48 * 60 * 60 * 1000);

  const booking = await prisma.booking.create({
    data: {
      userId: customer.id,
      carId: cars[0].id,
      driverId: drivers[0].id,
      pickupAt: pickup,
      returnAt: drop,
      pickupLoc: 'Mumbai Airport',
      returnLoc: 'Mumbai Airport',
      status: BookingStatus.CONFIRMED,
      addons: { driver: true, childSeat: false },
      priceSubtotal: 160,
      taxAmount: 28.8,
      depositAmount: 100,
      totalPrice: 288.8,
      payment: {
        create: {
          amount: 288.8,
          currency: 'USD',
          method: PaymentMethod.STRIPE,
          status: PaymentStatus.SUCCEEDED,
          txnId: 'tx_12345',
        },
      },
    },
  });

  await prisma.transaction.create({
    data: {
      userId: customer.id,
      bookingId: booking.id,
      amount: 288.8,
      type: 'DEBIT',
      category: 'PAYMENT',
      note: 'Initial booking payment',
    },
  });

  console.log('Seed complete:', { users: [admin.email, owner.email, customer.email], cars: cars.length, drivers: drivers.length, booking: booking.id });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
