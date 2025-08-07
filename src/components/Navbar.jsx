import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  CloudRain, 
  Sun, 
  CloudSnow, 
  Wind, 
  Droplets, 
  Eye, 
  Thermometer,
  MapPin,
  Calendar,
  Clock,
  Menu,
  X,
  Moon,
  Home,
  Search,
  Settings,
  User,
  Bell,
  Globe,
  Palette,
  Shield,
  Info,
  Mail,
  Phone,
  Camera,
  Edit
} from 'lucide-react';


const WeatherApp = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedLocation, setSelectedLocation] = useState('Bengaluru');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const sampleLocations = [
  { name: "Mumbai, Maharashtra", temp: 32, condition: "Humid", icon: CloudRain },
  { name: "Delhi, NCR", temp: 38, condition: "Hot", icon: Sun },
  { name: "Chennai, Tamil Nadu", temp: 35, condition: "Coastal", icon: Cloud },
  { name: "Kolkata, West Bengal", temp: 31, condition: "Monsoon", icon: CloudRain },
  { name: "Hyderabad, Telangana", temp: 29, condition: "Pleasant", icon: Sun },
  { name: "Pune, Maharashtra", temp: 27, condition: "Mild", icon: Cloud }
];
 
const [temperatureUnit, setTemperatureUnit] = useState('celsius');
const [showAirQuality, setShowAirQuality] = useState(true);
const [showUV, setShowUV] = useState(false);
 


  // Expanded sample locations database
  const allLocations = [
    { name: "Mumbai, Maharashtra", temp: 32, condition: "Humid", icon: CloudRain, aqi: 145, humidity: 85, pressure: 1010 },
    { name: "Delhi, NCR", temp: 38, condition: "Hot", icon: Sun, aqi: 201, humidity: 65, pressure: 1008 },
    { name: "Chennai, Tamil Nadu", temp: 35, condition: "Coastal", icon: Cloud, aqi: 120, humidity: 88, pressure: 1012 },
    { name: "Kolkata, West Bengal", temp: 31, condition: "Monsoon", icon: CloudRain, aqi: 160, humidity: 82, pressure: 1011 },
    { name: "Hyderabad, Telangana", temp: 29, condition: "Pleasant", icon: Sun, aqi: 90, humidity: 70, pressure: 1015 },
    { name: "Pune, Maharashtra", temp: 27, condition: "Mild", icon: Cloud, aqi: 85, humidity: 68, pressure: 1016 },
    { name: "Bengaluru, Karnataka", temp: 28, condition: "Pleasant", icon: Cloud, aqi: 165, humidity: 78, pressure: 1013 },
    { name: "Ahmedabad, Gujarat", temp: 36, condition: "Dry", icon: Sun, aqi: 130, humidity: 55, pressure: 1009 },
    { name: "Jaipur, Rajasthan", temp: 39, condition: "Desert", icon: Sun, aqi: 140, humidity: 45, pressure: 1007 },
    { name: "Lucknow, Uttar Pradesh", temp: 34, condition: "Warm", icon: Cloud, aqi: 175, humidity: 72, pressure: 1010 },
    { name: "Bhopal, Madhya Pradesh", temp: 33, condition: "Moderate", icon: Cloud, aqi: 110, humidity: 65, pressure: 1012 },
    { name: "Patna, Bihar", temp: 35, condition: "Hot", icon: Sun, aqi: 190, humidity: 75, pressure: 1009 },
    { name: "Thiruvananthapuram, Kerala", temp: 30, condition: "Tropical", icon: CloudRain, aqi: 65, humidity: 90, pressure: 1013 },
    { name: "Bhubaneswar, Odisha", temp: 33, condition: "Humid", icon: Cloud, aqi: 125, humidity: 80, pressure: 1011 },
    { name: "Dehradun, Uttarakhand", temp: 25, condition: "Cool", icon: Cloud, aqi: 70, humidity: 60, pressure: 1018 },
    { name: "USA, America", temp: 25, condition: "Cool", icon: Cloud, aqi: 70, humidity: 60, pressure: 1018 }
  ];

  const [weatherData, setWeatherData] = useState({
    current: {
      location: "Bengaluru, Koramangala",
      date: "25 July, 22:16:10",
      temperature: 28,
      condition: "Feels like 32°C. Partly cloudy, Light breeze",
      hourly: {
        street: 28,
        apartment: 26,
        time: "7:21:39",
        sunrise: "until sunrise"
      }
    },
    forecast: [
      { time: "09:00", icon: CloudRain, temp: "26°", desc: "Light Rain" },
      { time: "12:00", icon: Sun, temp: "32°", desc: "Sunny" },
      { time: "15:00", icon: Sun, temp: "35°", desc: "Hot" },
      { time: "18:00", icon: Cloud, temp: "30°", desc: "Cloudy" },
      { time: "21:00", icon: CloudRain, temp: "27°", desc: "Monsoon" },
      { time: "00:00", icon: Moon, temp: "24°", desc: "Clear Night" }
    ],
    weeklyForecast: [
      { day: "Saturday", date: "26 July", icon: CloudRain, high: "32°", low: "24°" },
      { day: "Sunday", date: "27 July", icon: Sun, high: "35°", low: "26°" },
      { day: "Monday", date: "28 July", icon: CloudRain, high: "29°", low: "23°" },
      { day: "Tuesday", date: "29 July", icon: Cloud, high: "31°", low: "25°" },
      { day: "Wednesday", date: "30 July", icon: CloudRain, high: "28°", low: "22°" }
    ],
    airQuality: {
      aqi: 165,
      pm25: 85.4,
      quality: "Moderate",
      uv: 8,
      pressure: 1013,
      humidity: 78
    }
  });

  // Generate dynamic weather data based on location
  const generateWeatherData = (locationData) => {
    const baseTemp = locationData.temp;
    const date = new Date();
    const formatTime = (hours, minutes) => `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    // Generate hourly forecast
    const hourlyForecast = [];
    for (let i = 0; i < 6; i++) {
      const hour = (date.getHours() + i * 3) % 24;
      const temp = baseTemp + Math.floor(Math.random() * 8) - 4;
      const icons = [CloudRain, Sun, Cloud, Moon];
      const conditions = ["Light Rain", "Sunny", "Cloudy", "Clear", "Hot", "Monsoon"];
      
      hourlyForecast.push({
        time: formatTime(hour, 0),
        icon: icons[Math.floor(Math.random() * icons.length)],
        temp: `${temp}°`,
        desc: conditions[Math.floor(Math.random() * conditions.length)]
      });
    }

    // Generate weekly forecast
    const weeklyForecast = [];
    const days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    for (let i = 1; i <= 5; i++) {
      const futureDate = new Date(date);
      futureDate.setDate(date.getDate() + i);
      const high = baseTemp + Math.floor(Math.random() * 6) - 2;
      const low = high - Math.floor(Math.random() * 10) - 5;
      const icons = [CloudRain, Sun, Cloud, CloudSnow];
      
      weeklyForecast.push({
        day: days[(date.getDay() + i) % 7],
        date: `${futureDate.getDate()} ${months[futureDate.getMonth()]}`,
        icon: icons[Math.floor(Math.random() * icons.length)],
        high: `${high}°`,
        low: `${low}°`
      });
    }

    return {
      current: {
        location: locationData.name,
        date: `${date.getDate()} ${months[date.getMonth()]}, ${formatTime(date.getHours(), date.getMinutes())}:${date.getSeconds().toString().padStart(2, '0')}`,
        temperature: locationData.temp,
        condition: `Feels like ${locationData.temp + 4}°C. ${locationData.condition}, Light breeze`,
        hourly: {
          street: locationData.temp,
          apartment: locationData.temp - 2,
          time: formatTime(date.getHours(), date.getMinutes()),
          sunrise: "6h 24m"
        }
      },
      forecast: hourlyForecast,
      weeklyForecast: weeklyForecast,
      airQuality: {
        aqi: locationData.aqi,
        pm25: (locationData.aqi * 0.52).toFixed(1),
        quality: locationData.aqi < 50 ? "Good" : locationData.aqi < 100 ? "Moderate" : locationData.aqi < 150 ? "Unhealthy for Sensitive" : "Unhealthy",
        uv: Math.floor(Math.random() * 10) + 1,
        pressure: locationData.pressure,
        humidity: locationData.humidity
      }
    };
  };

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeoutId = setTimeout(() => {
      const filtered = allLocations.filter(location =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.condition.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleSidenav = () => setIsSidenavOpen(!isSidenavOpen);

  const handleLocationSearch = (locationName) => {
    const locationData = allLocations.find(loc => loc.name === locationName);
    if (locationData) {
      setSelectedLocation(locationName);
      const newWeatherData = generateWeatherData(locationData);
      setWeatherData(newWeatherData);
      setCurrentPage('home');
      setSearchQuery('');
      setIsSidenavOpen(false);
    }
  };

  // Custom location search (for locations not in database)
  const handleCustomLocationSearch = (locationName) => {
    if (locationName.trim() === '') return;
    
    // Generate random weather data for custom locations
    const customLocationData = {
      name: locationName,
      temp: Math.floor(Math.random() * 25) + 15, // 15-40°C
      condition: ["Pleasant", "Sunny", "Cloudy", "Rainy", "Windy"][Math.floor(Math.random() * 5)],
      icon: [Cloud, Sun, CloudRain, Wind][Math.floor(Math.random() * 4)],
      aqi: Math.floor(Math.random() * 200) + 50,
      humidity: Math.floor(Math.random() * 40) + 50,
      pressure: Math.floor(Math.random() * 20) + 1005
    };

    setSelectedLocation(locationName);
    const newWeatherData = generateWeatherData(customLocationData);
    setWeatherData(newWeatherData);
    setCurrentPage('home');
    setSearchQuery('');
    setIsSidenavOpen(false);
  };

  const themeClasses = isDarkMode 
    ? 'bg-gradient-to-br from-orange-900 via-red-900 to-yellow-800 text-white'
    : 'bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 text-gray-800';

  const cardClasses = isDarkMode
    ? 'bg-white/10 backdrop-blur-md border border-white/20'
    : 'bg-white/80 backdrop-blur-md border border-white/40 shadow-lg';

  const weatherCardBlob = isDarkMode
    ? 'p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20'
    : 'p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-white/40 shadow-lg';

    
  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  // Sidebar Component
  const Sidebar = () => (
    <div className={`fixed top-0 left-0 h-full w-64 transform transition-transform duration-300 z-50 ${
      isSidenavOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0 ${cardClasses}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold">WeatherApp</h2>
          <button 
            onClick={toggleSidenav}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="space-y-4">
          {navItems.map(item => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsSidenavOpen(false);
                }}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors w-full text-left ${
                  currentPage === item.id 
                    ? 'bg-orange-500/20 text-orange-400 font-medium' 
                    : 'hover:bg-white/10'
                }`}
              >
                <IconComponent size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );

  // Home Page Component
  const HomePage = () => (
    <div>
      {/* Header */}
      <header className="p-4 lg:p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidenav}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Menu size={24} />
            </button>
            <div>
              <div className="flex items-center gap-2 text-sm opacity-80">
                <MapPin size={16} />
                {weatherData.current.location}
              </div>
              <div className="text-sm opacity-60 mt-1">
                {weatherData.current.date}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl lg:text-6xl font-light">{weatherData.current.temperature}°C</div>
            <div className="text-sm opacity-80 max-w-xs">
              {weatherData.current.condition}
            </div>
          </div>
        </div>
      </header>

      {/* Main Weather Cards */}
      <div className="px-4 lg:px-6 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Current Weather Details */}
          <div className={weatherCardBlob}>
            <h3 className="text-lg font-semibold mb-4">Current Weather</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-light">{weatherData.current.hourly.street}°C</div>
                <div className="text-sm opacity-80">Outdoor</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-light">{weatherData.current.hourly.apartment}°C</div>
                <div className="text-sm opacity-80">Indoor</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-80">Time</span>
                <span>{weatherData.current.hourly.time}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm opacity-80">Until sunrise</span>
                <span className="text-sm">{weatherData.current.hourly.sunrise}</span>
              </div>
            </div>
          </div>

          {/* Hourly Forecast */}
          <div className={`p-6 rounded-2xl ${cardClasses} lg:col-span-2`}>
            <h3 className="text-lg font-semibold mb-4">Hourly Forecast</h3>
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
              {weatherData.forecast.map((hour, index) => {
                const IconComponent = hour.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="text-sm opacity-80 mb-2">{hour.time}</div>
                    <div className="flex justify-center mb-2">
                      <IconComponent size={24} className="opacity-80" />
                    </div>
                    <div className="font-medium">{hour.temp}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Air Quality */}
          <div className={`p-6 rounded-2xl ${cardClasses}`}>
            <h3 className="text-lg font-semibold mb-4">Air Quality</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-80">AQI</span>
                <span className="text-2xl font-light text-orange-400">{weatherData.airQuality.aqi}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-80">PM2.5</span>
                <span>{weatherData.airQuality.pm25}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-80">Quality</span>
                <span className="text-orange-400">{weatherData.airQuality.quality}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/20">
                <div className="text-center">
                  <div className="text-lg font-light">{weatherData.airQuality.uv}</div>
                  <div className="text-xs opacity-60">UV</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-light">{weatherData.airQuality.pressure}</div>
                  <div className="text-xs opacity-60">hPa</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-light">{weatherData.airQuality.humidity}</div>
                  <div className="text-xs opacity-60">%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Forecast */}
          <div className={`p-6 rounded-2xl ${cardClasses} lg:col-span-2`}>
            <h3 className="text-lg font-semibold mb-4">7-Day Forecast</h3>
            <div className="space-y-3">
              {weatherData.weeklyForecast.map((day, index) => {
                const IconComponent = day.icon;
                return (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <IconComponent size={20} className="opacity-80" />
                      <div>
                        <div className="font-medium">{day.day}</div>
                        <div className="text-sm opacity-60">{day.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">{day.high}</span>
                      <span className="opacity-60 ml-2">{day.low}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Search Page Component
  const SearchPage = () => (
    <div className="p-4 lg:p-6">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Search Locations</h1>
      </div>

      {/* Search Input */}
      <div className={`p-6 rounded-2xl ${cardClasses} mb-6`}>
        <div className="flex items-center gap-3 mb-4">
          <Search size={20} className="opacity-60" />
          <input
            type="text"
            placeholder="Search for any city or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                handleCustomLocationSearch(searchQuery.trim());
              }
            }}
            className="flex-1 bg-transparent border-none outline-none text-lg placeholder-opacity-60"
          />
          {searchQuery && (
            <button
              onClick={() => handleCustomLocationSearch(searchQuery.trim())}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Search
            </button>
          )}
        </div>
        {searchQuery && (
          <div className="text-sm opacity-60">
            Press Enter or click Search to get weather for "{searchQuery}"
          </div>
        )}
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className={`p-6 rounded-2xl ${cardClasses} mb-6`}>
          <h3 className="text-lg font-semibold mb-4">
            {isSearching ? 'Searching...' : `Search Results (${searchResults.length} found)`}
          </h3>
          {isSearching ? (
            <div className="text-center py-8 opacity-60">Searching locations...</div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.map((location, index) => {
                const IconComponent = location.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleLocationSearch(location.name)}
                    className="flex items-center justify-between p-4 rounded-lg hover:bg-white/10 transition-colors text-left border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent size={24} className="opacity-80" />
                      <div>
                        <div className="font-medium">{location.name}</div>
                        <div className="text-sm opacity-60">{location.condition}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-light">{location.temp}°C</div>
                      <div className="text-xs opacity-60">AQI: {location.aqi}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 opacity-60">
              No matching locations found. Try searching for "{searchQuery}" anyway!
            </div>
          )}
        </div>
      )}

      {/* Popular Locations */}
      <div className={`p-6 rounded-2xl ${cardClasses}`}>
        <h3 className="text-lg font-semibold mb-4">Popular Locations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allLocations.slice(0, 8).map((location, index) => {
            const IconComponent = location.icon;
            return (
              <button
                key={index}
                onClick={() => handleLocationSearch(location.name)}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-white/10 transition-colors text-left border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <IconComponent size={24} className="opacity-80" />
                  <div>
                    <div className="font-medium">{location.name}</div>
                    <div className="text-sm opacity-60">{location.condition}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-light">{location.temp}°C</div>
                  <div className="text-xs opacity-60">AQI: {location.aqi}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      
      {/* Recent Searches */}
      {selectedLocation !== 'Bengaluru, Koramangala' && (
        <div className={`p-6 rounded-2xl ${cardClasses} mt-6`}>
          <h3 className="text-lg font-semibold mb-4">Current Location</h3>
          <div className="flex items-center justify-between p-4 rounded-lg bg-orange-500/20 border border-orange-500/30">
            <div className="flex items-center gap-3">
              <MapPin size={24} className="text-orange-400" />
              <div>
                <div className="font-medium text-orange-400">{selectedLocation}</div>
                <div className="text-sm opacity-60">Currently viewing</div>
              </div>
            </div>
            <div className="text-2xl font-light text-orange-400">{weatherData.current.temperature}°C</div>
          </div>
        </div>
      )}
    </div>
  );

 

 

  // Map Page Component
  const MapPage = () => (
    
    <div className="p-4 lg:p-6">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={toggleSidenav}
          className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-2xl font-bold">Weather Map</h1>
      </div>

      <div className={`p-6 rounded-2xl ${cardClasses} h-96 flex items-center justify-center`}
              style={{
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          height: "400px",
        }}>
        <iframe
          width="100%"
          height="100%"
          src="https://embed.windy.com/embed2.html?lat=12.8&lon=80.2&detailLat=12.8&detailLon=80.2&zoom=5&level=surface&overlay=wind&menu=&message=true&marker=&calendar=0&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1"
          frameBorder="0"
          style={{
            borderRadius: "16px",
            filter: "contrast(95%) saturate(110%) brightness(90%)",
          }}
        ></iframe>



        <div className="text-center">
          <MapPin size={48} className="mx-auto mb-4 opacity-60" />
          <h3 className="text-xl font-semibold mb-2">Interactive Weather Map</h3>
          <p className="opacity-80">Weather map integration would be implemented here</p>
        </div>
      </div>

      {/* Quick Location Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {sampleLocations.slice(0, 3).map((location, index) => {
          const IconComponent = location.icon;
          return (
            <div key={index} className={`p-4 rounded-xl ${cardClasses}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{location.name.split(',')[0]}</span>
                <IconComponent size={20} className="opacity-80" />
              </div>
              <div className="text-2xl font-light">{location.temp}°C</div>
              <div className="text-sm opacity-60">{location.condition}</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Settings Page Component
const SettingsPage = () => (
  <div className="p-4 lg:p-6">
    {/* Header */}
    <div className="flex items-center gap-4 mb-6">
      <button 
        onClick={toggleSidenav}
        className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
      >
        <Menu size={24} />
      </button>
      <h1 className="text-2xl font-bold">Settings</h1>
    </div>

    <div className="space-y-6">

      {/* Weather Preferences (Replaces Appearance) */}
      <div className={`p-6 rounded-2xl ${cardClasses}`}>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Cloud size={20} />
          Weather Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Show Temperature in</span>
            <select
              value={temperatureUnit}
              onChange={(e) => setTemperatureUnit(e.target.value)}
              className="bg-white/10 p-2 rounded-lg border border-white/20 outline-none"
            >
              <option value="celsius">Celsius (°C)</option>
              <option value="fahrenheit">Fahrenheit (°F)</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Include Air Quality Info</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={showAirQuality}
                onChange={() => setShowAirQuality(!showAirQuality)}
              />
              <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:bg-orange-400 transition-colors duration-300"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-full transition-transform duration-300"></div>
            </label>
          </div>


          <div className="flex items-center justify-between">
            <span>Enable UV Index Display</span>
            <input
              type="checkbox"
              checked={showUV}
              onChange={() => setShowUV(!showUV)}
              className="w-4 h-4"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className={`p-6 rounded-2xl ${cardClasses}`}>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Bell size={20} />
          Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Weather Alerts</span>
            <input type="checkbox" className="w-4 h-4" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span>Daily Forecast</span>
            <input type="checkbox" className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className={`p-6 rounded-2xl ${cardClasses}`}>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Globe size={20} />
          Location
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Auto-detect Location</span>
            <input type="checkbox" className="w-4 h-4" defaultChecked />
          </div>
          <div>
            <label className="block text-sm opacity-80 mb-2">Default Location</label>
            <input 
              type="text" 
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full p-2 rounded-lg bg-white/10 border border-white/20 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

  // Profile Page Component
  const ProfilePage = () => (
    <div className="p-4 lg:p-6">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={toggleSidenav}
          className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>

      <div className="space-y-6">
        {/* Profile Info */}
        <div className={`p-6 rounded-2xl ${cardClasses}`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="opacity-80">Weather Enthusiast</p>
            </div>
            <button className="ml-auto p-2 rounded-lg hover:bg-white/10 transition-colors">
              <Edit size={16} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail size={16} className="opacity-60" />
              <span>john.doe@email.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="opacity-60" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="opacity-60" />
              <span>{selectedLocation}</span>
            </div>
          </div>
        </div>

        {/* Weather Preferences */}
        <div className={`p-6 rounded-2xl ${cardClasses}`}>
          <h3 className="text-lg font-semibold mb-4">Weather Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Temperature Unit</span>
              <select className="bg-white/10 border border-white/20 rounded-lg p-2 outline-none">
                <option value="celsius">Celsius (°C)</option>
                <option value="fahrenheit">Fahrenheit (°F)</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span>Wind Speed Unit</span>
              <select className="bg-white/10 border border-white/20 rounded-lg p-2 outline-none">
                <option value="kmh">km/h</option>
                <option value="mph">mph</option>
              </select>
            </div>
          </div>
        </div>

        {/* About */}
        <div className={`p-6 rounded-2xl ${cardClasses}`}>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Info size={20} />
            About
          </h3>
          <p className="opacity-80">
            WeatherApp v2.0 - Your personal weather companion. Stay updated with accurate weather forecasts and real-time conditions.
          </p>
        </div>
      </div>
    </div>
  );

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'search':
        return <SearchPage />;
      case 'map':
        return <MapPage />;
      case 'settings':
        return <SettingsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${themeClasses}`} style={{ backgroundImage: 'url("/images/moon1.png")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
      {/* Sidenav Overlay */}
      {isSidenavOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidenavOpen(false)}
        />
      )}

      <Sidebar />

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {renderPage()}
      </div>
    </div>
  );
};

export default WeatherApp;