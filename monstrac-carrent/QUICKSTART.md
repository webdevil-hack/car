# ⚡ Quick Start Guide - Monstrac CarRent

Get the application running in under 5 minutes!

## 🚀 Installation

```bash
# Navigate to project directory
cd monstrac-carrent

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🎯 First Steps

### 1. Browse the Homepage
- Visit `http://localhost:5173`
- Explore all 10 sections
- Try the 3D car animation
- Use the booking form

### 2. View Cars Catalog
- Click "Browse Cars" or navigate to `/cars`
- Try different filters (price, type, transmission)
- Toggle between grid and list views
- Sort by price, popularity, or rating

### 3. View Car Details
- Click on any car to see details
- Interact with the 3D car viewer
- Adjust booking days
- Toggle "Include Driver" option
- See live price calculation

### 4. Try Authentication

**Login as Customer:**
1. Click "Login" in header
2. Select "Customer" role
3. Enter any email/password
4. Click Login
5. Redirected to Customer Dashboard

**Login as Admin:**
1. Click "Login" in header
2. Select "Owner/Admin" role
3. Enter any email/password
4. Click Login
5. Redirected to Admin Dashboard

### 5. Explore Dashboards

**Customer Dashboard** (`/dashboard/customer`)
- Overview: See stats and upcoming bookings
- Bookings: View trip history
- Wallet: Check balance and transactions
- Referrals: Get referral code
- Profile: Update personal info

**Admin Dashboard** (`/dashboard/admin`)
- Overview: Revenue and analytics
- Cars: Manage fleet
- Drivers: Manage drivers
- Finance: Track earnings
- Analytics: View reports

## 🎨 Key Features to Test

### Homepage
- **Hero Section**: Watch the 3D car animation
- **Booking Form**: Try searching for cars
- **Categories**: Click on vehicle types
- **Featured Cars**: Hover over car cards
- **Testimonials**: Watch auto-rotation
- **FAQ**: Click to expand/collapse

### Filters & Search
- Adjust price range slider
- Select multiple car types
- Choose transmission preference
- Filter by fuel type
- Toggle driver inclusion

### Booking Flow
1. Find a car you like
2. Click "View Details"
3. Select dates
4. Choose add-ons
5. Click "Book Now"
6. Login if needed
7. See confirmation page

### Responsive Design
- Resize browser window
- Test on mobile (DevTools)
- Try tablet view
- Check all breakpoints

## 📱 Page Navigation

| Page | URL | What to See |
|------|-----|-------------|
| Home | `/` | Full landing page |
| Cars | `/cars` | Catalog with filters |
| Car Detail | `/cars/1` | Tesla Model 3 details |
| About | `/about` | Company information |
| Contact | `/contact` | Contact form |
| Login | `/login` | Authentication |
| Signup | `/signup` | Registration |
| Customer Dashboard | `/dashboard/customer` | User dashboard |
| Admin Dashboard | `/dashboard/admin` | Management dashboard |

## 🎭 Demo Credentials

**Note**: The app uses mock authentication, so any credentials work!

**Example Credentials:**
```
Email: demo@monstrac.com
Password: anything
Role: Customer or Owner/Admin
```

## 🛠️ Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🎨 Customization Quick Tips

### Change Theme Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  accent: {
    primary: '#00d4ff', // Change this
    secondary: '#b537ff', // And this
  }
}
```

### Add New Car
Edit `src/data/mockData.ts`:
```typescript
export const mockCars: Car[] = [
  {
    id: '11',
    title: 'Your New Car',
    // ... add details
  }
]
```

### Modify Homepage Sections
Components are in `src/components/home/`:
- `HeroSection.tsx`
- `BookingForm.tsx`
- `FeaturedCars.tsx`
- etc.

## 📊 What's Working

✅ All pages load and render
✅ Navigation between pages
✅ Filters update car listings
✅ 3D car viewer interactive
✅ Forms validate input
✅ Mock authentication works
✅ Dashboards display data
✅ Responsive on all devices
✅ Animations smooth
✅ State persists (localStorage)

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173

# Or use different port
npm run dev -- --port 3000
```

### Dependencies Error
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Check TypeScript
npx tsc --noEmit

# Clear cache
rm -rf dist
npm run build
```

## 🎯 Testing Checklist

Quick test to verify everything works:

- [ ] Homepage loads with all sections
- [ ] 3D car rotates smoothly
- [ ] Click "Browse Cars" → see catalog
- [ ] Apply filters → results update
- [ ] Click a car → see detail page
- [ ] 3D viewer works
- [ ] Click "Book Now" → login page
- [ ] Login with any credentials
- [ ] See dashboard
- [ ] Navigate between tabs
- [ ] Check mobile view (resize)
- [ ] All pages accessible

## 📚 Documentation

- **Full Setup**: README.md
- **API Reference**: API_DOCUMENTATION.md
- **Deployment**: DEPLOYMENT.md
- **Project Details**: PROJECT_SUMMARY.md
- **Completion Status**: COMPLETION_REPORT.md

## 💡 Tips

1. **Use Chrome DevTools** to test responsive design
2. **Check Console** for any errors (there shouldn't be any!)
3. **Try Different Roles** (Customer vs Admin) to see different dashboards
4. **Test Filters** to see real-time updates
5. **Play with 3D Viewer** - click and drag to rotate

## 🚀 Ready to Deploy?

See DEPLOYMENT.md for detailed instructions on deploying to:
- Vercel
- Netlify
- AWS
- Docker
- GitHub Pages

## 📞 Need Help?

- Check README.md for detailed documentation
- Review PROJECT_SUMMARY.md for architecture
- See COMPLETION_REPORT.md for feature list

---

**Happy Testing!** 🎉

The app is fully functional and ready to use. Explore all features and enjoy the smooth dark-themed experience with 3D animations!
