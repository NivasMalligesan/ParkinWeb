import Profile from './Profile.jpg';
import dropdown_icon from './dropdown_icon.svg';
import group_profiles from './group_profiles.png';
import header from './header.png';
import briage from './briage.jpg';
import indiraandhiairport from './indiraandhiairport.webp'
import electroniccity from './electroniccity.webp';
import chartapathi from './chartapathi.jpg'
import evCharging from './evCharging.jpeg';
import lulu from './lulumall.jpg';
import mallofasia from './mallofasia.jpg';
import phonix from './phonix.jpg';
import verified_icon from './verified_icon.svg';
import info_icon from './info_icon.svg';
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import carwash from './carwash.jpeg'
import parkingnearme from './parkingnearme.jpg'
import handicap from './handicap.jpeg'
import parkingbar from './247parking.jpg'; 
import openparking from './openparking.jpeg';
import valetparking from './valetparking.jpg';
import bikeparking from './bikeparking.jpeg'
import rentalparking from './rentalparking.jpg'
import upload_area from './upload_area.png'

export default {
    Profile,
    dropdown_icon,
    group_profiles,
    header,
    location,
    electroniccity,
    evCharging,
    verified_icon,
    info_icon,
    menu_icon,
    cross_icon,
    chartapathi,
    carwash,
    parkingnearme,
    handicap,
    parkingbar,
    openparking,
    valetparking,
    bikeparking,
    indiraandhiairport,
    rentalparking,
    upload_area
};

export const cities = [
    "Agra", "Ahmedabad", "Aligarh", "Allahabad", "Amritsar", "Aurangabad", "Bareilly", "Bangalore",
    "Bhopal", "Bhubaneswar", "Chandigarh", "Chennai", "Coimbatore", "Dhanbad", "Delhi", "Faridabad",
    "Ghaziabad", "Guntur", "Gurgaon", "Guwahati", "Gwalior", "Howrah", "Hyderabad", "Indore",
    "Jabalpur", "Jaipur", "Jalandhar", "Jammu", "Jodhpur", "Jhansi", "Kanpur", "Kalyan-Dombivli",
    "Kolkata", "Kota", "Lucknow", "Ludhiana", "Madurai", "Mallapuram", "Mathura", "Meerut",
    "Moradabad", "Mumbai", "Muzaffarnagar", "Mysuru", "Nagpur", "Nashik", "Navi Mumbai",
    "Patna", "Pimpri-Chinchwad", "Pune", "Rajkot", "Raipur", "Saharanpur", "Salem",
    "Siliguri", "Solapur", "Srinagar", "Surat", "Thane", "Thiruvananthapuram", "Tiruchirappalli",
    "Tirunelveli", "Tirupati", "Vadodara", "Varanasi", "Vasai-Virar", "Vijayawada", "Visakhapatnam",
    "Warangal"
];

export const features = [
    { feature: 'Parkings Near Me', image: parkingnearme },
    { feature: 'Bike Parking', image: bikeparking },
    { feature: 'Rent Parking Spots', image: rentalparking },
    { feature: 'EV Charging', image: evCharging },
    { feature: 'Car Wash', image: carwash },
    { feature: 'Handicap Accessible', image: handicap },
    { feature: '24/7 Access', image: parkingbar },
    { feature: 'Open Parking', image: openparking },
    { feature: 'Valet Available', image: valetparking },
];

export const parking = [
    {   
        _id: 1,
        name: 'Lulu Mall Parking',
        image: lulu,
        location: 'Bangalore',
        address: 'Lulu Mall, Rajajinagar, Bangalore, Karnataka, 560010',
        pricePerHour: 50,
        totalCapacity: 500,
        availableSpots: 320,
        rating: 4.5,
        features: ['EV Charging', 'Car Wash', 'Handicap Accessible', '24/7 Access', 'Open Parking', 'Valet Available', 'Bike Parking'],
        description: 'Secure parking at Lulu Mall with 24/7 security and EV charging points. Spacious and well-maintained.',
        contact: '+91 98765 43210'
    },
    {   
        _id: 2,
        name: 'Phoenix Mall Parking',
        image: phonix,
        location: 'Mumbai',
        address: 'Phoenix Marketcity, Kurla, Mumbai, Maharashtra, 400070',
        pricePerHour: 70,
        totalCapacity: 600,
        availableSpots: 450,
        rating: 4.7,
        features: ['Car Wash', 'EV Charging', 'Handicap Accessible', '24/7 Access', 'Open Parking', 'Valet Available', 'Bike Parking', 'Rent Parking Spots'],
        description: 'Phoenix Mall provides secure parking with premium spaces for VIP customers and valet service.',
        contact: '+91 91234 56789'
    },
    {   
        _id: 3,
        name: 'Mall of Asia Parking',
        image: mallofasia,
        location: 'Delhi',
        address: 'Mall of Asia, Saket District Centre, Delhi, 110017',
        pricePerHour: 60,
        totalCapacity: 550,
        availableSpots: 200,
        rating: 4.3,
        features: ['Multi-Level Parking', '24/7 Access', 'Car Wash', 'Rent Parking Spots', 'EV Charging', 'Handicap Accessible', 'Open Parking', 'Valet Available', 'Bike Parking'],
        description: 'Multi-level parking facility with fast access to mall entrances and real-time availability tracking.',
        contact: '+91 87654 32109'
    },
    {   
        _id: 4,
        name: 'Brigade Road Parking',
        image: briage,
        location: 'Bangalore',
        address: 'Brigade Road, MG Road, Bangalore, Karnataka, 560001',
        pricePerHour: 40,
        totalCapacity: 300,
        availableSpots: 120,
        rating: 4.2,
        features: ['Open Parking', 'Valet Available', 'Rent Parking Spots', 'EV Charging', 'Handicap Accessible', '24/7 Access', 'Bike Parking'],
        description: 'Affordable and secure parking on Brigade Road with valet service for added convenience.',
        contact: '+91 99876 54321'
    },
    {   
        _id: 5,
        name: 'Electronic City Parking',
        image: electroniccity,
        location: 'Bangalore',
        address: 'Electronic City, Phase 1, Bangalore, Karnataka, 560100',
        pricePerHour: 35,
        totalCapacity: 400,
        availableSpots: 300,
        rating: 4.0,
        features: ['Bike Parking', 'EV Charging', 'Handicap Accessible', '24/7 Access', 'Open Parking', 'Valet Available'],
        description: 'Budget-friendly parking in Electronic City with separate bike parking and surveillance.',
        contact: '+91 88765 43210'
    },
    {   
        _id: 6,
        name: 'Indira Gandhi International Airport Parking',
        image: indiraandhiairport,
        location: 'Delhi',
        address: 'Indira Gandhi International Airport, Palam, Delhi, 110037',
        pricePerHour: 100,
        totalCapacity: 1000,
        availableSpots: 600,
        rating: 4.8,
        features: ['EV Charging', 'Handicap Accessible', '24/7 Access', 'Bike Parking', 'Valet Available', 'Open Parking'],
        description: 'Spacious and secure parking facility at Delhi airport with valet service.',
        contact: '+91 76543 21098'
    },
    {   
        _id: 7,
        name: 'Chhatrapati Shivaji Maharaj Airport Parking',
        image: chartapathi,
        location: 'Mumbai',
        address: 'Chhatrapati Shivaji Maharaj International Airport, Mumbai, Maharashtra, 400099',
        pricePerHour: 90,
        totalCapacity: 800,
        availableSpots: 550,
        rating: 4.6,
        features: ['Multi-Level Parking', 'Car Wash', 'EV Charging', 'Handicap Accessible', '24/7 Access', 'Open Parking', 'Valet Available', 'Bike Parking'],
        description: 'Luxury airport parking with advanced security and dedicated parking zones.',
        contact: '+91 67890 12345'
    }
];
